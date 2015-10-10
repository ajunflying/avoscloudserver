/**
 * Created by junpinp on 15-9-15.
 */
var util = require("util");
var ClassBase = require("cloud/core/classBase.js");

module.exports = ClassCard;
function ClassCard() {
	ClassBase.call(this);
}
util.inherits(ClassCard, ClassBase);

ClassCard.prototype.getKey = function () {
	return "Card";
};