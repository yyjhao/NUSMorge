/*
 * Time table management
 */

var TimeTable = function(div, moduleInfo){
    var view = {};

    var moduleInfo = {
        "a": {name: "eh"},
        "b": {name: "eheh"}	
    };

    view.getUserInfo = function(){
		return userInfo;
    };

    // public APIs
    var addUser = view.addUser = function(id, modules){
        if(userInfo[id])throw "WTF add the same user?";
        var info = [];
        modules.forEach(function(m){
            var obj = {};
            obj.name = moduleInfo[m].name;
            obj.timeSlot = {
                start: Math.floor(Math.random() * 5),
            day: Math.floor(Math.random() * 5),
            duration: Math.floor(Math.random() * 10),
            name: moduleInfo[m].name
            };
            obj.isHidden = false;
            info.push(obj);
        });
        userInfo[id] = {
            hidden: true,
            info: info
        };
        showUser(id);
    };

    var highlightUser = view.highlightUser = function(id){
        curUserView = id;
        switchToUserView(userInfo[id]);
    };

    var editUser = view.editUser = function(id){
        switchToUserView(userInfo[id], true);
    };

    function hideSlot(slot){
        if(slot.isHidden)return;
        slot.isHidden = true;
        removeFromAggregate(slot.timeSlot);
    }

    function showSlot(slot){
        if(!slot.isHidden)return;
        slot.isHidden = false;
        addToAggregate(slot.timeSlot);
    }

    var hideUser = view.hideUser = function(id){
        if(userInfo[id].hidden)return;
        userInfo[id].hidden = true;
        userCount--;
        userInfo[id].info.forEach(function(s){
            if(!s.isHidden){
                removeFromAggregate(s.timeSlot);
            }
        });
        updateAggregateView();
    };

    var showUser = view.showUser = function(id){
        if(!userInfo[id].hidden)return;
        userInfo[id].hidden = false;
        userCount++;
        userInfo[id].info.forEach(function(s){
            if(!s.isHidden){
                addToAggregate(s.timeSlot);
            }
        });
        updateAggregateView();
    };

    function addToAggregate(slot){
        var i = slot.day;
        for(var j = slot.start; j < slot.start + slot.duration; j++){
            aggregateInfo[i][j]++;
        }
    }

    function removeFromAggregate(slot){
        var i = slot.day;
        for(var j = slot.start; j < slot.start + slot.duration; j++){
            aggregateInfo[i][j]--;
        }
    }

    var removeUser = view.removeUser = function(id){
        if(curUserView == id){
            hideUserView();
        }
        hideUser(id);
        delete userInfo[id];
    };

    view.updateAggregateView = updateAggregateView;

    view.hideUserView = hideUserView;

    function UserTimeSlotDisplay(){
        var elm = this.elm = document.createElement("div");
        elm.className = "user";
        elm.style.display = "none";
        var toShowButton = this.toShowButton = document.createElement("div");
        toShowButton.innerHTML = "o";
        toShowButton.className = "toShowButton";
        var self = this;
        toShowButton.onclick = function(){
            $(self.elm).toggleClass("toHide");
            self.toggleShowHide();
        };
        elm.appendChild(toShowButton);
        var content = this.content = document.createElement("span");
        elm.appendChild(content);
        // hidden means not considered in aggreate, but it will still be displayed
        this.hidden = true;
        this.$elm = $(this.elm);
    }

    UserTimeSlotDisplay.prototype.setSlot = function(s, editable){
        var timeSlot = s.timeSlot;
        this.content.innerHTML = timeSlot.name;
        this.setHidden(timeSlot.isHidden, true);
        this.elm.style.width = 100 * timeSlot.duration / 2 + "%";
        if(timeSlot.start % 2)this.elm.style.left = "50%";
        else this.elm.style.left = "0";
        this.slot = s;
        if(editable){
            this.$elm.addClass("editable");
        }else{
            this.$elm.removeClass("editable");
        }
    };

    UserTimeSlotDisplay.prototype.setHidden = function(hidden, dontTell){
        this.hidden = hidden;
        if(hidden){
            $(this.toShowButton).addClass("tohide");
        }else{
            $(this.toShowButton).removeClass("tohide");
        }
        if(!dontTell){
            this.slotVisibilityChanged(hidden);
        }
    };

    UserTimeSlotDisplay.prototype.toggleShowHide = function(){
        this.setHidden(!this.hidden);
    };

    UserTimeSlotDisplay.prototype.slotVisibilityChanged = function(nowHidden){
        if(nowHidden){
            hideSlot(this.slot);
        }else{
            showSlot(this.slot);
        }
        updateAggregateView();
    };

    // id: {hidden: bool, info: [{name, timeSlot, timeSlotString, isHidden}]}
    var userInfo = {},
        userCount = 0,
        curUserView = null;

    var aggregateInfo = (function(){
        var re = [];
        for(var i = 0; i < 5; i++){
            re.push([]);
            for(var j = 0; j < 32; j++){
                re[i].push(0);
            }
        }
        return re;
    })();

    function switchToUserView(info, edit){
        if(curUserView){
            hideUserView();
        }
        info.info.forEach(function(s){
            activateSlot(s, edit);
        });
    }

    function activateSlot(s, edit){
        var timeslot = s.timeSlot;
        var display = cells[timeslot.day][timeslot.start / 2 | 0][2];
        display.setSlot(s, edit);
        display.elm.style.display = "block";
    }

    function updateAggregateView(){
        var hexcolors = ["#D9FA8F", "#C6F66F", "#FFFF40", "#FFD300", "#FF6440", "#A62000"];
        var color;

        var maxAgg = 0; 
        for (var i = 0; i < 5; i++) {
            for(var j = 0; j < 32; j++){
                maxAgg = maxAgg > aggregateInfo[i][j] ? maxAgg : aggregateInfo[i][j];
            }
        }

        for(var i = 0; i < 5; i++){
            for(var j = 0; j < 32; j++){
                if (aggregateInfo[i][j] == 0) color = "#FFFFFF";
                else color = hexcolors[Math.floor(aggregateInfo[i][j] / maxAgg * 5)];
                cells[i][j / 2 | 0][j % 2].style.background = color;
            }
        }

        window.maxa = maxAgg;
        window.a = aggregateInfo;
    }

    function hideUserView(){
        userSlotDisplays.css({
            display: "none"
        });
        curUserView = null;
    }

    // private stuff
    var cells = (function genTable(){
        var table = document.createElement("table"),
        tbody = document.createElement("tbody");
    table.className = "timetable";
    var cells = [];
    var timeHeader = document.createElement("tbody"),
        hr = document.createElement("tr"),
        timeHeaderTable = document.createElement("table");
    timeHeaderTable.className = "timeheader";
    timeHeader.appendChild(hr);
    timeHeaderTable.appendChild(timeHeader);
    table.appendChild(tbody);
    for(var i = 0; i < 17; i++){
        var hcell = document.createElement("th");
        hcell.innerHTML = (function getTimeString(hour){
            if(hour < 10)return "0" + hour + "00";
            else if(hour == 24)return "0000";
            else return hour + "00";
        })(i + 8);
        hr.appendChild(hcell);
    }

    for(var i = 0; i < 5; i++){
        cells.push([]);
        var row = document.createElement("tr");
        var dayheader = document.createElement("th");
        dayheader.innerHTML =
            [
            "M<br />O<br />N<br />",
            "T<br />U<br />E<br />",
            "W<br />E<br />D<br />",
            "T<br />H<br />U<br />",
            "F<br />R<br />I<br />"][i];
        row.appendChild(dayheader);
        for(var j = 0; j < 16; j++){
            var cell = document.createElement("td");
            cell.className = "timetable-cell";
            var innerCell1 = document.createElement("div"),
                innerCell2 = document.createElement("div"),
                innerCell3 = new UserTimeSlotDisplay();
            innerCell1.className = "aggregate-left";
            innerCell2.className = "aggregate-right";
            cell.appendChild(innerCell1);
            cell.appendChild(innerCell2);
            cell.appendChild(innerCell3.elm);
            cells[i].push([innerCell1, innerCell2, innerCell3]);
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    div.appendChild(timeHeaderTable);
    div.appendChild(table);
    return cells;
    })();

    var userSlotDisplays = $(".user");

    return view;
};

