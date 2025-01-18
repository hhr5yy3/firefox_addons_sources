function restore() {
	browser.storage.local.get('setting', (d) => {
		if(d.setting) {
			var df = DEFAULT_SETTING;
			var a = d.setting;
			$('#dim').val(a.dim != null ? String(a.dim) : df.dim);
            $('#rotd').val(a.rotd != null ? String(a.rotd) : df.rotd);
            $('#rcCancel').val(a.rcCancel != null ? String(a.rcCancel) : df.rcCancel);
			$('#ctrlRvs').prop('checked', a.ctrlRvs != null ? a.ctrlRvs : df.ctrlRvs);
			$('#reverse').prop('checked', a.reverse != null ? a.reverse : df.reverse);
			$('#bgImg').prop('checked', a.bgImg != null ? a.bgImg : df.bgImg);
			$('#autoRtn').prop('checked', a.autoRtn != null ? a.autoRtn : df.autoRtn);
			$('#enableCxt').prop('checked', a.enableCxt != null ? a.enableCxt : df.enableCxt);
			$('#ivpDrag').prop('checked', a.ivpDrag != null ? a.ivpDrag : df.ivpDrag);
			$('#clickSwap').prop('checked', a.clickSwap != null ? a.clickSwap : df.clickSwap);
		}
		rvs_ctrl();
		if($('#clickSwap').prop('checked'))
			rvs_click();
	});
}

function save() {
	var a = {
		"dim": Number($('#dim').val()),
        "rotd": Number($('#rotd').val()),
        "rcCancel": Number($('#rcCancel').val()),
		"reverse": $('#reverse').prop('checked'),
		"bgImg": $('#bgImg').prop('checked'),
		"autoRtn": $('#autoRtn').prop('checked'),
		"ctrlRvs": $('#ctrlRvs').prop('checked'),
		"enableCxt": $('#enableCxt').prop('checked'),
		"ivpDrag": $('#ivpDrag').prop('checked'),
		"clickSwap": $('#clickSwap').prop('checked')
	};
	browser.storage.local.set({'setting': a});
}

function rvs_ctrl() {
	var a = $('input.ctrl_op_d').get();
	if($('#ctrlRvs').prop('checked')) a.reverse();
	$('#ctrl_op1').text(a[0].value);
	$('#ctrl_op2').text(a[1].value);
}
function rvs_click() {
	var o1 = $('#click_op1').html();
	var o2 = $('#click_op2').html();
	$('#click_op1').html(o2);
	$('#click_op2').html(o1);
}

function reset() {
	browser.storage.local.set({'setting': DEFAULT_SETTING}, () => location.reload());
}

//---

var gm = n => browser.i18n.getMessage(n);
$('#h2Setting').text(gm('h2Setting'));
$('#thFunc').text(gm('thFunc'));
$('#thCtrl').text(gm('thCtrl'));
$('#reset_btn').on('click', () => reset());

for(var i = 1; i < 40; i++) {
	var e = $('.td_' + i);
	if(e.length != 0) {
		var me = gm('td_'+ i);
		if(e[0].tagName.toUpperCase() == 'INPUT') e.val(me); else e.html(me);
	}
}

$('select, input[type="checkbox"]').on('change', () => save());
$('#ctrlRvs').on('change', () => rvs_ctrl());
$('#clickSwap').on('change', () => rvs_click());
restore();

