$(document).ready(

    async function InitSlider() {

        console.log("widegpt loaded");

        await sleep(1000);

        $("main").prepend("<div id='sliderHolder'></div>");
        var sliderUrl = browser.runtime.getURL("slider.html");
        console.log("slider url: " + sliderUrl);
        $("#sliderHolder").load(sliderUrl, function () {
            let root = document.documentElement;

            function onError(error) {
                console.log(`Error: ${error}`);
            }

            function updateWidth() {
                var widthValue = document.getElementById("widthSlider").value;
                root.style.setProperty('--width', widthValue + "%");
                $("#widthSlider").attr('title', 'WideGPT: ' + widthValue + "%");
            }

            function saveOptions(e) {
                e.preventDefault();

                browser.storage.sync.set({
                    width: document.querySelector("#widthSlider").value,
                });
            }

            function restoreOptions() {
                function onError(error) {
                    console.log(`Error: ${error}`);
                }

                function restoreWidth(result) {
                    var widthValue = result.width || 70;
                    root.style.setProperty('--width', widthValue + "%");
                    console.log("Restoring width to: " + widthValue + "%");
                    document.querySelector("#widthSlider").value = result.width;
                    $("#widthSlider").attr('title', 'WideGPT: ' + widthValue + "%");
                }

                let width = browser.storage.sync.get("width");
                width.then(restoreWidth, onError);
            }


            $("#widegpt_logo").attr("src", browser.runtime.getURL("images/widegpt.png"));
            restoreOptions();
            document.querySelector("#widthSlider").addEventListener("input", updateWidth);
            document.querySelector("#widthSlider").addEventListener("change", saveOptions);
        });
        //h-9 pb-2 pt-3 px-3 gizmo:px-2 text-xs text-gray-500 font-medium text-ellipsis overflow-hidden break-all bg-gray-50 gizmo:bg-white dark:bg-gray-900 gizmo:dark:bg-black gizmo:text-gizmo-gray-600

    }
);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}





