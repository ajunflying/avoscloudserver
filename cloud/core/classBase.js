/**
 * Created by junpinp on 15-9-15.
 */
var ServerError = require("cloud/common/serverError.js");

module.exports = ClassBase;
function ClassBase() {
	this.objectId; //对象id，用于load一个对象
	this.attributes;
	this.AvObject; //对象实例化（保存查询后的值，或者作为save前的对象操作）
};

/*初始化mongodb对象和实例化*/
ClassBase.prototype.initAvClass = function (id) {
	var self = this;
	if (!AV.AvClass.get(self.getKey())) {
		AV.AvClass.set(self.getKey(), AV.Object.extend(self.getKey()));
	}
	self.AvObject = new (AV.AvClass.get(self.getKey()))();
	self.objectId = id || "";
};

/*装载对象属性*/
ClassBase.prototype.initAttributes = function (obj) {
	var self = this;
	self.attributes = self.avObjectToJson(obj);
};

/*给对象赋值*/
ClassBase.prototype.setModel = function (obj) {
	var self = this;
	for (var k in obj) {
		self.AvObject.set(k, obj[k]);
	}
	self.initAttributes(self.AvObject);
};
/*给对象赋值*/
ClassBase.prototype.setAttribute = function (key, value) {
	var self = this;
	self.AvObject.set(key, value);
	self.initAttributes(self.AvObject);
};

/*av对象转成json*/
ClassBase.prototype.avObjectToJson = function (item) {
	var self = this;
	var obj = {};
	for (var k in item.attributes) {
		if (item.get(k) && typeof(item.attributes[k]) === "object") {
			obj[k] = item.get(k).hasOwnProperty("attributes") ? self.avObjectToJson(item.get(k)) : item.get(k);
		} else {
			obj[k] = item.attributes[k];
		}
	}
	obj.objectId = item.id;
	if (item.createdAt) {
		obj.createdAt = item.createdAt.getTime();
	}
	return obj;
};

/*有对象ID获取对象*/
ClassBase.prototype.load = function (callback, include) {
	var self = this;
	if (!AV.AvClass.get(self.getKey())) {
		return callback(new ServerError("AvClass not exist!"));
	}
	if (!self.objectId) {
		return callback(new ServerError("objectId not exist!"));
	}
	var query = new AV.Query(AV.AvClass.get(self.getKey()));
	if (include && include.length > 0) {
		include.forEach(function (item) {
			query.include(item);
		});
	}
	query.get(self.objectId, {
		success: function (reply) {
			self.AvObject = reply;
			self.initAttributes(self.AvObject);
			callback(null, self.attributes);
		},
		error: function (reply, error) {
			callback(error);
		}
	});
};

/*save对象
 * @若是更改则需要先load再save
 * */
ClassBase.prototype.save = function (callback, obj) {
	var self = this;
	if (!self.AvObject) {
		return callback(new ServerError("AvObject not exist!"));
	}
	if (obj) {
		self.setModel(obj);
	}
	self.AvObject.save(null, {
		success: function (reply) {
			self.AvObject = reply;
			self.initAttributes(self.AvObject);
			callback(null, self.attributes);
		},
		error: function (reply, error) {
			callback(error);
		}
	});
};

/*删除
 * @query查询对象，存在是删除查询对象的数据
 * @否则查找this对象是否存在，存在则删除
 * @否则不做任何操作
 * */
ClassBase.prototype.destroy = function (query, callback) {
	var self = this;
	if (query) { /*删除符合查询对象的所有数据*/
		query.destroyAll({
			success: function () {
				callback(null, "success");
			},
			error: function (error) {
				callback(error);
			}
		});
	} else if (self.AvObject) {/*删除一个实例*/
		self.AvObject.destroy({
			success: function (reply) {
				callback(null, reply);
			},
			error: function (reply, error) {
				callback(error);
			}
		});
	} else {
		callback();
	}
};

/*分页*/
ClassBase.prototype.pagePager = function (query, pageIndex, pageSize) {
	if (!pageSize) {
		pageSize = 10;
	}
	query.skip((pageIndex || 0) * pageSize);
	query.limit(pageSize);
	return query;
};