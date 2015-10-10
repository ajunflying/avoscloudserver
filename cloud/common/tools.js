/**
 * Created by junpinp on 15-9-14.
 */
var crypto = require("crypto");
var http = require("http");
var urlParse = require("url");
var ServerError = require("cloud/common/serverError.js");

module.exports = Tools;

function Tools() {}

/*http请求*/
Tools.httpRequest = function (method, url, callback, data, contentType) {
	if (!url) {
		return callback(new ServerError("url is empty!"));
	}
	if (!method) {
		return callback(new ServerError("method is empty"));
	}

	var options = urlParse.parse(url);
	options.method = method;
	options.headers = {
		"Content-Type": contentType || "application/json; charset=utf-8"
	};
	var request = http.request(options, function (response) {
		var list = [];
		var len = 0;
		response.on("data", function (chunk) {
			list.push(chunk);
			len += chunk.length;
		});
		response.on("end", function () {
			var buf = Buffer.concat(list, len);
			callback(null, buf);
		});
		response.on("error", function (error) {
			callback(error);
		});
	});
	request.write(JSON.stringify(data || {}));
	request.end();
};
/*获取map的key*/
Tools.getMapKeyBayValue = function (map, value) {
	for (var key in map) {
		if (map[key] == value) {
			return key;
		}
	}
	return "";
};
/*md5加密*/
Tools.md5 = function (str) {
	return crypto.createHash('md5').update(new Buffer(str)).digest("hex");
};

/*
 * @日期格式化
 * */
Tools.dateFormat = function (date, format) {
	date = new Date(date);
	var o = {
		"M+": date.getMonth() + 1,                 //月份
		"d+": date.getDate(),                    //日
		"h+": date.getHours(),                   //小时
		"m+": date.getMinutes(),                 //分
		"s+": date.getSeconds(),                 //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds()             //毫秒
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return format;
};

/*深复制*/
Tools.deepCopy = function (object) {
	var self = this;
	var _obj = object instanceof Array ? [] : {};
	for (var k in object) {
		if (object.hasOwnProperty(k)) {
			if (typeof(object[k]) === "object") {
				_obj[k] = typeof(object[k]) === "object" ? self.deepCopy(object[k]) : object[k];
			} else {
				_obj[k] = object[k];
			}
		}
	}
	return _obj;
};
