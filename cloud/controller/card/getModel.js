/**
 * Created by junpinp on 15-9-15.
 */
var async = require("async");
var CardModel = require("cloud/entity/cardModel.js");

module.exports = function(data, callback){
	var cardModel = CardModel.create();
	cardModel.getList(function(error, reply){
		if(error){
			return callback(error);
		}
		console.log(reply);
		callback(null, reply);
	});
}