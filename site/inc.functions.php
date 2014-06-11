<?php

	function error_message($errors, $input){
		if(count($_POST)>0){
			$message = '';
			if (count($errors[$input])>0){
				foreach($errors[$input] as $e){
					$message = $message . '<li>'.$e.'</li>';
				}
			}
			return '<ul class="error">'.$message.'</ul>';
		}
	}

	function buildmail($message) {
		$messagehead = '<html><body style="background: #ebebeb; padding: 20px">';
		$messagehead .= '<div style="margin: 0 auto; width: 240px; padding: 30px; background: #fff;">';
		$messagehead .= '<a href="http://gordonlambot.be/tfe/site" style="display: block; margin-bottom: 20px;"><img src="http://gordonlambot.be/tfe/site/img/header.png" alt="VideoLayer"></a>';
		
		$message = $messagehead . $message;
		$message .= '</div></body></html>';

		$message = stripslashes($message);

		return $message;
	}

?>