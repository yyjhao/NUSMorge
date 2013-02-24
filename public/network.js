/*
 * a few utility functions for network stuff
 * also remembers the ids
 */

var network = (function(){
	var view = {};

	var idPool = (function(){
		var pool = {};
		var store = JSON.parse(localStorage["morgeids"]) || {};
		var last = localStorage["morgelastid"];
		pool.add = function(id){
			if(store[id])return;
			store[id] = true;
			last = id;
			save();
		};
		pool.getIds = function(){
			return Object.keys(store);
		};
		pool.getLast = function(){
			return last;
		};
		function save(){
			localStorage["morgeids"] = JSON.stringify(store);
			localStorage["morgelastid"] = last;
		}
		return pool;
	})();

	view.getIdPool = function(){
		return idPool;
	};

	var id = location.hash.split("#").pop();
	idPool.add(id);

	if(id === "")id = null;

	view.getId = function(){
		return id;
	};

	view.updateId = function(){
		id = location.hash.split("#").pop();
		idPool.add(id);
	};

	view.genNew = function(obj, success, failure){
		$.post("/info", {
			info: obj
		}, function(re){
			if(re.error){
				failure();
			}else{
				success(re.id);
			}
		}, "json");
	};

	view.postUpdate = function(newObj, success, failure){
		$.ajax({
			type: 'PUT',
			url: "/info",
			data: {
				id: id,
				info: newObj
			},
			success: function(re){
				if(re.error){
					failure && failure();
				}else{
					success && success();
				}
			}
		});
	};

	view.getInfo = function(callback){
		if(!id)callback({});
		$.get("/info/" + id, function(re){
			callback(re.info);
		});
	};

	return view;
})();