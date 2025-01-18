const ULTRA_HOME_TAB_ELEMENT_MAP = {
    course: '.course-element-card',
    stream: '.stream-item-container, #courses-terms li, .term-navigator > button',
    profile: '.bb-ui-username',
    default: 'html',
};

const ULTRA_COURSES_ELEMENTS_MAP = {
    course: '.course-element-card',
    stream: '.stream-item-container',
    default: 'html',
};

function injectOnDOMLoaderForNewBB() {
    callbackWhenDOMReady(document, function () {
        let elements = document.querySelectorAll('nav li a');
        injectCallbackOnClickEventsToElements(
            elements,
            async function (element) {
                let currTab = detectHomeTabSwitch(element.href);
                if (!ULTRA_HOME_TAB_ELEMENT_MAP[currTab]) {
                    currTab = 'default';
                }
                callbackOnDomElementsLoaded(
                    document,
                    ULTRA_HOME_TAB_ELEMENT_MAP[currTab],
                    function () {
                        injectOnDOMLoaderForNewBB();
                    },
                );
            },
        );

        let currHomePageTab = detectBlackboardHomeTab();
        injectVisualizerOnHomePageUltraBB(currHomePageTab);

        if (isCourseOpenForNewBB()) {
            injectOnCourseOpen();
        }
    });
}

function injectVisualizerOnHomePageUltraBB(currHomePageTab) {
    switch (currHomePageTab) {
        case 'course':
            injectOnCoursePage();
            break;
        case 'stream':
            injectOnStreamPage();
            break;
        case 'profile':
            injectOnProfilePage();
            break;
    }
}

function injectOnCoursePage() {
    callbackOnDomElementsLoaded(
        document,
        ULTRA_HOME_TAB_ELEMENT_MAP.course,
        function () {
            //course opened
            let cardElements = document.querySelectorAll(
                ULTRA_COURSES_ELEMENTS_MAP.course,
            );

            injectCallbackOnClickEventsToElements(
                cardElements,
                async function () {
                    callBackOnPageURLChange(
                        isCourseOpenForNewBB,
                        injectOnCourseOpen,
                    );
                },
            );

            //nav bars clicked
            let reloadInjectorsForElements = document.querySelectorAll(
                '#courses-terms li, .term-navigator > button',
            );

            injectCallbackOnClickEventsToElements(
                reloadInjectorsForElements,
                async function () {
                    injectOnDOMLoaderForNewBB();
                },
            );
        },
    );
}

function injectOnStreamPage() {
    callbackOnDomElementsLoaded(
        document,
        ULTRA_HOME_TAB_ELEMENT_MAP.stream,
        function () {
            let cardElements = document.querySelectorAll(
                ULTRA_COURSES_ELEMENTS_MAP.stream,
            );
            injectCallbackOnClickEventsToElements(
                cardElements,
                async function () {
                    callBackOnPageURLChange(
                        isCourseOpenForNewBB,
                        injectOnCourseOpen,
                    );
                },
            );
        },
    );
}

function injectOnProfilePage() {
    callbackOnDomElementsLoaded(
        document,
        ULTRA_HOME_TAB_ELEMENT_MAP.profile,
        injectForUltraNewBB(),
    );
}

async function injectOnCourseOpen() {
    if (isNewUltraCourseLayout()) {
        injectForUltraNewBB();
    } else {
        injectForNonUltraNewBB();
    }
}

async function injectForNonUltraNewBB() {
    let {currIframeDom, currIframe} = await getIframeDomForNewBlackboard();
    injectVisualizerToMainPageWhenCourseClosed(false);

    if (!currIframe) {
        return;
    }

    currIframe.addEventListener('load', function () {
        currIframeDom = currIframe.contentDocument;
        injectForNewBlackboard(currIframeDom);
    });

    if (!currIframeDom) {
        console.error('Unable to load visualizer');
    } else {
        injectForNewBlackboard(currIframeDom);
    }
}

async function injectVisualizerToMainPageWhenCourseClosed(isUltra) {
    callbackOnDomElementsLoaded(
        document,
        '#main-content .bb-close-offset',
        function (closeButtonDiv) {
            if (closeButtonDiv && closeButtonDiv.length > 0) {
                closeButtonDiv.forEach((closeButtonElement) =>
                    closeButtonElement.addEventListener(
                        'mousedown',
                        async function () {
                            if (isUltra) {
                                destroyWA();
                            }
                            callBackOnPageURLChange(function () {
                                return !isCourseOpenForNewBB();
                            }, injectOnDOMLoaderForNewBB);
                        },
                    ),
                );
            }
        },
    );
}

async function injectForUltraNewBB() {
    injectVisualizerToMainPageWhenCourseClosed(true);

    await sleep(1500);
    callbackOnDomElementsLoaded(
        document,
        '.bb-course-navigation nav a, .course-tool-content, .content-title, .list-tree-toggle button, .bb-course-navigation button, [analytics-id="course.outline.studentPreview.firstTimeConfirmation.startPreview.button"], .user-name-container',
        async function (elements) {
            injectCallbackOnClickEventsToElements(elements, async (element) => {
                injectForUltraNewBB();
            });
            load(document);
        },
    );
}

async function getIframeDomForNewBlackboard() {
    await sleep(1000);
    let currIframe;
    let currIframeDom;
    const maxTries = 6;
    let tryCount = 0;
    await new Promise((resolve) => {
        let getIframeDom = setInterval(() => {
            let currIframeList = document.getElementsByName(
                'classic-learn-iframe',
            );
            tryCount++;
            if (currIframeList && currIframeList.length > 0) {
                currIframe = currIframeList[0];
                if (!currIframe.contentDocument) {
                    currIframeList = document.getElementsByClassName(
                        'classic-learn-iframe',
                    );
                    if (currIframeList && currIframeList.length > 0) {
                        currIframe = currIframeList[0];
                    }
                }
                if (currIframe.contentDocument) {
                    currIframeDom = currIframe.contentDocument;
                }
            }

            if (currIframeDom) {
                let contentLinks = currIframeDom.querySelectorAll(
                    '#courseMenuPalette_contents li > a',
                );
                if (
                    currIframeDom.readyState === 'complete' &&
                    contentLinks &&
                    contentLinks.length > 0
                ) {
                    clearInterval(getIframeDom);
                    resolve();
                }
            }

            if (tryCount > maxTries) {
                clearInterval(getIframeDom);
                resolve();
            }
        }, 500);
    });

    return {currIframeDom, currIframe};
}

async function injectForNewBlackboard(currIframeDom) {
    load(currIframeDom);
}

async function injectBlackboardVisualizer() {
    let version = detectBlackboardVersion();
    if (version === 'ultra') {
        //for New Blackboard UI
        if (isCourseOpenForNewBB()) {
            injectOnCourseOpen();
        } else {
            injectOnDOMLoaderForNewBB();
        }
    } else {
        //for older version of Blackboard
        load();
    }
}

/**
 *
 * @param {DOM} elementToLoadIn : dom element where visualizer would be injected
 *
 * Injects Visualizer to the DOM element provided
 */
async function load(elementToLoadIn) {
    const credentials = await getCredentials();
    try {
        visualizerAction(credentials, LMS_TYPES.BLACKBOARD, elementToLoadIn);
    } catch (e) {
        console.error(e);
    }
}

/*
 * UTILITY FUNCTIONS
 */

function isNewUltraCourseLayout() {
    return !window.location.pathname.includes('/cl');
}

function detectHomeTabSwitch(href) {
    return href.split('/').pop();
}

function detectBlackboardHomeTab() {
    return window.location.pathname.split('/').pop();
}

function isCourseOpenForNewBB() {
    return window.location.pathname.includes('/courses');
}

function detectBlackboardVersion() {
    if (window.location.pathname.includes('/ultra')) {
        return 'ultra';
    } else {
        return 'default';
    }
}
