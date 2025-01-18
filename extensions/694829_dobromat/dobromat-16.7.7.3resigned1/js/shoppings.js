
$(function() {	

	var bg = browser.extension.getBackgroundPage();

	$("input[name='extension_id']").val(bg.dm.id);
	$("input[name='login']").val(bg.dm.user.login);
	$("input[name='token']").val(bg.dm.user.token);
	$("form").attr('action', bg.pages.shoppings).submit();	

});