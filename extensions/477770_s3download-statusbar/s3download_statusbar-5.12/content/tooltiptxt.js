s3dm.tooltiptxt = {};
s3dm.tooltiptxt.timer = null;
s3dm.tooltiptxt.body = null;
s3dm.tooltiptxt.is_show = false;
s3dm.tooltiptxt.pageX = 0;
s3dm.tooltiptxt.pageY = 0;

//------------------------------------------------------------------------------
s3dm.tooltiptxt.init = function() {
/*
	var el_list = document.getElementsByTagName("*");
	for (var i=0; i<el_list.length; i++) {
		el_list[i].addEventListener("mouseover", s3dm.tooltiptxt.over, false);
		el_list[i].addEventListener("mouseout", s3dm.tooltiptxt.out, false);
		el_list[i].is_event_tooltiptxt = true;
	}
*/
	s3dm.tooltiptxt.body = document.getElementsByTagName("body")[0];
	s3dm.tooltiptxt.body.addEventListener("mouseover", s3dm.tooltiptxt.over, false);
	s3dm.tooltiptxt.body.addEventListener("mouseout", s3dm.tooltiptxt.out, false);
	s3dm.tooltiptxt.body.addEventListener("mousemove", function(event) {
		if (s3dm.tooltiptxt.is_show) {
			s3dm.tooltiptxt.pageX = event.pageX;
			s3dm.tooltiptxt.pageY = event.pageY;
			s3dm.tooltiptxt.repos(document.getElementById("s3dm_tooltiptxt"));
		}
	}, false);

	s3dm.tooltiptxt.timer = null;
}
//------------------------------------------------------------------------------
s3dm.tooltiptxt.over = function(event) {
	s3dm.tooltiptxt.out(event);

	var tooltiptxt = document.getElementById("s3dm_tooltiptxt");
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

		s3dm.tooltiptxt.is_show = true;
		s3dm.tooltiptxt.pageX = event.pageX;
		s3dm.tooltiptxt.pageY = event.pageY;

		s3dm.tooltiptxt.timer = setTimeout(function() {
			var text_list = text.split(/\n/);
			for (var i=0; i<text_list.length; i++) {
				tooltiptxt.appendChild(document.createTextNode(text_list[i]));
				if (i < text_list.length) {
					tooltiptxt.appendChild(document.createElement('br'));
				}
			}
			tooltiptxt.removeAttribute('is_hidden');
			s3dm.tooltiptxt.repos(tooltiptxt);
		}, 700);
	}
}
//------------------------------------------------------------------------------
s3dm.tooltiptxt.out = function(event) {
	if (s3dm.tooltiptxt.timer) {
		try {
			clearTimeout(s3dm.tooltiptxt.timer);
		} catch(e) {
		}
	}
	s3dm.tooltiptxt.is_show = false;

	var tooltiptxt = document.getElementById("s3dm_tooltiptxt");
	while (tooltiptxt.firstChild) {
		tooltiptxt.removeChild(tooltiptxt.firstChild);
	}
	tooltiptxt.setAttribute('is_hidden', true);
	s3dm.tooltiptxt.timer = null;

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
s3dm.tooltiptxt.repos = function(tooltiptxt) {
	tooltiptxt.style.top = '';
	tooltiptxt.style.left = '';
	tooltiptxt.style.bottom = '';
	tooltiptxt.style.right = '';

	var body = s3dm.tooltiptxt.body;
	var pageX = s3dm.tooltiptxt.pageX - window.scrollX;
	var pageY = s3dm.tooltiptxt.pageY - window.scrollY;
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
