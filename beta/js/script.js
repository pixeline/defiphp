window.addEventListener('load', init);

function init() {
	var sidebar = document.getElementById('sidebar'),
		header = document.getElementsByTagName('header')[0],
		mainul = document.getElementById('mainul');

	mainul.style.height = sidebar.offsetHeight - header.offsetHeight + 'px';
	window.addEventListener('resize', function() {
		mainul.style.height = sidebar.offsetHeight - header.offsetHeight + 'px';
	}, false);
}