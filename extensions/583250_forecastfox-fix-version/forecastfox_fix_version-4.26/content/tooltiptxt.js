s3forecast.tooltiptxt = {};
s3forecast.tooltiptxt.timer = null;
s3forecast.tooltiptxt.body = null;
s3forecast.tooltiptxt.is_show = false;
s3forecast.tooltiptxt.pageX = 0;
s3forecast.tooltiptxt.pageY = 0;

//------------------------------------------------------------------------------
s3forecast.tooltiptxt.init = function() {
/*
	var el_list = document.getElementsByTagName("*");
	for (var i=0; i<el_list.length; i++) {
		el_list[i].addEventListener("mouseover", s3forecast.tooltiptxt.over, false);
		el_list[i].addEventListener("mouseout", s3forecast.tooltiptxt.out, false);
		el_list[i].is_event_tooltiptxt = true;
	}
*/
	s3forecast.tooltiptxt.body = document.getElementsByTagName("body")[0];
	s3forecast.tooltiptxt.body.addEventListener("mouseover", s3forecast.tooltiptxt.over, false);
	s3forecast.tooltiptxt.body.addEventListener("mouseout", s3forecast.tooltiptxt.out, false);
	s3forecast.tooltiptxt.body.addEventListener("mousemove", function(event) {
		if (s3forecast.tooltiptxt.is_show) {
			s3forecast.tooltiptxt.pageX = event.pageX;
			s3forecast.tooltiptxt.pageY = event.pageY;
			s3forecast.tooltiptxt.repos(document.getElementById("s3forecast_tooltiptxt"));
		}
	}, false);

	s3forecast.tooltiptxt.timer = null;
}
//------------------------------------------------------------------------------
s3forecast.tooltiptxt.over = function(event) {
	s3forecast.tooltiptxt.out(event);

	var tooltiptxt = document.getElementById("s3forecast_tooltiptxt");
	var el = event.target;
	var text_title = el.getAttribute('title');
	var text_alt = el.getAttribute('alt');
	if (text_title || text_alt) {
		el.removeAttribute('title');
		el.removeAttribute('alt');

		var text = text_title || text_alt;
		tooltiptxt.tooltip_element = {
			'el' : el,
			'text_title' : text_title,
			'text_alt' : text_alt
		};

		s3forecast.tooltiptxt.is_show = true;
		s3forecast.tooltiptxt.pageX = event.pageX;
		s3forecast.tooltiptxt.pageY = event.pageY;

		s3forecast.tooltiptxt.timer = setTimeout(function() {
			var text_list = text.split(/\n/);
			for (var i=0; i<text_list.length; i++) {
				tooltiptxt.appendChild(document.createTextNode(text_list[i]));
				if (i < text_list.length) {
					tooltiptxt.appendChild(document.createElement('br'));
				}
			}
			tooltiptxt.removeAttribute('is_hidden');
			s3forecast.tooltiptxt.repos(tooltiptxt);
		}, 700);
	}
}
//------------------------------------------------------------------------------
s3forecast.tooltiptxt.out = function(event) {
	if (s3forecast.tooltiptxt.timer) {
		try {
			clearTimeout(s3forecast.tooltiptxt.timer);
		} catch(e) {
		}
	}
	s3forecast.tooltiptxt.is_show = false;

	var tooltiptxt = document.getElementById("s3forecast_tooltiptxt");
	while (tooltiptxt.firstChild) {
		tooltiptxt.removeChild(tooltiptxt.firstChild);
	}
	tooltiptxt.setAttribute('is_hidden', true);
	s3forecast.tooltiptxt.timer = null;

	if (tooltiptxt.tooltip_element && tooltiptxt.tooltip_element.el) {
		try {
			if (tooltiptxt.tooltip_element.text_title && ! tooltiptxt.tooltip_element.el.hasAttribute('title')) {
				tooltiptxt.tooltip_element.el.setAttribute('title', tooltiptxt.tooltip_element.text_title);
			}
			if (tooltiptxt.tooltip_element.text_alt && ! tooltiptxt.tooltip_element.el.hasAttribute('alt')) {
				tooltiptxt.tooltip_element.el.setAttribute('alt', tooltiptxt.tooltip_element.text_alt);
			}
		} catch(e) {
		}
		tooltiptxt.tooltip_element = null;
	}
}
//------------------------------------------------------------------------------
s3forecast.tooltiptxt.repos = function(tooltiptxt) {
	tooltiptxt.style.top = '';
	tooltiptxt.style.left = '';
	tooltiptxt.style.bottom = '';
	tooltiptxt.style.right = '';

	var body = s3forecast.tooltiptxt.body;
	var pageX = s3forecast.tooltiptxt.pageX - window.scrollX;
	var pageY = s3forecast.tooltiptxt.pageY - window.scrollY;
	var maxWidth = (body.clientWidth > window.innerWidth) ? window.innerWidth : body.clientWidth;
	var maxHeight = (body.clientHeight > window.innerHeight) ? window.innerHeight : body.clientHeight;

	if (tooltiptxt.clientWidth > (maxWidth - pageX - 8)) {
		var right = ((maxWidth - pageX) + 8);
		if ((right + tooltiptxt.clientWidth) > maxWidth) {
			tooltiptxt.style.left = '4px';
		} else {
			tooltiptxt.style.right = right + 'px';
		}
	} else {
		tooltiptxt.style.left = (pageX + 8) + 'px';
	}
	if (tooltiptxt.clientHeight > (maxHeight - pageY - 15)) {
		var bottom = ((maxHeight - pageY) + 15);
		if ((bottom + tooltiptxt.clientHeight) > maxHeight) {
			tooltiptxt.style.top = '2px';
		} else {
			tooltiptxt.style.bottom = bottom + 'px';
		}
	} else {
		tooltiptxt.style.top = (pageY + 15) + 'px';
	}
}
//------------------------------------------------------------------------------
