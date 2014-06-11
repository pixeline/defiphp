<?php
	require_once('inc.functions.php');
	require_once('inc.config.php');
	require_once('inc.verifyadmin.php');
	require_once('inc.adminprocess.php');
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

		<script src="js/admin.js"></script>
	</head>
	<body class="admin">
		<div id="adminpanel">
			<h1>Feedback results</h1>
			<ul>
				<li>
					<h2>Design</h2>
					<div id="design" class="bar" <?php echo $styles[0] ?>></div>
					<p class="barp"><?php echo $results[0] ?></p>
				</li>
				<li>
					<h2>Usability</h2>
					<div id="usability" class="bar" <?php echo $styles[1] ?>></div>
					<p class="barp"><?php echo $results[1] ?></p>
				</li>
				<li>
					<h2>Content</h2>
					<div id="content" class="bar" <?php echo $styles[2] ?>></div>
					<p class="barp"><?php echo $results[2] ?></p>
				</li>
				<li>
					<h2>Plugin</h2>
					<div id="plugin" class="bar" <?php echo $styles[3] ?>></div>
					<p class="barp"><?php echo $results[3] ?></p>
				</li>
			</ul>
			<h1>Newsletter</h1>
			<form action="" method="post">
				<fieldset>
					<?php echo error_message($errors,'title');?>
					<?php echo error_message($errors,'message');?>
					<label for="titlemess">Title</label>
					<input type="text" name="titlemess" id="titlemess" required="required">
					<label for="message">Message</label>
					<textarea id="message" name="message" required="required"></textarea>
					<button type="submit" class="boxlink">Submit</button>
				</fieldset>
			</form>
		</div>
	</body>
</html>