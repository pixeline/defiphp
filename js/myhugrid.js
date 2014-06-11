	definegrid = function() {
		var browserWidth = $(window).width();  
		if (browserWidth >= 963)
		{
            pageUnits = 'px';					  
            colUnits = 'px';					   
			pagewidth = 940;
			columns = 12;
			columnwidth = 60;
			gutterwidth = 20;
			pagetopmargin = 20;
			rowheight = 10;
			gridonload = 'off';
			makehugrid();
		}
		if (browserWidth <= 963) 
		{
            pageUnits = 'px';
            colUnits = 'px';
			pagewidth = 620;
			columns = 8;
			columnwidth = 60;
			gutterwidth = 20;
			pagetopmargin = 20;
			rowheight = 10;
			gridonload = 'off';
			makehugrid();
		}
		if (browserWidth <= 383)
		{
			pageUnits = 'px';
            colUnits = 'px';
			pagewidth = 300;
			columns = 4;
			columnwidth = 60;
			gutterwidth = 20;
			pagetopmargin = 10;
			rowheight = 10;
			gridonload = 'off';
			makehugrid();
		}
	}
    $(document).ready(function() {
		definegrid();
		setgridonload();
    });    
    
    $(window).resize(function() {
		definegrid();
        setgridonresize();
    });