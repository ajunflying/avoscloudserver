/**
 * Created by junpinp on 15-9-16.
 */
var fs = require("fs");

module.exports = function(params, res){
	var str_core = fs.readFileSync("cloud/common/template_core.js");
	var str_entity = fs.readFileSync("cloud/common/template_entity.js");

	var coreFileName = "cloud/core/class" + params.name + ".js";
	var ename = params.name.substring(0, 1).toLowerCase() + params.name.substring(1, params.name.length);
	var entityFileName = "cloud/entity/" + ename + ".js";

	if (fs.existsSync(coreFileName)) {
		res.write("file already exist " + coreFileName);
		res.end();
		return;
	}
	if (fs.existsSync(entityFileName)) {
		res.write("file already exist " + entityFileName);
		res.end();
		return;
	}

	var cTime = new Date();
	cTime = (cTime.getFullYear() + "-" + (cTime.getMonth() + 1) + "-" + cTime.getDate() + " " + cTime.getHours() + ":" + cTime.getMinutes());
	str_core = str_core.toString().replace(/Template/g, params.name).replace("#time#", cTime).replace("#author#", params.author || "system");
	str_entity = str_entity.toString().replace(/Template/g, params.name).replace("#time#", cTime).replace("#author#", params.author || "system");

	fs.writeFileSync(coreFileName, str_core);
	fs.writeFileSync(entityFileName, str_entity);

	res.write("ok");
	res.end();
}