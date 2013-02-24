/*
 * a few ultility functions for the win
 */

var network = (function(){
	var view = {};

	var id = location.hash.split("#").pop();

	if(id === "")id = null;

	view.genNew = function(obj, success, failure){
		$.post("/info", {
			info: obj
		}, function(re){
			if(re.error){
				failure();
			}else{
				success(re.id);
			}
		});
	};

	view.postUpdate = function(newObj, success, failure){
		jQuery.ajax({
			type: 'PUT',
			url: "/info",
			data: {
				id: id,
				info: newObj
			},
			success: function(re){
				if(re.error){
					failure();
				}else{
					success();
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