/**
 * Created by #author# on #time#.
 */
var util = require("util");
var ClassBase = require("cloud/core/classBase.js");
var Logger = require("cloud/common/logger.js").getLogger(__filename);

module.exports = ClassTemplate;
function ClassTemplate() {
	ClassBase.call(this);
}
util.inherits(ClassTemplate, ClassBase);

ClassTemplate.prototype.getKey = function () {
	return "Template";
};