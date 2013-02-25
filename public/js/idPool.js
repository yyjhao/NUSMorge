/*
 * Stores all the /#id link this browser has visited
 * and the most recent one
 * used for "I forgot my link"
 */

var idPool = (function(){
	var pool = {};
	var store, last;
	try{
		store = JSON.parse(localStorage["morgeids"]) || {};
	}catch(e){
		store = {};
	}
	last = localStorage["morgelastid"];
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