<?php 

// allow our cross domain requests
header('Access-Control-Allow-Origin: *');

// format the current time
$t=time();
$ts = date("Y-m-d,H:i:s",$t);

// open the log file
$logfile = fopen("/var/www/html/silo.csv", "a") or die("Unable to open logfile!");

// collect data to log
$method = $_SERVER['REQUEST_METHOD'];
if($method == "POST") {		// check if the data was sent in a POST request	 
	$data = $_POST['data'];	
} else {	// anything other than a POST request should have a 'data' URL parameter	
	$url_params = array();
	parse_str($_SERVER['QUERY_STRING'], $url_params);
	$data = $url_params['data'];
}

// record entry, one per line
fwrite($logfile, $ts . ',' . $method . ',' . $data . PHP_EOL);
fclose($logfile);

echo "entry logged @ " . $ts;

?>
