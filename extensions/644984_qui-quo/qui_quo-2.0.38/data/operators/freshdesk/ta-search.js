{
    let checkVersionKey = "";
    initVersionChecker();
    const intervalId = setInterval(addUrl, 1000);

    function initVersionChecker() {
        const checkVersionMark = getVersionMark() || createVersionMark();
        checkVersionKey = new Date().getTime().toString();
        checkVersionMark.textContent = checkVersionKey;
        document.querySelectorAll(".qq-ta-href").forEach(a => {
            a.remove();
        });
    }

    function addUrl() {
        document.querySelectorAll('blockquote').forEach(b => b.remove());
      //  document.querySelectorAll('.ticket-details-table-wrapper').forEach(w => w.style.display = "none");
        if ( isNewVersionLoaded() ) {
            clearInterval(intervalId);
        }
        let items = [...document.querySelectorAll("#requester-info .info-details__item")];
        for ( let item of items ) {
            const emailNode = item.querySelector(".info-details-content");
            if ( !emailNode || emailNode.parentNode.querySelector(".qq-ta-href") ) {
                continue;
            }
            const email = emailNode.textContent.trim();
            const url = `https://${window.AGENCY_DOMAIN}/support/agencies?page=1&filter=${email}`;
            emailNode.after(createTaSearchLink(url, 'Найти ТА в'));
        }

        const accountNumber = document.querySelector('[id*="customFields.cf_accountno"]');
        if ( accountNumber && accountNumber.value && !accountNumber.parentNode.querySelector('.qq-ta-href') ) {

            const url = `https://${window.AGENCY_DOMAIN}/support/agencies?accno=${accountNumber.value}`;
            accountNumber.before(createTaSearchLink(url, 'Открыть в'));
        }
    }

    function createTaSearchLink(url, text) {
        const a = document.createElement("a");
        a.href = url;
        a.innerHTML = text + '  <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo';
        a.setAttribute("style", 'color: #183247;font-weight: bold;font-size: 12px;font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;')
        a.className = "qq-ta-href";
        a.target = "_blank";
        return a;
    }

    function getVersionMark() {
        return document.querySelector("#qqTimeStamp");
    }

    function createVersionMark() {
        const timeStamp = document.createElement("div");
        timeStamp.setAttribute("style", "display:none;");
        timeStamp.setAttribute("id", "qqTimeStamp");
        document.body.appendChild(timeStamp);
        return timeStamp;
    }

    function isNewVersionLoaded() {
        return !(checkVersionKey === getVersionMark().textContent);
    }

}
