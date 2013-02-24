var GenLinkManager = function(area, getObj, syncArea, sync){
	if(network.getId()){
		area.hide();
		syncArea.find("button").click(function(){
			sync();
		});
	}else{
		syncArea.hide();
		var text = area.find("input").click(function(){
			this.select();
		});
		var gotArea = area.find(".gotLink").hide();
		area.find("button").click(function(){
			network.genNew(getObj(), function(id){
				location.hash = id;
				network.updateId();
				gotArea.show();
				text.val(location);
			});
		});
	}
};