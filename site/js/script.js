window.addEventListener('load', init);

function init() {
	var sidebar = 		document.getElementById('sidebar'),
		header = 		document.getElementsByTagName('header')[0],
		typel = 		document.getElementById('radiovideo'),
		typer = 		document.getElementById('radioplaylist'),
		ptitleli = 		document.getElementById('ptitleli'),
		playlisttitle = document.getElementById('playlisttitle'),
		numvidsli = 	document.getElementById('numvidsli'),
		numvids = 		document.getElementById('numvids'),
		table = 		document.getElementById('optionstable').children[0],
		mainul = 		document.getElementById('mainul'),
		footer = 		document.getElementsByTagName('footer')[0],
		codeTag = 		document.getElementsByTagName('code')[1],
		firsttime = 	document.getElementById('firsttime'),
		close = 		document.getElementById('close'),
		newsletter =	document.getElementById('newsletter'),
		subscribe =		document.getElementById('subscribe'),
		playlist = 		'',
		ptitle =		'',
		datanum = 		[],
		repeat = 		[],
		tmbn =			[],
		defnum = 		[],
		title = 		[],
		hd = 			[],
		track = 		[],
		tracknum =		[],
		cookie;


	mainul.style.height = sidebar.offsetHeight - header.offsetHeight - footer.offsetHeight + 'px';

	window.addEventListener('resize', function() {
		mainul.style.height = sidebar.offsetHeight - header.offsetHeight - footer.offsetHeight + 'px';
	}, false);

	for(i=0;i<999;i++) {
		datanum[i] = ' data-num=&#39;'+i+'&#39;';
		repeat[i] = '';
		tmbn[i] = ' data-tmbn=&#39;<strong>thumbnail'+(i+1)+'</strong>.jpg&#39;';
		defnum[i] = '';
		title[i] = '';
		hd[i] = '';
		track[i] = '';
		tracknum[i] = 0;
	}

	if(typel.checked) {
		toVideo();
	}
	else {
		toPlaylist();
	}

	numvids.value = 1;
	getTableStructure(1);
	writeCode(1);

	subscribe.className = '';
	newsletter.type = 'button';
	newsletter.innerHTML = 'Newsletter';

	cookie = document.cookie;
	
	if(cookie.indexOf('visit') < 0) {
		firsttime.style.display = 'block';
	}

	close.onclick = function() {
		firsttime.style.display = 'none';
		document.cookie = 'firstvisit=false; expires=Thu, 18 Dec 2114 12:00:00 GMT"';
	}

	newsletter.onclick = function() {
		if(newsletter.className.indexOf('validate') > -1) {
			if(validateEmail(subscribe.value)) {
				subscribe.style.color = '#5ab81c';
				subscribe.className = '';
				var timeout = setTimeout(function() {
					subscribe.style.color = '';
					newsletter.innerHTML = 'Newsletter';
					newsletter.className = 'boxlink';
					newsletter.type = 'button';
				},500);
			}
			else {
				subscribe.style.color = 'red';
				var timeout2 = setTimeout(function() {
					subscribe.style.color = '';
				},500);
			}
		}
		else {
			newsletter.innerHTML = '✔';
			subscribe.className = 'show';
			subscribe.focus();
			var timeout3 = setTimeout(function() {
				newsletter.type = 'submit';
				newsletter.className = 'boxlink validate';
			},300);
		}
	}

	typel.onclick = function() {
		toVideo();
	}

	typer.onclick = function() {
		toPlaylist();
	}

	numvids.oninput = function() {
		getTableStructure(numvids.value);
		writeCode(numvids.value);
	}

	playlisttitle.oninput = function() {
		ptitle = ' title=&#39;'+playlisttitle.value+'&#39;'
		writeCode(numvids.value);
	}

	function validateEmail(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	} 

	function toVideo() {
		ptitleli.style.display= 'none';
		numvidsli.style.display= 'none';
		playlist = '';
		ptitle = '';
		datanum[0] = '';
		tmbn[0] = '';
		getTableStructure(1);
		writeCode(1);
	}

	function toPlaylist() {
		ptitleli.style.display= 'block';
		numvidsli.style.display= 'block';
		playlist = ' vl_playlist';
		ptitle = ' title=&#39;'+playlisttitle.value+'&#39;'
		datanum[0] = ' data-num=&#39;0&#39;';
		tmbn[0] = ' data-tmbn=&#39;<strong>thumbnail1</strong>.jpg&#39;';
		getTableStructure(numvids.value);
		writeCode(numvids.value);
	}

	function getTableStructure(num) {
		var regexp = /^([1-9][0-9]{0,2})$/;
		var regexp2 = /^([0-9][0-9]{0,1})$/;
		var test = regexp.test(num);
		if(!test) {
			if(num > 999) {
				numvids.value = 999;
			}
			else if(num < 1) {
				numvids.value = 1;
			}
			else {
				numvids.value = 1;
			}
			num = numvids.value;
		}
		string = '<tr>';
		string += '<th><h3>Title</h3><div>The title of the video</div></th>';
		string += '<th><button type="button" id="captionsbutton"></button><div>The number of caption tracks<br>Click to add one track to each video</div></th>';
		string += '<th><button type="button" id="repeatbutton"></button><div>Allow user to repeat the video<br>Click to check all the boxes</div></th>';
		string += '<th><button type="button" id="qualitybutton"></button><div>Allow user to switch for a higher definition<br>Click to check all boxes</div></th>';
		string += '<th><h3>Def</h3><div>The video that will be showed on page load</div></th>';
		string += '</tr>';
		for(i=1;i<=num;i++) {
			string += '<tr>';
			string += '<td><input type="text" class="video'+i+'" placeholder="Video '+i+'"></td>';
			string += '<td><input type="number" class="video'+i+'" min="0" max="99" value="0"></td>';
			string += '<td><input type="checkbox" class="video'+i+'" id="repcheck'+i+'"><label for="repcheck'+i+'"></label></td>';
			string += '<td><input type="checkbox" class="video'+i+'" id="quacheck'+i+'"><label for="quacheck'+i+'"></label></td>';
			if(i == 1) string += '<td><input type="radio" name="default" class="video'+i+'" id="defcheck'+i+'" checked><label for="defcheck'+i+'"></label></td>';
			else string += '<td><input type="radio" name="default" class="video'+i+'" id="defcheck'+i+'"><label for="defcheck'+i+'"></label></td>';
			string += '</tr>';
		}
		table.innerHTML = string;
		document.getElementById('captionsbutton').onclick = function() {
				for(j=0;j<num;j++) {
					var string = 'video'+(j+1),
						row = document.getElementsByClassName(string);
					row[1].value = parseFloat(row[1].value) + 1;
					track[j] += '&lt;track kind=&#39;<strong>subtitles</strong>&#39; src=&#39;<strong>cap'+(row[1].value)+'vid'+(j+1)+'</strong>.vtt&#39; srclang=&#39;<strong>en</strong>&#39;'+datanum[j]+' label=&#39;<strong>English</strong>&gt;<br>';
					tracknum[j] = tracknum[j] + 1;
				}
			writeCode(num);
		}

		document.getElementById('repeatbutton').onclick = function() {
			checkButtOnClick(repeat, 2, num);
		}

		document.getElementById('qualitybutton').onclick = function() {
			checkButtOnClick(hd, 3, num);
		}


		for(i=0;i<num;i++) {
			(function(i) {
				var string = 'video'+(i+1),
					row = document.getElementsByClassName(string),
					titleinput = row[0],
					capinput = row[1],
					repcheck = row[2],
					quacheck = row[3],
					defradio = row[4],
					capnum = capinput.value,
					test2 = regexp2.test(capnum);
	
				titleinput.value = title[i];
				capinput.value = tracknum[i];
				if(repeat[i].length > 0) {
					repcheck.checked = true;
				}
				if(hd[i].length > 0) {
					quacheck.checked = true;
					hd[i] = '&lt;source type=&#39;video/mp4&#39; src=&#39;<strong>video'+(i+1)+'-hd</strong>.mp4&#39'+datanum[i]+' data-hd=&#39;hd&#39;&gt;<br>';
					hd[i]+= '&lt;source type=&#39;video/webm&#39; src=&#39;<strong>video'+(i+1)+'-hd</strong>.webm&#39'+datanum[i]+' data-hd=&#39;hd&#39;&gt;<br>';
				}
				if(defnum[i].length > 0) {
					defradio.checked = true;
				}


				titleinput.oninput = function() {
					title[i] = this.value;
					writeCode(num);
				}
				capinput.oninput = function() {
					capnum = capinput.value;
					test2 = regexp2.test(capnum);
					if(!test2) {
						if(capnum > 99) {
							this.value = 99;
						}
						else if(num < 0) {
							this.value = 0;
						}
						else {
							this.value = 0;
						}
						capnum = this.value;
					}
					track[i] = '';
					for(j=0;j<capnum;j++) {
						track[i] += '&lt;track kind=&#39;<strong>subtitles</strong>&#39; src=&#39;<strong>cap'+(j+1)+'vid'+(i+1)+'</strong>.vtt&#39; srclang=&#39;<strong>en</strong>&#39;'+datanum[i]+' label=&#39;<strong>English</strong>&gt;<br>'
						tracknum[i] = parseFloat(capnum);
					}
					if(capnum == 0) {
						tracknum[i] = 0;
					}
					writeCode(num);
				}
				repcheck.onclick = function() {
					if(this.checked) {
						repeat[i] = ' data-rep=&#39;rep&#39;';
					}
					else {
						repeat[i] = '';
					}
					writeCode(num);
				}
				quacheck.onclick = function() {
					if(this.checked) {
						hd[i] = '&lt;source type=&#39;video/mp4&#39; src=&#39;<strong>video'+(i+1)+'-hd</strong>.mp4&#39'+datanum[i]+' data-hd=&#39;hd&#39;&gt;<br>';
						hd[i]+= '&lt;source type=&#39;video/webm&#39; src=&#39;<strong>video'+(i+1)+'-hd</strong>.webm&#39'+datanum[i]+' data-hd=&#39;hd&#39;&gt;<br>';
					}
					else {
						hd[i] = '';
					}
					writeCode(num);
				}
				defradio.onclick = function() {
					for(k=0;k<999;k++) {
						defnum[k] = '';
					}
					if(i > 0) {
						defnum[i] = ' data-def=&#39;def&#39;';
					}
					writeCode(num);
				}
			})(i);
		}
	}

	function checkButtOnClick(tab, number, num) {
		var check = true;
		for(j=0;j<num;j++) {
			if(tab[j].length == 0) check = false;
		}
		if(check == true) {
			for(k=0;k<num;k++) {
				var string = 'video'+(k+1),
					row = document.getElementsByClassName(string);
				row[number].checked = false;
				tab[k] = '';
			}
		}
		else {
			for(k=0;k<num;k++) {
				var string = 'video'+(k+1),
					row = document.getElementsByClassName(string);
				row[number].checked = true;
				if(number == 2) tab[k] = ' data-rep=&#39;rep&#39;';
				else {
					tab[k] = '&lt;source type=&#39;video/mp4&#39; src=&#39;<strong>video'+(k+1)+'-hd</strong>.mp4&#39'+datanum[k]+' data-hd=&#39;hd&#39;&gt;<br>';
					tab[k]+= '&lt;source type=&#39;video/webm&#39; src=&#39;<strong>video'+(k+1)+'-hd</strong>.webm&#39'+datanum[k]+' data-hd=&#39;hd&#39;&gt;<br>';
				}
			}
		}
		writeCode(num);
	}

	function writeCode(num) {
		var finalString = '&lt;video class=&#39;videolayer'+playlist+'&#39;'+ptitle+'&gt;<br><p class="code">';
		for(i=0;i<num;i++) {
			finalString+= '&lt;source type=&#39;video/mp4&#39; src=&#39;<strong>video'+(i+1)+'</strong>.mp4&#39;'+datanum[i]+''+tmbn[i]+''+repeat[i]+''+defnum[i]+' title=&#39;'+title[i]+'&#39;&gt;<br>';
			finalString+= '&lt;source type=&#39;video/webm&#39; src=&#39;<strong>video'+(i+1)+'</strong>.webm&#39'+datanum[i]+'&gt;<br>';
			finalString+= hd[i];
			finalString+= track[i];
		}
		finalString+= '</p>&lt;/video&gt;';
		codeTag.innerHTML = finalString;
	}



}