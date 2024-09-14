<?php

if(isset($_GET['data'])) {
        $dirty_data = $_GET['data'];
        //$dirty_data = $_POST['data'];

        $decodedBase64 = base64_decode($dirty_data);
        //echo "decoded base 64: " . $decodedBase64 . "<br />";

        $parameterList = explode("&",$decodedBase64);
        //var_dump($parameterList);
        //echo "<br />";
        for($i = 0; $i < count($parameterList); $i++) {
                $nameValuePair = explode(":",$parameterList[$i]);
                //echo "name: " . $nameValuePair[0] . ", value: " . $nameValuePair[1] . "<br />";
                echo $nameValuePair[0] . "," . $nameValuePair[1] . "<br />";
        }
}

?>

<html>
<head>
<!-- <script type="text/javascript" src="https://code.jquery.com/jquery-3.7.1.min.js"></script> -->
<script type="text/javascript" src="jquery-3.4.1.js"></script>
<!-- <script type="text/javascript" src="decode-helper.js"></script> -->
<script>
$(document).ready(function() {
        var formElement = document.getElementById('decodeForm');
        formElement.addEventListener("submit", (e) => {
                e.preventDefault();
                decodeMe('hello');
        });
});
</script>
</head>
<body>
<div>
<form id="decodeForm" name="decodeForm" method="POST">
<textarea id="inputString" name="inputString" type="textarea" rows="2" cols="150"></textarea><br />
<input id="decodeButton" name="decodeButton" type="submit" value="Decode">
</form>
</div>
<div>
<h2>CSV Output</h2>
<span id="decodeResult" name="decodeResult">
</span>
</body>
</html>
