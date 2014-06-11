function VideoLayer() {
	var vl_video =			document.getElementsByClassName('videolayer'),
		vl_sources =		[],
		vl_sourcenum =		[],
		vl_default =		[],
		vl_track_def =		[],
		vl_ui =				[],
		vl_controls_over =	false,
		vl_playlist_title =	[],
		vl_buttons =		[],
		vl_num = 			0,
		vl_numstock =		vl_num,
		vl_maxnum = 		vl_video.length,
		vl_video_width =	[],
		vl_video_height =	[],
		vl_width_stock =	[],
		vl_height_stock =	[],
		vl_margin_stock = 	[[],[],[],[]],
		vl_padding_stock =	[[],[],[],[]],
		vl_position_stock =	[[],[],[],[]],
		vl_menus_height =	[],
		vl_tmbn_height =	[],
		vl_tooltip_width =	[],
		vl_tooltip_margin = [],
		vl_bar_hover =		[],
		vl_menu_ul =		[],
		vl_menu_fig =		[],
		vl_menu_h = 		[],
		vl_m_scroll_top = 	[],
		vl_flag_scroll = 	true,
		vl_scroll_position =0,
		vl_menu_t_h = 		[],
		vl_volume_height =	[],
		vl_volume_stock =	[],
		vl_volume_level_p = [],
		vl_volume_hover =	[],
		vl_volume_down = 	[],
		vl_volume_leave =	[],
		vl_video_duration = [],
		vl_time_stock = 	[],
		vl_current_time =	0,
		vl_time_reload =	0,
		vl_play_interval = 	[],
		vl_played_bar_w =	0,
		vl_load_interval =	[],
		vl_loaded_bar_w =	0,
		vl_load_index =		[],
		vl_playing_tab =	[],
		vl_old_num =		0,
		vl_wait_num =		0,
		vl_timebardown = 	[],
		vl_video_ended = 	[],
		vl_hide_timeout =	[],
		vl_playing =		false,
		vl_hd_click =		false,
		vl_target =			0,
		vl_nextvidnum =		[],
		vl_shufflelist =	[],
		vl_lang =			[];
		
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		for(i=0;i<vl_video.length;i++) {
			vl_video[i].controls = true;
		}
	}
	else {
		vl_init();
	}

	function vl_createElement(tag, classname) {
		var element = document.createElement(tag);
		if(classname != '') element.className = classname;
		return element;
	}

	function vl_setDimmensionsAndAttr(element, width, height, attr, attr_value) {
		if(attr != '') {
			element.setAttribute(attr, attr_value);
		}
		if(width != '') {
			element.style.cssFloat = window.getComputedStyle(vl_video[attr_value], '').cssFloat;
			element.style.top = window.getComputedStyle(vl_video[attr_value], '').top;
			element.style.right = window.getComputedStyle(vl_video[attr_value], '').right;
			element.style.bottom = window.getComputedStyle(vl_video[attr_value], '').bottom;
			element.style.left = window.getComputedStyle(vl_video[attr_value], '').left;
			element.style.width = window.getComputedStyle(vl_video[attr_value], '').width;
			element.style.height = window.getComputedStyle(vl_video[attr_value], '').height;
			element.style.marginTop = window.getComputedStyle(vl_video[attr_value], '').marginTop;
			element.style.marginRight = window.getComputedStyle(vl_video[attr_value], '').marginRight;
			element.style.marginBottom = window.getComputedStyle(vl_video[attr_value], '').marginBottom;
			element.style.marginLeft = window.getComputedStyle(vl_video[attr_value], '').marginLeft;
			element.style.paddingTop = window.getComputedStyle(vl_video[attr_value], '').paddingTop;
			element.style.paddingRight = window.getComputedStyle(vl_video[attr_value], '').paddingRight;
			element.style.paddingBottom = window.getComputedStyle(vl_video[attr_value], '').paddingBottom;
			element.style.paddingLeft = window.getComputedStyle(vl_video[attr_value], '').paddingLeft;

			vl_width_stock[attr_value] = element.style.width;
			vl_height_stock[attr_value] = element.style.height;
			vl_margin_stock[attr_value][0] = element.style.marginTop;
			vl_margin_stock[attr_value][1] = element.style.marginRight;
			vl_margin_stock[attr_value][2] = element.style.marginBottom;
			vl_margin_stock[attr_value][3] = element.style.marginLeft;
			vl_padding_stock[attr_value][0] = element.style.paddingTop;
			vl_padding_stock[attr_value][1] = element.style.paddingRight;
			vl_padding_stock[attr_value][2] = element.style.paddingBottom;
			vl_padding_stock[attr_value][3] = element.style.paddingLeft;
			vl_position_stock[attr_value][0] = element.style.top;
			vl_position_stock[attr_value][1] = element.style.right;
			vl_position_stock[attr_value][2] = element.style.bottom;
			vl_position_stock[attr_value][3] = element.style.left;

			if(window.getComputedStyle(vl_video[attr_value], '').position != 'static') {
				element.style.position = window.getComputedStyle(vl_video[attr_value], '').position;
			}
		}
	}

	function vl_init() {
		for(i=0;i<vl_maxnum;i++) {
			vl_ui[i] = {
			'container' : 					vl_createElement('div',    'vl_ui'),
				'presentationscreen' : 		vl_createElement('div',    'vl_presentation_screen vl_active'),
					'bigplay' :  			vl_createElement('button', 'vl_big_play vl_background'),
				'loadingscreen' : 			vl_createElement('div',    'vl_loading_screen'),
					'buffer' : 				vl_createElement('div',    'vl_buffer'),
				'titles': 					vl_createElement('div',    'vl_title vl_background'),
					"videotitle" : 			vl_createElement('h1',     'vl_videotitle'),
					"playlisttitle" : 		vl_createElement('h2',	   'vl_playlisttitle'),
						"vidnum" : 			vl_createElement('span',   ''),
				'menus' :  					vl_createElement('div',    'vl_menus'),
					'playlistmenu' : 		vl_createElement('div',    'vl_playlist_menu'),
						'playlisttmbn' : 	vl_createElement('div',    'vl_playlist_thumbnails vl_background'),
							'pul' : 		vl_createElement('ul',     ''),
						'playlistbttns' : 	vl_createElement('div',    'vl_playlist_buttons'),
							'pshuffle' : 	vl_createElement('button', 'vl_playlist_shuffle vl_background'),
							'prepeat' : 	vl_createElement('button', 'vl_playlist_repeat vl_background'),
						'playlistscroll' : 	vl_createElement('div',    'vl_playlist_scroll'),
							'pscrollbar' : 	vl_createElement('div',    'vl_playlist_scrollbar vl_maincolor'),
					'captionsmenu' : 		vl_createElement('div',    'vl_captions_menu vl_background'),
						'captionslist' : 	vl_createElement('div',    'vl_captions_list vl_maincolor'),
							'cul' : 		vl_createElement('ul',     ''),
						'captionsscroll' : 	vl_createElement('div',    'vl_captions_scroll'),
							'cscrollbar' : 	vl_createElement('div',	   'vl_captions_scrollbar vl_maincolor'),
					'volumemenu' : 			vl_createElement('div',    'vl_volume_menu'),
						'volumecontrol' : 	vl_createElement('div',    'vl_volume_controller vl_background'),
							'maxvolume' : 	vl_createElement('div',    'vl_max_volume vl_maincolor'),
								'vlevel' : 	vl_createElement('div',    'vl_volume_level vl_current'),
								'vbar' : 	vl_createElement('div',    'vl_volume_bar'),
				'controls' : 				vl_createElement('div',    'vl_controls vl_background'),
					'loadingbar' : 			vl_createElement('div',    'vl_loadingbar'),
						'timetooltip' : 	vl_createElement('div',    'vl_timetooltip vl_background'),
						'loaded' : 			vl_createElement('div',    'vl_loaded vl_maincolor'),
						'played' : 			vl_createElement('div',    'vl_played vl_current'),
						'timebar' : 		vl_createElement('div',    'vl_timebar'),
					'buttons' : 			vl_createElement('div',    'vl_buttons'),
						'play': 			vl_createElement('button', 'vl_play'),
						'videotime': 		vl_createElement('p',      'vl_time'),
						'rightbuttons' : 	vl_createElement('ul',     'vl_rightbuttons'),
							'buttonsli': 	[],
							'playlist' : 	vl_createElement('button', 'vl_playlist'),
							'captions' : 	vl_createElement('button', 'vl_captions'),
							'repeat' : 		vl_createElement('button', 'vl_repeat'),
							'quality' : 	vl_createElement('button', 'vl_quality'),
							'volume' : 		vl_createElement('button', 'vl_volume vl_loud'),
							'fullscreen' : 	vl_createElement('button', 'vl_fullscreen vl_normal')
			};

			if(vl_video[i].getAttribute('preload') == "preload" || vl_video[i].getAttribute('preload') == "") {
				vl_video[i].setAttribute('preload', 'metadata');
			}
			
			vl_ui[i].container.setAttribute('tabindex', i);

			vl_setDimmensionsAndAttr(vl_ui[i].container, vl_video[i].clientWidth, vl_video[i].clientHeight, 'data-num', i);
			vl_video[i].parentNode.insertBefore(vl_ui[i].container, vl_video[i]);
			vl_ui[i].container.appendChild(vl_video[i]);

			vl_buttons = [vl_ui[i].playlist, vl_ui[i].captions, vl_ui[i].repeat, vl_ui[i].quality, vl_ui[i].volume, vl_ui[i].fullscreen];
			for(j=0;j<6;j++) {
				vl_ui[i].buttonsli[j] = vl_createElement('li', '');
				vl_ui[i].buttonsli[j].appendChild(vl_buttons[j]);
				vl_ui[i].rightbuttons.appendChild(vl_ui[i].buttonsli[j]);
			}

			vl_ui[i].playlist.setAttribute('data-content', 'Playlist');
			vl_ui[i].captions.setAttribute('data-content', 'Captions');
			vl_ui[i].repeat.setAttribute('data-content', 'Repeat (is off)');
			vl_ui[i].quality.setAttribute('data-content', 'High definition (is off)');
			vl_ui[i].fullscreen.setAttribute('data-content', 'Full screen');

			vl_ui[i].presentationscreen.appendChild(vl_ui[i].bigplay);
			vl_ui[i].loadingscreen.appendChild(vl_ui[i].buffer);
			vl_ui[i].playlisttitle.appendChild(vl_ui[i].vidnum);
			vl_ui[i].titles.appendChild(vl_ui[i].videotitle);
			vl_ui[i].titles.appendChild(vl_ui[i].playlisttitle);
			vl_ui[i].playlisttmbn.appendChild(vl_ui[i].pul);
			vl_ui[i].playlistbttns.appendChild(vl_ui[i].pshuffle);
			vl_ui[i].playlistbttns.appendChild(vl_ui[i].prepeat);
			vl_ui[i].playlistscroll.appendChild(vl_ui[i].pscrollbar);
			vl_ui[i].playlistmenu.appendChild(vl_ui[i].playlisttmbn);
			vl_ui[i].playlistmenu.appendChild(vl_ui[i].playlistbttns);
			vl_ui[i].playlistmenu.appendChild(vl_ui[i].playlistscroll);
			vl_ui[i].captionslist.appendChild(vl_ui[i].cul);
			vl_ui[i].captionsscroll.appendChild(vl_ui[i].cscrollbar);
			vl_ui[i].captionsmenu.appendChild(vl_ui[i].captionslist);
			vl_ui[i].captionsmenu.appendChild(vl_ui[i].captionsscroll);
			vl_ui[i].maxvolume.appendChild(vl_ui[i].vlevel);
			vl_ui[i].maxvolume.appendChild(vl_ui[i].vbar);
			vl_ui[i].volumecontrol.appendChild(vl_ui[i].maxvolume);
			vl_ui[i].volumemenu.appendChild(vl_ui[i].volumecontrol);
			vl_ui[i].menus.appendChild(vl_ui[i].playlistmenu);
			vl_ui[i].menus.appendChild(vl_ui[i].captionsmenu);
			vl_ui[i].menus.appendChild(vl_ui[i].volumemenu);
			vl_ui[i].loadingbar.appendChild(vl_ui[i].timetooltip);
			vl_ui[i].loadingbar.appendChild(vl_ui[i].loaded);
			vl_ui[i].loadingbar.appendChild(vl_ui[i].played);
			vl_ui[i].loadingbar.appendChild(vl_ui[i].timebar);
			vl_ui[i].buttons.appendChild(vl_ui[i].play);
			vl_ui[i].buttons.appendChild(vl_ui[i].videotime);
			vl_ui[i].buttons.appendChild(vl_ui[i].rightbuttons);
			vl_ui[i].controls.appendChild(vl_ui[i].loadingbar);
			vl_ui[i].controls.appendChild(vl_ui[i].buttons);
			vl_ui[i].container.appendChild(vl_ui[i].presentationscreen);
			vl_ui[i].container.appendChild(vl_ui[i].loadingscreen);
			vl_ui[i].container.appendChild(vl_ui[i].titles);
			vl_ui[i].container.appendChild(vl_ui[i].menus);
			vl_ui[i].container.appendChild(vl_ui[i].controls);

			vl_sources[i] = [];

			vl_getAllSources(i);
			vl_getParameters(vl_ui[i].container);
			if(vl_video[i].className.indexOf('vl_playlist') > -1) vl_video[i].className = 'videolayer vl_playlist vl_video';
			else vl_video[i].className = 'videolayer vl_video';
			vl_sourcenum[i] = [vl_default[i][0]];
			vl_ui[i].videotitle.innerHTML = vl_sources[i][vl_sourcenum[i]][vl_default[0][1]][0].title;
			vl_menu_fig[i] = [];
			vl_menu_fig[i][0] = [];
			vl_menu_fig[i][1] = [];
			vl_lang[i] = '';
			if(vl_default[i][0] > 0) vl_changeSource(vl_sources[i][vl_sourcenum[i]], i);
			else {
				vl_getIfHD(vl_sources[i][vl_sourcenum[i]], i);
				vl_setCaptions(vl_sources[i][vl_sourcenum[i]], i);
			}
			if(!isNaN(vl_video[i].duration)) {
				vl_video_duration[i] = vl_formatSeconds(vl_video[i].duration, i);
				vl_time_stock[i] = vl_video[i].duration;
			}
    		else vl_video_duration[i] = '00:00';
    		if(!isNaN(vl_video[i].currentTime)) vl_current_time = vl_formatSeconds(vl_video[i].currentTime, i);
    		else vl_currentTime = '00:00';
    		vl_ui[i].videotime.innerHTML = vl_current_time + ' / ' + vl_video_duration[i];
			vl_load_index[i] = 0;
			vl_menu_h[i] = [];
			vl_m_scroll_top[i] = [];
			vl_menu_t_h[i] = [];
			vl_menu_ul[i] = [];
			vl_menu_ul[i][0] = vl_ui[i].pul;
			vl_menu_ul[i][1] = vl_ui[i].cul;
			vl_bar_hover[i] = true;
			vl_volume_hover[i] = true;
			vl_volume_level_p[i] = 0.7;
			if(vl_video[i].muted) vl_volume_level_p[i] = 0;
			vl_video[i].volume = vl_volume_level_p[i];
			vl_timebardown[i] = false;
			vl_video_ended[i] = false;
			vl_volume_stock[i] = vl_ui[vl_num].vbar.clientHeight;
			vl_getSecParameters(i);
			vl_ui[i].menus.style.height = vl_menus_height[i] + 'px';
			if(vl_volume_level_p[i] > 0.5) vl_ui[i].volume.className = 'vl_volume vl_loud';
			else if(vl_volume_level_p[i] <= 0.5 && vl_volume_level_p[i] > 0) vl_ui[i].volume.className = 'vl_volume vl_low';
			else if(vl_volume_level_p[i] <= 0) vl_ui[i].volume.className = 'vl_volume vl_mute';
			if(vl_video[i].className.indexOf('vl_playlist') > -1) {
				vl_ui[i].vidnum.innerHTML = vl_countSources(i)[0] + '/' + vl_countSources(i)[1];
				vl_playlist_title[i] = document.createTextNode(vl_video[i].title);
				vl_ui[i].playlisttitle.insertBefore(vl_playlist_title[i], vl_ui[i].vidnum);
				vl_ui[i].playlisttitle.className = 'vl_playlisttitle vl_show';
				vl_ui[i].playlist.className = 'vl_playlist vl_show';
				vl_shufflelist[i] = [];
				for(j=0;j<vl_countSources(i)[1];j++) {
					var element,
					inner,
					tmbn,
					caption,
					bgimg,
					title;
					vl_shufflelist[i][j] = false;
					element = vl_createElement('li', '');
					if(j == vl_default[i][0]) {
						inner = vl_createElement('figure', 'vl_current');
					}
					else inner = vl_createElement('figure', '');
					inner.setAttribute('data-num', j);
					tmbn = vl_createElement('div', 'vl_thumbnail');
					caption = vl_createElement('figcaption', '');
					bgimg = vl_sources[i][j].sd[0].getAttribute('data-tmbn');
					if(bgimg != null) tmbn.style.backgroundImage = 'url("' + bgimg + '")';
					title = document.createTextNode(vl_sources[i][j].sd[0].title);
					caption.appendChild(title);
					inner.appendChild(tmbn);
					inner.appendChild(caption);
					element.appendChild(inner);
					vl_ui[i].pul.appendChild(element);
					vl_menu_fig[i][0].push(inner);
				}
			}
			vl_videoOnResize(i);
			if(vl_video[i].autoplay) vl_playMouseUp();
			else vl_ui[i].presentationscreen.className = 'vl_presentation_screen vl_active vl_show';
			if(vl_video[i].loop) vl_repeatAndQualityMouseUp(vl_ui[i].repeat);
			vl_addListeners(i);
		}
		
	}

	function vl_getAllSources(num) {
		var allElements = vl_video[num].getElementsByTagName('source'),
		allTracks = vl_video[num].getElementsByTagName('track'),
		basenum = 0,
		datanum = 0,
		datahd,
		datadefault;
		vl_default[num] = [0, 'sd'];
		vl_sources[num][basenum] = { 'sd' : [], 'hd' : [], 'tracks' : [] };
		for(var j = 0, n = allElements.length; j < n; j++) {
			vl_track_def[num] = [];
			if(allElements[j].getAttribute('data-num') != null) datanum = allElements[j].getAttribute('data-num');
			datahd = allElements[j].getAttribute('data-hd');
			datadefault = allElements[j].getAttribute('data-def');
			if(datanum == basenum) {
				if(datahd == 'hd') {
					vl_sources[num][datanum].hd.push(allElements[j]);
					if(datadefault == 'def') vl_default[num] = [datanum, 'hd'];
				}
				else {
					vl_sources[num][datanum].sd.push(allElements[j]);
					if(datadefault == 'def') vl_default[num] = [datanum, 'sd'];
				}
			}
			else {
				basenum++;
				vl_sources[num][basenum] = { 'sd' : [], 'hd' : [], 'tracks' : [] };
				if(datadefault == 'def') vl_default[num] = datanum;
				if(datahd == 'hd') {
					vl_sources[num][datanum].hd.push(allElements[j]);
					if(datadefault == 'def') vl_default[num] = [datanum, 'hd'];
				}
				else {
					vl_sources[num][datanum].sd.push(allElements[j]);
					if(datadefault == 'def') vl_default[num] = [datanum, 'sd'];
				}
			}
		}
		basenum = 0;
		var tracknum = 0;
		for(var k = 0, n = allTracks.length; k < n; k++) {
			if(allTracks[k].getAttribute('data-num') != null) datanum = allTracks[k].getAttribute('data-num');
			else datanum = 0;
			datadefault = allTracks[k].getAttribute('data-def');
			if(datanum == basenum) {
				vl_sources[num][datanum].tracks.push(allTracks[k]);
				if(datadefault == 'def') vl_track_def[num][datanum] = tracknum;
				tracknum++;
			}
			else {
				basenum++;
				tracknum = 0;
				vl_sources[num][datanum].tracks.push(allTracks[k]);
				if(datadefault == 'def') vl_track_def[num][datanum] = tracknum;
				tracknum++;
			}
		}
	}

	function vl_hasAttr(element, attr, value) {
		if(element.getAttribute(attr) == value) return true;
		else return false;
	}

	function vl_changeSource(newSrc, num) {
		var firstElement = vl_video[num].children[0],
		datanum = newSrc.sd[0].getAttribute('data-num');
		if(newSrc.sd.length > 0 || newSrc.hd.length > 0) {
			vl_getIfHD(newSrc, num);
			if(vl_hd_click) {
				for(k=0;k<newSrc.hd.length;k++) {
					vl_video[num].insertBefore(newSrc.hd[k], firstElement);
				}
			}
			else {
				for(k=0;k<newSrc.sd.length;k++) {
					vl_video[num].insertBefore(newSrc.sd[k], firstElement);
				}
			}

			vl_hd_click = false;

			vl_video[num].load();

			vl_video[num].addEventListener("canplay", (function () {
			    function handler () {
			    	vl_playNew(num);
			        vl_video[num].removeEventListener("canplay", handler, true);
			    };
			    return handler;
			}()), true);

			vl_video[num].addEventListener("progress", (function () {
			    function handler () {
			        vl_playNew(num);
			        vl_video[num].removeEventListener("progress", handler, true);
			    };
			    return handler;
			}()), true);
		
			vl_video[num].addEventListener("canplaythrough", (function () {
			    function handler () {
			        vl_setTime(num);
			        vl_video[num].removeEventListener("canplaythrough", handler, true);
			    };
			    
			    return handler;
			}()), true);


			vl_setCaptions(newSrc, num);

		}
	}

	function vl_setCaptions(newSrc, num) {
		if(newSrc.tracks.length > 0 && document.createElement('track').track) {
			var firstelement,
			title,
			datanum, 
			tab = vl_video[num].getElementsByTagName('track'),
			flag = -2;

			if(newSrc.sd[0].getAttribute('data-num') != null) datanum = newSrc.sd[0].getAttribute('data-num');
			else datanum = 0;
			
			for(k=0;k<tab.length;k++) {
				if(typeof vl_video[num].textTracks != 'undefined') {
					vl_video[num].textTracks[k].mode = 'hidden';
				}
			}

			vl_menu_fig[num][1] = [];
			while (vl_ui[num].cul.firstChild) {
			    vl_ui[num].cul.removeChild(vl_ui[num].cul.firstChild);
			}
			if(vl_ui[num].captions.className.indexOf('vl_show') < 0) vl_ui[num].captions.className += ' vl_show';
			title = document.createTextNode('None');
			firstelement = vl_createElement('li', 'vl_current');
			firstelement.setAttribute('data-num', datanum);
			firstelement.appendChild(title);
			vl_ui[num].cul.appendChild(firstelement);
			
			vl_menu_fig[num][1].push(firstelement);
			firstelement.addEventListener('mousedown', function() {vl_figureMouseDown(vl_ui[num].captionsmenu, this, num, 1);}, false);

			for(j=0;j<newSrc.tracks.length;j++) {
				var element,
				resp = Array.prototype.slice.call( tab, 0 );
				resp = resp.indexOf(vl_sources[num][datanum].tracks[j]);

				title = document.createTextNode(vl_sources[num][datanum].tracks[j].getAttribute('label'));
				if(title.textContent == vl_lang[num]) {
					flag = j;
				}
				else if(vl_lang[num] == 'None') {
					flag = -1;
				}
				if(j == vl_track_def[num][datanum]) {
					element = vl_createElement('li', 'vl_current');
					firstelement.className = '';
					if(typeof vl_video[num].textTracks != 'undefined') {
						if(typeof vl_video[num].textTracks[resp] != 'undefined') {
							vl_video[num].textTracks[resp].mode = 'showing';
						}
					}
				}
				else element = vl_createElement('li', '');
				element.setAttribute('data-num', datanum);
				element.setAttribute('data-track', j);
				element.appendChild(title);
				vl_ui[num].cul.appendChild(element);
				vl_menu_fig[num][1].push(element);
				element.addEventListener('mousedown', function() {vl_figureMouseDown(vl_ui[num].captionsmenu, this, num, 1);}, false);
			}
			if(flag > -2) {
				resp = Array.prototype.slice.call( tab, 0 );
				resp = resp.indexOf(vl_sources[num][datanum].tracks[flag]);
				if(typeof vl_video[num].textTracks != 'undefined') {
					for(k=0;k<tab.length;k++) {
						vl_video[num].textTracks[k].mode = 'hidden';
					}
					for(l=0;l<newSrc.tracks.length;l++) {
						vl_ui[num].cul.children[l].className = '';
					}
					if(resp > -1) {
						if(typeof vl_video[num].textTracks[resp] != 'undefined') {
							vl_video[num].textTracks[resp].mode = 'showing';
						}
					}
					vl_ui[num].cul.children[flag + 1].className = 'vl_current';
				}
			}
		}
		else {
			vl_menu_fig[num][1] = [];
			while (vl_ui[num].cul.firstChild) {
			    vl_ui[num].cul.removeChild(vl_ui[num].cul.firstChild);
			}
			if(typeof vl_video[num].textTracks != 'undefined') {
				for(k=0;k<tab.length;k++) {
					vl_video[num].textTracks[k].mode = 'hidden';
				}
			}
			vl_ui[num].captions.className = 'vl_captions';
		}
	}

	function vl_getIfHD(newSrc, num) {
		if(newSrc.hd.length <= 0) {
			if(vl_ui[num].quality.className.indexOf('vl_remove') < 0) vl_ui[num].quality.className += ' vl_remove';
		}
		else {
			vl_ui[num].quality.className = vl_ui[num].quality.className.replace(' vl_remove', '');
		}
		if(newSrc.sd[0].getAttribute('data-rep') == 'rep') {
			vl_ui[num].repeat.className = vl_ui[num].repeat.className.replace(' vl_remove', '');
			if(vl_ui[num].repeat.className.indexOf('vl_active') > -1) vl_video[num].loop = true;
		}
		else {
			if(vl_ui[num].repeat.className.indexOf('vl_remove') < 0) vl_ui[num].repeat.className += ' vl_remove';
			vl_video[num].loop = false;
		}
	}

	function vl_playNew(num) {
		if(vl_playing) vl_video[num].play();
	}

	function vl_setTime(num) {
		var duration;
		if(vl_video[num].readyState >= 2) vl_video[num].currentTime = vl_time_reload;
		vl_video_duration[num] = '';
		vl_video_duration[num] = vl_formatSeconds(vl_video[num].duration, num);
		vl_time_stock[num] = vl_video[num].duration;
		vl_ui[num].videotime.innerHTML = vl_current_time + ' / ' + vl_video_duration[num];
	}

	function vl_countSources(num) {
		var maxnum = 0,
		num,
		allElements = vl_video[num].getElementsByTagName('source'),
		i = 0,
		n = 0,
		datanum;
		while(i < allElements.length) {
	    	if(allElements[i].getAttribute('data-num')) {
	    		datanum = parseFloat(allElements[i].getAttribute('data-num'));
	    		if(maxnum < datanum) maxnum = datanum;
	    		if(allElements[i].getAttribute('data-def')) {
	    			if(allElements[i].getAttribute('data-def') == 'def') {
	    				num = datanum;
	    				num++;
	    			}
	    		}
	    	}
	    	i++;
		}
		maxnum++;
		if(num == 0) num++;
		return [num, maxnum];
	}

	function vl_formatSeconds(seconds, num) {
		if(isNaN(seconds)) var time = "00:00";
		else {
			var sec_num = parseInt(seconds, 10); // don't forget the second param
		    var hours   = Math.floor(sec_num / 3600);
		    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		    var seconds = sec_num - (hours * 3600) - (minutes * 60);

		    if (hours   < 10) {hours   = "0" + hours;}
		    if (minutes < 10) {minutes = "0" + minutes;}
		    if (seconds < 10) {seconds = "0" + seconds;}

		    if(typeof vl_video_duration[num] === 'undefined') {
		    	if(hours > 0) var time = hours+':'+minutes+':'+seconds;
		    	else var time = minutes+':'+seconds;
		    }
		    else {
		    	if(hours > 0 || vl_video_duration[num].length > 5) var time = hours+':'+minutes+':'+seconds;
		    	else var time = minutes+':'+seconds;
		    }
		}  
		return time; 
	}

	function vl_cumulativeOffset(element) {
	    var top = 0,
	    left = 0;
	    do {
	    	if(!document.webkitFullscreenElement || element.className.indexOf('vl_ui') < 0) {
	    		top += element.offsetTop || 0;
	        	left += element.offsetLeft || 0;
	    	}
	        element = element.offsetParent;
	    } while(element);
	    return {
	    	left: left,
	    	top: top
	    }
    };

    function vl_addListeners(i) {
    	window.addEventListener('resize', function() { vl_videoOnResize(i); }, false);
    	vl_video[i].addEventListener('play', function(e) { vl_pauseAndPlay(e,i); vl_loadVideo(i); }, false);
    	vl_video[i].addEventListener('pause', function(e) { vl_pauseAndPlay(e,i); }, false);
    	vl_video[i].addEventListener('waiting', function() { vl_waitingForData(i); }, false);
    	vl_video[i].addEventListener('ended', function() { vl_endedVideo(i, 'next'); }, false);
    	vl_ui[i].container.addEventListener('mousedown', function() {vl_getParameters(this);}, false);
    	vl_ui[i].container.addEventListener('mouseover', function() {vl_getParameters(this);vl_showUI(i);}, false);
    	vl_ui[i].container.addEventListener('mouseup', function() { vl_addKeysDown(); vl_ui[i].container.focus(); }, false);
    	vl_ui[i].container.addEventListener('mouseleave', function() {vl_hideUI(i);}, false);
		vl_ui[i].presentationscreen.addEventListener('mouseup', vl_playMouseUp, false);
		vl_ui[i].controls.addEventListener('mouseover', function() { vl_controls_over = true; }, false);
		vl_ui[i].controls.addEventListener('mouseleave', function() { vl_controls_over = false; }, false);
		vl_ui[i].timebar.addEventListener('mouseover', vl_timeBarMouseOver, false);
		vl_ui[i].timebar.addEventListener('mousemove', function(e) { vl_timeBarMouseMove(e,i);}, false);
    	vl_ui[i].timebar.addEventListener('mousedown', function(e) { vl_timeBarMouseDown(e,i);}, false);
    	vl_ui[i].timebar.addEventListener('mouseleave', vl_timeBarMouseLeave, false);
		vl_ui[i].play.addEventListener('mouseup', vl_playMouseUp, false);
		vl_ui[i].playlist.addEventListener('mouseup', function() {vl_playlistAndCaptionsMouseUp(vl_ui[i].playlist, vl_ui[i].playlistmenu, true);}, false);
		vl_ui[i].pul.addEventListener('scroll', function() {vl_matchScrollBar(vl_ui[i].pscrollbar, 0);}, false);
		for(j=0;j<vl_menu_fig[i][0].length;j++) vl_menu_fig[i][0][j].addEventListener('mousedown', function() {vl_figureMouseDown(vl_ui[i].playlistmenu, this, i, 0);}, false);
		vl_ui[i].playlistscroll.addEventListener('mousedown', function(e) {vl_scrollMouseDown(e,vl_ui[i].playlistscroll,vl_ui[i].pscrollbar,0);}, false);
		vl_ui[i].pshuffle.addEventListener('mouseup', function() {vl_repeatAndShuffleMouseUp(vl_ui[i].pshuffle);}, false);
		vl_ui[i].prepeat.addEventListener('mouseup', function() {vl_repeatAndShuffleMouseUp(vl_ui[i].prepeat);}, false);
		vl_ui[i].captions.addEventListener('mouseup', function() {vl_playlistAndCaptionsMouseUp(vl_ui[i].captions, vl_ui[i].captionsmenu, true);}, false);
		vl_ui[i].cul.addEventListener('scroll', function() {vl_matchScrollBar(vl_ui[i].cscrollbar,1);}, false);
		for(j=0;j<vl_menu_fig[i][1].length;j++) vl_menu_fig[i][1][j].addEventListener('mousedown', function() {vl_figureMouseDown(vl_ui[i].captionsmenu, this, i, 1);}, false);
		vl_ui[i].captionsscroll.addEventListener('mousedown', function(e) {vl_scrollMouseDown(e,vl_ui[i].captionsscroll,vl_ui[i].cscrollbar,1);}, false);
		vl_ui[i].repeat.addEventListener('mouseup', function() {vl_repeatAndQualityMouseUp(vl_ui[i].repeat);}, false);
		vl_ui[i].quality.addEventListener('mouseup', function() {vl_repeatAndQualityMouseUp(vl_ui[i].quality);}, false);
		vl_ui[i].volume.addEventListener('mouseover', vl_volumeMouseOver, false);
		vl_ui[i].volume.addEventListener('mouseup', vl_volumeMouseUp, false);
		vl_ui[i].volume.addEventListener('mouseleave', vl_volumeMouseLeave, false);
		vl_ui[i].volumemenu.addEventListener('mouseover', vl_volumeMenuMouseOver, false);
		vl_ui[i].volumemenu.addEventListener('mouseleave', vl_volumeMouseLeave, false);
		vl_ui[i].vbar.addEventListener('mousedown', vl_volumeBarMouseDown, false);
		vl_ui[i].fullscreen.addEventListener('mouseup', vl_fullscreenMouseUp, false);
		window.addEventListener('mouseup', vl_mouseUp, false);
    }

    function vl_pauseAndPlay(e,num) {
    	if(e.type == 'play' && vl_ui[num].play.className.indexOf('vl_playing') < 0) {
    		vl_playingVideo(num);
    	}
    	else if(e.type == 'pause' && vl_ui[num].play.className.indexOf('vl_playing') > -1)  {
    		vl_pausedVideo(num);
    	}
    }

    function vl_showUI(num) {
		vl_ui[num].container.className = vl_ui[num].container.className.replace(' vl_nocursor', '');
		if(vl_hide_timeout[num]) clearTimeout(vl_hide_timeout[num]);
		vl_ui[num].titles.className = vl_ui[num].titles.className.replace('vl_hiding', '');
		vl_ui[num].menus.className = vl_ui[num].menus.className.replace('vl_hiding', '');
		vl_ui[num].controls.className = vl_ui[num].controls.className.replace('vl_hiding', '');
    }

    function vl_hideUI(num) {
    	var hide;
    	if(vl_ui[num].playlist.className.indexOf('vl_active') < 0 && vl_ui[num].captions.className.indexOf('vl_active') < 0 
    	&& vl_video[num].paused == false && !vl_controls_over) {
    		vl_hide_timeout[num] = setTimeout(function() {
	    		vl_ui[num].titles.className += ' vl_hiding';
		    	if(vl_ui[num].menus.className.indexOf('vl_hiding') < 0) vl_ui[num].menus.className += ' vl_hiding';
		    	if(vl_ui[num].controls.className.indexOf('vl_hiding') < 0) vl_ui[num].controls.className += ' vl_hiding';
		    	if(hide) clearTimeout(hide);
		    	if(vl_ui[num].fullscreen.className.indexOf('vl_active') > -1) {
		    		hide = setTimeout(function() {
		    			if(vl_ui[vl_num].container.className.indexOf('vl_nocursor') < 0) vl_ui[vl_num].container.className += ' vl_nocursor';
		    		}, 300);
		    	}
	    	}, 2000);
    	}
    }

    function vl_waitingForData(num) {
    	if(vl_ui[num].loadingscreen.className.indexOf('vl_show') < 0  && vl_video_ended[num] == false) vl_ui[num].loadingscreen.className += ' vl_show';
    	else vl_ui[num].loadingscreen.className = 'vl_loading_screen';
    	vl_video[num].addEventListener('canplaythrough', vl_canPlay, false);
    }

    function vl_canPlay() {
    	vl_ui[vl_old_num].loadingscreen.className = 'vl_loading_screen';
    	vl_video[vl_old_num].removeEventListener('canplaythrough', vl_canPlay, false);
    }

    function vl_getParameters(element) {
		vl_num = element.getAttribute('data-num');
		vl_video_width[vl_num] = vl_video[vl_num].clientWidth;
		vl_video_height[vl_num] = vl_video[vl_num].clientHeight;
		vl_tooltip_width[vl_num] = vl_ui[vl_num].timetooltip.clientWidth;
		vl_volume_height[vl_num] = vl_ui[vl_num].vbar.clientHeight;
	}

	function vl_getSecParameters(num) {
		var margin_menu,
		margin_ul;
		margin_menu = vl_ui[num].menus.offsetTop - vl_ui[num].titles.clientHeight;
		margin_ul = vl_menu_ul[num][0].offsetTop;
		vl_ui[num].presentationscreen.style.height = vl_video_height[num] - vl_ui[num].titles.clientHeight - vl_ui[num].controls.clientHeight + 'px';
		vl_menus_height[num] = vl_video_height[num] - vl_ui[num].menus.offsetTop - vl_ui[num].controls.clientHeight - margin_menu;
		vl_tmbn_height[num] = vl_menus_height[num] - (margin_ul *2);

	}

	function vl_videoOnResize(num) {
		vl_getParameters(vl_ui[num].container);
		vl_getSecParameters(num);
		vl_ui[num].container.style.width = vl_video_width[num] + 'px';
		vl_ui[num].container.style.height = vl_video_height[num] + 'px';
		vl_ui[num].menus.style.height = vl_menus_height[num] + 'px';
		vl_ui[num].playlisttmbn.style.height = vl_tmbn_height[num] + 'px';
		vl_ui[num].playlistscroll.style.height = vl_tmbn_height[num] + 'px';
		if(vl_ui[num].playlist.className.indexOf('vl_show') > -1) vl_positionScrollBar(vl_ui[num].playlistmenu, vl_ui[num].pscrollbar, 0);
		if(!document.fullscreenElement &&    // alternative standard method
      	!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      		vl_showUI(num);
      		if(vl_ui[num].fullscreen.className.indexOf('vl_active') > -1 ) {
				vl_ui[num].fullscreen.className = 'vl_fullscreen vl_normal';
      		}
      		vl_ui[num].container.className = 'vl_ui';
      		vl_ui[num].container.style.width = vl_width_stock[num];
      		vl_ui[num].container.style.height = vl_height_stock[num];
      		vl_ui[num].container.style.marginTop = vl_margin_stock[num][0];
      		vl_ui[num].container.style.marginRight = vl_margin_stock[num][1];
      		vl_ui[num].container.style.marginBottom = vl_margin_stock[num][2];
      		vl_ui[num].container.style.marginLeft = vl_margin_stock[num][3];
      		vl_ui[num].container.style.paddingTop = vl_padding_stock[num][0];
      		vl_ui[num].container.style.paddingRight = vl_padding_stock[num][1];
      		vl_ui[num].container.style.paddingBottom = vl_padding_stock[num][2];
      		vl_ui[num].container.style.paddingLeft = vl_padding_stock[num][3];
      		vl_ui[num].container.style.top = vl_position_stock[num][0];
      		vl_ui[num].container.style.right = vl_position_stock[num][1];
      		vl_ui[num].container.style.bottom = vl_position_stock[num][2];
      		vl_ui[num].container.style.left = vl_position_stock[num][3];
			document.removeEventListener('mousemove', vl_hideOnIdle, false);

			if(vl_video_width[num] <= 500) {
				if(vl_ui[num].container.className.indexOf('vl_maxwidth500') < 0) vl_ui[num].container.className += ' vl_maxwidth500';
			
				if(vl_video_width[num] <= 400) {
					if(vl_ui[num].container.className.indexOf('vl_maxwidth400') < 0) vl_ui[num].container.className += ' vl_maxwidth400';
				}
				if(vl_video_width[num] <= 320) {
					if(vl_ui[num].container.className.indexOf('vl_maxwidth320') < 0) vl_ui[num].container.className += ' vl_maxwidth320';
				}
				if(vl_video_width[num] <= 280) {
					if(vl_ui[num].container.className.indexOf('vl_maxwidth280') < 0) vl_ui[num].container.className += ' vl_maxwidth280';
				}
				if(vl_video_width[num] <= 240) {
					if(vl_ui[num].container.className.indexOf('vl_maxwidth240') < 0) vl_ui[num].container.className += ' vl_maxwidth240';
				}
				if(vl_video_width[num] <= 200) {
					if(vl_ui[num].container.className.indexOf('vl_maxwidth200') < 0) vl_ui[num].container.className += ' vl_maxwidth200';
				}
			}
			else {
				vl_ui[num].container.className = 'vl_ui';
			}

			if(vl_video_height[num] <= 400) {
				if(vl_ui[num].container.className.indexOf('vl_maxheight400') < 0) vl_ui[num].container.className += ' vl_maxheight400';
			
				if(vl_video_width[num] <= 300) {
					if(vl_ui[num].container.className.indexOf('vl_maxheight300') < 0) vl_ui[num].container.className += ' vl_maxheight300';
				}
				if(vl_video_width[num] <= 200) {
					if(vl_ui[num].container.className.indexOf('vl_maxheight200') < 0) vl_ui[num].container.className += ' vl_maxheight200';
				}
			}
			else {
				vl_ui[num].container.className = 'vl_ui';
			}
      	}
      	else {
      		vl_ui[num].fullscreen.className = 'vl_fullscreen vl_full vl_active';
      		vl_ui[num].container.className = 'vl_ui vl_cover';
      		vl_ui[num].container.style.width = '100%';
			vl_ui[num].container.style.height = '100%';
			vl_ui[num].container.style.marginTop = '0px';
			vl_ui[num].container.style.marginRight = '0px';
			vl_ui[num].container.style.marginBottom = '0px';
			vl_ui[num].container.style.marginLeft = '0px';
			vl_ui[num].container.style.paddingTop = '0px';
			vl_ui[num].container.style.paddingRight = '0px';
			vl_ui[num].container.style.paddingBottom = '0px';
			vl_ui[num].container.style.paddingLeft = '0px';
			vl_ui[num].container.style.top = '0px';
			vl_ui[num].container.style.right = '0px';
			vl_ui[num].container.style.bottom = '0px';
			vl_ui[num].container.style.left = '0px';
			vl_hideUI(num);
			document.addEventListener('mousemove', vl_hideOnIdle, false);
      	}
      	vl_getParameters(vl_ui[num].container);
      	vl_getSecParameters(num);

      	vl_ui[num].menus.style.height = vl_menus_height[num] + 'px';
		vl_ui[num].playlisttmbn.style.height = vl_tmbn_height[num] + 'px';
		vl_ui[num].playlistscroll.style.height = vl_tmbn_height[num] + 'px';
      	vl_playlistAndCaptionsMouseUp(vl_ui[num].playlist, vl_ui[num].playlistmenu, false);
      	vl_playInterval(num);
      	vl_loadInterval(num);
	}

	function vl_hideOnIdle() {
		vl_showUI(vl_num);
		vl_hideUI(vl_num);
	}

	function vl_addKeysDown() {
		window.addEventListener('keydown', vl_uiOnKeyDown, false);
		vl_target = vl_num;
	}

	function vl_uiOnKeyDown(e) {
		var code;
		if(e.keyCode) {
			code = e.keyCode;
		} else if (e.which) {
			code = e.which;
		}
		if(code == 32) {
			if(document.activeElement.className.indexOf('vl_') > -1) {
				if (e.stopPropagation) {
					e.stopPropagation();
					e.preventDefault();
					window.addEventListener('keyup', vl_playTargetedVideo, false);
				}
				return false;
			}
		}
		if(code == 39) {
			if(document.activeElement.className.indexOf('vl_') > -1) {
				if (e.stopPropagation) {
					e.stopPropagation();
					e.preventDefault();
					vl_endedVideo(vl_target, 'next');
				}
				return false;
			}
		}
		if(code == 37) {
			if(document.activeElement.className.indexOf('vl_') > -1) {
				if (e.stopPropagation) {
					e.stopPropagation();
					e.preventDefault();
					vl_endedVideo(vl_target, 'previous');
				}
				return false;
			}
		}

	}

	function vl_playTargetedVideo() {
		vl_togglePlayPause(vl_target);
    	window.removeEventListener('keyup', vl_playTargetedVideo, false);
	}

	function vl_togglePlayPause(num) {
		if(vl_ui[num].presentationscreen.className.indexOf('vl_show') > -1) vl_ui[num].presentationscreen.className = 'vl_presentation_screen vl_active';
    	vl_old_num = num;
    	if(vl_ui[num].play.className.indexOf('vl_playing') < 0) {
    		vl_playingVideo(num);
    		vl_video[num].play();
    		vl_hideUI(num);
    	}
    	else {
    		vl_pausedVideo(num);
    		vl_video[num].pause();
    		vl_showUI(num);
    	}
	}

	function vl_removeKeysDown() {
		window.removeEventListener('keydown', vl_uiOnKeyDown, false);
		window.removeEventListener('keyup', vl_playMouseUp, false);
	}

    function vl_mouseUp() {
    	window.removeEventListener('mousemove', vl_timeBarMouseDownAndMove, false);
    	window.removeEventListener('mousemove', vl_volumeBarMouseDownAndMove, false);
    	window.removeEventListener('mousemove', vl_callNextPlaylist, false);
    	window.removeEventListener('mousemove', vl_callNextCaptions, false);
    	vl_ui[vl_numstock].played.className = 'vl_played vl_current';
    	if(vl_volume_leave[vl_numstock]) {
    		vl_ui[vl_numstock].volumemenu.className = 'vl_volume_menu';
    		vl_ui[vl_numstock].volume.className = vl_ui[vl_numstock].volume.className.replace(' vl_active', '');
    		vl_controls_over = false;
    		if(vl_volume_down[vl_numstock]) vl_hideUI(vl_numstock);
    	}
    	vl_volume_down[vl_numstock] = false;
    	vl_timebardown[vl_old_num] = false;
    	for(j=0;j<vl_maxnum;j++) {
    		vl_ui[j].timetooltip.className = 'vl_timetooltip';
	    	vl_ui[j].played.className = 'vl_played vl_current';
	    	vl_ui[j].vlevel.className = 'vl_volume_level vl_current';
    	}
    }

    function vl_timeBarMouseOver(e) {
    	vl_old_num = vl_num;
    	if(vl_bar_hover[vl_num]) {
    		vl_tooltip_margin[vl_num] = vl_ui[vl_num].timetooltip.offsetLeft;
    		vl_bar_hover[vl_num] = false;
    	}
    	vl_timeBarMouseMove(e, vl_num);
    	vl_ui[vl_num].timetooltip.className = 'vl_timetooltip vl_show';	
    }

    function vl_timeBarMouseMove(e, num) {
		var tooltip_x = e.pageX - vl_cumulativeOffset(vl_ui[num].container).left,
		ratio = vl_getRatio(num);

		vl_tooltip_width[num] = vl_ui[num].timetooltip.clientWidth;

		if(tooltip_x >= vl_video_width[num]) {
			vl_ui[num].timetooltip.innerHTML = vl_formatSeconds(ratio*vl_video_width[num], num);
		}
		else if(tooltip_x <= 0) {
			vl_ui[num].timetooltip.innerHTML = vl_formatSeconds(0, num);
		}
		else vl_ui[num].timetooltip.innerHTML = vl_formatSeconds(ratio*tooltip_x, num);

		
		if(tooltip_x > vl_tooltip_width[num]/2 + vl_tooltip_margin[num] && (tooltip_x + vl_tooltip_width[num]/2) <= vl_video_width[num] - vl_tooltip_margin[num]) {
			vl_ui[num].timetooltip.style.marginLeft = -(vl_tooltip_width[num]/2)+'px';
			vl_ui[num].timetooltip.style.left = tooltip_x+'px';
		}
		else if((tooltip_x + vl_tooltip_width[num]/2 + vl_tooltip_margin[num]) > vl_video_width[num]) {
			vl_ui[num].timetooltip.style.marginLeft = -vl_tooltip_width[num]+'px';
			vl_ui[num].timetooltip.style.left = vl_video_width[num] - vl_tooltip_margin[num] +'px';
		}
		else {
			vl_ui[num].timetooltip.style.marginLeft = '0px';
			vl_ui[num].timetooltip.style.left = vl_tooltip_margin[num]+'px';
		}
    }

    function vl_timeBarMouseUp() {
    	if(vl_playing_tab[vl_old_num] == true) {
    		vl_playVideo(vl_old_num);
    	}
    	if(vl_video[vl_old_num].buffered.length > 0) {
			vl_loadVideo(vl_old_num);
		}
		window.removeEventListener('mouseup', vl_timeBarMouseUp, false);
    }

    function vl_timeBarMouseLeave() {
    	if(vl_timebardown[vl_old_num] == false) vl_ui[vl_old_num].timetooltip.className = 'vl_timetooltip';	
    }

    function vl_getRatio(num) {
    	var ratio;
    	if(vl_time_stock[num]) ratio = vl_time_stock[num]/vl_video_width[num];
    	else ratio = 0;
		return ratio;
    }

    function vl_timeBarMouseDown(e, num) {
    	if(vl_ui[vl_num].presentationscreen.className.indexOf('vl_show') > -1) vl_ui[vl_num].presentationscreen.className = 'vl_presentation_screen vl_active';
    	vl_old_num = num;
    	vl_numstock = num;
    	if(vl_ui[num].played.className.indexOf('vl_smooth') < 0) vl_ui[num].played.className += ' vl_smooth';
    	vl_movePlayedBar(e,num);
    	window.addEventListener('mousemove', vl_timeBarMouseDownAndMove, false);
    	window.addEventListener('mouseup', vl_timeBarMouseUp, false);
    	clearInterval(vl_play_interval[num]);
    	vl_timebardown[num] = true;
    }

    function vl_timeBarMouseDownAndMove(e) {
    	vl_movePlayedBar(e,vl_num);
    	vl_ui[vl_num].played.className = 'vl_played vl_current';
    }

    function vl_movePlayedBar(e,num) {
    	var tooltip_x = e.pageX - vl_cumulativeOffset(vl_ui[num].container).left,
    	ratio = vl_getRatio(num);

    	if(tooltip_x >= vl_video_width[num]) {
    		vl_ui[num].loadingscreen.className = 'vl_loadingscreen';
    		vl_video_ended[num] = true;
    	}

    	if(tooltip_x >= vl_video_width[num]) {
			vl_ui[num].videotime.innerHTML = vl_formatSeconds(ratio*vl_video_width[num], num) + ' / ' + vl_video_duration[num];
		}
		else if(tooltip_x <= 0) {
			vl_ui[num].videotime.innerHTML = vl_formatSeconds(0, num) + ' / ' + vl_video_duration[num];
		}
		else vl_ui[num].videotime.innerHTML = vl_formatSeconds(ratio*tooltip_x, num) + ' / ' + vl_video_duration[num];

    	if(vl_video[num].readyState >= 2) vl_video[num].currentTime = ratio*tooltip_x;
    	
		if(tooltip_x <= vl_video_width[num] && tooltip_x >= 0) {
			vl_ui[num].played.style.width = tooltip_x + 'px';
		}
		else if(tooltip_x > vl_video_width[num]) {
			vl_ui[num].played.style.width = vl_video_width[num]+'px';
		}
		else vl_ui[num].played.style.width = '0px';

		vl_timeBarMouseMove(e, num);

		vl_ui[num].timetooltip.className = 'vl_timetooltip vl_show';	
    }

    function vl_playMouseUp() {
    	vl_togglePlayPause(vl_num);
    }

    function vl_playingVideo(num) {
	    if(vl_video[num].ended == true) {
	    	vl_ui[num].play.classList.toggle('vl_playing');
			vl_ui[num].played.style.width = '0px';
			vl_video[num].currentTime = 0;
			vl_current_time = vl_formatSeconds(vl_video[num].currentTime, num);
			vl_ui[num].videotime.innerHTML = vl_current_time + ' / ' + vl_video_duration[num];
			vl_playing_tab[num] = false;
			vl_playVideo(num);
		}
		else {
			vl_ui[num].play.classList.toggle('vl_playing');
			if(!isNaN(vl_video[num].duration)) {
				vl_video_duration[num] = vl_formatSeconds(vl_video[num].duration, num);
				vl_time_stock[num] = vl_video[num].duration; 
			}
			else vl_video_duration[num] = '00:00';

			if(vl_video[num].buffered.length > 0) {
				vl_loadVideo(num);
			}
			vl_playing_tab[num] = true;
			vl_playVideo(num);
		}
    }

    function vl_pausedVideo(num) {
    	vl_ui[num].play.classList.toggle('vl_playing');
    	vl_playing_tab[num] = false;
    	clearInterval(vl_play_interval[num]);
    }

    function vl_endedVideo(num, prevornext) {
    	vl_ui[num].loadingscreen.className = 'vl_loading_screen';
    	vl_ui[num].played.style.width = vl_video_width + 'px';

    	if(vl_video[num].className.indexOf('vl_playlist') > -1) {
    		if(vl_ui[num].pshuffle.className.indexOf('vl_active') > -1) {
    			var j = 0,
    			flag = false;
    			vl_nextvidnum[num] = parseFloat(vl_ui[num].pul.getElementsByClassName('vl_current')[0].getAttribute('data-num'));
    			vl_shufflelist[num][vl_nextvidnum[num]] = true;
    			for(j=0;j<vl_shufflelist[num].length;j++) {
    				if(!vl_shufflelist[num][j]) flag = true;
    			}
    			if(flag) {
    				vl_shuffle(num);
    			}
    			else {
    				if(vl_ui[num].prepeat.className.indexOf('vl_active') > -1) {
    					for(j=0;j<vl_shufflelist[num].length;j++) {
	    					vl_shufflelist[num][j] = false;
	    				}
	    				vl_shufflelist[num][vl_nextvidnum[num]] = true;
    					vl_shuffle(num);
    				}
    			}
    		}
    		else {
    			if(prevornext == 'next') {
    				vl_nextvidnum[num] = parseFloat(vl_ui[num].pul.getElementsByClassName('vl_current')[0].getAttribute('data-num')) + 1;
    				if(vl_nextvidnum[num] >= vl_menu_fig[num][0].length && vl_ui[num].prepeat.className.indexOf('vl_active') < 0) vl_nextvidnum[num] =  vl_menu_fig[num][0].length - 1;
    				else if(vl_nextvidnum[num] >= vl_menu_fig[num][0].length && vl_ui[num].prepeat.className.indexOf('vl_active') > -1) vl_nextvidnum[num] =  0;
    			}
    			else {
    				vl_nextvidnum[num] = parseFloat(vl_ui[num].pul.getElementsByClassName('vl_current')[0].getAttribute('data-num')) - 1;
    				if(vl_nextvidnum[num] < 0 && vl_ui[num].prepeat.className.indexOf('vl_active') < 0) vl_nextvidnum[num] = 0;
    				else if(vl_nextvidnum[num] < 0 && vl_ui[num].prepeat.className.indexOf('vl_active') > -1) vl_nextvidnum[num] =  vl_menu_fig[num][0].length - 1;
    			}
    		}
    		vl_figureMouseDown('', vl_menu_fig[num][0][vl_nextvidnum[num]], num, 0);
    	}
    }

    function vl_shuffle(num) {
    	var dice = Math.random();
		dice = Math.round(dice*(vl_shufflelist[num].length - 1));
		while(vl_shufflelist[num][dice]) {
			dice = Math.random();
			dice = Math.round(dice*(vl_shufflelist[num].length - 1));
		}
		vl_nextvidnum[num] = dice;
    }

    function vl_repeatAndShuffleMouseUp(element) {
    	element.classList.toggle('vl_active');
    	if(element.className == 'vl_playlist_shuffle vl_background') {
    		for(j=0;j<vl_shufflelist[vl_num].length;j++) {
				vl_shufflelist[vl_num][j] = false;
			}
    	}
    }

    function vl_loadVideo(num) {
    	clearInterval(vl_load_interval[num]);
		vl_load_interval[num] = setInterval(function() {
			vl_loadInterval(num);
		}, 100);
    }

    function vl_loadInterval(num) {
    	vl_load_index[num] = vl_video[num].buffered.length - 1;
    	if(vl_load_index[num] > -1) {
			vl_loaded_bar_w = vl_numToPx(vl_video[num].buffered.end(vl_load_index[num]), vl_time_stock[num], vl_video_width[num]);
			vl_ui[num].loaded.style.width = vl_loaded_bar_w + 'px';
			if(vl_video[num].buffered.end(vl_load_index[num]) >= vl_time_stock[num]) {
				clearInterval(vl_load_interval[num]);
			}
		}
    }

    function vl_playVideo(num) {
    	var current_time;
    	vl_playing_tab[num] = true;
    	clearInterval(vl_play_interval[num]);
    	vl_play_interval[num] = setInterval(function() {
    		vl_playInterval(num);
    	}, 100);
    }

    function vl_playInterval(num) {
    	vl_current_time = vl_formatSeconds(vl_video[num].currentTime, num);
		if(!isNaN(vl_time_stock[num])) vl_video_duration[num] = vl_formatSeconds(vl_time_stock[num], num);
		else vl_video_duration[num] = '00:00';
		if(!isNaN(vl_video[num].currentTime)) vl_current_time = vl_formatSeconds(vl_video[num].currentTime, num);
		else vl_current_time = '00:00';
		vl_ui[num].videotime.innerHTML = vl_current_time + ' / ' + vl_video_duration[num];
		if(vl_video[num].currentTime <= vl_time_stock[num]) current_time = vl_video[num].currentTime;
		else current_time = vl_time_stock[num];
		vl_played_bar_w = vl_numToPx(current_time, vl_time_stock[num], vl_video_width[num]);
		vl_ui[num].played.style.width = vl_played_bar_w + 'px';
		if(vl_video[num].ended) {
			vl_ui[num].play.className = 'vl_play';
			clearInterval(vl_play_interval[num]);
		}
    }

    function vl_numToPx(num, maxNum, maxPx) {
    	var ratio = maxPx/maxNum;
    	ratio = Math.round(ratio * num);
    	return ratio;
    }

    function vl_playlistAndCaptionsMouseUp(element, element_menu, click) {
		if(click) {
			element.classList.toggle('vl_active');
			element_menu.classList.toggle('vl_show');
			if(vl_ui[vl_num].presentationscreen.className.indexOf('vl_show') > -1) vl_ui[vl_num].presentationscreen.className = 'vl_presentation_screen vl_active';
		}

		if(element.className.indexOf('vl_playlist vl_show vl_active') > -1) {
			vl_getSecParameters(vl_num);
			vl_ui[vl_num].playlisttmbn.style.height = vl_tmbn_height[vl_num] + 'px';
			vl_ui[vl_num].playlistscroll.style.height = vl_tmbn_height[vl_num] + 'px';

			if(vl_ui[vl_num].captions.className.indexOf('vl_show vl_active') > -1) vl_ui[vl_num].captions.className = 'vl_captions vl_show';
			vl_ui[vl_num].captionsmenu.className = 'vl_captions_menu vl_background';

			vl_positionScrollBar(vl_ui[vl_num].playlistmenu, vl_ui[vl_num].pscrollbar, 0);
		}
		else if(element.className.indexOf('vl_captions vl_show vl_active') > -1) {
			if(vl_ui[vl_num].playlist.className.indexOf('vl_show vl_active') > -1) vl_ui[vl_num].playlist.className = 'vl_playlist vl_show';
			vl_ui[vl_num].playlistmenu.className = 'vl_playlist_menu';

			vl_positionScrollBar(vl_ui[vl_num].captionsmenu, vl_ui[vl_num].cscrollbar, 1);
		}
		else {
			vl_menu_t_h[vl_num][0] = 0;
			vl_menu_t_h[vl_num][1] = 0;
		}
	}

	function vl_positionScrollBar(element_menu, element_sb, num) {
		var margin_top = vl_menu_ul[vl_num][num].offsetTop;

		if(num == 1) {
			current_element = vl_ui[vl_num].captionsmenu.getElementsByClassName('vl_current')[0].offsetTop - margin_top;
			vl_menu_ul[vl_num][num].scrollTop = current_element;
			vl_menu_h[vl_num][num] = vl_menu_ul[vl_num][num].clientHeight + margin_top;
			vl_menu_t_h[vl_num][num] = vl_menu_ul[vl_num][num].scrollHeight + margin_top;
		}
		else {
			current_element = vl_ui[vl_num].playlistmenu.getElementsByClassName('vl_current')[0].offsetTop - margin_top;
			vl_menu_ul[vl_num][num].scrollTop = current_element;
			vl_menu_h[vl_num][num] = vl_menu_ul[vl_num][num].clientHeight;
			vl_menu_t_h[vl_num][num] = vl_menu_ul[vl_num][num].scrollHeight;
		}
		if(vl_menu_h[vl_num][num] >= vl_menu_t_h[vl_num][num]) {
			if(element_menu.className.indexOf("vl_noscroll") < 0) element_menu.className += ' vl_noscroll';
		}
		else {
			element_menu.className = element_menu.className.replace(' vl_noscroll', '');
		}
		vl_m_scroll_top[vl_num][num] = vl_menu_ul[vl_num][num].scrollTop;

		vl_m_scroll_top[vl_num][num] = Math.round(vl_menu_h[vl_num][num] * (vl_m_scroll_top[vl_num][num]/vl_menu_t_h[vl_num][num]));
		vl_menu_h[vl_num][num] = Math.round((vl_menu_h[vl_num][num]) * ((vl_menu_h[vl_num][num])/vl_menu_t_h[vl_num][num]));
		

		element_sb.style.height = vl_menu_h[vl_num][num] + 'px';
		element_sb.style.top = vl_m_scroll_top[vl_num][num] + 'px';
	}

	function vl_figureMouseDown(element_menu, element, num, porc) {
		var datanum,
		nth,
		tracknum;
		datanum = parseFloat(element.getAttribute('data-num'));

		if(element_menu != '') {
			element_menu.className = element_menu.className.replace(' vl_show', '');
			vl_ui[num].playlist.className = vl_ui[num].playlist.className.replace(' vl_active', '');
			vl_ui[num].captions.className = vl_ui[num].captions.className.replace(' vl_active', '');
		}
		if(porc == 0) {
			if(element_menu != '') {
				for(j=0;j<vl_shufflelist[num].length;j++) {
					vl_shufflelist[num][j] = false;
				}
			}
			if(element.className == 'vl_current') {
				vl_video[num].currentTime = 0;
			}
			else {
				for(j=0;j<vl_menu_fig[num][porc].length;j++) {
					vl_menu_fig[num][porc][j].className = '';
				}
				element.className = 'vl_current';
				nth = datanum + 1;
				if(vl_ui[num].quality.className.indexOf('vl_active') > -1 && vl_sources[num][datanum].hd.length > 0) {
					vl_hd_click = true;
				}
				vl_playing = true;
				numstock = num;
				vl_time_reload = 0;
				vl_ui[num].videotitle.innerHTML = vl_sources[num][datanum].sd[0].title;
				vl_ui[num].vidnum.innerHTML = nth + '/' + vl_countSources(num)[1];
				vl_changeSource(vl_sources[num][datanum], num);
			}
		}
		else if(porc = 1) {
			for(j=0;j<vl_menu_fig[num][porc].length;j++) {
				vl_menu_fig[num][porc][j].className = '';
			}
			
			tracknum = element.getAttribute('data-track');
			element.className = 'vl_current';
			var tab = vl_video[num].getElementsByTagName('track');
			var resp = Array.prototype.slice.call( tab, 0 );
			resp = resp.indexOf(vl_sources[num][datanum].tracks[tracknum]);
			
			if(typeof vl_video[num].textTracks != 'undefined') {
				for(k=0;k<tab.length;k++) {
					vl_video[num].textTracks[k].mode = 'hidden';
				}
				vl_track_def[num][datanum] = tracknum;
				if(resp > -1) {
					if(typeof vl_video[num].textTracks[resp] != 'undefined') {
						vl_video[num].textTracks[resp].mode = 'showing';
						vl_lang[num] = vl_sources[num][datanum].tracks[tracknum].getAttribute('label');
					}
				}
				else if(element.innerHTML == 'None') {
					vl_lang[num] = 'None';
				}
			}
		}

		
	}

	function vl_matchScrollBar(element_sb, num) {
		if(num == 1) {
			var margin = vl_menu_ul[vl_num][num].offsetTop;
			vl_menu_h[vl_num][num] = vl_menu_ul[vl_num][num].clientHeight + margin;
			vl_menu_t_h[vl_num][num] = vl_menu_ul[vl_num][num].scrollHeight + margin;
		}
		else vl_menu_h[vl_num][num] = vl_menu_ul[vl_num][num].clientHeight;
		vl_m_scroll_top[vl_num][num] = vl_menu_ul[vl_num][num].scrollTop;
		vl_m_scroll_top[vl_num][num] = Math.round(vl_menu_h[vl_num][num] * (vl_m_scroll_top[vl_num][num]/vl_menu_t_h[vl_num][num]));
		element_sb.style.top = vl_m_scroll_top[vl_num][num] + 'px';
	}

	function vl_scrollMouseDown(e, element_scroll, element_sb, num) {
		vl_flag_scroll = true;
		vl_moveScrollBar(e, element_scroll, element_sb, num);
    	if(num == 0) window.addEventListener('mousemove', vl_callNextPlaylist, false);
    	else window.addEventListener('mousemove', vl_callNextCaptions, false);
	}

	function vl_moveScrollBar(e, element_scroll, element_sb, num) {
		var max_scroll = vl_menu_ul[vl_num][num].clientHeight - element_sb.clientHeight,
			scroll_height = vl_menu_ul[vl_num][num].clientHeight;
		if(num == 1) {
			var margin = vl_menu_ul[vl_num][num].offsetTop;
			max_scroll = vl_menu_ul[vl_num][num].clientHeight - element_sb.clientHeight + margin;
			scroll_height = vl_menu_ul[vl_num][num].clientHeight + margin;
		}
		var scroll_y = e.pageY - vl_cumulativeOffset(element_scroll).top,
			scroll_top = scroll_y - vl_scroll_position;
			max_scroll_menu = vl_menu_ul[vl_num][num].scrollHeight - vl_menu_ul[vl_num][num].clientHeight;
		
		if(typeof e.target.className != 'undefined') {
			if(e.target.className.indexOf('scrollbar') > -1 && vl_flag_scroll) {
				vl_scroll_position = scroll_y - element_sb.offsetTop;
				scroll_top = scroll_y - vl_scroll_position;
				vl_flag_scroll = false;
			}
			else if(vl_flag_scroll) {
				vl_scroll_position = element_sb.clientHeight/2;
				vl_flag_scroll = false;
			}
		}
		scroll_top = scroll_y - vl_scroll_position;
		scroll_top = Math.round(scroll_top * (max_scroll_menu/max_scroll));
		vl_menu_ul[vl_num][num].scrollTop = scroll_top;		
	}

	function vl_callNextPlaylist(e) {
		vl_scrollBarMouseDownAndMove(e, vl_ui[vl_num].playlistscroll, vl_ui[vl_num].pscrollbar, 0);
	}

	function vl_callNextCaptions(e) {
		vl_scrollBarMouseDownAndMove(e, vl_ui[vl_num].captionsscroll, vl_ui[vl_num].cscrollbar, 1);
	}

	function vl_scrollBarMouseDownAndMove(e, element_scroll, element_sb, num) {
		vl_moveScrollBar(e, element_scroll, element_sb, num);
	}

	function vl_repeatAndQualityMouseUp(element) {
		var datanum;
		if(vl_video[vl_num].children[0].getAttribute('data-num') != null) datanum = parseFloat(vl_video[vl_num].children[0].getAttribute('data-num'));
		else datanum = 0;
		if(element.className == 'vl_repeat') {
			element.classList.toggle('vl_active');
			vl_video[vl_num].loop = true;
			vl_ui[vl_num].repeat.setAttribute('data-content', 'Repeat (is on)');
		}
		else if(element.className == 'vl_repeat vl_active') {
			element.classList.toggle('vl_active');
			vl_video[vl_num].loop = false;
			vl_ui[vl_num].repeat.setAttribute('data-content', 'Repeat (is off)');
		}
		else if(element.className == 'vl_quality') {
			element.classList.toggle('vl_active');
			vl_time_reload = vl_video[vl_num].currentTime;
			if(vl_video[vl_num].paused == false) vl_playing = true;
			else vl_playing = false;
			vl_numstock = vl_num;
			vl_hd_click = true;
			vl_changeSource(vl_sources[vl_num][datanum], vl_num);
			vl_ui[vl_num].quality.setAttribute('data-content', 'High definition (is on)');
		}
		else if(element.className == 'vl_quality vl_active') {
			element.classList.toggle('vl_active');
			vl_time_reload = vl_video[vl_num].currentTime;
			if(vl_video[vl_num].paused == false) vl_playing = true;
			else vl_playing = false;
			vl_numstock = vl_num;
			vl_hd_click = false;
			vl_changeSource(vl_sources[vl_num][datanum], vl_num);
			vl_ui[vl_num].quality.setAttribute('data-content', 'High definition (is off)');
		}
	}

	function vl_volumeMouseOver() {
		vl_getParameters(this.parentNode.parentNode.parentNode.parentNode.parentNode);
		var volume_level;
		vl_ui[vl_num].volumemenu.className = 'vl_volume_menu vl_show';
		if(vl_volume_hover[vl_num]) {
			vl_volume_height[vl_num] = vl_ui[vl_num].vbar.clientHeight;
			volume_level =	vl_volume_height[vl_num] * vl_volume_level_p[vl_num];
			if(vl_ui[vl_num].vlevel.className.indexOf(' vl_hold') < 0) vl_ui[vl_num].vlevel.className += ' vl_hold';
			vl_ui[vl_num].vlevel.style.height = volume_level + 'px';
		}
		vl_volume_leave[vl_num] = false;
	}

	function vl_volumeMouseUp() {
		vl_numstock = vl_num;
		if(vl_ui[vl_num].vlevel.clientHeight > 0) {
			vl_volume_stock[vl_num] = vl_ui[vl_num].vlevel.clientHeight;
			vl_ui[vl_num].vlevel.style.height = '0px';
			if(vl_ui[vl_num].volume.className.indexOf('vl_mute') < 0) vl_ui[vl_num].volume.className += ' vl_mute';
			vl_video[vl_num].muted = true;
		}
		else if(vl_ui[vl_num].volume.className.indexOf('vl_volume vl_mute') < 0) {
			vl_ui[vl_num].volume.className = vl_ui[vl_num].volume.className.replace(' vl_mute', '');
			vl_ui[vl_num].vlevel.style.height = vl_volume_stock[vl_num]+'px';
			vl_video[vl_num].muted = false;
		}
		vl_volume_hover[vl_num] = false;
		vl_ui[vl_num].vlevel.className = vl_ui[vl_num].vlevel.className.replace(' vl_hold', '');
	}

	function vl_volumeMouseLeave() {
		if(!vl_volume_down[vl_num]) {
			vl_ui[vl_num].volumemenu.className = 'vl_volume_menu';
			vl_ui[vl_num].volume.className = vl_ui[vl_numstock].volume.className.replace(' vl_active', '');
			vl_controls_over = false;
		}
		vl_volume_leave[vl_num] = true;
	}

	function vl_volumeMenuMouseOver() {
		if(vl_ui[vl_num].volume.className.indexOf(' vl_active') < 0) vl_ui[vl_num].volume.className += ' vl_active';
		vl_ui[vl_num].volumemenu.className = 'vl_volume_menu vl_show';
		vl_volume_leave[vl_num] = false;
		vl_controls_over = true;
	}

	function vl_volumeBarMouseDown(e) {
		vl_numstock = vl_num;
		if(vl_volume_hover[vl_numstock]) { 
			vl_ui[vl_numstock].vlevel.className = vl_ui[vl_numstock].vlevel.className.replace(' vl_hold', '');
			vl_volume_hover[vl_numstock] = false;
		}
		vl_volume_down[vl_numstock] = true;
		vl_moveVolumeBar(e);
    	window.addEventListener('mousemove', vl_volumeBarMouseDownAndMove, false);
	}

	function vl_volumeBarMouseDownAndMove(e) {
    	vl_moveVolumeBar(e);
    	if(vl_ui[vl_numstock].vlevel.className.indexOf('vl_hold') < 0) vl_ui[vl_numstock].vlevel.className += ' vl_hold';
    }

	function vl_moveVolumeBar(e) {
		var volume_y = vl_volume_height[vl_numstock] - (e.pageY - vl_cumulativeOffset(vl_ui[vl_numstock].vbar).top),
			volume_perc,
			volume_stock;

		if(document.fullscreenElement ||    // alternative standard method
      	document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
			volume_y = vl_volume_height[vl_numstock] - (e.screenY - vl_cumulativeOffset(vl_ui[vl_numstock].vbar).top);
      	}

		vl_video[vl_numstock].muted = false;
		if(volume_y >= 0) volume_stock = volume_y;
		else volume_stock = 0;
		
		if(vl_volume_height[vl_numstock] > 0) vl_volume_stock[vl_numstock] = vl_volume_height[vl_numstock];

		if(volume_stock <= vl_volume_stock[vl_numstock] && volume_stock >= 0) {
			vl_ui[vl_numstock].vlevel.style.height = volume_stock+'px';
		}
		else if(volume_stock > vl_volume_stock[vl_numstock]) vl_ui[vl_numstock].vlevel.style.height = vl_volume_stock[vl_numstock]+'px';
		else vl_ui[vl_numstock].vlevel.style.height = '0px';

		volume_perc = volume_stock/vl_volume_stock[vl_numstock];

		if(volume_perc > 1) volume_perc = 1;
		else if(volume_perc > 0.5 && volume_y >= 0) vl_ui[vl_numstock].volume.className = 'vl_volume vl_loud vl_active';
		else if(volume_perc <= 0.5 && volume_perc > 0 && volume_y >= 0) vl_ui[vl_numstock].volume.className = 'vl_volume vl_low vl_active';
		else if(volume_perc <= 0 && volume_y >= -vl_volume_height[vl_numstock]) vl_ui[vl_numstock].volume.className = 'vl_volume vl_mute vl_active';
		vl_video[vl_numstock].volume = volume_perc;

	}

	function vl_fullscreenMouseUp() {
		if(!document.fullscreenElement &&    // alternative standard method
      	!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
			vl_getParameters(vl_ui[vl_num].container);
			vl_width_stock[vl_num] = vl_video_width[vl_num] + 'px';
			vl_height_stock[vl_num] = vl_video_height[vl_num] + 'px';
			vl_margin_stock[vl_num][0] = vl_ui[vl_num].container.style.marginTop;
			vl_margin_stock[vl_num][1] = vl_ui[vl_num].container.style.marginRight;
			vl_margin_stock[vl_num][2] = vl_ui[vl_num].container.style.marginBottom;
			vl_margin_stock[vl_num][3] = vl_ui[vl_num].container.style.marginLeft;
			vl_padding_stock[vl_num][0] = vl_ui[vl_num].container.style.paddingTop;
			vl_padding_stock[vl_num][1] = vl_ui[vl_num].container.style.paddingRight;
			vl_padding_stock[vl_num][2] = vl_ui[vl_num].container.style.paddingBottom;
			vl_padding_stock[vl_num][3] = vl_ui[vl_num].container.style.paddingLeft;
			vl_position_stock[vl_num][0] = vl_ui[vl_num].container.style.top;
			vl_position_stock[vl_num][1] = vl_ui[vl_num].container.style.right;
			vl_position_stock[vl_num][2] = vl_ui[vl_num].container.style.bottom;
			vl_position_stock[vl_num][3] = vl_ui[vl_num].container.style.left;
			if (vl_ui[vl_num].container.requestFullscreen) {
				vl_ui[vl_num].container.requestFullscreen();
			} else if (vl_ui[vl_num].container.msRequestFullscreen) {
				vl_ui[vl_num].container.msRequestFullscreen();
			} else if (vl_ui[vl_num].container.mozRequestFullScreen) {
				vl_ui[vl_num].container.mozRequestFullScreen();
			} else if (vl_ui[vl_num].container.webkitRequestFullscreen) {
				vl_ui[vl_num].container.webkitRequestFullscreen();
			}
			vl_ui[vl_num].container.style.width = '100%';
			vl_ui[vl_num].container.style.height = '100%';
		}
		else {
			if (document.exitFullscreen) {
		      document.exitFullscreen();
		    } else if (document.msExitFullscreen) {
		      document.msExitFullscreen();
		    } else if (document.mozCancelFullScreen) {
		      document.mozCancelFullScreen();
		    } else if (document.webkitExitFullscreen) {
		      document.webkitExitFullscreen();
		    }
		}
	}
}

window.addEventListener('load', VideoLayer);