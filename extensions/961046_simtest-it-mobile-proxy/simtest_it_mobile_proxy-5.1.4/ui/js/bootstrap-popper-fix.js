// This is a fix to prevent let Bootstrap 4 work without Popper
if (typeof Popper == "undefined")
	var Popper = function () { }