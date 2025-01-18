const styleContainer = (style) => {
    return "<div class='style'>" +
        "<div class='name'>" + style.name + "</div>" +
        "<textarea rows='10' cols='70'>" + style.code + "</textarea>" +
        "<div class='button'>" +
        "<div class='copy'>Copy</div>" +
        "<span class='status'></span>" +
        "</div>" +
        "</div>";
};


$(document).ready(() => {
    chrome.storage.local.get('styles', results => {

        const main = $("#main");
        const created = $("#created");
        const installed = $("#installed");

        if (!results.styles || results.styles.length === 0)
            return main.append("<div class='style empty'>" +
                "No installed styles found from previous version." +
                "</div>");

        const styles = results.styles;

        styles.forEach(style => {
            if (!style.url){
                $("#sCreated").show();
                created.append(styleContainer(style));
            }
            else{
                $("#sInstalled").show();
                installed.append(styleContainer(style));
            }

        });


        $(".copy").click(e => {
            const node = $(e.target);
            const textarea = node.closest('.style').find('textarea');
            textarea.select();
            document.execCommand('copy');
            textarea.blur();
            node.siblings('.status').text('Copied');
            setTimeout(() => {
                node.siblings('.status').text('');
            }, 2000);
        })

    });
});
