window.addEventListener('load', colorpicker);

function colorpicker() {
	var FinalHexCode = "",
		RegHex = new RegExp("[0-9A-Fa-f]{6}"),
		RegChar = new RegExp("[A-Fa-f]{1}"),
		RegPerc = new RegExp("^[0-9][0-9]?$|^100$"),
		HexCode = [],
		tab = [],
		FinalRGB = [255,0,0],
		codeTag = document.getElementsByTagName('code')[0],
		styleTag = document.getElementsByTagName('style')[0],
		styleLine = [],
		codeLine = [],
		finalCodeOutput = ["<script src='http://www.gordonlambot.be/tfe/site/js/videolayer.js></script>", "<link href='http://www.gordonlambot.be/tfe/site/js/videolayer.css' rel='stylesheet'>"],
		sideForm = document.getElementById('sideform'),
		mainUl = document.getElementById('mainul'),
    	rgbCanvas = document.getElementById('rgbcanvas'),
    	barColorCanvas = document.getElementById('colorcanvas'),
    	barOpacityCanvas = document.getElementById('opacitycanvas'),
    	picker = document.getElementById('picker'),
    	barPicker = document.getElementsByClassName('barpicker'),
    	InputHexCode = document.getElementById('hexcode'),
    	InputOpacity = document.getElementById('opacity'),
    	ColorSample = document.getElementById('colorsample'),
    	Validate = document.getElementById('validate'),
    	Samples = document.getElementsByClassName('sample'),
    	SamplesLabels = document.getElementsByClassName('samplelabel'),
    	TargetedSample = Samples[0],
    	x = 149,
    	y = 0,
    	parentId,
    	ctx,
    	gradient,
    	barpos,
    	offsetLeft = cumulativeOffset(rgbCanvas).left + 1,
    	offsetTop = cumulativeOffset(rgbCanvas).top + 1,
    	opacityLevel = 1,
    	SampleHex = "9c5656",
    	currentTarget = Samples[0];
    rgbCanvas.width = 150;
    barColorCanvas.width = 20;
    barOpacityCanvas.width = 20;

    finalCodeOutput[0] = finalCodeOutput[0].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
    	return '&#'+i.charCodeAt(0)+';';
	});

	finalCodeOutput[1] = finalCodeOutput[1].replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
    	return '&#'+i.charCodeAt(0)+';';
	});
	
	ctx = rgbCanvas.getContext("2d");
	gradient = ctx.createLinearGradient(0,0,149,0);
	gradient.addColorStop(0,"rgb(255,255,255)");
	gradient.addColorStop(1,"rgb(255,0,0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0,150,150);
	gradient = ctx.createLinearGradient(0,0,0,150);
	gradient.addColorStop(0,"rgba(0,0,0,0)");
	gradient.addColorStop(1,"rgba(0,0,0,1)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0,150,150);

	ctx = barColorCanvas.getContext("2d");
	gradient = ctx.createLinearGradient(0,1,0,149);
	barpos = 1/6;
	gradient.addColorStop(0,"rgb(255,0,0)");
	gradient.addColorStop(barpos,"rgb(255,0,255)");
	gradient.addColorStop(barpos+0.01,"rgb(255,0,255)");
	gradient.addColorStop(barpos*2,"rgb(0,0,255)");
	gradient.addColorStop((barpos*2)+0.01,"rgb(0,0,255)");
	gradient.addColorStop(barpos*3,"rgb(0,255,255)");
	gradient.addColorStop((barpos*3)+0.01,"rgb(0,255,255)");
	gradient.addColorStop(barpos*4,"rgb(0,255,0)");
	gradient.addColorStop((barpos*4)+0.01,"rgb(0,255,0)");
	gradient.addColorStop(barpos*5,"rgb(255,255,0)");
	gradient.addColorStop((barpos*5)+0.02,"rgb(255,255,0)");
	gradient.addColorStop(1,"rgb(255,0,0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0,20,150);
	
	ctx = barOpacityCanvas.getContext("2d");
	gradient = ctx.createLinearGradient(0,0,0,150);
	gradient.addColorStop(0,"rgba(255,0,0,1)");
	gradient.addColorStop(1,"rgba(255,0,0,0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0,0,20,150);

	addListeners();
	InputOpacity.value = opacityLevel*100;
	getHexColor(x,y,rgbCanvas,true,true,true,false);

	for(i=0;i<3;i++) {
		Samples[i].width = 18;
		Samples[i].height = 18;
	}

	HexToCoords("1f1f1f",false);
	OpToCoord(80);
	InputOpacity.value = 80;

	fillColorSample(Samples[0], 18, 18, 32, 32, 32, 0.8);
	fillColorSample(Samples[1], 18, 18, 90, 184, 28, 1);
	fillColorSample(Samples[2], 18, 18, 235, 235, 235, 1);


	for(i=0;i<3;i++) {
		Samples[i].onclick = function() {
			sampleClick(this);
		}
		SamplesLabels[i].onclick = function() {
			sampleClick(this.parentNode.getElementsByClassName('sample')[0]);
		}
	}

	function sampleClick(element) {
		if(currentTarget != element) {
			currentTarget = element;
			ctx = element.getContext("2d");
	        imgDataRGB = ctx.getImageData(10,10,1,1);
			opacityLevel = imgDataRGB.data[3]/255;
			getHexColor(10,10,element,true,true,false,true);
			HexToCoords(SampleHex,true);
			OpToCoord(Math.round(opacityLevel*100),true);
			InputOpacity.value = Math.round(opacityLevel*100);
		}
	}

	function changeStyle(num, newvalue) {
		var from = styleTag.innerHTML.indexOf("newvalue");
	}

	function cumulativeOffset(element) {
	    var top = 0,
	    left = 0;
	    do {
	        top += element.offsetTop || 0;
	        left += element.offsetLeft || 0;
	        element = element.offsetParent;
	    } while(element);
	    return {
	    	left: left,
	    	top: top
	    }
    };

	InputHexCode.oninput = function() {
		HexToCoords(InputHexCode.value,false);
	}

	InputOpacity.oninput = function() {
		OpToCoord(InputOpacity.value,false);
	}

	function HexToCoords(Hexadecimal,fromInput) {
		if(RegHex.test(Hexadecimal)) {
			HexToNum(Hexadecimal);
			tab = rgbToHsl(tab[0], tab[1], tab[2]);
			if(Hexadecimal == "000000") tab[1] = 0;
			barPicker[0].style.top = tab[0] + "px";
			picker.style.left = tab[1] + "px";
			picker.style.top = tab[2] + "px";
			if(tab[2] > 74) {
				picker.style.borderColor = "#ebebeb";
			}
			else {
				picker.style.borderColor = "#1f1f1f";
			}
			y = tab[0];
			getHexColor(10,y,barColorCanvas,true,true,false,false);
			if(!fromInput) fillColorSample(currentTarget, 18, 18, FinalRGB[0], FinalRGB[1], FinalRGB[2], opacityLevel);
		};
	}

	function HexToNum(Hexadecimal) {
		var NewHexCode = Hexadecimal;
		var odd = 0;
		var even = 0;
		var cpt = 0;
		InputHexCode.value = Hexadecimal.toUpperCase();
		for(i=0;i<6;i++) {
			if(i%2 == 1) {
				odd = toNum(NewHexCode.charAt(i), "odd");
				odd = parseInt(odd);
				tab[cpt] = odd+even;
				cpt++;
			}
			else {
				even = toNum(NewHexCode.charAt(i), "even");
				even = parseInt(even);
			}
		}
		FinalRGB = tab;
	}

	function OpToCoord(Opacity, fromInput) {
		if(RegPerc.test(Opacity)) {
			barPicker[1].style.top = 149 - Opacity*1.49 + "px";
			opacityLevel = Opacity/100;
			if(!fromInput) fillColorSample(currentTarget, 18, 18, FinalRGB[0], FinalRGB[1], FinalRGB[2], opacityLevel);
		}
	}

    function addListeners() {
    	rgbCanvas.addEventListener('mousedown', mouseDownOnMain, false);
    	picker.addEventListener('mousedown', mouseDownOnMain, false);
    	barColorCanvas.addEventListener('mousedown', mouseDownOnBar, false);
    	barOpacityCanvas.addEventListener('mousedown', mouseDownOnBar, false);
    	barPicker[0].addEventListener('mousedown', mouseDownOnBar, false);
    	barPicker[1].addEventListener('mousedown', mouseDownOnBar, false);
		window.addEventListener('mouseup', mouseUp, false);
    }

    function mouseUp()
	{
	    window.removeEventListener('mousemove', movePickerToCoords, true);
	    window.removeEventListener('mousemove', moveBarPickerToCoord, true);
	}

	function mouseDownOnMain(e){
		window.addEventListener('mousemove', movePickerToCoords, true);
		movePickerToCoords(e);
	}

	function mouseDownOnBar(e){
		window.addEventListener('mousemove', moveBarPickerToCoord, true);
		moveBarPickerToCoord(e);
	}
    
    function getHexColor(x,y,canvasName,main,opacity,changeInput,fromInput) {
    	FinalHexCode = "";
        ctx = canvasName.getContext("2d");
        imgDataRGB = ctx.getImageData(x,y,1,1);
		for(i=0 ; i<3 ; i++) {
			FinalRGB[i] = imgDataRGB.data[i];
			HexCode[i] = toHex(imgDataRGB.data[i]);
			FinalHexCode += HexCode[i];
		};
		if(canvasName.className == "sample") {
			SampleHex = FinalHexCode;
        }
		FinalHexCode = "#" + FinalHexCode;
		if(changeInput) {
			InputHexCode.value = FinalHexCode.substr(1,7);
			if(!fromInput) fillColorSample(currentTarget, 18, 18, FinalRGB[0], FinalRGB[1], FinalRGB[2], opacityLevel);
		}
		if(main || opacity) changeColor(main, opacity, changeInput, fromInput);
    };

	function toHex(d) {
		var r = d % 16;
		var result;
		if(d < 16) {
			result = "0" + toChar(d);
		}
		else {
			result = toChar( (d-r)/16 ) + toChar(r);
		};
		return result;
	};

	function rgbToHsl(r, g, b){
	    r /= 255, g /= 255, b /= 255;
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2;
	    if(max == min) {
	        h = s = 0; // achromatic
	    }
	    else {
	        var d = max - min;
	        switch(max){
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }
	    h = 150 - Math.round(h*150);
	    if(h == 150) h = 0;
	    else if(h == 0) h = 150;
	    s = 150 - Math.round((min/max)*150);
	    if(s > 100) s--;
	    max *= 255;
	    l = 150 - Math.round((max/255)*150);
		if(l > 100) l--;
	    return [h,s,l];
	}
	 
	function toChar(n) {
		const alpha = "0123456789ABCDEF";
		return alpha.charAt(n);
	};

	function toNum(character, oddOrEven) {
		if(RegChar.test(character)) {
			character = character.toUpperCase();
			switch(character) {
				case "A":
					character = 10;
					break;
				case "B":
					character = 11;
					break;
				case "C":
					character = 12;
					break;
				case "D":
					character = 13;
					break;
				case "E":
					character = 14;
					break;
				case "F":
					character = 15;
					break;
				default:
					character = character;
			}
		}
		if(oddOrEven == "even") {
			character = character*16;
		}
		return character;
	}

	function changeColor(main, opacity, changeInput, fromInput) {
		if(main) {
			ctx = rgbCanvas.getContext("2d");
			ctx.clearRect(0,0,150,150);
			gradient = ctx.createLinearGradient(0,0,149,0);
			gradient.addColorStop(0,"rgb(255,255,255)");
			gradient.addColorStop(1,"rgb("+imgDataRGB.data[0]+","+imgDataRGB.data[1]+","+imgDataRGB.data[2]+")");
			ctx.fillStyle = gradient;
			ctx.fillRect(0,0,150,150);
			gradient = ctx.createLinearGradient(0,0,0,150);
			gradient.addColorStop(0,"rgba(0,0,0,0)");
			gradient.addColorStop(1,"rgba(0,0,0,1)");
			ctx.fillStyle = gradient;
			ctx.fillRect(0,0,150,150);
		}
		if(opacity) {
			getHexColor(picker.offsetLeft + 4, picker.offsetTop + 4, rgbCanvas, false, false, false, fromInput);
			ctx = barOpacityCanvas.getContext("2d");
			ctx.clearRect(0,0,20,150);
			gradient = ctx.createLinearGradient(0,0,0,150);
			gradient.addColorStop(0,"rgba("+imgDataRGB.data[0]+","+imgDataRGB.data[1]+","+imgDataRGB.data[2]+",1)");
			gradient.addColorStop(1,"rgba("+imgDataRGB.data[0]+","+imgDataRGB.data[1]+","+imgDataRGB.data[2]+",0)");
			ctx.fillStyle = gradient;
			ctx.fillRect(0,0,20,150);
		}
		if(changeInput) getHexColor(picker.offsetLeft + 4 , picker.offsetTop + 4, rgbCanvas, false, false, true, fromInput);
	}

	function moveBarPickerToCoord(event) {
		if(event.target.parentNode != null) parentId = event.target.parentNode.id;
		y = event.clientY - offsetTop + mainUl.scrollTop;
		if(y < 0) y = 0;
		else if(y > 149) y = 149;
		else y = event.clientY - offsetTop + mainUl.scrollTop;
		if (typeof parentId != "undefined" && parentId.indexOf("colorwrapper") > -1) {
			barPicker[0].style.top = y +"px";
			getHexColor(10,y,barColorCanvas,true,true,true,false);
		}
		else if (typeof parentId != "undefined" && parentId.indexOf("opacitywrapper") > -1) {
			barPicker[1].style.top = y +"px";
			opacityLevel = y/1.49;
			InputOpacity.value = 100 - Math.round(opacityLevel);
			opacityLevel = 1 - opacityLevel/100;
			fillColorSample(currentTarget, 18, 18, FinalRGB[0], FinalRGB[1], FinalRGB[2], opacityLevel);
		}
	}

	function movePickerToCoords(event) {
		x = event.clientX - offsetLeft;
		if(x < 0) x = 0;
		else if(x > 149) x = 149;
		else x = event.clientX - offsetLeft;
		y = event.clientY - offsetTop + mainUl.scrollTop;
		if(y < 0) y = 0;
		else if(y > 149) y = 149;
		else y = event.clientY - offsetTop + mainUl.scrollTop;
		if(y > 74) {
			picker.style.borderColor = "#ebebeb";
		}
		else {
			picker.style.borderColor = "#1f1f1f";
		}
		picker.style.left = x +"px";
		picker.style.top = y +"px";
		getHexColor(x,y,rgbCanvas,false,true,true,false);
	}

	function fillColorSample(Element, width, height, r, g, b, a) {
		var string,
		hexa = [r,g,b],
		hexoutput = "#";
		ctx = Element.getContext("2d");
		ctx.clearRect(0,0,width,height);
		a = parseFloat(a.toFixed(2));
		string = "rgba(" + r + ", "+ g +", "+ b +", "+ a + ")";
		ctx.fillStyle = string;
		ctx.fillRect(0,0,width,height);
		for(i=0 ; i<3 ; i++) {
			hexa[i] = toHex(hexa[i]);
			hexoutput += hexa[i];
		};
		if(Element == Samples[0]) {
			if(string != "rgba(32, 32, 32, 0.8)" && string != "rgba(31, 31, 31, 0.8)") {
				if(a == 1) {
					styleLine[0] = ".vl_ui .vl_background, .vl_thumbnail:after, .vl_background .vl_timetooltip, button:after { background: " + hexoutput + "; }";
					codeLine[0] = "<p class='code'> .vl_ui .vl_background, .vl_thumbnail:after, <br> .vl_background .vl_timetooltip, button:after { <br><span class='innercode'> background: " + hexoutput + "; </span><br> }</p>";
				}
				else {
					styleLine[0] = ".vl_ui .vl_background, .vl_thumbnail:after, .vl_background .vl_timetooltip, button:after { background: rgba(" + r + ", "+ g +", "+ b +", "+ a + "); }";
					codeLine[0] = "<p class='code'> .vl_ui .vl_background, .vl_thumbnail:after, <br> .vl_background .vl_timetooltip, button:after { <br><span class='innercode'> background: rgba(" + r + ", "+ g +", "+ b +", "+ a + "); </span><br> }</p>";
				}
			}
			else  {
				styleLine[0] = "";
				codeLine[0] = "";
			}
		}
		else if(Element == Samples[1]) {
			if(string != "rgba(90, 184, 28, 1)") {
				if(a == 1) {
					styleLine[1] = ".vl_ui .vl_active, .vl_ui button:hover, .vl_active:hover button:after { color: " + hexoutput + "; }";
					styleLine[1]+= ".vl_ui .vl_current { background: " + hexoutput + "; }";
					codeLine[1] = "<p class='code'> .vl_ui .vl_active, .vl_ui button:hover, <br> .vl_active:hover button:after { <br><span class='innercode'> color: " + hexoutput + "; </span><br> }</p>";
					codeLine[1]+= "<p class='code'> .vl_ui .vl_current { <br><span class='innercode'> background: " + hexoutput + "; </span><br> }</p>";
				}
				else {
					styleLine[1] = ".vl_ui .vl_active, .vl_ui button:hover, .vl_active:hover button:after { color: rgba(" + r + ", "+ g +", "+ b +", "+ a + "); }";
					styleLine[1]+= ".vl_ui .vl_current { background: rgba(" + r + ", "+ g +", "+ b +", "+ a + "); }";
					codeLine[1] = "<p class='code'> .vl_ui .vl_active, .vl_ui button:hover, <br> .vl_active:hover button:after { <br><span class='innercode'> color: rgba(" + r + ", "+ g +", "+ b +", "+ a + "); </span><br> }</p>";
					codeLine[1]+= "<p class='code'> .vl_ui .vl_current { <br><span class='innercode'> background: rgba(" + r + ", "+ g +", "+ b +", "+ a + "); </span><br> }</p>";
				}
			}
			else  {
				styleLine[1] = "";
				codeLine[1] = "";
			}
		}
		else {
			if(string != "rgba(235, 235, 235, 1)") {
				if(a == 1) {
					styleLine[2] = ".vl_ui, button, button:after, .vl_current div { color: " + hexoutput + "; }";
					styleLine[2]+= ".vl_ui .vl_maincolor, figure.vl_current, figure:hover { background: " + hexoutput + "; }";
					codeLine[2] = "<p class='code'> .vl_ui, button, button:after, <br> .vl_current div { <br><span class='innercode'> color: " + hexoutput + "; </span><br> }</p>";
					codeLine[2]+= "<p class='code'> .vl_ui .vl_maincolor, <br> figure.vl_current, figure:hover { <br><span class='innercode'> background: " + hexoutput + "; </span><br> }</p>";
				}
				else {
					styleLine[2] = ".vl_ui, button, button:after, .vl_current div { color: rgba(" + r + ", "+ g +", "+ b +", "+ a + "); }";
					styleLine[2]+= ".vl_ui .vl_maincolor, figure.vl_current, figure:hover { background: rgba(" + r + ", "+ g +", "+ b +", "+ a + "); }";
					codeLine[2] = "<p class='code'> .vl_ui, button, button:after, <br> .vl_current div { <br><span class='innercode'> rgba(" + r + ", "+ g +", "+ b +", "+ a + "); </span><br> }</p>";
					codeLine[2]+= "<p class='code'> .vl_ui .vl_maincolor, <br> figure.vl_current, figure:hover { <br><span class='innercode'> rgba(" + r + ", "+ g +", "+ b +", "+ a + "); </span><br> }</p>";
				}
			}
			else  {
				styleLine[2] = "";
				codeLine[2] = "";
			}
		}
		styleTag.innerHTML = styleLine[0] + styleLine[1] + styleLine[2];
		if(codeLine[0] + codeLine[1] + codeLine[2] == "") codeTag.innerHTML = finalCodeOutput[0] + "<br>" + finalCodeOutput[1];
		else codeTag.innerHTML = finalCodeOutput[0] + "<br>" + finalCodeOutput[1] + "<br>&lt;style&gt;" +codeLine[0] + codeLine[1] + codeLine[2] + "&lt;/style&gt;";
	}
};   


