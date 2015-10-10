/**
 * Created by junpinp on 15-9-15.
 */
var async = require("async");
var InputChecker = require("cloud/common/inputChecker.js");
var Logger = require("cloud/common/logger.js").getLogger(__filename);
var User = require("cloud/entity/user.js");
var Tools = require("cloud/common/tools.js");

module.exports = function (data, callback) {
	var inputChecker = new InputChecker(data);
	inputChecker.requireString("phone");
	inputChecker.requireString("city");
	inputChecker.optionalString("source");
	inputChecker.optionalString("pwd");
	if (inputChecker.error) {
		return callback(inputChecker.error);
	}
	inputChecker = null;

	var user = User.create();
	user.setAttribute("username", data.phone);
	user.setAttribute("city", data.city);
	user.login(function (error, reply) {
		if (error) {
			Logger.error(error);
		}
		callback(error, reply);
	});
};