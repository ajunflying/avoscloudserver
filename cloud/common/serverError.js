/**
 * Created by junpinp on 15-9-14.
 */
module.exports = serverError;
function serverError(returnMsg, id) {
	this.returnMsg = returnMsg || "";
	this.id = id || 1;
}

serverError.prototype = new Error();
serverError.prototype.constructor = serverError;