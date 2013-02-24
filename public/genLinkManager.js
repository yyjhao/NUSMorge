var GenLinkManager = function(area, getObj){
	if(network.getId()){
		area.hide();
	}else{
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