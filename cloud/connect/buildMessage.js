/**
 * Created by junpinp on 15-9-14.
 */
module.exports = function (error, protocol, body) {
	if (error) {
		return {
			status: 1,
			message: error.returnMsg || error.message
		}
	}
	return {
		status: 0,
		"protocol": protocol || "",
		"body": body
	}
}