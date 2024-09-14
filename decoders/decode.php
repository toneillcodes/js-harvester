<?php

if(isset($_GET['data'])) {
        $dirty_data = $_GET['data'];
} else if(isset($_POST['inputString'])) {
        $dirty_data = $_POST['inputString'];
}

if(isset($dirty_data)) {
        $decodedBase64 = base64_decode($dirty_data);
        //echo "DEBUG decoded base 64: " . $decodedBase64 . "<br />";

        $parameterList = explode("&",$decodedBase64);
        for($i = 0; $i < count($parameterList); $i++) {
                $nameValuePair = explode(":",$parameterList[$i]);
                //echo "DEBUG name: " . $nameValuePair[0] . ", value: " . $nameValuePair[1] . "<br />";
                $decoded_output .= $nameValuePair[0] . "," . $nameValuePair[1] . "<br />";
        }

}

?>

<html>
<head>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
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
<?php if(isset($decoded_output)) { echo $decoded_output; } ?>
</span>
</body>
</html>
