window.addEventListener('load', init);

function init() {
	var bar  = document.getElementsByClassName('bar'),
		barp = document.getElementsByClassName('barp');

	for(i=0;i<bar.length;i++) {
		var width = bar[i].offsetWidth;
		if(width < 233) bar[i].className += ' low';
		else if(width < 366) bar[i].className += ' medium';
		else bar[i].className += ' high';
	}
}
