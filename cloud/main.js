require("cloud/app.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("hello", function(request, response) {
	response.success("Hello world!");
});

AV.AvClass = {};
AV.AvClass.Map = {};
AV.AvClass.get = function(key){
	if (AV.AvClass.Map.hasOwnProperty(key)) {
		return AV.AvClass.Map[key];
	}
	return null;
};
AV.AvClass.set = function (key, obj) {
	if (key && obj)
		AV.AvClass.Map[key] = obj;
};