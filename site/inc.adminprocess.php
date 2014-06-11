<?php

	error_reporting(E_WARNING | E_ERROR);

	$results = array(0,0,0,0);
	$styles = array('','','','');
	$cpt = 0;
	$i = 0;

	foreach($db->query('SELECT * FROM vl_feedback') as $f) {
		$cpt++;
		$results[0] += $f['design'];
		$results[1] += $f['usability'];
		$results[2] += $f['content'];
		$results[3] += $f['plugin'];
	}

	foreach($results as $r) {
		if($cpt == 0) $cpt = 1;
		$results[$i] = round($r/$cpt,2);
		$width = $results[$i]*100;
		$styles[$i] = 'style="width:'.$width.'px"';
		$i++;
	}

	if(isset($_POST) && count($_POST) > 0){
		if(!strpos($_SERVER['HTTP_REFERER'],$_SERVER['HTTP_HOST'])) die("You shouldn't be here.");
		
		$errors = array();
		
		$title = trim($_POST['titlemess']);
		$message = trim($_POST['message']);
		
		if(empty($title)){
			$errors['title'][] = 'Please indicate a title.';
		}
		if(empty($message)){
			$errors['message'][] = 'Please indicate a message.';
		}
		if(count($errors) < 1){
			//limiter le nombre de caractères par ligne à 70
			$message = buildmail($message);
			foreach($db->query('SELECT * FROM vl_subs') as $u) {
				mail($u['email'], $title, $message, $headers);
			}
		}
	}

?>