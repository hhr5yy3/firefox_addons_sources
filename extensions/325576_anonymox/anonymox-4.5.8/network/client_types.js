/*
* anonymoX client
*   for Firefox
*
* Author 	Nils Hügelmann	<nils.h@anonymox.net>
* Author 	Christian Otto	<chris.o@anonymox.net>
*
* www.anonymox.net
*
* License: CC BY-NC-ND 3.0, see LICENSE.TXT or http://creativecommons.org/licenses/by-nc-nd/3.0/
*
* Use at your own risk
*
* This is the released, uncommented version of the code.
*/







ServiceType = {
  'anonymox' : 1,
  'tor' : 2,
  'jondo' : 3,
  'i2p' : 4
};
ExternalInfo = function(args) {
  this.ip = null;
  this.country = null;
  if (args) {
    if (args.ip !== undefined && args.ip !== null) {
      this.ip = args.ip;
    }
    if (args.country !== undefined && args.country !== null) {
      this.country = args.country;
    }
  }
};
ExternalInfo.prototype = {};
ExternalInfo.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.ip = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.country = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ExternalInfo.prototype.write = function(output) {
  output.writeStructBegin('ExternalInfo');
  if (this.ip !== null && this.ip !== undefined) {
    output.writeFieldBegin('ip', Thrift.Type.STRING, 1);
    output.writeString(this.ip);
    output.writeFieldEnd();
  }
  if (this.country !== null && this.country !== undefined) {
    output.writeFieldBegin('country', Thrift.Type.STRING, 2);
    output.writeString(this.country);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Attributes = function(args) {
  this.stealth = null;
  this.premium = null;
  this.fast = null;
  if (args) {
    if (args.stealth !== undefined && args.stealth !== null) {
      this.stealth = args.stealth;
    }
    if (args.premium !== undefined && args.premium !== null) {
      this.premium = args.premium;
    }
    if (args.fast !== undefined && args.fast !== null) {
      this.fast = args.fast;
    }
  }
};
Attributes.prototype = {};
Attributes.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.BOOL) {
        this.stealth = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.BOOL) {
        this.premium = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.BOOL) {
        this.fast = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Attributes.prototype.write = function(output) {
  output.writeStructBegin('Attributes');
  if (this.stealth !== null && this.stealth !== undefined) {
    output.writeFieldBegin('stealth', Thrift.Type.BOOL, 1);
    output.writeBool(this.stealth);
    output.writeFieldEnd();
  }
  if (this.premium !== null && this.premium !== undefined) {
    output.writeFieldBegin('premium', Thrift.Type.BOOL, 2);
    output.writeBool(this.premium);
    output.writeFieldEnd();
  }
  if (this.fast !== null && this.fast !== undefined) {
    output.writeFieldBegin('fast', Thrift.Type.BOOL, 3);
    output.writeBool(this.fast);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

GPSCoord = function(args) {
  this.lat = null;
  this.long = null;
  if (args) {
    if (args.lat !== undefined && args.lat !== null) {
      this.lat = args.lat;
    }
    if (args.long !== undefined && args.long !== null) {
      this.long = args.long;
    }
  }
};
GPSCoord.prototype = {};
GPSCoord.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.DOUBLE) {
        this.lat = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.DOUBLE) {
        this.long = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

GPSCoord.prototype.write = function(output) {
  output.writeStructBegin('GPSCoord');
  if (this.lat !== null && this.lat !== undefined) {
    output.writeFieldBegin('lat', Thrift.Type.DOUBLE, 1);
    output.writeDouble(this.lat);
    output.writeFieldEnd();
  }
  if (this.long !== null && this.long !== undefined) {
    output.writeFieldBegin('long', Thrift.Type.DOUBLE, 2);
    output.writeDouble(this.long);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Gateway = function(args) {
  this.id = null;
  this.ip = null;
  this.port = null;
  this.type = null;
  this.usageIndex = null;
  this.country = null;
  this.attributes = null;
  if (args) {
    if (args.id !== undefined && args.id !== null) {
      this.id = args.id;
    }
    if (args.ip !== undefined && args.ip !== null) {
      this.ip = args.ip;
    }
    if (args.port !== undefined && args.port !== null) {
      this.port = args.port;
    }
    if (args.type !== undefined && args.type !== null) {
      this.type = args.type;
    }
    if (args.usageIndex !== undefined && args.usageIndex !== null) {
      this.usageIndex = args.usageIndex;
    }
    if (args.country !== undefined && args.country !== null) {
      this.country = args.country;
    }
    if (args.attributes !== undefined && args.attributes !== null) {
      this.attributes = Thrift.copyList(args.attributes, [null]);
    }
  }
};
Gateway.prototype = {};
Gateway.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.id = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.ip = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.port = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.type = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I32) {
        this.usageIndex = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.country = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.attributes = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = input.readString().value;
          this.attributes.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Gateway.prototype.write = function(output) {
  output.writeStructBegin('Gateway');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.STRING, 1);
    output.writeString(this.id);
    output.writeFieldEnd();
  }
  if (this.ip !== null && this.ip !== undefined) {
    output.writeFieldBegin('ip', Thrift.Type.STRING, 2);
    output.writeString(this.ip);
    output.writeFieldEnd();
  }
  if (this.port !== null && this.port !== undefined) {
    output.writeFieldBegin('port', Thrift.Type.I32, 3);
    output.writeI32(this.port);
    output.writeFieldEnd();
  }
  if (this.type !== null && this.type !== undefined) {
    output.writeFieldBegin('type', Thrift.Type.I32, 4);
    output.writeI32(this.type);
    output.writeFieldEnd();
  }
  if (this.usageIndex !== null && this.usageIndex !== undefined) {
    output.writeFieldBegin('usageIndex', Thrift.Type.I32, 5);
    output.writeI32(this.usageIndex);
    output.writeFieldEnd();
  }
  if (this.country !== null && this.country !== undefined) {
    output.writeFieldBegin('country', Thrift.Type.STRING, 6);
    output.writeString(this.country);
    output.writeFieldEnd();
  }
  if (this.attributes !== null && this.attributes !== undefined) {
    output.writeFieldBegin('attributes', Thrift.Type.LIST, 7);
    output.writeListBegin(Thrift.Type.STRING, this.attributes.length);
    for (var iter7 in this.attributes)
    {
      if (this.attributes.hasOwnProperty(iter7))
      {
        iter7 = this.attributes[iter7];
        output.writeString(iter7);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Gateway2 = function(args) {
  this.id = null;
  this.ip = null;
  this.port = null;
  this.type = null;
  this.usageIndex = null;
  this.country = null;
  this.attributes = null;
  if (args) {
    if (args.id !== undefined && args.id !== null) {
      this.id = args.id;
    }
    if (args.ip !== undefined && args.ip !== null) {
      this.ip = args.ip;
    }
    if (args.port !== undefined && args.port !== null) {
      this.port = args.port;
    }
    if (args.type !== undefined && args.type !== null) {
      this.type = args.type;
    }
    if (args.usageIndex !== undefined && args.usageIndex !== null) {
      this.usageIndex = args.usageIndex;
    }
    if (args.country !== undefined && args.country !== null) {
      this.country = args.country;
    }
    if (args.attributes !== undefined && args.attributes !== null) {
      this.attributes = new Attributes(args.attributes);
    }
  }
};
Gateway2.prototype = {};
Gateway2.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.id = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.ip = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.port = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.type = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I32) {
        this.usageIndex = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.country = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRUCT) {
        this.attributes = new Attributes();
        this.attributes.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Gateway2.prototype.write = function(output) {
  output.writeStructBegin('Gateway2');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.STRING, 1);
    output.writeString(this.id);
    output.writeFieldEnd();
  }
  if (this.ip !== null && this.ip !== undefined) {
    output.writeFieldBegin('ip', Thrift.Type.STRING, 2);
    output.writeString(this.ip);
    output.writeFieldEnd();
  }
  if (this.port !== null && this.port !== undefined) {
    output.writeFieldBegin('port', Thrift.Type.I32, 3);
    output.writeI32(this.port);
    output.writeFieldEnd();
  }
  if (this.type !== null && this.type !== undefined) {
    output.writeFieldBegin('type', Thrift.Type.I32, 4);
    output.writeI32(this.type);
    output.writeFieldEnd();
  }
  if (this.usageIndex !== null && this.usageIndex !== undefined) {
    output.writeFieldBegin('usageIndex', Thrift.Type.I32, 5);
    output.writeI32(this.usageIndex);
    output.writeFieldEnd();
  }
  if (this.country !== null && this.country !== undefined) {
    output.writeFieldBegin('country', Thrift.Type.STRING, 6);
    output.writeString(this.country);
    output.writeFieldEnd();
  }
  if (this.attributes !== null && this.attributes !== undefined) {
    output.writeFieldBegin('attributes', Thrift.Type.STRUCT, 7);
    this.attributes.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Gateway3 = function(args) {
  this.id = null;
  this.ip = null;
  this.port = null;
  this.type = null;
  this.usageIndex = null;
  this.country = null;
  this.attributes = null;
  this.tls = null;
  this.tlsHostname = null;
  if (args) {
    if (args.id !== undefined && args.id !== null) {
      this.id = args.id;
    }
    if (args.ip !== undefined && args.ip !== null) {
      this.ip = args.ip;
    }
    if (args.port !== undefined && args.port !== null) {
      this.port = args.port;
    }
    if (args.type !== undefined && args.type !== null) {
      this.type = args.type;
    }
    if (args.usageIndex !== undefined && args.usageIndex !== null) {
      this.usageIndex = args.usageIndex;
    }
    if (args.country !== undefined && args.country !== null) {
      this.country = args.country;
    }
    if (args.attributes !== undefined && args.attributes !== null) {
      this.attributes = new Attributes(args.attributes);
    }
    if (args.tls !== undefined && args.tls !== null) {
      this.tls = args.tls;
    }
    if (args.tlsHostname !== undefined && args.tlsHostname !== null) {
      this.tlsHostname = args.tlsHostname;
    }
  }
};
Gateway3.prototype = {};
Gateway3.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.id = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.ip = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.port = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.type = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.I32) {
        this.usageIndex = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRING) {
        this.country = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRUCT) {
        this.attributes = new Attributes();
        this.attributes.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.BOOL) {
        this.tls = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.STRING) {
        this.tlsHostname = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Gateway3.prototype.write = function(output) {
  output.writeStructBegin('Gateway3');
  if (this.id !== null && this.id !== undefined) {
    output.writeFieldBegin('id', Thrift.Type.STRING, 1);
    output.writeString(this.id);
    output.writeFieldEnd();
  }
  if (this.ip !== null && this.ip !== undefined) {
    output.writeFieldBegin('ip', Thrift.Type.STRING, 2);
    output.writeString(this.ip);
    output.writeFieldEnd();
  }
  if (this.port !== null && this.port !== undefined) {
    output.writeFieldBegin('port', Thrift.Type.I32, 3);
    output.writeI32(this.port);
    output.writeFieldEnd();
  }
  if (this.type !== null && this.type !== undefined) {
    output.writeFieldBegin('type', Thrift.Type.I32, 4);
    output.writeI32(this.type);
    output.writeFieldEnd();
  }
  if (this.usageIndex !== null && this.usageIndex !== undefined) {
    output.writeFieldBegin('usageIndex', Thrift.Type.I32, 5);
    output.writeI32(this.usageIndex);
    output.writeFieldEnd();
  }
  if (this.country !== null && this.country !== undefined) {
    output.writeFieldBegin('country', Thrift.Type.STRING, 6);
    output.writeString(this.country);
    output.writeFieldEnd();
  }
  if (this.attributes !== null && this.attributes !== undefined) {
    output.writeFieldBegin('attributes', Thrift.Type.STRUCT, 7);
    this.attributes.write(output);
    output.writeFieldEnd();
  }
  if (this.tls !== null && this.tls !== undefined) {
    output.writeFieldBegin('tls', Thrift.Type.BOOL, 8);
    output.writeBool(this.tls);
    output.writeFieldEnd();
  }
  if (this.tlsHostname !== null && this.tlsHostname !== undefined) {
    output.writeFieldBegin('tlsHostname', Thrift.Type.STRING, 9);
    output.writeString(this.tlsHostname);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

FundingInfo = function(args) {
  this.frameURL = null;
  this.everyXPageChange = null;
  if (args) {
    if (args.frameURL !== undefined && args.frameURL !== null) {
      this.frameURL = args.frameURL;
    }
    if (args.everyXPageChange !== undefined && args.everyXPageChange !== null) {
      this.everyXPageChange = args.everyXPageChange;
    }
  }
};
FundingInfo.prototype = {};
FundingInfo.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.frameURL = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.everyXPageChange = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FundingInfo.prototype.write = function(output) {
  output.writeStructBegin('FundingInfo');
  if (this.frameURL !== null && this.frameURL !== undefined) {
    output.writeFieldBegin('frameURL', Thrift.Type.STRING, 1);
    output.writeString(this.frameURL);
    output.writeFieldEnd();
  }
  if (this.everyXPageChange !== null && this.everyXPageChange !== undefined) {
    output.writeFieldBegin('everyXPageChange', Thrift.Type.I32, 2);
    output.writeI32(this.everyXPageChange);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AdBoxInfo = function(args) {
  this.frameURL = null;
  this.pageChangesPerAd = null;
  if (args) {
    if (args.frameURL !== undefined && args.frameURL !== null) {
      this.frameURL = args.frameURL;
    }
    if (args.pageChangesPerAd !== undefined && args.pageChangesPerAd !== null) {
      this.pageChangesPerAd = args.pageChangesPerAd;
    }
  }
};
AdBoxInfo.prototype = {};
AdBoxInfo.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.frameURL = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.pageChangesPerAd = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AdBoxInfo.prototype.write = function(output) {
  output.writeStructBegin('AdBoxInfo');
  if (this.frameURL !== null && this.frameURL !== undefined) {
    output.writeFieldBegin('frameURL', Thrift.Type.STRING, 1);
    output.writeString(this.frameURL);
    output.writeFieldEnd();
  }
  if (this.pageChangesPerAd !== null && this.pageChangesPerAd !== undefined) {
    output.writeFieldBegin('pageChangesPerAd', Thrift.Type.I32, 2);
    output.writeI32(this.pageChangesPerAd);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Info = function(args) {
  this.gateways = null;
  this.showURL = null;
  this.externalInfo = null;
  this.premium = null;
  this.funding = null;
  this.forceUpgradeVersion = null;
  this.throttledReminderIntervalMin = null;
  this.showPremiumInfoParts = null;
  this.statusUri = null;
  if (args) {
    if (args.gateways !== undefined && args.gateways !== null) {
      this.gateways = Thrift.copyList(args.gateways, [Gateway]);
    }
    if (args.showURL !== undefined && args.showURL !== null) {
      this.showURL = args.showURL;
    }
    if (args.externalInfo !== undefined && args.externalInfo !== null) {
      this.externalInfo = new ExternalInfo(args.externalInfo);
    }
    if (args.premium !== undefined && args.premium !== null) {
      this.premium = args.premium;
    }
    if (args.funding !== undefined && args.funding !== null) {
      this.funding = new FundingInfo(args.funding);
    }
    if (args.forceUpgradeVersion !== undefined && args.forceUpgradeVersion !== null) {
      this.forceUpgradeVersion = args.forceUpgradeVersion;
    }
    if (args.throttledReminderIntervalMin !== undefined && args.throttledReminderIntervalMin !== null) {
      this.throttledReminderIntervalMin = args.throttledReminderIntervalMin;
    }
    if (args.showPremiumInfoParts !== undefined && args.showPremiumInfoParts !== null) {
      this.showPremiumInfoParts = args.showPremiumInfoParts;
    }
    if (args.statusUri !== undefined && args.statusUri !== null) {
      this.statusUri = args.statusUri;
    }
  }
};
Info.prototype = {};
Info.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 2:
      if (ftype == Thrift.Type.LIST) {
        var _size8 = 0;
        var _rtmp312;
        this.gateways = [];
        var _etype11 = 0;
        _rtmp312 = input.readListBegin();
        _etype11 = _rtmp312.etype;
        _size8 = _rtmp312.size;
        for (var _i13 = 0; _i13 < _size8; ++_i13)
        {
          var elem14 = null;
          elem14 = new Gateway();
          elem14.read(input);
          this.gateways.push(elem14);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.showURL = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRUCT) {
        this.externalInfo = new ExternalInfo();
        this.externalInfo.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.BOOL) {
        this.premium = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRUCT) {
        this.funding = new FundingInfo();
        this.funding.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.forceUpgradeVersion = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.I32) {
        this.throttledReminderIntervalMin = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.STRING) {
        this.showPremiumInfoParts = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 10:
      if (ftype == Thrift.Type.STRING) {
        this.statusUri = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Info.prototype.write = function(output) {
  output.writeStructBegin('Info');
  if (this.gateways !== null && this.gateways !== undefined) {
    output.writeFieldBegin('gateways', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.STRUCT, this.gateways.length);
    for (var iter15 in this.gateways)
    {
      if (this.gateways.hasOwnProperty(iter15))
      {
        iter15 = this.gateways[iter15];
        iter15.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.showURL !== null && this.showURL !== undefined) {
    output.writeFieldBegin('showURL', Thrift.Type.STRING, 3);
    output.writeString(this.showURL);
    output.writeFieldEnd();
  }
  if (this.externalInfo !== null && this.externalInfo !== undefined) {
    output.writeFieldBegin('externalInfo', Thrift.Type.STRUCT, 4);
    this.externalInfo.write(output);
    output.writeFieldEnd();
  }
  if (this.premium !== null && this.premium !== undefined) {
    output.writeFieldBegin('premium', Thrift.Type.BOOL, 5);
    output.writeBool(this.premium);
    output.writeFieldEnd();
  }
  if (this.funding !== null && this.funding !== undefined) {
    output.writeFieldBegin('funding', Thrift.Type.STRUCT, 6);
    this.funding.write(output);
    output.writeFieldEnd();
  }
  if (this.forceUpgradeVersion !== null && this.forceUpgradeVersion !== undefined) {
    output.writeFieldBegin('forceUpgradeVersion', Thrift.Type.STRING, 7);
    output.writeString(this.forceUpgradeVersion);
    output.writeFieldEnd();
  }
  if (this.throttledReminderIntervalMin !== null && this.throttledReminderIntervalMin !== undefined) {
    output.writeFieldBegin('throttledReminderIntervalMin', Thrift.Type.I32, 8);
    output.writeI32(this.throttledReminderIntervalMin);
    output.writeFieldEnd();
  }
  if (this.showPremiumInfoParts !== null && this.showPremiumInfoParts !== undefined) {
    output.writeFieldBegin('showPremiumInfoParts', Thrift.Type.STRING, 9);
    output.writeString(this.showPremiumInfoParts);
    output.writeFieldEnd();
  }
  if (this.statusUri !== null && this.statusUri !== undefined) {
    output.writeFieldBegin('statusUri', Thrift.Type.STRING, 10);
    output.writeString(this.statusUri);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Info2 = function(args) {
  this.gateways = null;
  this.showURL = null;
  this.externalInfo = null;
  this.premium = null;
  this.adBoxInfo = null;
  this.forceUpgradeVersion = null;
  this.throttledReminderIntervalMin = null;
  this.showPremiumInfoParts = null;
  this.statusUri = null;
  this.cgAuthenticatedUser = null;
  this.cgFreeTimeResetSec = null;
  this.cgFreeTimeMaxDurationSec = null;
  this.cgFreeTimeResetIntervalDurationSec = null;
  if (args) {
    if (args.gateways !== undefined && args.gateways !== null) {
      this.gateways = Thrift.copyList(args.gateways, [Gateway2]);
    }
    if (args.showURL !== undefined && args.showURL !== null) {
      this.showURL = args.showURL;
    }
    if (args.externalInfo !== undefined && args.externalInfo !== null) {
      this.externalInfo = new ExternalInfo(args.externalInfo);
    }
    if (args.premium !== undefined && args.premium !== null) {
      this.premium = args.premium;
    }
    if (args.adBoxInfo !== undefined && args.adBoxInfo !== null) {
      this.adBoxInfo = new AdBoxInfo(args.adBoxInfo);
    }
    if (args.forceUpgradeVersion !== undefined && args.forceUpgradeVersion !== null) {
      this.forceUpgradeVersion = args.forceUpgradeVersion;
    }
    if (args.throttledReminderIntervalMin !== undefined && args.throttledReminderIntervalMin !== null) {
      this.throttledReminderIntervalMin = args.throttledReminderIntervalMin;
    }
    if (args.showPremiumInfoParts !== undefined && args.showPremiumInfoParts !== null) {
      this.showPremiumInfoParts = args.showPremiumInfoParts;
    }
    if (args.statusUri !== undefined && args.statusUri !== null) {
      this.statusUri = args.statusUri;
    }
    if (args.cgAuthenticatedUser !== undefined && args.cgAuthenticatedUser !== null) {
      this.cgAuthenticatedUser = args.cgAuthenticatedUser;
    }
    if (args.cgFreeTimeResetSec !== undefined && args.cgFreeTimeResetSec !== null) {
      this.cgFreeTimeResetSec = args.cgFreeTimeResetSec;
    }
    if (args.cgFreeTimeMaxDurationSec !== undefined && args.cgFreeTimeMaxDurationSec !== null) {
      this.cgFreeTimeMaxDurationSec = args.cgFreeTimeMaxDurationSec;
    }
    if (args.cgFreeTimeResetIntervalDurationSec !== undefined && args.cgFreeTimeResetIntervalDurationSec !== null) {
      this.cgFreeTimeResetIntervalDurationSec = args.cgFreeTimeResetIntervalDurationSec;
    }
  }
};
Info2.prototype = {};
Info2.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 2:
      if (ftype == Thrift.Type.LIST) {
        var _size16 = 0;
        var _rtmp320;
        this.gateways = [];
        var _etype19 = 0;
        _rtmp320 = input.readListBegin();
        _etype19 = _rtmp320.etype;
        _size16 = _rtmp320.size;
        for (var _i21 = 0; _i21 < _size16; ++_i21)
        {
          var elem22 = null;
          elem22 = new Gateway2();
          elem22.read(input);
          this.gateways.push(elem22);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.showURL = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRUCT) {
        this.externalInfo = new ExternalInfo();
        this.externalInfo.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.BOOL) {
        this.premium = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRUCT) {
        this.adBoxInfo = new AdBoxInfo();
        this.adBoxInfo.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.forceUpgradeVersion = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.I32) {
        this.throttledReminderIntervalMin = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.STRING) {
        this.showPremiumInfoParts = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 10:
      if (ftype == Thrift.Type.STRING) {
        this.statusUri = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 11:
      if (ftype == Thrift.Type.BOOL) {
        this.cgAuthenticatedUser = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 12:
      if (ftype == Thrift.Type.I32) {
        this.cgFreeTimeResetSec = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 13:
      if (ftype == Thrift.Type.I32) {
        this.cgFreeTimeMaxDurationSec = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 14:
      if (ftype == Thrift.Type.I32) {
        this.cgFreeTimeResetIntervalDurationSec = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Info2.prototype.write = function(output) {
  output.writeStructBegin('Info2');
  if (this.gateways !== null && this.gateways !== undefined) {
    output.writeFieldBegin('gateways', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.STRUCT, this.gateways.length);
    for (var iter23 in this.gateways)
    {
      if (this.gateways.hasOwnProperty(iter23))
      {
        iter23 = this.gateways[iter23];
        iter23.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.showURL !== null && this.showURL !== undefined) {
    output.writeFieldBegin('showURL', Thrift.Type.STRING, 3);
    output.writeString(this.showURL);
    output.writeFieldEnd();
  }
  if (this.externalInfo !== null && this.externalInfo !== undefined) {
    output.writeFieldBegin('externalInfo', Thrift.Type.STRUCT, 4);
    this.externalInfo.write(output);
    output.writeFieldEnd();
  }
  if (this.premium !== null && this.premium !== undefined) {
    output.writeFieldBegin('premium', Thrift.Type.BOOL, 5);
    output.writeBool(this.premium);
    output.writeFieldEnd();
  }
  if (this.adBoxInfo !== null && this.adBoxInfo !== undefined) {
    output.writeFieldBegin('adBoxInfo', Thrift.Type.STRUCT, 6);
    this.adBoxInfo.write(output);
    output.writeFieldEnd();
  }
  if (this.forceUpgradeVersion !== null && this.forceUpgradeVersion !== undefined) {
    output.writeFieldBegin('forceUpgradeVersion', Thrift.Type.STRING, 7);
    output.writeString(this.forceUpgradeVersion);
    output.writeFieldEnd();
  }
  if (this.throttledReminderIntervalMin !== null && this.throttledReminderIntervalMin !== undefined) {
    output.writeFieldBegin('throttledReminderIntervalMin', Thrift.Type.I32, 8);
    output.writeI32(this.throttledReminderIntervalMin);
    output.writeFieldEnd();
  }
  if (this.showPremiumInfoParts !== null && this.showPremiumInfoParts !== undefined) {
    output.writeFieldBegin('showPremiumInfoParts', Thrift.Type.STRING, 9);
    output.writeString(this.showPremiumInfoParts);
    output.writeFieldEnd();
  }
  if (this.statusUri !== null && this.statusUri !== undefined) {
    output.writeFieldBegin('statusUri', Thrift.Type.STRING, 10);
    output.writeString(this.statusUri);
    output.writeFieldEnd();
  }
  if (this.cgAuthenticatedUser !== null && this.cgAuthenticatedUser !== undefined) {
    output.writeFieldBegin('cgAuthenticatedUser', Thrift.Type.BOOL, 11);
    output.writeBool(this.cgAuthenticatedUser);
    output.writeFieldEnd();
  }
  if (this.cgFreeTimeResetSec !== null && this.cgFreeTimeResetSec !== undefined) {
    output.writeFieldBegin('cgFreeTimeResetSec', Thrift.Type.I32, 12);
    output.writeI32(this.cgFreeTimeResetSec);
    output.writeFieldEnd();
  }
  if (this.cgFreeTimeMaxDurationSec !== null && this.cgFreeTimeMaxDurationSec !== undefined) {
    output.writeFieldBegin('cgFreeTimeMaxDurationSec', Thrift.Type.I32, 13);
    output.writeI32(this.cgFreeTimeMaxDurationSec);
    output.writeFieldEnd();
  }
  if (this.cgFreeTimeResetIntervalDurationSec !== null && this.cgFreeTimeResetIntervalDurationSec !== undefined) {
    output.writeFieldBegin('cgFreeTimeResetIntervalDurationSec', Thrift.Type.I32, 14);
    output.writeI32(this.cgFreeTimeResetIntervalDurationSec);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Info3 = function(args) {
  this.gateways = null;
  this.showURL = null;
  this.externalInfo = null;
  this.premium = null;
  this.adBoxInfo = null;
  this.forceUpgradeVersion = null;
  this.throttledReminderIntervalMin = null;
  this.showPremiumInfoParts = null;
  this.statusUri = null;
  this.cgAuthenticatedUser = null;
  this.cgFreeTimeResetSec = null;
  this.cgFreeTimeMaxDurationSec = null;
  this.cgFreeTimeResetIntervalDurationSec = null;
  if (args) {
    if (args.gateways !== undefined && args.gateways !== null) {
      this.gateways = Thrift.copyList(args.gateways, [Gateway3]);
    }
    if (args.showURL !== undefined && args.showURL !== null) {
      this.showURL = args.showURL;
    }
    if (args.externalInfo !== undefined && args.externalInfo !== null) {
      this.externalInfo = new ExternalInfo(args.externalInfo);
    }
    if (args.premium !== undefined && args.premium !== null) {
      this.premium = args.premium;
    }
    if (args.adBoxInfo !== undefined && args.adBoxInfo !== null) {
      this.adBoxInfo = new AdBoxInfo(args.adBoxInfo);
    }
    if (args.forceUpgradeVersion !== undefined && args.forceUpgradeVersion !== null) {
      this.forceUpgradeVersion = args.forceUpgradeVersion;
    }
    if (args.throttledReminderIntervalMin !== undefined && args.throttledReminderIntervalMin !== null) {
      this.throttledReminderIntervalMin = args.throttledReminderIntervalMin;
    }
    if (args.showPremiumInfoParts !== undefined && args.showPremiumInfoParts !== null) {
      this.showPremiumInfoParts = args.showPremiumInfoParts;
    }
    if (args.statusUri !== undefined && args.statusUri !== null) {
      this.statusUri = args.statusUri;
    }
    if (args.cgAuthenticatedUser !== undefined && args.cgAuthenticatedUser !== null) {
      this.cgAuthenticatedUser = args.cgAuthenticatedUser;
    }
    if (args.cgFreeTimeResetSec !== undefined && args.cgFreeTimeResetSec !== null) {
      this.cgFreeTimeResetSec = args.cgFreeTimeResetSec;
    }
    if (args.cgFreeTimeMaxDurationSec !== undefined && args.cgFreeTimeMaxDurationSec !== null) {
      this.cgFreeTimeMaxDurationSec = args.cgFreeTimeMaxDurationSec;
    }
    if (args.cgFreeTimeResetIntervalDurationSec !== undefined && args.cgFreeTimeResetIntervalDurationSec !== null) {
      this.cgFreeTimeResetIntervalDurationSec = args.cgFreeTimeResetIntervalDurationSec;
    }
  }
};
Info3.prototype = {};
Info3.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 2:
      if (ftype == Thrift.Type.LIST) {
        var _size24 = 0;
        var _rtmp328;
        this.gateways = [];
        var _etype27 = 0;
        _rtmp328 = input.readListBegin();
        _etype27 = _rtmp328.etype;
        _size24 = _rtmp328.size;
        for (var _i29 = 0; _i29 < _size24; ++_i29)
        {
          var elem30 = null;
          elem30 = new Gateway3();
          elem30.read(input);
          this.gateways.push(elem30);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.showURL = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRUCT) {
        this.externalInfo = new ExternalInfo();
        this.externalInfo.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.BOOL) {
        this.premium = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.STRUCT) {
        this.adBoxInfo = new AdBoxInfo();
        this.adBoxInfo.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.STRING) {
        this.forceUpgradeVersion = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.I32) {
        this.throttledReminderIntervalMin = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.STRING) {
        this.showPremiumInfoParts = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 10:
      if (ftype == Thrift.Type.STRING) {
        this.statusUri = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 11:
      if (ftype == Thrift.Type.BOOL) {
        this.cgAuthenticatedUser = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 12:
      if (ftype == Thrift.Type.I32) {
        this.cgFreeTimeResetSec = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 13:
      if (ftype == Thrift.Type.I32) {
        this.cgFreeTimeMaxDurationSec = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 14:
      if (ftype == Thrift.Type.I32) {
        this.cgFreeTimeResetIntervalDurationSec = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Info3.prototype.write = function(output) {
  output.writeStructBegin('Info3');
  if (this.gateways !== null && this.gateways !== undefined) {
    output.writeFieldBegin('gateways', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.STRUCT, this.gateways.length);
    for (var iter31 in this.gateways)
    {
      if (this.gateways.hasOwnProperty(iter31))
      {
        iter31 = this.gateways[iter31];
        iter31.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.showURL !== null && this.showURL !== undefined) {
    output.writeFieldBegin('showURL', Thrift.Type.STRING, 3);
    output.writeString(this.showURL);
    output.writeFieldEnd();
  }
  if (this.externalInfo !== null && this.externalInfo !== undefined) {
    output.writeFieldBegin('externalInfo', Thrift.Type.STRUCT, 4);
    this.externalInfo.write(output);
    output.writeFieldEnd();
  }
  if (this.premium !== null && this.premium !== undefined) {
    output.writeFieldBegin('premium', Thrift.Type.BOOL, 5);
    output.writeBool(this.premium);
    output.writeFieldEnd();
  }
  if (this.adBoxInfo !== null && this.adBoxInfo !== undefined) {
    output.writeFieldBegin('adBoxInfo', Thrift.Type.STRUCT, 6);
    this.adBoxInfo.write(output);
    output.writeFieldEnd();
  }
  if (this.forceUpgradeVersion !== null && this.forceUpgradeVersion !== undefined) {
    output.writeFieldBegin('forceUpgradeVersion', Thrift.Type.STRING, 7);
    output.writeString(this.forceUpgradeVersion);
    output.writeFieldEnd();
  }
  if (this.throttledReminderIntervalMin !== null && this.throttledReminderIntervalMin !== undefined) {
    output.writeFieldBegin('throttledReminderIntervalMin', Thrift.Type.I32, 8);
    output.writeI32(this.throttledReminderIntervalMin);
    output.writeFieldEnd();
  }
  if (this.showPremiumInfoParts !== null && this.showPremiumInfoParts !== undefined) {
    output.writeFieldBegin('showPremiumInfoParts', Thrift.Type.STRING, 9);
    output.writeString(this.showPremiumInfoParts);
    output.writeFieldEnd();
  }
  if (this.statusUri !== null && this.statusUri !== undefined) {
    output.writeFieldBegin('statusUri', Thrift.Type.STRING, 10);
    output.writeString(this.statusUri);
    output.writeFieldEnd();
  }
  if (this.cgAuthenticatedUser !== null && this.cgAuthenticatedUser !== undefined) {
    output.writeFieldBegin('cgAuthenticatedUser', Thrift.Type.BOOL, 11);
    output.writeBool(this.cgAuthenticatedUser);
    output.writeFieldEnd();
  }
  if (this.cgFreeTimeResetSec !== null && this.cgFreeTimeResetSec !== undefined) {
    output.writeFieldBegin('cgFreeTimeResetSec', Thrift.Type.I32, 12);
    output.writeI32(this.cgFreeTimeResetSec);
    output.writeFieldEnd();
  }
  if (this.cgFreeTimeMaxDurationSec !== null && this.cgFreeTimeMaxDurationSec !== undefined) {
    output.writeFieldBegin('cgFreeTimeMaxDurationSec', Thrift.Type.I32, 13);
    output.writeI32(this.cgFreeTimeMaxDurationSec);
    output.writeFieldEnd();
  }
  if (this.cgFreeTimeResetIntervalDurationSec !== null && this.cgFreeTimeResetIntervalDurationSec !== undefined) {
    output.writeFieldBegin('cgFreeTimeResetIntervalDurationSec', Thrift.Type.I32, 14);
    output.writeI32(this.cgFreeTimeResetIntervalDurationSec);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

UserCredentials = function(args) {
  this.user = null;
  this.passwordPlain = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.passwordPlain !== undefined && args.passwordPlain !== null) {
      this.passwordPlain = args.passwordPlain;
    }
  }
};
UserCredentials.prototype = {};
UserCredentials.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.user = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.passwordPlain = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

UserCredentials.prototype.write = function(output) {
  output.writeStructBegin('UserCredentials');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I32, 1);
    output.writeI32(this.user);
    output.writeFieldEnd();
  }
  if (this.passwordPlain !== null && this.passwordPlain !== undefined) {
    output.writeFieldBegin('passwordPlain', Thrift.Type.STRING, 2);
    output.writeString(this.passwordPlain);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

GenericException = function(args) {
  this.xmessage = null;
  if (args) {
    if (args.xmessage !== undefined && args.xmessage !== null) {
      this.xmessage = args.xmessage;
    }
  }
};
Thrift.inherits(GenericException, Thrift.TException);
GenericException.prototype.name = 'GenericException';
GenericException.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.xmessage = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

GenericException.prototype.write = function(output) {
  output.writeStructBegin('GenericException');
  if (this.xmessage !== null && this.xmessage !== undefined) {
    output.writeFieldBegin('xmessage', Thrift.Type.STRING, 1);
    output.writeString(this.xmessage);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

GenericException2 = function(args) {
  this.xmessage = null;
  this.uri = null;
  if (args) {
    if (args.xmessage !== undefined && args.xmessage !== null) {
      this.xmessage = args.xmessage;
    }
    if (args.uri !== undefined && args.uri !== null) {
      this.uri = args.uri;
    }
  }
};
Thrift.inherits(GenericException2, Thrift.TException);
GenericException2.prototype.name = 'GenericException2';
GenericException2.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.xmessage = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.uri = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

GenericException2.prototype.write = function(output) {
  output.writeStructBegin('GenericException2');
  if (this.xmessage !== null && this.xmessage !== undefined) {
    output.writeFieldBegin('xmessage', Thrift.Type.STRING, 1);
    output.writeString(this.xmessage);
    output.writeFieldEnd();
  }
  if (this.uri !== null && this.uri !== undefined) {
    output.writeFieldBegin('uri', Thrift.Type.STRING, 2);
    output.writeString(this.uri);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

AlreadyPremiumException = function(args) {
};
Thrift.inherits(AlreadyPremiumException, Thrift.TException);
AlreadyPremiumException.prototype.name = 'AlreadyPremiumException';
AlreadyPremiumException.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AlreadyPremiumException.prototype.write = function(output) {
  output.writeStructBegin('AlreadyPremiumException');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

