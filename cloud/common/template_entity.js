/**
 * Created by #author# on #time#.
 */
var util = require("util");
var ClassTemplate = require("cloud/core/classTemplate.js");

module.exports = Template;
function Template(){
	ClassTemplate.call(this);
};
util.inherits(Template, ClassTemplate);

Template.create = function(id){
	var template = new Template();
	template.initAvClass(id);
	return template;
};