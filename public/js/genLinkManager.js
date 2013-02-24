var GenLinkManager = function(area, getObj, syncArea, sync){
	syncArea.find("button").click(function(){
		sync();
	});
	if(network.getId()){
		area.hide();
	}else{
		syncArea.hide();
		var text = area.find("input").click(function(){
			this.select();
		});
		var gotArea = area.find(".gotLink").hide();
		area.find("button").click(function(){
			var self = this;
			network.genNew(getObj(), function(id){
				location.hash = id;
				$(self).hide();
				syncArea.show();
				network.updateId();
				gotArea.show();
				text.val(location);
			}, function(){
				alert("Failed to generate the link!\nIs your morge empty?");
			});
		});
	}
};