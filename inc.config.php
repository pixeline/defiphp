<?php

	/*** mysql hostname ***/
	$hostname = ' ';
	/*** mysql username ***/
	$username = ' ';
	/*** mysql password ***/
	$password = ' ';
	/*** mail headers   ***/
	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	/*** sub title 		***/
	$subtitle = 'Welcome, new subscriber!';
	/*** sub message	***/
	$submessage = buildmail('<p>Thanks for subscribing to the VideoLayer news,</p><p>I will keep you informed of any update done to improve your experience and the quality of the plugin.</p>');
	/*** sub validated  ***/
	$subval = '<div class="messagebox">Thanks for subscribing!</div>';
	/*** already subbed ***/
	$alrsub = '<div class="messagebox" id="alrsub">You already subscribed.</div>';
	/*** wrong email    ***/
	$wemail = '<div class="messagebox" id="wemail">Email incorrect.</div>';
	/*** thx feedback	***/
	$thxfb = '<div class="messagebox">Thanks for your feedback!</div>';
	
	try {
	    $db = new PDO("mysql:host=$hostname;dbname=gordonlablog", $username,$password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	}
	catch(PDOException $e) {
	    echo "erreur : ".$e->getMessage();
	}

?>