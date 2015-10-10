/**
 * Created by junpinp on 15-9-15.
 */
var util = require("util");
var ClassBase = require("cloud/core/classBase.js");

module.exports = ClassUser;
function ClassUser() {
	ClassBase.call(this);
}
util.inherits(ClassUser, ClassBase);

ClassUser.prototype.getKey = function () {
	return "_User";
};

ClassUser.prototype.getUserByPhone = function (callback) {
	var self = this;
	var query = new AV.Query(AV.AvClass.get(self.getKey()));
	query.equalTo("username", self.attributes.username);
	query.first({
		success: function (user) {
			if (user)
				callback(null, self.avObjectToJson(user));
			else
				callback(null, null);
		},
		error: function (error) {
			callback(error)
		}
	});
};
ClassUser.prototype.getUserList = function (callback) {
	var self = this;
	var query = new AV.Query(AV.AvClass.get(self.getKey()));
	self.pagePager(query, 1, 10);
	query.find({
		success: function (list) {
			callback(null, list);
		},
		error: function (error) {
			callback(error);
		}
	});
};