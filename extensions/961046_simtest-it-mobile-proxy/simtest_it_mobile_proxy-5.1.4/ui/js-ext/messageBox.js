let messageBox = {
	error: function (title, timeout, onClose) {

		toastr.options = {
			"closeButton": true,
			"debug": false,
			"newestOnTop": false,
			"progressBar": true,
			"positionClass": "toast-top-center",
			"preventDuplicates": false,
			"onclick": onClose,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": timeout == null ? 3000 : timeout,
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}

		toastr["error"]("", title)

	},
	warning: function (title, timeout, onClose) {
		toastr.options = {
			"closeButton": true,
			"debug": false,
			"newestOnTop": false,
			"progressBar": true,
			"positionClass": "toast-top-center",
			"preventDuplicates": false,
			"onclick": onClose,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": timeout == null ? 3000 : timeout,
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}

		toastr["warning"]("", title)
	},
	success: function (title, timeout, onClose) {
		toastr.options = {
			"closeButton": true,
			"debug": false,
			"newestOnTop": false,
			"progressBar": true,
			"positionClass": "toast-top-center",
			"preventDuplicates": false,
			"onclick": onClose,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": timeout == null ? 3000 : timeout,
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}

		toastr["success"]("", title)
	},
	info: function (title, timeout, onClose) {
		toastr.options = {
			"closeButton": true,
			"debug": false,
			"newestOnTop": false,
			"progressBar": true,
			"positionClass": "toast-top-center",
			"preventDuplicates": false,
			"onclick": onClose,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": timeout == null ? 3000 : timeout,
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}

		toastr["info"]("", title)
	},
	confirm: function (title, accept, cancel) {
		var r = confirm(title);
		if (r == true) {
			if(accept) accept();
		} else {
			if(cancel) cancel();
		}
	}
};