<?php
	require_once('inc.functions.php');
	require_once('inc.config.php');
	require_once('inc.logprocess.php');
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<title>Admin - VideoLayer</title>
		
		<meta charset="utf-8">
		<meta name="author" content="Gordon Lambot">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="shortcut icon" href="img/favicon.ico">

		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="css/hugrid.css">

		<script src="js/jquery.js"></script>
		<script src="js/hugrid.js"></script>
		<script src="js/myhugrid.js"></script>
	</head>
	<body class="admin">
		<div id="conbox">
			<h1>Login</h1>
			<form action="" method="post">
				<fieldset>
					<?php echo error_message($errors,'username');
						  echo error_message($errors,'password'); ?>
					<label for="username">Username</label>
					<input type="text" name="username" id="username" required="required">
					<label for="password">Password</label>
					<input type="password" name="password" id="password" required="required">
					<button type="submit" name="submit" class="boxlink">Submit</button>
				</fieldset>
			</form>
		</div>
	</body>
</html>