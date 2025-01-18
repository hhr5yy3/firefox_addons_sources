const get = $(location)[0].search;
const url = get.replace('?', '');
$('.loadingcard').hide();
$('.print').hide();
$('.errorCard').hide();

$.ajax({
    url: `https://easyprintapp.net/firefox/public/print_api?page_url=${url}`,
    type: "GET",
    beforeSend: function () {
        $('.loadingcard').show();
    },
    complete: function () {
        $('.loadingcard').hide();
    },
    success: function (response) {
        const data = JSON.parse(response)
        if (data.status == 400) {
            $('.print').hide();
            $('.loadingcard').hide();
            $('.errorCard').show();
            $('.goPfBody').show()
            document.getElementsByClassName('errortxt')[0].textContent = data.data;
        } else {
            $('.print').show();
            let elem = $("#pf-body");
            let cleanHTML = DOMPurify.sanitize(data.data, { SAFE_FOR_JQUERY: true });
            elem.html(cleanHTML);
        }
    }
});

$('.print').click(function () {
    $('#pf-body').print();
})
