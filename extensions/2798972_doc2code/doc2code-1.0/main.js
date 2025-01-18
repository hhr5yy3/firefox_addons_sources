function run() {
    let moduleNameMatch = document.body.innerText.match(/(?<=Module[^\w\r\n])\D+?\.\D+?(?=[\r\n])/);
    let packageNameMatch = document.body.innerText.match(/(?<=Package[^\w\r\n])\D+?(\.\D+?)+(?=[\r\n])/);
    let classNameMatch = document.URL.match(/[^\/\.]+(?=(\.[^\/]+)*\.html)/);


    if (!moduleNameMatch || moduleNameMatch.length == 0) {
        return;
    }


    let githubURL = "https://github.com/openjdk/jdk/blob/master/src/" + moduleNameMatch[0] + "/share/classes";

    if (packageNameMatch && packageNameMatch.length > 0) {
        githubURL += '/' + packageNameMatch[0].replaceAll('.', '/');
    }

    if (classNameMatch && classNameMatch.length > 0 && classNameMatch[0].indexOf('-summary') == -1) {
        githubURL += '/' + classNameMatch[0] + '.java';
    }

    const titleElement = document.body.getElementsByClassName('title')[0];
    const linkedTitle = document.createElement('a');
    linkedTitle.href=githubURL;
    linkedTitle.target='_blank';
    titleElement.parentNode.insertBefore(linkedTitle, titleElement);
    linkedTitle.appendChild(titleElement);
}

run();