<?php

	session_start();

	if($_SESSION['logged_in'] != 'ok'){
		header("Location: login.php");
	}

?>