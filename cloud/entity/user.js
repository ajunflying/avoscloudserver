/**
 * Created by junpinp on 15-9-15.
 */
var async = require("async");
var util = require("util");
var ClassUser = require("cloud/core/classUser.js");

module.exports = User;
function User() {
	ClassUser.call(this);
};
util.inherits(User, ClassUser);

User.create = function (id) {
	var user = new User();
	user.initAvClass(id);
	return user;
};

/*登录注册*/
User.prototype.login = function (callback) {
	var self = this;
	async.waterfall([
		function (cb) {
			self.getUserByPhone(cb);
		},
		function (user, cb) {
			if (user) {
				return cb(null, user);
			}
			self.setAttribute("password", "QQQQQQ");
			self.save(cb);
		}
	], callback);
};