/**
 * Created by junpinp on 15-9-15.
 */
var util = require("util");
var ClassCardModel = require("cloud/core/classCardModel.js");

module.exports = CardModel;
function CardModel(){
	ClassCardModel.call(this);
};
util.inherits(CardModel, ClassCardModel);

CardModel.create = function(id){
	var cardModel = new CardModel();
	cardModel.initAvClass(id);
	return cardModel;
};