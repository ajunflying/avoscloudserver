/**
 * Created by junpinp on 15-9-14.
 */
var BuildMessage = require("cloud/connect/buildMessage.js");
var Logger = require("cloud/common/logger.js").getLogger(__filename);

module.exports = function (res, error, data, protocol) {
//	if (error) {
//		Logger.error(protocol, error);
//	}
	var build = new BuildMessage(error, protocol, data);
//	Logger.debug(build);
	res.writeHead(200, {
		"Content-Type": "application/json; charset=utf-8"
	});
	res.write(JSON.stringify(build));
	res.end();
}