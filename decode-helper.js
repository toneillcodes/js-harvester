function decodeMe() {
	$('#decodeResult').html("");	//	clear previous results
	var encodedData = $('#inputString').val();
	console.log('using string: ' + encodedData);
	var decodedBase64 = atob(encodedData);
	console.log("decoded base 64: " + decodedBase64);
	var parameterList = decodedBase64.split('&');
	for(i = 0; i < parameterList.length; i++) {
		var nameValuePair = parameterList[i].split(':');
		console.log("name: " + nameValuePair[0] + ", value: " + nameValuePair[1]);
		$('#decodeResult').append(nameValuePair[0] + "," + nameValuePair[1] + "<br />");
	}
}