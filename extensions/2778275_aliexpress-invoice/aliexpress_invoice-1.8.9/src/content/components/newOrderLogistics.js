$(document).ready(() => {
    if (
        location.href.includes("scrape=1") &&
        location.href.includes("logisticsdetail.htm")
    ) {
        $("body").append(modal());
        $(".close-modal").click(hideModal);
        showModal();
        changeModalMessage({
            message:
                "Do not close this tab. Please wait, it will close it self.",
        });

        (async () => {
            try {
                let flag = await waitForItemToShow(".package-content");
                const orderId = Number(
                    location.href.split("?tradeId=")[1].split("&scrape=1")[0]
                );

                if (flag) {
                    await getLogisticsDetail(orderId);
                    return;
                } else {
                    await saveLogisticsData([], orderId);
                    changeModalMessage(
                        "Error. Can't find elements on the page."
                    );
                    return;
                }
            } catch (error) {
                console.log("Error ", error);
                changeModalMessage("Error: " + error);
            }
        })();
    }
});

const getLogisticsDetail = async (orderId) => {
    const logisticsData = {
        logisticsInfo: [],
    };

    const e_trackingNumber = $(".tracking-no > span");
    logisticsData.trackingNumber = e_trackingNumber
        ? e_trackingNumber.text().trim()
        : null;

    let e_logisticSteps = $(".ship-steps > li.step");
    if (e_logisticSteps) e_logisticSteps.toArray();
    if (e_logisticSteps.length > 3) e_logisticSteps.splice(3);
    e_logisticSteps.toArray().forEach((e_step) => {
        const logisticStep = {};

        const e_stepTime = $(e_step).find(".step-time > .time");
        logisticStep.timestamp = e_stepTime ? e_stepTime.text().trim() : null;

        const e_stepHead = $(e_step).find(".step-content > .head");
        logisticStep.status = e_stepHead ? e_stepHead.text().trim() : null;

        const e_stepText = $(e_step).find(".step-content > .text");
        logisticStep.description = e_stepText ? e_stepText.text().trim() : null;

        logisticsData.logisticsInfo.push(logisticStep);
    });

    console.log("Logistics data:", logisticsData);

    await saveLogisticsData(logisticsData, orderId);
    return;
};

const saveLogisticsData = async (logisticsData, orderId) => {
    // Error handle
    if (!orderId) return false;

    try {
        let saveFlag = await updateOrderWithLogisticsDataAndStore(
            logisticsData,
            orderId
        );

        console.log("Update order in local is successful => ", saveFlag);

        if (saveFlag) {
            chrome.runtime.sendMessage({
                messageType: "CLOSE_PREVIOUS_OPENED_TAB",
            });
        } else {
            changeModalMessage(
                "Error. Sync logistic data did not finished correctly."
            );
        }
        return true;
    } catch (error) {
        console.log("Error ", error);
        return new Error("Can not save");
    }
};
