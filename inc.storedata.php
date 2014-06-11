<?php
	
	$show = '';

	if(isset($_POST) && count($_POST) == 1 ) {

		$email = $_POST['email'];

		if(filter_var($email, FILTER_VALIDATE_EMAIL)){
			
			$flag = true;

			foreach($db->query('SELECT * FROM vl_subs') as $u) {
				if($email == $u['email']) {
					$flag = false;
					$show = $alrsub;
				}
			}

		    if($flag == true) {
		    	$affected_rows = $db->exec("INSERT INTO vl_subs(email) VALUES('$email')");
		    
				mail($email, $subtitle, $submessage, $headers);

				$show = $subval;
			}
		}
		else {
			$show = $wemail;
		}
	}
	else if(isset($_POST) && count($_POST) > 1 ){

		$design = $_POST['design'];
		$usability = $_POST['usability'];
		$content = $_POST['content'];
		$plugin = $_POST['plugin'];
			
		$affected_rows = $db->exec("INSERT INTO vl_feedback(design, usability, content, plugin) VALUES('$design', '$usability', '$content', '$plugin')");
		
		$show = $thxfb;
	}
	
?>