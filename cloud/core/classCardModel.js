/**
 * Created by junpinp on 15-9-15.
 */
var util = require("util");
var ClassBase = require("cloud/core/classBase.js");

module.exports = ClassCardModel;
function ClassCardModel() {
	ClassBase.call(this);
}
util.inherits(ClassCardModel, ClassBase);

ClassCardModel.prototype.getKey = function () {
	return "CardModel";
};

/*获取可购买的会员卡集合*/
ClassCardModel.prototype.getList = function (callback) {
	var self = this;
	var query = new AV.Query(AV.AvClass.get(self.getKey()));
	query.equalTo("state", 1);
	query.find({
		success: function (list) {
			var result = [];
			list.forEach(function (item) {
				result.push(self.avObjectToJson(item));
			});
			callback(null, result);
		},
		error: function (error) {
			callback(error);
		}
	});
};