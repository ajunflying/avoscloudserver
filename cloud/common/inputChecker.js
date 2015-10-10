/**
 * Created by junpinp on 15-9-17.
 */
var ServerError = require("cloud/common/serverError.js");
var ProtoData = require("cloud/protocol/protoData.js");
var Logger = require("cloud/common/logger.js");

module.exports = InputChecker;
function InputChecker(data) {
	if (!data) {
		Logger.error("inputChecker data not exist");
		return;
	}
	this.error = null;
	this.data = data;
}
/*错误返回*/
InputChecker.prototype.returnError = function (key, value, info) {
	var self = this;
	self.error = new ServerError("param error " + "[" + key + "=" + value + "]" + (info || ""), ProtoData.ProtoError.PARAMETER_ERROR + "：[" + key + "]" + (info || ""));
};
/*必选参数，且不能为空或0*/
InputChecker.prototype.requireExist = function (key) {
	var self = this;
	if(!self.data.hasOwnProperty(key)){
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_REQUIRE_EXIST);
	}
	var flag = function (value) {
		return value && value !== undefined && value !== "" && value !== "0";
	};
	if (!flag(self.data[key])) {
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_REQUIRE_EXIST);
	}
};

/*必选参数，必须是一个ObjectId 24位的字符串*/
InputChecker.prototype.requireObjectId = function (key) {
	var self = this;
	if(!self.data.hasOwnProperty(key)){
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_REQUIRE_OBJECTID);
	}
	var flag = function (value) {
		var reg = /^[0-9a-z]{24}$/i;
		return value && typeof(value) === "string" && reg.test(value);
	};
	if (!flag(self.data[key])) {
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_REQUIRE_OBJECTID);
	}
};

/*必选字符串参数*/
InputChecker.prototype.requireString = function (key) {
	var self = this;
	if(!self.data.hasOwnProperty(key)){
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_REQUIRE_STRING);
	}
	var flag = function (value) {
		return value && typeof(value) === "string";
	};
	if (!flag(self.data[key])) {
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_REQUIRE_STRING);
	}
};
/*可选字符串参数*/
InputChecker.prototype.optionalString = function (key, dv) {
	var self = this;
	var flag = function (value) {
		return typeof(value) === "string";
	};
	if (self.data.hasOwnProperty(key) && !flag(self.data[key])) {
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_OPTIONAL_STRING);
	}
	if (flag(dv)) {
		self.data[key] = dv;
	}
};

/*必选数值参数*/
InputChecker.prototype.requireNumber = function (key) {
	var self = this;
	if(!self.data.hasOwnProperty(key)){
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_REQUIRE_NUMBER);
	}
	var flag = function (value) {
		return typeof(value) === "number";
	};
	if (!flag(self.data[key])) {
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_REQUIRE_NUMBER);
	}
	self.data[key] = Number(self.data[key]);
};
/*可选数值参数*/
InputChecker.prototype.optionalNumber = function (key, dv) {
	var self = this;
	var flag = function (value) {
		return typeof(value) === "number";
	};
	if (self.data.hasOwnProperty(key) && !flag(self.data[key])) {
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_OPTIONAL_NUMBER);
	}
	if (flag(dv)) {
		self.data[key] = dv;
	}
	self.data[key] = Number(self.data[key]);
};

/*必选整数参数*/
InputChecker.prototype.requireInt = function (key) {
	var self = this;
	if (!self.data.hasOwnProperty(key)) {
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_REQUIRE_INT);
	}
	var flag = function (value) {
		var _val = parseInt(value);
		if (isNaN(value) || _val.toString() != _val) {
			return false;
		}
		return true;
	};
	if (!flag(self.data[key])) {
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_REQUIRE_INT);
	}
	self.data[key] = parseInt(self.data[key]);
};
/*可选整数参数*/
InputChecker.prototype.optionalInt = function (key, dv) {
	var self = this;
	var flag = function (value) {
		var _val = parseInt(value);
		if (isNaN(value) || _val.toString() != _val) {
			return false;
		}
		return true;
	};
	if (self.data.hasOwnProperty(key) && !flag(self.data[key])) {
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_OPTIONAL_INT);
	}
	if (flag(dv)) {
		self.data[key] = dv;
	}
	self.data[key] = parseInt(self.data[key]);
};

/*必选的数组*/
InputChecker.prototype.requireArray = function (key) {
	var self = this;
	if (!self.data.hasOwnProperty(key)) {
		return self.returnError(key, "", ProtoData.ProtoError.PARAMS_REQUIRE_ARRAY);
	}
	if (self.data[key].constructor != Array) {
		return self.returnError(key, self.data[key], ProtoData.ProtoError.PARAMS_REQUIRE_ARRAY);
	}
};

/*必选的对象，主要是JSON判断*/
InputChecker.prototype.requireJsonObject = function (key) {
	var self = this;
	if (!self.data.hasOwnProperty(key)) {
		return self.returnError(key, "", ProtoData.ProtoError.PARAMS_REQUIRE_JSON);
	}
	try {
		var _value = JSON.parse(self.data[key]);
		if (self.data[key].constructor != Object) {
			return self.returnError(key, JSON.stringify(self.data[key]), ProtoData.ProtoError.PARAMS_REQUIRE_JSON);
		}
		self.data[key] = _value;
	} catch (e) {
		return self.returnError(key, JSON.stringify(self.data[key]), ProtoData.ProtoError.PARAMS_REQUIRE_JSON);
	}
};

/*必选日期*/
InputChecker.prototype.requireDate = function (key) {
	var self = this;
	if (!self.data.hasOwnProperty(key)) {
		return self.returnError(key, "", ProtoData.ProtoError.PARAMS_REQUIRE_DATE);
	}
	if (!isNaN(self.data[key])) {
		self.data[key] = parseInt(self.data[key]);
	}
	var time = new Date(self.data[key]);
	if (time == "Invalid Date") {
		return self.returnError(key, JSON.stringify(self.data[key]), ProtoData.ProtoError.PARAMS_REQUIRE_DATE);
	}
	self.data[key] = time.getTime();
};

/*必选bool*/
InputChecker.prototype.requireBoolean = function (key) {
	var self = this;
	if (!self.data.hasOwnProperty(key)) {
		return self.returnError(key, JSON.stringify(self.data[key]), ProtoData.ProtoError.PARAMS_REQUIRE_BOOLEAN);
	}
	if ((self.data[key] != "true" || self.data[key] != "false")) {
		return self.returnError(key, JSON.stringify(self.data[key]), ProtoData.ProtoError.PARAMS_REQUIRE_BOOLEAN);
	}
	self.data[key] = self.data[key] == "true" ? true : false;
};