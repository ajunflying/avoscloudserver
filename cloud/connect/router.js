/**
 * Created by junpinp on 15-9-4.
 */
var Write = require("cloud/connect/write.js");
var Tools = require("cloud/common/tools.js");
var ServerError = require("cloud/common/serverError.js");
var Logger = require("cloud/common/logger.js").getLogger(__filename);
var ProtoData = require("cloud/protocol/protoData.js");

module.exports = function (req, res) {
	var RootPath = "cloud/controller";
	req.setEncoding("utf8");
	var data, _proto, path;
	if (req.method === "GET") {
		data = req.query;
		_proto = ProtoData.ProtoGet;
	} else if (req.method === "POST") {
		data = req.body;
		_proto = ProtoData.ProtoPost;
	} else {
		Write(res, new ServerError(ProtoData.ProtoError.NOT_SUPPORT_REQUEST_METHOD));
	}
	if (data.hasOwnProperty('protocol')) {
		path = Tools.getMapKeyBayValue(_proto, data.protocol);
		if (path.indexOf('$') > -1) {
			path = path.split('$').join('/');
		}
	} else {
		Write(res, new ServerError(ProtoData.ProtoError.PROTOCOL_NOT_EXIST));
		return;
	}
	if (path) {
		var path = RootPath + "/" + path + ".js";
		Logger.debug(path, data);
		require(path)(data.body || {}, function (error, reply) {
			Write(res, error, reply, data.protocol);
		});
	} else {
		Write(res, new ServerError(ProtoData.ProtoError.PROTOCOL_NOT_EXIST));
	}
}