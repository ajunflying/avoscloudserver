/**
 * Created by junpinp on 15-7-27.
 */
var log4js = require('log4js');

log4js.configure({
	appenders: [
		{ type: 'console' }
	],
	replaceConsole: true
});

log4js.setGlobalLogLevel(log4js.levels.info);

exports.setLogLevel = function(level){
	log4js.setGlobalLogLevel(level || log4js.levels.DEBUG);
};

exports.getLogger = function(file){
	return log4js.getLogger(file || "dateFileLog");
};
