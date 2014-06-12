<?php
	require_once('inc.functions.php');
	require_once('inc.config.php');
	require_once('inc.storedata.php');
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<title>VideoLayer - The advanced video tag</title>
		
		<meta charset="utf-8">
		<meta name="author" content="Gordon Lambot">
		<meta name="viewport" content="width=device-width, initial-scale=1">

		<meta property="og:title" content="VideoLayer">
		<meta property="og:image" content="http://gordonlambot.be/tfe/site/img/facebookshare.png">
		<meta property="og:url" content="http://gordonlambot.be/tfe/site/">
		<meta property="og:description" content="Generate a player according to your needs, including playlist, quality change, repeat button and more!">

		<link rel="shortcut icon" href="img/favicon.ico">

		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="css/videolayer.css">
		<style></style>

		<script src="js/script.js"></script>
		<script src="js/colorpicker.js"></script>
		<script src='js/videolayer.min.js'></script>
	</head>
	<body>
		<?php echo $show; ?>
		<div id="firsttime">
			<div id="box">
				<h1>Welcome!</h1>
				<h2>What is VideoLayer?</h2>
				<p>VideoLayer is a HTML5 video player that adds new features to the video element such as playlist creation, repeat option, HD option and caption switch.</p>
				<h2>Why is it different?</h2>
				<p>To get the player you need, you just have to use basic HTML and/or CSS, no javascript framework here. It's much more simple.</p>
				<h2>How do I do ?</h2>
				<p>Use the sidebar to generate your HTML code and customize the player, then paste it into your page and change the sources. Easy as pie, as quick as a flash.</p>
				<p id="mobile" class="date">You need to use a desktop browser to generate code</p>
				<button id="close"></button>
			</div>
		</div>
		<aside id="sidebar">
			<header>
				<a href="index.html"><img src="img/logo.png" alt="VideoLayer - The advanced video tag"></a>
			</header>
			<form id="sideform">
				<fieldset>
					<ul id="mainul">
						<li id="type">
							<div class="left">
								<input type="radio" name="type" id="radiovideo" checked="checked">
								<label for="radiovideo">Video</label>
							</div>
							<div class="right">
								<input type="radio" name="type" id="radioplaylist">
								<label for="radioplaylist" class="right">Playlist</label>
							</div>
						</li>
						<li id="ptitleli">
							<input type="text" id="playlisttitle" placeholder="Playlist title">
						</li>
						<li id="numvidsli">
							<input type="number" id="numvids" min="1" max="999" value="1" class="right">
							<label for="numvids">Number of videos</label>
						</li>
						<li id="optionstable">
							<table>
								<tr>
									<th><h3>Title</h3><div>The title of the video</div></th>
									<th><button type="button" id="captionsbutton"></button><div>The number of caption tracks<br>Click to add one track to each video</div></th>
									<th><button type="button" id="repeatbutton"></button><div>Allow user to repeat the video<br>Click to check all the boxes</div></th>
									<th><button type="button" id="qualitybutton"></button><div>Allow user to switch for a higher definition<br>Click to check all boxes</div></th>
									<th><h3>Def</h3><div>The video that will be showed on page load</div></th>
								</tr>
								<tr>
									<td><input type="text" placeholder="Video 1"></td>
									<td><input type="number" min="0" max="99" value="0"></td>
									<td><input type="checkbox" id="repcheck1"><label for="repcheck1"></label></td>
									<td><input type="checkbox" id="quacheck1"><label for="quacheck1"></label></td>
									<td><input type="radio" name="default" id="defcheck1" checked><label for="defcheck1"></label></td>
								</tr>
							</table>
						</li>
						<li id="colors">
							<ul>
								<li>
									<canvas class="sample" id="controlsbar"></canvas>
									<label class="samplelabel" for="controlsbar">Background color</label>
								</li>
								<li>
									<canvas class="sample" id="loadingbar"></canvas>
									<label class="samplelabel" for="loadingbar">Time bar color</label>
								</li>
								<li>
									<canvas class="sample" id="controls"></canvas>
									<label class="samplelabel" for="controls">Buttons color</label>
								</li>
							</ul>
							<div id="colorpicker">
								<div id="mainwrapper" class="wrapper">
									<canvas id="rgbcanvas" unselectable="on"></canvas>
									<div id="picker" unselectable="on"></div>
								</div>
								<div id="colorwrapper" class="wrapper">
									<canvas id="colorcanvas" unselectable="on" class="barcanvas"></canvas>
									<div class="barpicker" unselectable="on"></div>
								</div>
								<div id="opacitywrapper" class="wrapper">
									<canvas id="opacitycanvas" unselectable="on" class="barcanvas"></canvas>
									<div class="barpicker" unselectable="on"></div>
								</div>
								<div id="fields" class="wrapper">
									<ul>
										<li><label for="hexcode">#</label><input type="text" id="hexcode" maxlength="6"></li>
										<li><label for="opacity">Opacity</label><input type="number" id="opacity" maxlength="3" min="0" max="100"></li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
				</fieldset>
			</form>
			<footer>
				<a href="#codesec" class="boxlink">Show code</a>
				<a href="#guide" class="boxlink">The guide</a>
			</footer>
		</aside>
		<div id="content">
			<section id="presentation">
				<div id="title">
					<h1>VideoLayer.js</h1>
					<p id="description">The advanced video tag</p>
				</div>
				<div id="social">
					<a href="http://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fgordonlambot.be%2Ftfe%2Fsite" title="Share on Facebook" id="facebook" class="boxlink">Share</a>
					<a href="http://twitter.com/share?text=VideoLayer - The advanced video tag&url=http://www.gordonlambot.be/tfe/site" title="Share on Twitter" id="twitter" class="boxlink">Tweet</a>
					<form action="" method="post" id="newsform">
						<fieldset>
							<input type="email" id="subscribe" class="show" name="email" required="required" placeholder="x@mail.com">
							<button type="submit" id="newsletter" title="Subscribe to the newsletter" class="boxlink">✔</button>
						</fieldset>
					</form>
				</div>
				<video title="Timelapses &amp; classical" class="videolayer vl_playlist">
					<source type="video/mp4" src="videos/video1.mp4" data-num="0" data-tmbn="img/thumbnail1.jpg" data-rep="rep" title='1st video'>
					<source type="video/webm" src="videos/video1.webm"  data-num="0">
					<source type="video/mp4" src="videos/video1_hd.mp4" data-num="0" data-hd="hd">
					<source type="video/webm" src="videos/video1_hd.webm" data-num="0" data-hd="hd">
					<track kind="subtitles" label="English" src="videos/captions/subtitles1_en.vtt" srclang="en" data-num="0">
					<track kind="subtitles" label="Français" src="videos/captions/subtitles1_fr.vtt" srclang="fr" data-num="0">

					<source type="video/mp4" src="videos/video2.mp4" data-num="1" data-tmbn="img/thumbnail2.jpg" data-rep="rep" title="2nd video">
					<source type="video/webm" src="videos/video2.webm" data-num="1">
					<source type="video/mp4" src="videos/video2_hd.mp4" data-num="1" data-hd="hd">
					<source type="video/webm" src="videos/video2_hd.webm" data-num="1" data-hd="hd">
					<track kind="subtitles" label="English" src="videos/captions/subtitles2_en.vtt" srclang="en" data-num="1">
					<track kind="subtitles" label="Français" src="videos/captions/subtitles2_fr.vtt" srclang="fr" data-num="1">

					<source type="video/mp4" src="videos/video3.mp4" data-num="2" data-tmbn="img/thumbnail3.jpg" data-rep="rep" title='3rd video'>
					<source type="video/webm" src="videos/video3.webm"  data-num="2">
					<source type="video/mp4" src="videos/video3_hd.mp4" data-num="2" data-hd="hd">
					<source type="video/webm" src="videos/video3_hd.webm" data-num="2" data-hd="hd">
					<track kind="subtitles" label="English" src="videos/captions/subtitles3_en.vtt" srclang="en" data-num="2">
					<track kind="subtitles" label="Français" src="videos/captions/subtitles3_fr.vtt" srclang="fr" data-num="2">
				</video>
			</section>
			<section id="codesec">
				<h1>Your code</h1>
				<h2>In the &lt;head&gt;</h2>
				<a href="VideoLayer.zip" title="Download the zip" class="boxlink">Download</a>
				<div class="codeblock">
					<code>
	    				&lt;script src=&#39;http://www.gordonlambot.be/tfe/site/js/videolayer.min.js&#39;&gt;&lt;/script&gt;<br>
						&lt;link href=&#39;http://www.gordonlambot.be/tfe/site/js/videolayer.css&#39; rel=&#39;stylesheet&#39;&gt;
					</code>
				</div>
				<h2>In the &lt;body&gt;</h2>
				<div class="codeblock">
					<code>
	    				&lt;video class=&#39;videolayer&#39;&gt;<br>
							<div class="code">
								&lt;source type=&#39;video/mp4&#39; src=&#39;<strong>video1</strong>.mp4&#39; title=&#39;1st video&#39;&gt;<br>
								>&lt;source type=&#39;video/webm&#39; src=&#39;<strong>video1</strong>.webm&#39;&gt;
							</div>
						&lt;/video&gt;
					</code>
				</div>
			</section>
			<section id="guide">
				<h1>The guide</h1>
				<div id="intro">
					<nav>
						<ol>
							<li><a href="#theplayer">The player</a></li>
							<li><a href="#playlist">Playlist</a></li>
							<li><a href="#titles">Titles</a></li>
							<li><a href="#captions">Captions</a></li>
							<li><a href="#repeat">Repeat</a></li>
							<li><a href="#highdef">High definition</a></li>
							<li><a href="#default">Default</a></li>
						</ol>
					</nav>
					<p class="presp">VideoLayer is a HTML5 video player built to be as easy and instinctive to use as possible. No javascript framework here, just HTML.</p>
					<p class="presp">You can fill the form in the side bar to get your code the fast and easy way, or learn these few steps for further use.</p>
				</div>
				<ol id="guidelist">
					<li id="theplayer">
						<h2>The player</h2>
						<p>To use the player on a <a href="http://www.w3.org/wiki/HTML/Elements/video">video element</a>, add the 'videolayer' class to the tag.</p>
						<p>Note: mp4 and webm cover all major browsers, put the mp4 source first for maximum compatibility (iPad). If you need a conversion tool, take a look at <a href="http://www.mirovideoconverter.com/">Miro Converter</a>.</p>
						<p>Note 2: VideoLayer also supports existing video tag attributes like loop, autoplay and muted.</p>
						<div class="codeblock">
							<code>
			    				&lt;<span class="bl">video</span> <strong><span class="at">class</span>=<span class="tx">&#39;videolayer&#39;</span></strong>&gt;<br>
									<div class="code">
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.mp4&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.webm&#39;</span>&gt;
									</div>
								&lt;/<span class="bl">video</span>&gt;
							</code>
						</div>
					</li>
					<li id="playlist">
						<h2>Playlist</h2>
						<p>To create a playlist, add the 'vl_playlist' class to the video tag, then add the 'data-num' attribute to each source tag for each video, the value is starting from 0 for the first video.</p>
						<div class="codeblock firstblock">
							<code>
			    				&lt;<span class="bl">video</span> <strong><span class="at">class</span>=<span class="tx">&#39;videolayer vl_playlist&#39;</span></strong>&gt;<br>
									<div class="code">
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.mp4&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span></strong>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.webm&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span></strong>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.mp4&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span></strong>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.webm&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span></strong>&gt;
									</div>
								&lt;/<span class="bl">video</span>&gt;
							</code>
						</div>
						<p>You can add thumbnails by using the 'data-tmbn' attribute on the first source of each video, and set its value to the source of your image.</p>
						<p>Note: default thumbnails are 80px wide and 45px high.</p>
						<div class="codeblock">
							<code>
			    				&lt;<span class="bl">video</span> <span class="at">class</span>=<span class="tx">&#39;videolayer vl_playlist&#39;</span>&gt;<br>
									<div class="code">
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span> <strong><span class="at">data-tmbn</span>=<span class="tx">&#39;tmbn1.jpg&#39;</span></strong>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span> <strong><span class="at">data-tmbn</span>=<span class="tx">&#39;tmbn2.jpg&#39;</span></strong>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span>&gt;
									</div>
								&lt;/<span class="bl">video</span>&gt;
							</code>
						</div>
					</li>
					<li id="titles">
						<h2>Titles</h2>
						<p>To name a video, use the title attribute on the first source tag of each video.</p>
						<p>To name a playlist, use the title attribute on the video tag.</p>
						<div class="codeblock">
							<code>
			    				&lt;<span class="bl">video</span> <span class="at">class</span>=<span class="tx">&#39;videolayer vl_playlist&#39;</span> <strong><span class="at">title</span>=<span class="tx">&#39;Playlist title&#39;</span></strong>&gt;<br>
									<div class="code">
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span> <strong><span class="at">title</span>=<span class="tx">&#39;1st video&#39;</span></strong>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span> <strong><span class="at">title</span>=<span class="tx">&#39;2nd video&#39;</span></strong>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span>&gt;
									</div>
								&lt;/<span class="bl">video</span>&gt;
							</code>
						</div>
					</li>
					<li id="captions">
						<h2>Captions</h2>
						<p>To add captions, use the <a href="http://www.w3.org/wiki/HTML/Elements/track">&lt;track&gt; element and its existing attributes</a>, the name of the track (that will appear in the captions box) is the value of the label attribute.</p>
						<p>Note: the &lt;track&gt; element may not be supported by your browser  even if you have a recent version. If not, the captions button is hidden.</p>
						<p>Note 2: Some browsers support the element but only display captions when the files are online. If you need to give it a test offline, consider using Internet Explorer 10 or higher for now. <br><span class="date">Last update: june 2014</span></p>
						<div class="codeblock firstblock">
							<code>
			    				&lt;<span class="bl">video</span> <span class="at">class</span>=<span class="tx">&#39;videolayer&#39;</span>&gt;<br>
									<div class="code">
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.mp4&#39;</span> <span class="at">title</span>=<span class="tx">&#39;1st video&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.webm&#39;</span>&gt;<br>
										<strong>&lt;<span class="bl">track</span> <span class="at">kind</span>=<span class="tx">&#39;subtitles&#39;</span> <span class="at">label</span>=<span class="tx">&#39;English&#39;</span> <span class="at">src</span>=<span class="tx">&#39;en.vtt&#39;</span>  <span class="at">srclang</span>=<span class="tx">&#39;en&#39;</span>&gt;</strong><br>
										<strong>&lt;<span class="bl">track</span> <span class="at">kind</span>=<span class="tx">&#39;subtitles&#39;</span> <span class="at">label</span>=<span class="tx">&#39;Français&#39;</span> <span class="at">src</span>=<span class="tx">&#39;fr.vtt&#39;</span>  <span class="at">srclang</span>=<span class="tx">&#39;fr&#39;</span>&gt;</strong>
									</div>
								&lt;/<span class="bl">video</span>&gt;
							</code>
						</div>
						<p>If you are creating a playlist, be sure to bind each track to the right video using 'data-num'.</p>
						<div class="codeblock">
							<code>
			    				&lt;<span class="bl">video</span> <span class="at">class</span>=<span class="tx">&#39;videolayer vl_playlist&#39;</span> <span class="at">title</span>=<span class="tx">&#39;Playlist title&#39;</span>&gt;<br>
									<div class="code">
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span> <span class="at">title</span>=<span class="tx">&#39;1st video&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span>&gt;<br>
										&lt;<span class="bl">track</span> <span class="at">kind</span>=<span class="tx">&#39;subtitles&#39;</span> <span class="at">label</span>=<span class="tx">&#39;English&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span></strong> <span class="at">src</span>=<span class="tx">&#39;en1.vtt&#39;</span>  <span class="at">srclang</span>=<span class="tx">&#39;en&#39;</span>&gt;<br>
										&lt;<span class="bl">track</span> <span class="at">kind</span>=<span class="tx">&#39;subtitles&#39;</span> <span class="at">label</span>=<span class="tx">&#39;Français&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span></strong> <span class="at">src</span>=<span class="tx">&#39;fr1.vtt&#39;</span>  <span class="at">srclang</span>=<span class="tx">&#39;fr&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span> <span class="at">title</span>=<span class="tx">&#39;2nd video&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span>&gt;<br>
										&lt;<span class="bl">track</span> <span class="at">kind</span>=<span class="tx">&#39;subtitles&#39;</span> <span class="at">label</span>=<span class="tx">&#39;English&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span></strong> <span class="at">src</span>=<span class="tx">&#39;en2.vtt&#39;</span>  <span class="at">srclang</span>=<span class="tx">&#39;en&#39;</span>&gt;<br>
										&lt;<span class="bl">track</span> <span class="at">kind</span>=<span class="tx">&#39;subtitles&#39;</span> <span class="at">label</span>=<span class="tx">&#39;Français&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span></strong> <span class="at">src</span>=<span class="tx">&#39;fr2.vtt&#39;</span>  <span class="at">srclang</span>=<span class="tx">&#39;fr&#39;</span>&gt;
									</div>
								&lt;/<span class="bl">video</span>&gt;
							</code>
						</div>
					</li>
					<li id="repeat">
						<h2>Repeat</h2>
						<p>To allow the user to repeat the video, add the 'data-rep' attribute to the first source and give it the 'rep' value.</p>
						<div class="codeblock">
							<code>
			    				&lt;<span class="bl">video</span> <span class="at">class</span>=<span class="tx">&#39;videolayer vl_playlist&#39;</span> <span class="at">title</span>=<span class="tx">&#39;Playlist title&#39;</span>&gt;<br>
			    					<div class="code">
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span> <span class="at">title</span>=<span class="tx">&#39;1st&#39;</span> <strong><span class="at">data-rep</span>=<span class="tx">&#39;rep&#39;</span></strong>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span> <span class="at">title</span>=<span class="tx">&#39;2nd&#39;</span> <strong><span class="at">data-rep</span>=<span class="tx">&#39;rep&#39;</span></strong>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span>&gt;
									</div>
								&lt;/<span class="bl">video</span>&gt;
							</code>
						</div>
					</li>
					<li id="highdef">
						<h2>High definition</h2>
						<p>To allow the user to switch to a higher definition, add the sources of the same video in hd, then add the 'data-hd' attribute and give it the  'hd' value.</p>
						<div class="codeblock firstblock">
							<code>
			    				&lt;<span class="bl">video</span> <span class="at">class</span>=<span class="tx">&#39;videolayer vl_playlist&#39;</span> <span class="at">title</span>=<span class="tx">&#39;Playlist title&#39;</span>&gt;<br>
			    					<div class="code">
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.mp4&#39;</span> <span class="at">title</span>=<span class="tx">&#39;1st&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.webm&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1_hd.mp4&#39;</span> <strong><span class="at">data-hd</span>=<span class="tx">&#39;hd&#39;</span></strong>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1_hd.webm&#39;</span> <strong><span class="at">data-hd</span>=<span class="tx">&#39;hd&#39;</span></strong>&gt;
									</div>
								&lt;/<span class="bl">video</span>&gt;
							</code>
						</div>
						<p>If you are creating a playlist, be sure to bind each new source to the right video using 'data-num'.</p>
						<div class="codeblock">
							<code>
			    				&lt;<span class="bl">video</span> <span class="at">class</span>=<span class="tx">&#39;videolayer vl_playlist&#39;</span> <span class="at">title</span>=<span class="tx">&#39;Playlist title&#39;</span>&gt;<br>
			    					<div class="code">
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span> <span class="at">title</span>=<span class="tx">&#39;1st&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1_hd.mp4&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span></strong> <span class="at">data-hd</span>=<span class="tx">&#39;hd&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1_hd.webm&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span></strong> <span class="at">data-hd</span>=<span class="tx">&#39;hd&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span> <span class="at">title</span>=<span class="tx">&#39;2nd&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2_hd.mp4&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span></strong> <span class="at">data-hd</span>=<span class="tx">&#39;hd&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2_hd.webm&#39;</span> <strong><span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span></strong> <span class="at">data-hd</span>=<span class="tx">&#39;hd&#39;</span>&gt;
									</div>
								&lt;/<span class="bl">video</span>&gt;
							</code>
						</div>
					</li>
					<li id="default">
						<h2>Default</h2>
						<p>If you want your playlist to start at the nth video, add the 'data-def' attribute to the first source of this video and give it the 'def' value.</p>
						<div class="codeblock">
							<code>
			    				&lt;<span class="bl">video</span> <span class="at">class</span>=<span class="tx">&#39;videolayer vl_playlist&#39;</span> <span class="at">title</span>=<span class="tx">&#39;Playlist title&#39;</span>&gt;<br>
			    					<div class="code">
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span> <span class="at">title</span>=<span class="tx">&#39;1st&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video1.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;0&#39;</span>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/mp4&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.mp4&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span> <span class="at">title</span>=<span class="tx">&#39;2nd&#39;</span> <strong><span class="at">data-def</span>=<span class="tx">&#39;def&#39;</span></strong>&gt;<br>
										&lt;<span class="bl">source</span> <span class="at">type</span>=<span class="tx">&#39;video/webm&#39;</span> <span class="at">src</span>=<span class="tx">&#39;video2.webm&#39;</span> <span class="at">data-num</span>=<span class="tx">&#39;1&#39;</span>&gt;
									</div>
								&lt;/<span class="bl">video</span>&gt;
							</code>
						</div>
					</li>
				</ol>
			</section>
			<section id="feedback">
				<h1>Feedback</h1>
					<form action="" method="post">
						<ol>
							<li>
								<p>How would you rate the site's design ?</p>
								<select name="design">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
							</li>
							<li>
								<p>How would you rate the site's usability ?</p>
								<select name="usability">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
							</li>
							<li>
								<p>How would you rate the site's content ?</p>
								<select name="content">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
							</li>
							<li>
								<p>How would you rate the plugin ?</p>
								<select name="plugin">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
							</li>
						</ol>
						<button type="submit" class="boxlink" id="submit">Submit</button>
					</form>
			</section>
		</div>
	</body>
</html>