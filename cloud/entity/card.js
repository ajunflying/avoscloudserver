/**
 * Created by junpinp on 15-9-15.
 */
var util = require("util");
var ClassCard = require("cloud/core/classCard.js");

module.exports = Card;
function Card(){
	ClassCard.call(this);
};
util.inherits(Card, ClassCard);

Card.create = function(id){
	var card = new Card();
	card.initAvClass(id);
	return card;
};