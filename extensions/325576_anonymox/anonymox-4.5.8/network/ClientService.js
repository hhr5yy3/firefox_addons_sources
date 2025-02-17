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









ClientService_Info4_args = function(args) {
  this.user = null;
  this.password = null;
  this.clientVersion = null;
  this.langID = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.password !== undefined && args.password !== null) {
      this.password = args.password;
    }
    if (args.clientVersion !== undefined && args.clientVersion !== null) {
      this.clientVersion = args.clientVersion;
    }
    if (args.langID !== undefined && args.langID !== null) {
      this.langID = args.langID;
    }
  }
};
ClientService_Info4_args.prototype = {};
ClientService_Info4_args.prototype.read = function(input) {
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
        this.password = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.clientVersion = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.langID = input.readString().value;
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

ClientService_Info4_args.prototype.write = function(output) {
  output.writeStructBegin('ClientService_Info4_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I32, 1);
    output.writeI32(this.user);
    output.writeFieldEnd();
  }
  if (this.password !== null && this.password !== undefined) {
    output.writeFieldBegin('password', Thrift.Type.STRING, 2);
    output.writeString(this.password);
    output.writeFieldEnd();
  }
  if (this.clientVersion !== null && this.clientVersion !== undefined) {
    output.writeFieldBegin('clientVersion', Thrift.Type.STRING, 3);
    output.writeString(this.clientVersion);
    output.writeFieldEnd();
  }
  if (this.langID !== null && this.langID !== undefined) {
    output.writeFieldBegin('langID', Thrift.Type.STRING, 4);
    output.writeString(this.langID);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_Info4_result = function(args) {
  this.success = null;
  this.ge = null;
  if (args instanceof GenericException) {
    this.ge = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new Info(args.success);
    }
    if (args.ge !== undefined && args.ge !== null) {
      this.ge = args.ge;
    }
  }
};
ClientService_Info4_result.prototype = {};
ClientService_Info4_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new Info();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ge = new GenericException();
        this.ge.read(input);
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

ClientService_Info4_result.prototype.write = function(output) {
  output.writeStructBegin('ClientService_Info4_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.ge !== null && this.ge !== undefined) {
    output.writeFieldBegin('ge', Thrift.Type.STRUCT, 1);
    this.ge.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_Info5_args = function(args) {
  this.user = null;
  this.password = null;
  this.clientVersion = null;
  this.langID = null;
  this.OS = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.password !== undefined && args.password !== null) {
      this.password = args.password;
    }
    if (args.clientVersion !== undefined && args.clientVersion !== null) {
      this.clientVersion = args.clientVersion;
    }
    if (args.langID !== undefined && args.langID !== null) {
      this.langID = args.langID;
    }
    if (args.OS !== undefined && args.OS !== null) {
      this.OS = args.OS;
    }
  }
};
ClientService_Info5_args.prototype = {};
ClientService_Info5_args.prototype.read = function(input) {
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
        this.password = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.clientVersion = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.langID = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.OS = input.readString().value;
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

ClientService_Info5_args.prototype.write = function(output) {
  output.writeStructBegin('ClientService_Info5_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I32, 1);
    output.writeI32(this.user);
    output.writeFieldEnd();
  }
  if (this.password !== null && this.password !== undefined) {
    output.writeFieldBegin('password', Thrift.Type.STRING, 2);
    output.writeString(this.password);
    output.writeFieldEnd();
  }
  if (this.clientVersion !== null && this.clientVersion !== undefined) {
    output.writeFieldBegin('clientVersion', Thrift.Type.STRING, 3);
    output.writeString(this.clientVersion);
    output.writeFieldEnd();
  }
  if (this.langID !== null && this.langID !== undefined) {
    output.writeFieldBegin('langID', Thrift.Type.STRING, 4);
    output.writeString(this.langID);
    output.writeFieldEnd();
  }
  if (this.OS !== null && this.OS !== undefined) {
    output.writeFieldBegin('OS', Thrift.Type.STRING, 5);
    output.writeString(this.OS);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_Info5_result = function(args) {
  this.success = null;
  this.ge = null;
  if (args instanceof GenericException2) {
    this.ge = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new Info(args.success);
    }
    if (args.ge !== undefined && args.ge !== null) {
      this.ge = args.ge;
    }
  }
};
ClientService_Info5_result.prototype = {};
ClientService_Info5_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new Info();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ge = new GenericException2();
        this.ge.read(input);
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

ClientService_Info5_result.prototype.write = function(output) {
  output.writeStructBegin('ClientService_Info5_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.ge !== null && this.ge !== undefined) {
    output.writeFieldBegin('ge', Thrift.Type.STRUCT, 1);
    this.ge.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_Info6_args = function(args) {
  this.user = null;
  this.password = null;
  this.clientVersion = null;
  this.langID = null;
  this.OS = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.password !== undefined && args.password !== null) {
      this.password = args.password;
    }
    if (args.clientVersion !== undefined && args.clientVersion !== null) {
      this.clientVersion = args.clientVersion;
    }
    if (args.langID !== undefined && args.langID !== null) {
      this.langID = args.langID;
    }
    if (args.OS !== undefined && args.OS !== null) {
      this.OS = args.OS;
    }
  }
};
ClientService_Info6_args.prototype = {};
ClientService_Info6_args.prototype.read = function(input) {
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
        this.password = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.clientVersion = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.langID = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.OS = input.readString().value;
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

ClientService_Info6_args.prototype.write = function(output) {
  output.writeStructBegin('ClientService_Info6_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I32, 1);
    output.writeI32(this.user);
    output.writeFieldEnd();
  }
  if (this.password !== null && this.password !== undefined) {
    output.writeFieldBegin('password', Thrift.Type.STRING, 2);
    output.writeString(this.password);
    output.writeFieldEnd();
  }
  if (this.clientVersion !== null && this.clientVersion !== undefined) {
    output.writeFieldBegin('clientVersion', Thrift.Type.STRING, 3);
    output.writeString(this.clientVersion);
    output.writeFieldEnd();
  }
  if (this.langID !== null && this.langID !== undefined) {
    output.writeFieldBegin('langID', Thrift.Type.STRING, 4);
    output.writeString(this.langID);
    output.writeFieldEnd();
  }
  if (this.OS !== null && this.OS !== undefined) {
    output.writeFieldBegin('OS', Thrift.Type.STRING, 5);
    output.writeString(this.OS);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_Info6_result = function(args) {
  this.success = null;
  this.ge = null;
  if (args instanceof GenericException2) {
    this.ge = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new Info2(args.success);
    }
    if (args.ge !== undefined && args.ge !== null) {
      this.ge = args.ge;
    }
  }
};
ClientService_Info6_result.prototype = {};
ClientService_Info6_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new Info2();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ge = new GenericException2();
        this.ge.read(input);
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

ClientService_Info6_result.prototype.write = function(output) {
  output.writeStructBegin('ClientService_Info6_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.ge !== null && this.ge !== undefined) {
    output.writeFieldBegin('ge', Thrift.Type.STRUCT, 1);
    this.ge.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_Info7_args = function(args) {
  this.user = null;
  this.password = null;
  this.clientVersion = null;
  this.langID = null;
  this.OS = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.password !== undefined && args.password !== null) {
      this.password = args.password;
    }
    if (args.clientVersion !== undefined && args.clientVersion !== null) {
      this.clientVersion = args.clientVersion;
    }
    if (args.langID !== undefined && args.langID !== null) {
      this.langID = args.langID;
    }
    if (args.OS !== undefined && args.OS !== null) {
      this.OS = args.OS;
    }
  }
};
ClientService_Info7_args.prototype = {};
ClientService_Info7_args.prototype.read = function(input) {
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
        this.password = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.clientVersion = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.langID = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.OS = input.readString().value;
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

ClientService_Info7_args.prototype.write = function(output) {
  output.writeStructBegin('ClientService_Info7_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I32, 1);
    output.writeI32(this.user);
    output.writeFieldEnd();
  }
  if (this.password !== null && this.password !== undefined) {
    output.writeFieldBegin('password', Thrift.Type.STRING, 2);
    output.writeString(this.password);
    output.writeFieldEnd();
  }
  if (this.clientVersion !== null && this.clientVersion !== undefined) {
    output.writeFieldBegin('clientVersion', Thrift.Type.STRING, 3);
    output.writeString(this.clientVersion);
    output.writeFieldEnd();
  }
  if (this.langID !== null && this.langID !== undefined) {
    output.writeFieldBegin('langID', Thrift.Type.STRING, 4);
    output.writeString(this.langID);
    output.writeFieldEnd();
  }
  if (this.OS !== null && this.OS !== undefined) {
    output.writeFieldBegin('OS', Thrift.Type.STRING, 5);
    output.writeString(this.OS);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_Info7_result = function(args) {
  this.success = null;
  this.ge = null;
  if (args instanceof GenericException2) {
    this.ge = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new Info3(args.success);
    }
    if (args.ge !== undefined && args.ge !== null) {
      this.ge = args.ge;
    }
  }
};
ClientService_Info7_result.prototype = {};
ClientService_Info7_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new Info3();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ge = new GenericException2();
        this.ge.read(input);
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

ClientService_Info7_result.prototype.write = function(output) {
  output.writeStructBegin('ClientService_Info7_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.ge !== null && this.ge !== undefined) {
    output.writeFieldBegin('ge', Thrift.Type.STRUCT, 1);
    this.ge.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_GetAccount_args = function(args) {
  this.refererCodeID = 0;
  if (args) {
    if (args.refererCodeID !== undefined && args.refererCodeID !== null) {
      this.refererCodeID = args.refererCodeID;
    }
  }
};
ClientService_GetAccount_args.prototype = {};
ClientService_GetAccount_args.prototype.read = function(input) {
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
        this.refererCodeID = input.readI32().value;
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

ClientService_GetAccount_args.prototype.write = function(output) {
  output.writeStructBegin('ClientService_GetAccount_args');
  if (this.refererCodeID !== null && this.refererCodeID !== undefined) {
    output.writeFieldBegin('refererCodeID', Thrift.Type.I32, 1);
    output.writeI32(this.refererCodeID);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_GetAccount_result = function(args) {
  this.success = null;
  this.ge = null;
  if (args instanceof GenericException) {
    this.ge = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new UserCredentials(args.success);
    }
    if (args.ge !== undefined && args.ge !== null) {
      this.ge = args.ge;
    }
  }
};
ClientService_GetAccount_result.prototype = {};
ClientService_GetAccount_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new UserCredentials();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ge = new GenericException();
        this.ge.read(input);
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

ClientService_GetAccount_result.prototype.write = function(output) {
  output.writeStructBegin('ClientService_GetAccount_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.ge !== null && this.ge !== undefined) {
    output.writeFieldBegin('ge', Thrift.Type.STRUCT, 1);
    this.ge.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_GetAccount2_args = function(args) {
  this.refererCodeID = 0;
  if (args) {
    if (args.refererCodeID !== undefined && args.refererCodeID !== null) {
      this.refererCodeID = args.refererCodeID;
    }
  }
};
ClientService_GetAccount2_args.prototype = {};
ClientService_GetAccount2_args.prototype.read = function(input) {
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
        this.refererCodeID = input.readI32().value;
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

ClientService_GetAccount2_args.prototype.write = function(output) {
  output.writeStructBegin('ClientService_GetAccount2_args');
  if (this.refererCodeID !== null && this.refererCodeID !== undefined) {
    output.writeFieldBegin('refererCodeID', Thrift.Type.I32, 1);
    output.writeI32(this.refererCodeID);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_GetAccount2_result = function(args) {
  this.success = null;
  this.ge = null;
  if (args instanceof GenericException2) {
    this.ge = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new UserCredentials(args.success);
    }
    if (args.ge !== undefined && args.ge !== null) {
      this.ge = args.ge;
    }
  }
};
ClientService_GetAccount2_result.prototype = {};
ClientService_GetAccount2_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new UserCredentials();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ge = new GenericException2();
        this.ge.read(input);
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

ClientService_GetAccount2_result.prototype.write = function(output) {
  output.writeStructBegin('ClientService_GetAccount2_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  if (this.ge !== null && this.ge !== undefined) {
    output.writeFieldBegin('ge', Thrift.Type.STRUCT, 1);
    this.ge.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_Log_args = function(args) {
  this.type = null;
  this.section = null;
  this.message = null;
  this.user = 0;
  this.versions = '';
  if (args) {
    if (args.type !== undefined && args.type !== null) {
      this.type = args.type;
    }
    if (args.section !== undefined && args.section !== null) {
      this.section = args.section;
    }
    if (args.message !== undefined && args.message !== null) {
      this.message = args.message;
    }
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.versions !== undefined && args.versions !== null) {
      this.versions = args.versions;
    }
  }
};
ClientService_Log_args.prototype = {};
ClientService_Log_args.prototype.read = function(input) {
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
        this.type = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.section = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.user = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.versions = input.readString().value;
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

ClientService_Log_args.prototype.write = function(output) {
  output.writeStructBegin('ClientService_Log_args');
  if (this.type !== null && this.type !== undefined) {
    output.writeFieldBegin('type', Thrift.Type.STRING, 1);
    output.writeString(this.type);
    output.writeFieldEnd();
  }
  if (this.section !== null && this.section !== undefined) {
    output.writeFieldBegin('section', Thrift.Type.STRING, 2);
    output.writeString(this.section);
    output.writeFieldEnd();
  }
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 3);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I32, 4);
    output.writeI32(this.user);
    output.writeFieldEnd();
  }
  if (this.versions !== null && this.versions !== undefined) {
    output.writeFieldBegin('versions', Thrift.Type.STRING, 5);
    output.writeString(this.versions);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_Log_result = function(args) {
};
ClientService_Log_result.prototype = {};
ClientService_Log_result.prototype.read = function(input) {
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

ClientService_Log_result.prototype.write = function(output) {
  output.writeStructBegin('ClientService_Log_result');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_ActivatePremium_args = function(args) {
  this.Code = null;
  this.user = null;
  this.password = null;
  this.langID = null;
  if (args) {
    if (args.Code !== undefined && args.Code !== null) {
      this.Code = args.Code;
    }
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.password !== undefined && args.password !== null) {
      this.password = args.password;
    }
    if (args.langID !== undefined && args.langID !== null) {
      this.langID = args.langID;
    }
  }
};
ClientService_ActivatePremium_args.prototype = {};
ClientService_ActivatePremium_args.prototype.read = function(input) {
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
        this.Code = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.user = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.password = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.langID = input.readString().value;
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

ClientService_ActivatePremium_args.prototype.write = function(output) {
  output.writeStructBegin('ClientService_ActivatePremium_args');
  if (this.Code !== null && this.Code !== undefined) {
    output.writeFieldBegin('Code', Thrift.Type.STRING, 1);
    output.writeString(this.Code);
    output.writeFieldEnd();
  }
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I32, 2);
    output.writeI32(this.user);
    output.writeFieldEnd();
  }
  if (this.password !== null && this.password !== undefined) {
    output.writeFieldBegin('password', Thrift.Type.STRING, 3);
    output.writeString(this.password);
    output.writeFieldEnd();
  }
  if (this.langID !== null && this.langID !== undefined) {
    output.writeFieldBegin('langID', Thrift.Type.STRING, 4);
    output.writeString(this.langID);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_ActivatePremium_result = function(args) {
  this.ge = null;
  if (args instanceof GenericException2) {
    this.ge = args;
    return;
  }
  if (args) {
    if (args.ge !== undefined && args.ge !== null) {
      this.ge = args.ge;
    }
  }
};
ClientService_ActivatePremium_result.prototype = {};
ClientService_ActivatePremium_result.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.STRUCT) {
        this.ge = new GenericException2();
        this.ge.read(input);
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

ClientService_ActivatePremium_result.prototype.write = function(output) {
  output.writeStructBegin('ClientService_ActivatePremium_result');
  if (this.ge !== null && this.ge !== undefined) {
    output.writeFieldBegin('ge', Thrift.Type.STRUCT, 1);
    this.ge.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_FreeTimeSync_args = function(args) {
  this.user = null;
  this.password = null;
  this.decrement = true;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.password !== undefined && args.password !== null) {
      this.password = args.password;
    }
    if (args.decrement !== undefined && args.decrement !== null) {
      this.decrement = args.decrement;
    }
  }
};
ClientService_FreeTimeSync_args.prototype = {};
ClientService_FreeTimeSync_args.prototype.read = function(input) {
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
        this.password = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.BOOL) {
        this.decrement = input.readBool().value;
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

ClientService_FreeTimeSync_args.prototype.write = function(output) {
  output.writeStructBegin('ClientService_FreeTimeSync_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I32, 1);
    output.writeI32(this.user);
    output.writeFieldEnd();
  }
  if (this.password !== null && this.password !== undefined) {
    output.writeFieldBegin('password', Thrift.Type.STRING, 2);
    output.writeString(this.password);
    output.writeFieldEnd();
  }
  if (this.decrement !== null && this.decrement !== undefined) {
    output.writeFieldBegin('decrement', Thrift.Type.BOOL, 3);
    output.writeBool(this.decrement);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_FreeTimeSync_result = function(args) {
  this.success = null;
  this.ge = null;
  this.ape = null;
  if (args instanceof GenericException2) {
    this.ge = args;
    return;
  }
  if (args instanceof AlreadyPremiumException) {
    this.ape = args;
    return;
  }
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
    if (args.ge !== undefined && args.ge !== null) {
      this.ge = args.ge;
    }
    if (args.ape !== undefined && args.ape !== null) {
      this.ape = args.ape;
    }
  }
};
ClientService_FreeTimeSync_result.prototype = {};
ClientService_FreeTimeSync_result.prototype.read = function(input) {
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
      case 0:
      if (ftype == Thrift.Type.I32) {
        this.success = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.ge = new GenericException2();
        this.ge.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.ape = new AlreadyPremiumException();
        this.ape.read(input);
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

ClientService_FreeTimeSync_result.prototype.write = function(output) {
  output.writeStructBegin('ClientService_FreeTimeSync_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.I32, 0);
    output.writeI32(this.success);
    output.writeFieldEnd();
  }
  if (this.ge !== null && this.ge !== undefined) {
    output.writeFieldBegin('ge', Thrift.Type.STRUCT, 1);
    this.ge.write(output);
    output.writeFieldEnd();
  }
  if (this.ape !== null && this.ape !== undefined) {
    output.writeFieldBegin('ape', Thrift.Type.STRUCT, 2);
    this.ape.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_FreeUserVerification_args = function(args) {
  this.user = null;
  this.password = null;
  this.verificationID = null;
  this.verificationToken = null;
  if (args) {
    if (args.user !== undefined && args.user !== null) {
      this.user = args.user;
    }
    if (args.password !== undefined && args.password !== null) {
      this.password = args.password;
    }
    if (args.verificationID !== undefined && args.verificationID !== null) {
      this.verificationID = args.verificationID;
    }
    if (args.verificationToken !== undefined && args.verificationToken !== null) {
      this.verificationToken = args.verificationToken;
    }
  }
};
ClientService_FreeUserVerification_args.prototype = {};
ClientService_FreeUserVerification_args.prototype.read = function(input) {
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
        this.password = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.verificationID = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.verificationToken = input.readString().value;
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

ClientService_FreeUserVerification_args.prototype.write = function(output) {
  output.writeStructBegin('ClientService_FreeUserVerification_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.I32, 1);
    output.writeI32(this.user);
    output.writeFieldEnd();
  }
  if (this.password !== null && this.password !== undefined) {
    output.writeFieldBegin('password', Thrift.Type.STRING, 2);
    output.writeString(this.password);
    output.writeFieldEnd();
  }
  if (this.verificationID !== null && this.verificationID !== undefined) {
    output.writeFieldBegin('verificationID', Thrift.Type.STRING, 3);
    output.writeString(this.verificationID);
    output.writeFieldEnd();
  }
  if (this.verificationToken !== null && this.verificationToken !== undefined) {
    output.writeFieldBegin('verificationToken', Thrift.Type.STRING, 4);
    output.writeString(this.verificationToken);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientService_FreeUserVerification_result = function(args) {
  this.ge = null;
  if (args instanceof GenericException2) {
    this.ge = args;
    return;
  }
  if (args) {
    if (args.ge !== undefined && args.ge !== null) {
      this.ge = args.ge;
    }
  }
};
ClientService_FreeUserVerification_result.prototype = {};
ClientService_FreeUserVerification_result.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.STRUCT) {
        this.ge = new GenericException2();
        this.ge.read(input);
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

ClientService_FreeUserVerification_result.prototype.write = function(output) {
  output.writeStructBegin('ClientService_FreeUserVerification_result');
  if (this.ge !== null && this.ge !== undefined) {
    output.writeFieldBegin('ge', Thrift.Type.STRUCT, 1);
    this.ge.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ClientServiceClient = function(input, output) {
    this.input = input;
    this.output = (!output) ? input : output;
    this.seqid = 0;
};
ClientServiceClient.prototype = {};
ClientServiceClient.prototype.Info4 = function(user, password, clientVersion, langID, callback) {
  if (callback === undefined) {
    this.send_Info4(user, password, clientVersion, langID);
    return this.recv_Info4();
  } else {
    var postData = this.send_Info4(user, password, clientVersion, langID, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_Info4);
  }
};

ClientServiceClient.prototype.send_Info4 = function(user, password, clientVersion, langID, callback) {
  this.output.writeMessageBegin('Info4', Thrift.MessageType.CALL, this.seqid);
  var args = new ClientService_Info4_args();
  args.user = user;
  args.password = password;
  args.clientVersion = clientVersion;
  args.langID = langID;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

ClientServiceClient.prototype.recv_Info4 = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new ClientService_Info4_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ge) {
    throw result.ge;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'Info4 failed: unknown result';
};
ClientServiceClient.prototype.Info5 = function(user, password, clientVersion, langID, OS, callback) {
  if (callback === undefined) {
    this.send_Info5(user, password, clientVersion, langID, OS);
    return this.recv_Info5();
  } else {
    var postData = this.send_Info5(user, password, clientVersion, langID, OS, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_Info5);
  }
};

ClientServiceClient.prototype.send_Info5 = function(user, password, clientVersion, langID, OS, callback) {
  this.output.writeMessageBegin('Info5', Thrift.MessageType.CALL, this.seqid);
  var args = new ClientService_Info5_args();
  args.user = user;
  args.password = password;
  args.clientVersion = clientVersion;
  args.langID = langID;
  args.OS = OS;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

ClientServiceClient.prototype.recv_Info5 = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new ClientService_Info5_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ge) {
    throw result.ge;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'Info5 failed: unknown result';
};
ClientServiceClient.prototype.Info6 = function(user, password, clientVersion, langID, OS, callback) {
  if (callback === undefined) {
    this.send_Info6(user, password, clientVersion, langID, OS);
    return this.recv_Info6();
  } else {
    var postData = this.send_Info6(user, password, clientVersion, langID, OS, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_Info6);
  }
};

ClientServiceClient.prototype.send_Info6 = function(user, password, clientVersion, langID, OS, callback) {
  this.output.writeMessageBegin('Info6', Thrift.MessageType.CALL, this.seqid);
  var args = new ClientService_Info6_args();
  args.user = user;
  args.password = password;
  args.clientVersion = clientVersion;
  args.langID = langID;
  args.OS = OS;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

ClientServiceClient.prototype.recv_Info6 = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new ClientService_Info6_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ge) {
    throw result.ge;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'Info6 failed: unknown result';
};
ClientServiceClient.prototype.Info7 = function(user, password, clientVersion, langID, OS, callback) {
  if (callback === undefined) {
    this.send_Info7(user, password, clientVersion, langID, OS);
    return this.recv_Info7();
  } else {
    var postData = this.send_Info7(user, password, clientVersion, langID, OS, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_Info7);
  }
};

ClientServiceClient.prototype.send_Info7 = function(user, password, clientVersion, langID, OS, callback) {
  this.output.writeMessageBegin('Info7', Thrift.MessageType.CALL, this.seqid);
  var args = new ClientService_Info7_args();
  args.user = user;
  args.password = password;
  args.clientVersion = clientVersion;
  args.langID = langID;
  args.OS = OS;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

ClientServiceClient.prototype.recv_Info7 = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new ClientService_Info7_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ge) {
    throw result.ge;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'Info7 failed: unknown result';
};
ClientServiceClient.prototype.GetAccount = function(refererCodeID, callback) {
  if (callback === undefined) {
    this.send_GetAccount(refererCodeID);
    return this.recv_GetAccount();
  } else {
    var postData = this.send_GetAccount(refererCodeID, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_GetAccount);
  }
};

ClientServiceClient.prototype.send_GetAccount = function(refererCodeID, callback) {
  this.output.writeMessageBegin('GetAccount', Thrift.MessageType.CALL, this.seqid);
  var args = new ClientService_GetAccount_args();
  args.refererCodeID = refererCodeID;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

ClientServiceClient.prototype.recv_GetAccount = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new ClientService_GetAccount_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ge) {
    throw result.ge;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'GetAccount failed: unknown result';
};
ClientServiceClient.prototype.GetAccount2 = function(refererCodeID, callback) {
  if (callback === undefined) {
    this.send_GetAccount2(refererCodeID);
    return this.recv_GetAccount2();
  } else {
    var postData = this.send_GetAccount2(refererCodeID, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_GetAccount2);
  }
};

ClientServiceClient.prototype.send_GetAccount2 = function(refererCodeID, callback) {
  this.output.writeMessageBegin('GetAccount2', Thrift.MessageType.CALL, this.seqid);
  var args = new ClientService_GetAccount2_args();
  args.refererCodeID = refererCodeID;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

ClientServiceClient.prototype.recv_GetAccount2 = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new ClientService_GetAccount2_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ge) {
    throw result.ge;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'GetAccount2 failed: unknown result';
};
ClientServiceClient.prototype.Log = function(type, section, message, user, versions, callback) {
  if (callback === undefined) {
    this.send_Log(type, section, message, user, versions);
    this.recv_Log();
  } else {
    var postData = this.send_Log(type, section, message, user, versions, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_Log);
  }
};

ClientServiceClient.prototype.send_Log = function(type, section, message, user, versions, callback) {
  this.output.writeMessageBegin('Log', Thrift.MessageType.CALL, this.seqid);
  var args = new ClientService_Log_args();
  args.type = type;
  args.section = section;
  args.message = message;
  args.user = user;
  args.versions = versions;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

ClientServiceClient.prototype.recv_Log = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new ClientService_Log_result();
  result.read(this.input);
  this.input.readMessageEnd();

  return;
};
ClientServiceClient.prototype.ActivatePremium = function(Code, user, password, langID, callback) {
  if (callback === undefined) {
    this.send_ActivatePremium(Code, user, password, langID);
    this.recv_ActivatePremium();
  } else {
    var postData = this.send_ActivatePremium(Code, user, password, langID, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_ActivatePremium);
  }
};

ClientServiceClient.prototype.send_ActivatePremium = function(Code, user, password, langID, callback) {
  this.output.writeMessageBegin('ActivatePremium', Thrift.MessageType.CALL, this.seqid);
  var args = new ClientService_ActivatePremium_args();
  args.Code = Code;
  args.user = user;
  args.password = password;
  args.langID = langID;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

ClientServiceClient.prototype.recv_ActivatePremium = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new ClientService_ActivatePremium_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ge) {
    throw result.ge;
  }
  return;
};
ClientServiceClient.prototype.FreeTimeSync = function(user, password, decrement, callback) {
  if (callback === undefined) {
    this.send_FreeTimeSync(user, password, decrement);
    return this.recv_FreeTimeSync();
  } else {
    var postData = this.send_FreeTimeSync(user, password, decrement, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_FreeTimeSync);
  }
};

ClientServiceClient.prototype.send_FreeTimeSync = function(user, password, decrement, callback) {
  this.output.writeMessageBegin('FreeTimeSync', Thrift.MessageType.CALL, this.seqid);
  var args = new ClientService_FreeTimeSync_args();
  args.user = user;
  args.password = password;
  args.decrement = decrement;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

ClientServiceClient.prototype.recv_FreeTimeSync = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new ClientService_FreeTimeSync_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ge) {
    throw result.ge;
  }
  if (null !== result.ape) {
    throw result.ape;
  }
  if (null !== result.success) {
    return result.success;
  }
  throw 'FreeTimeSync failed: unknown result';
};
ClientServiceClient.prototype.FreeUserVerification = function(user, password, verificationID, verificationToken, callback) {
  if (callback === undefined) {
    this.send_FreeUserVerification(user, password, verificationID, verificationToken);
    this.recv_FreeUserVerification();
  } else {
    var postData = this.send_FreeUserVerification(user, password, verificationID, verificationToken, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_FreeUserVerification);
  }
};

ClientServiceClient.prototype.send_FreeUserVerification = function(user, password, verificationID, verificationToken, callback) {
  this.output.writeMessageBegin('FreeUserVerification', Thrift.MessageType.CALL, this.seqid);
  var args = new ClientService_FreeUserVerification_args();
  args.user = user;
  args.password = password;
  args.verificationID = verificationID;
  args.verificationToken = verificationToken;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
};

ClientServiceClient.prototype.recv_FreeUserVerification = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new ClientService_FreeUserVerification_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.ge) {
    throw result.ge;
  }
  return;
};
