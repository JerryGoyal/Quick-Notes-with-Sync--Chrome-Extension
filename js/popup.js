document.addEventListener('DOMContentLoaded', function () {
	
	function setCursor(input, selectionStart, selectionEnd) {
		var controlName=document.getElementById(input);
		if (controlName.setSelectionRange) {
			controlName.focus();
			controlName.setSelectionRange(selectionStart, selectionEnd);
		}
	}
	
	chrome.windows.getCurrent(function(w) {		
		textContent		=$(".text-content");
		footerTime		=$(".time");
		footerStatus	=$(".status");
		textContent.focus();
		chrome.storage.sync.get(["notes","lastUpdate","cursorPosition"], function (obj) {
			textContent.html((obj["notes"]));
			footerTime.html(obj["lastUpdate"]);
			footerStatus.html("Welcome..").css("color","deeppink");
			setCursor("text-content",obj["cursorPosition"],obj["cursorPosition"]);
		});
	});
	
	document.addEventListener("keydown",function (e) {
		footerStatus.html("Taking notes..").css("color","red");
	});
	
	document.addEventListener("click",function(e){
		cursorPosition = $('.text-content').prop("selectionStart");
		chrome.storage.sync.set({"cursorPosition":cursorPosition});
	});
	
	document.addEventListener("keyup", function (e) {
        var current     =new Date();
		var lastUpdate  = "Edited on "+current.getDate()+"-"+current.getMonth()+"-"+current.getFullYear()+" at "+current.getHours()+":"+current.getMinutes()+":"+current.getSeconds();
		cursorPosition = $('.text-content').prop("selectionStart");
		chrome.storage.sync.set({"notes": textContent.val(),"lastUpdate": lastUpdate, "cursorPosition":cursorPosition}, function() {
			footerStatus.html("Saved..").css("color","green");
			footerTime.html(lastUpdate);
		});
	});
});