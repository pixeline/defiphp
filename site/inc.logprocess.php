<?php

	session_start();

	error_reporting(E_WARNING | E_ERROR);

	if($_SESSION['logged_in'] != 'ok'){
		$link = mysql_connect('XXXXXX', 'username', 'password');
		// not connected
		if(isset($_POST) && count($_POST) > 0 ){
			$errors = array();
			
			// login form submitted
			$username = strip_tags(trim($_POST['username']));
			$password = strip_tags(trim($_POST['password']));
			
			if(empty($username)){
				$errors['username'][] = 'Please indicate your username.';
			}
			if(empty($password)){
				$errors['password'][] = 'Please indicate your password.';
			}
			if(count($errors)<1){			
				foreach($db->query('SELECT * FROM vl_admins') as $u) {
					if( $u['username'] == $username && $u['password'] == sha1($password) ){
						$_SESSION['logged_in'] = 'ok';
						// on recharge la page
						header("Location: login.php");
						exit;
					}
				}
				$errors['username'][] = 'Username or password incorrect.';
			}
		}
	} 
	else { 
		header("Location: admin.php");
	}

?>
