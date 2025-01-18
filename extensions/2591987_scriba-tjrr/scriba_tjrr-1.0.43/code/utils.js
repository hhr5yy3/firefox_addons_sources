UTILS = {
  intToHHMMSS: function(i) {
    var sec_num = parseInt(i, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  },

  minutesToDuration: function(m) {
    if (m == null) {
      return STRINGS.timeUndefined;
    } else if (m < 1) {
      return STRINGS.timeLessThanAMinute;
    } else if (m < 60) {
      return STRINGS.timeMinutes(m);
    } else {
      return STRINGS.timeHoursMinutes(Math.floor(m / 60), m % 60);
    }
  },

  bytesToSize: function(bytes, decimals) {
    decimals = decimals || 2;

    if (bytes === 0) return '0 Bytes';

    var k = 1024;
    var dm = decimals < 0 ? 0 : decimals;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    var i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },

  intToDate: function(t) {
    var d = new Date(parseInt(t));

    return d.getDate().toString().padStart(2, '0') + '/' + (d.getMonth() + 1).toString().padStart(2, '0') + '/' + d.getFullYear() + ' ' +
           d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
  },

  MONTHS_BR: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],

  getMonth: function(month) {
    var months = UTILS.MONTHS_BR;
    month = month || '';

    return months.indexOf(month.toLowerCase());
  },

  getDateFromString: function(confDate, dateType) {
    var d, m;

    switch(dateType) {
      case 'short':
        var r = /\s*([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2}):([0-9]{2})\s*/;
        if (m = r.exec(confDate)) {
          d = new Date(m[3], m[2]-1, m[1], m[4], m[5]);
        }
        break;
      case 'audience':
        var r = /Audiência(.*)?: ([0-9]+) de ([a-zA-zçÇ]+) de ([0-9]+) às ([0-9]+):([0-9]+):([0-9]+)/;
        if (m = r.exec(confDate)) {
          d = new Date(m[4], UTILS.getMonth(m[3]), m[2], m[5], m[6]);
        }
        break;
      case 'schedule':
        var r = /Agendada para: ([0-9]+) de ([a-zA-zçÇ]+) de ([0-9]+) às ([0-9]+):([0-9]+)/;
        if (m = r.exec(confDate)) {
          d = new Date(m[3], UTILS.getMonth(m[2]), m[1], m[4], m[5]);
        }
        break;
    }

    return d;
  },

  getFormattedDate: function(d, separator) {
    if (!separator) {
      separator = '';
    }

    if (!d) {
      return '';
    } else {
      var day = d.getDate(), month = d.getMonth() + 1, year = d.getFullYear();
      return String(day).padStart(2, "0") + separator + String(month).padStart(2, "0") + separator + String(year);
    }
  },

  getTimeFromDate: function(d, separator) {
    if (!separator) {
      separator = '';
    }

    if (!d) {
      return '';
    } else {
      var hour = d.getHours(), minute = d.getMinutes();
      return String(hour).padStart(2, "0") + separator + String(minute).padStart(2, "0");
    }
  },

  compareDates: function(d1, d2) {
    var cd1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    var cd2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
    return  cd1 >= cd2;
  }

};
