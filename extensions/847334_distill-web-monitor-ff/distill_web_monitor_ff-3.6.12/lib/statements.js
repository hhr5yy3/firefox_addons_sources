// TODO Transforms queries to IndexexDB API calls

var utils = {};

var fieldIsValid = utils.fieldIsValid = function(model, field) {
  var columns = _(model.fields).pluck('name');
  return _.include(columns, field.split('.')[0]);
};

var toDateTime = utils.toDateTime = function(value) {
  if (_(value).isDate()) {
    return value.getFullYear()
    + '/' + (value.getMonth()+1)
    + '/' + (value.getDate())
    + ' ' + (value.getHours())
    + ':' + (value.getMinutes())
    + ':' + (value.getSeconds());
  }
};

var validFields = utils.validFields = function(model, fields) {
  var returnFields = {};
  _(fields).each(function(value, key) {
    if (fieldIsValid(model, key)) {
      returnFields[key] = value;
    }
  });
  return returnFields;
};
var nil = utils.nil = function(value) {
  if (_(value).isUndefined() || _(value).isNull() || _(value).isNaN()) {
    return true;
  } else if (_(value).isArray() && _(value).isEmpty()) {
    return true;
  } else if (value.toString() === '[object Object]' && _(value).isEmpty()) {
    return true;
  } else if (_(value).isString() && _(value).isEmpty()) {
    return true;
  } else {
    return false;
  }
};


/**
 * Statements.
 */

var Statements = {};

Statements.select = function(model, selector, opts, outValues) {
  return {
    exec: function(db, callback) {
      var
      query     = buildQuery(model, selector, opts),
      coll      = db.collection(model.tableName),
      pipeline  = [{ $match: query }];

      var
      projections = query.projections;

      if(projections) {
        pipeline.unshift({ $project: projections });
        delete query.projections;
      }

      if(opts.order && opts.order.length > 0) {
        var
        spec = {};

        // TODO We are handling soring only for first sorting field
        _.each(opts.order, function(sortField) {
          var
          dir = 1;
          if(sortField[0] == '-') {
            dir = -1;
            sortField = sortField.slice(1);
          }
          if(sortField.indexOf(' ') > 0) {
            let parts = sortField.split(' ');
            sortField = parts[0];
            // parts[1] == nocase; not yet supported
          }
          spec[sortField] = dir;
        });
        //console.log('SELECT: SORT: spec:', spec);
        pipeline.push({ $sort: spec });
      }

      opts.offset && pipeline.push({ $skip:  opts.offset });
      opts.limit  && pipeline.push({ $limit: opts.limit });

      if(opts.count) {
        pipeline.push({ $project: { _id: 1 } });
      } else if(opts.only) {
        pipeline.push({
          $project: _.reduce(opts.only, function(memo, value) {
            memo[value] = 1;
            return memo;
          }, {})
        });
      }

      coll.aggregate(pipeline).toArray(function(err, list) {
        if(err) return callback(err);
        //console.log('SELECT:', model.tableName, JSON.stringify(selector), JSON.stringify(query), JSON.stringify(opts), list);

        opts.count && (list = [{ count: list.length }]);
        setTimeout(callback, 5, null, { rows: list });
      })
    },
    isSelect: true,
    op: 'select',
    selector: selector,
  }
};

Statements.insert = function(model, obj) {
  return {
    exec: function(db, callback) {
      var
      coll = db.collection(model.tableName),
      doc  = {};

      model.fieldNames.forEach(function(name) {
        var
        val = obj[name];

        if(!_.has(obj, name)) {
          var
          field = model.fieldIndex[name];
          if(field && field.default) {
            val = field.default === "(strftime('%s', 'now')*1000.0)" ?  Date.now() : field.default;
          } else {
            val = null;
          }
        }
        doc[name] = val;
      });

      //console.log('INSERT:', model.tableName, doc);

      coll.insert(doc, function(err) {
        //console.log('INSERT: RESULT:', model.tableName, err);
        setTimeout(callback, 5, err, [doc]);
      });
    },
    isSelect: false,
  }
};

Statements.update = function(model, selector, obj) {
  return {
    exec: function(db, callback) {
      //console.log('UPDATE:', model.tableName, selector, obj);
      var
      query = buildQuery(model, selector);

      db.collection(model.tableName).update(query, obj, function(err) {
        setTimeout(callback, 5, err);
      });
    },
    op: 'update',
    selector: selector,
  }
};

Statements.destroy = function(model, selector) {
  return {
    exec: function(db, callback) {
      //console.log('DESTROY:', model.tableName, selector);
      var
      query = buildQuery(model, selector);

      db.collection(model.tableName).remove(query)
      .then(function(res) { callback(null, res) })
      .catch(e => setTimeout(callback, 5, e));
    },
    op: 'destroy',
    selector: selector,
  }
};

function buildQuery(model, selector) {
  var
  query = {};

  if (utils.nil(selector)) {
    // noop
  } else if (_(selector).isNumber() || _(selector).isString()) {
    query[model.primaryKey] = selector;
  } else {
    _(selector).chain()
    .map(function(value, key) {
      if(_.isNumber(key)) {
        // Handle case when values are specified as an array
        key = value[0];
        value = value[1];
      }
      if (key.slice(0,3) === '$or') {
        /*
        if(!query.$and) {
          query.$and = [];
        }
        query.$and.push({ $or: buildSubQuery(model, value) });
        */
        query.$or = buildSubQuery(model, value);
      } else if (key.slice(0,4) === '$and') {
        query.$and = buildSubQuery(model, value);
      } else if (utils.fieldIsValid(model, key)) {
        setOp(model, query, key, value);
      } else {
        //console.error('INVALID key, value: ', model.tableName, key, value, selector);
        //throw new Error('Invalid query');
      }
    })
  }

  return query;
}

function buildSubQuery(model, selector) {
  return _.map(selector, function(value, key) {
    return setOp(model, {}, key, value);
  });
}

function setOp(model, query, key, value) {
  if(_.isNumber(key)) {
    if(_.isArray(value)) {
      key = value[0];
      value = value[1];
    } else if(_.isObject(value)) {
      key = _.keys(value)[0];
      value = value[key];
    } else {
      console.error('Inalid query op:', model.tableName, query, key, value);
      throw new Error('Invalid query op');
    }
  }

  var
  field = key.split('.')[0],
  op = key.split('.')[1];

  if(key == '$or' || key == '$and') {
    value = buildSubQuery(model, value);
  } else {
    if(value === null || value === void 0 || value === '$null') {
      if(op == 'ne') {
        query[field] = { $ne: null };
      } else {
        query[field] = { $eq: null };
      }
      return query;
    }

    if(_.isObject(value) && value.type == 'field') {
      let
      projections     = query.projections || (query.projections = {}),
      len             = _.keys(projections).length,
      projectedField  = 'key_projected_'+field+'_'+len;

      projections[projectedField] = { $subtract: ['$'+field, '$'+value.name] };

      if(['ne', 'gt', 'lt', 'gte', 'lte'].indexOf(op) < 0) {
        console.error('Unhandled ZangoDB query', model.tableName, key, value);
        throw new Error('Query not supported');
      }

      field = projectedField;
      value = 0;
    }

    switch(op) {
    case 'ne': case 'not':
      value = { $ne: value }; break;
    case 'gt':
      value = { $gt: value }; break;
    case 'lt':
      value = { $lt: value }; break;
    case 'gte':
      value = { $gte: value }; break;
    case 'lte':
      value = { $lte: value }; break;
    case 'like':
      value = { $regex: new RegExp('^'+value.replace(/%/g, '.*').replace(/\s+/g, '\\s+')+'$') }; break;
      // TODO Escape special chars
    case 'nlike': case 'not_like':
      value = { $not: { $regex: new RegExp('^'+value.replace(/%/g, '.*').replace(/\s+/g, '\\s+')+'$') } }; break;
    case 'ilike':
      value = { $regex: new RegExp('^'+value.replace(/%/g, '.*').replace(/\s+/g, '\\s+')+'$', 'i') }; break;
    case 'nilike': case 'not_ilike':
      value = { $not: { $regex: new RegExp('^'+value.replace(/%/g, '.*').replace(/\s+/g, '\\s+')+'$', 'i') } }; break;
    case 'in':
      value = { $in: value }; break;
    case 'nin': case 'not_in':
      value = { $nin: value }; break;
    /*
    default:
      value = value;
    */
    }
  }

  query[field] = value;
  return query;
};


