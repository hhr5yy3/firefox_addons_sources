const ea_rules_en = {
    "EA-R1": {
        "content": "SVG syntax incorrect",
        "explanation": "The syntax of the SVG element is not correct. It is missing the role-attribute or the title/desc element.",
        "tip": "Check the SVG's role or title/desc element."
    },
    "EA-R2": {
        "content": "<svg> missing accessible text",
        "explanation": "<svg> elements with the role \"img\" need an accessible name so that screen reader users can understand its contents and purpose.",
        "tip": "Create a title attribute, a title/desc element or aria attributes for the <svg>."
    },
    "EA-R3": {
        "content": "<svg> alternative text is very short (<5 characters)",
        "explanation": "The SVG accessible text is very short (<5 characters) and may not describe the graphic sufficiently.",
        "tip": "Check whether the accessible text sufficiently describes the SVG."
    },
    "EA-R4": {
        "content": "<svg> alternative text is very long (>150 characters)",
        "explanation": "The SVG alternative text is very long (>150 characters) and can potentially be summarized. Many blind people read texts with the help of a Braille display. A Braille display can output at least 40 characters, but only a maximum of 80 characters.",
        "tip": "Summarize the description to the essentials."
    },
    "EA-R5": {
        "content": "<svg> accessible is a bit long (>80 characters)",
        "explanation": "SVG alternative text somewhat long (>80 characters) and can potentially be summarized. Many blind people read texts with the help of a Braille display. A Braille display can output at least 40 characters, but only a maximum of 80 characters.",
        "tip": "Summarize the description to the essentials."
    },
    "EA-R6": {
        "content": "Image missing alternative text",
        "explanation": "Images (<img> or role=\"img\") need an alternative text so that screen reader users can understand the image's contents and purpose. The title attribute is not always reliably recognized.",
        "tip": "Add meaningful alternative text using the alt-, aria-label- or aria-labelledby-attributes. An empty alt attribute can be used for decorative images."
    },
    "EA-R7": {
        "content": "Redundant alt text as the enclosing link",
        "explanation": "The image has the same alternative text as the enclosing link. Repeating alternative text for a link or image in adjacent text is unnecessary and can confuse screen reader users by reading it twice.",
        "tip": "Remove the alt text from the image as it does not contain any additional information. Use an empty alt-attribute, alt=\"\", for the image instead."
    },
    "EA-R8": {
        "content": "Missing alternative text in linked image",
        "explanation": "Since the link itself does not contain text, the image must have an alternative text so that screen readers can identify the links content and purpose. A title attribute is not sufficient for all screen readers.",
        "tip": "Add a meaningful alternative text for the link or the linked image."
    },
    "EA-R9": {
        "content": "Image alternative text is very short (<5 characters)",
        "explanation": "The alternative text of an image should describe its content in a meaningful way.",
        "tip": "Check that the alternative text adequately describes the image."
    },
    "EA-R10": {
        "content": "Image alternative text is very long (>150 characters)",
        "explanation": "The alternative text of this image is very long (>150 characters) and can possibly be summarized. Many blind people read texts with the help of a Braille display. A Braille display can output at least 40 characters, but only a maximum of 80 characters.",
        "tip": "Summarize the description to its essence."
    },
    "EA-R11": {
        "content": "Image alternative text is a bit long (>80 characters)",
        "explanation": "The alternative text is a bit long (>80 characters) and can possibly be summarized. Many blind people read texts with the help of a Braille display. A Braille display can output at least 40 characters, but only a maximum of 80 characters.",
        "tip": "Summarize the description to its essence."
    },
    "EA-R12": {
        "content": "Links must have accessible text",
        "explanation": "Links require a link text that is understandable and correctly output by screen readers. A link text should explain clearly what information the reader will get by clicking on that link.",
        "tip": "Add a meaningful link text by using an inner text or ARIA attributes that describes the purpose and target of the link. The link text must also not be hidden to screen readers (e.g. with display: none or aria-hidden=\"true\")."
    },
    "EA-R13": {
        "content": "Empty Link",
        "explanation": "This link has no content and no target (href-attribute).",
        "tip": "Remove empty links."
    },
    "EA-R14": {
        "content": "Link accessible text is a URL",
        "explanation": "Link texts should be meaningful and describe the purpose and target of the link. Screen reader users should be able to easily decide whether they want to follow a link.",
        "tip": "Make sure to use descriptions that describe the links purpose and target. The link text must also not be hidden to screen readers (e.g. with display: none or aria-hidden=\"true\")."
    },
    "EA-R15": {
        "content": "Link text is very long (>150 characters)",
        "explanation": "The accessible text of this link is very long (>150 characters) and can potentially be summarized. Many blind people read texts with the help of a Braille display. A Braille display can output at least 40 characters, but only a maximum of 80 characters.",
        "tip": "Make sure to use meaningful and compact texts."
    },
    "EA-R16": {
        "content": "<object> missing accessible name",
        "explanation": "<object> elements can contain multimedia content (audio, video, etc.) and must have an accessible name for screen readers. Screen reader users cannot know the object's contents without a text alternative.",
        "tip": "Add an accessible name to the <object> using a title or aria attributes like aria-label and aria-labelledby."
    },
    "EA-R17": {
        "content": "Audio detected",
        "explanation": "Check whether information is conveyed in the audio (e.g. via a commentary voice). If so, a transcription is required.",
        "tip": "Check that a transcription is required for the audio file. If so, provide an alternative, for example, via a text transcription."
    },
    "EA-R18": {
        "content": "Video detected",
        "explanation": "Check if the video requires a media alternative or caption. If a video is not captioned, deaf users will have limited or no access to the information it contains. Similarly, silent video files (without voice) are not available for blind users. They also need a full media alternative (text, alternative audio track, or audio file).",
        "tip": "Check if a media alternative or caption is needed with the video and provide it if necessary."
    },
    "EA-R19": {
        "content": "Multiple H1 headings detected",
        "explanation": "The headline structure of the page should be logically structured and, if possible, start with the H1 heading. The H1 heading identifies the most important parts of the page.",
        "tip": "If possible, only use one H1 heading. Structure further headings with H2, H3, etc."
    },
    "EA-R20": {
        "content": "Missing H1 heading",
        "explanation": "There is either no H1 heading, or it is hidden from screen readers. Check if the H1 heading exists and is visible, as it serves as the first and most important element of the heading structure (h1-h6). The <h1> element should be at the beginning of main content, allowing screen reader users to navigate directly to the main content using keyboard shortcuts.",
        "tip": "If possible, always create a visible <h1> heading that describes the content of the page."
    },
    "EA-R21": {
        "content": "Jump in the heading order",
        "explanation": "The headings structure of the page should be logically organized and heading levels should only increase by one. Avoid jumps, for example from H2 to H4.",
        "tip": "Try not to jump in the heading order."
    },
    "EA-R22": {
        "content": "A list item <li> is not part of a list",
        "explanation": "A valid list must always be framed by an <ul> or <ol> element. Otherwise, the list elements will not be correctly detected as a list by the screen reader. Watch out for possible roles of the <ul> or <ol> parent elements through the role attribute.",
        "tip": "Build a correct list with a <ul> or <ol> parent element. If you have already set an <ul> or <ol> element, watch out for possible roles through the role attribute."
    },
    "EA-R23": {
        "content": "Insufficient text contrast",
        "explanation": "Ensure all text elements have sufficient color contrast between the text in the foreground and background color behind it. The minimum contrast depends on the text size and is 3:1 or 4.5:1 for larger scale text (>18pt).",
        "tip": "Increase the contrast, e.g. with a darker/lighter font or background color."
    },
    "EA-R24": {
        "content": "Insufficient SVG contrast",
        "explanation": "The visual representation of SVGs must maintain a minimum contrast ratio of 3:1 for them to be perceived well.",
        "tip": "Increase the contrast of the SVG."
    },
    "EA-R25": {
        "content": "Check contrast manually",
        "explanation": "A very low contrast was detected. Sometimes this indicates the use of background images or gradients. Please check the contrast manually.",
        "tip": "Increase the contrast, e.g. with a darker/lighter font or background color. Make sure that text over background images has a sufficient contrast of 4.5:1 for smaller text and 3:1 for bigger text."
    },
    "EA-R26": {
        "content": "Page has no title",
        "explanation": "The title of the page is important to describe the subject or purpose of the page. It allows visitors to your website to quickly classify or find your content.",
        "tip": "Add a descriptive <title> element to the page."
    },
    "EA-R27": {
        "content": "Page title is very short",
        "explanation": "The title of the page is important to describe the subject or purpose of the page. It allows visitors to your website to quickly classify or find your content.",
        "tip": "Check that the title adequately describes the page."
    },
    "EA-R28": {
        "content": "<iframe> has no accessible name",
        "explanation": "The accessible name of an <iframe> is important to describe its topic or purpose. Screen reader users can access a list of titles for all frames on a page. However, navigating through <frame> and <iframe> elements can become difficult and confusing if the markup lacks a title attribute, particularly for users with disabilities.",
        "tip": "Add a descriptive title attribute to the <iframe>. Alternatively you can add aria attribute like aria-label or aria-labelledby."
    },
    "EA-R29": {
        "content": "Website language missing",
        "explanation": "For speech output from screen readers or the browser to work correctly, the language of the page must be specified. Screen readers use different sound libraries for different languages, based on the pronunciation and characteristics of that language. It is important to specify a language and ensure that it is valid so that website text is pronounced correctly.",
        "tip": "Add the lang-attribute to the HTML element of your page."
    },
    "EA-R30": {
        "content": "Incorrect page language",
        "explanation": "For speech output from screen readers or the browser to work correctly, the language of the page must be specified correctly. Otherwise, for example, the pronunciation of a speech output is incorrect.",
        "tip": "Check that the language in the HTML element is equal to the actual page language."
    },
    "EA-R31": {
        "content": "Abbreviation detected",
        "explanation": "Abbreviations are not always understandable to everyone and should be explained in the text or via HTML elements such as <abbr>.",
        "tip": "Check whether the abbreviation is already labeled. If not add the full text or use special HTML elements like <abbr>."
    },
    "EA-R32": {
        "content": "ID attribute value must be unique",
        "explanation": "An ID is a unique identifier for elements of the web page and accordingly must not be duplicated. Having duplicate IDs can lead to elements being skipped by screen readers. As of 2023 this is no longer a WCAG requirement unless it leads to a failure of another WCAG criterion.",
        "tip": "Rename the ID so that it is only used once on the page."
    },
    "EA-R33": {
        "content": "Image button missing accessible name",
        "explanation": "A graphical input (<input type=\"image\">) requires alternative text so that screen readers can reflect its purpose.",
        "tip": "Add a meaningful alt or ARIA attribute (aria-label or aria-labelledby) that describes the content and purpose of this image."
    },
    "EA-R34": {
        "content": "Reset button is not recommended",
        "explanation": "The use of reset buttons is not recommended, as they can easily be clicked by mistake.",
        "tip": "Remove the reset button if possible."
    },
    "EA-R35": {
        "content": "Form field missing accessible name",
        "explanation": "A form field needs an accessible name so that screen readers can reflect its purpose. This includes <input> and <select> elements or elements with a role of \"checkbox\", \"listbox\", \"searchbox\", \"spinbutton\" or \"textbox\" among other roles.",
        "tip": "Create an appropriate <label> for <input> or <select> elements. You can also use aria attributes like aria-label for elements with a role. The label should describe the purpose of this form field. When using a <label> use a for-attribute that matches the unique input's id."
    },
    "EA-R36": {
        "content": "<button> missing accessible name",
        "explanation": "A <button> or an <input> with type=\"button\" needs an accessible name so that screen readers can reflect its purpose.",
        "tip": "Insert a text in the button element's content or use aria attributes like aria-label or aria-labelledby to describe it's purpose."
    },
    "EA-R38": {
        "content": "<area> missing alternative text",
        "explanation": "Area elements identify areas within an image map that can be used to define clickable areas. These therefore need an accessible name so that screen readers can reflect their purpose.",
        "tip": "Add an alternative text to the area element, e.g. via the alt attribute or aira-labels."
    },
    "EA-R39": {
        "content": "Body is aria-hidden",
        "explanation": "The body element contains the attribute aria-hidden: \"true\" and the page is therefore not accessible for screen readers.",
        "tip": "Remove the aria-hidden attribute of the body element."
    },
    "EA-R40": {
        "content": "<select> missing accessible name",
        "explanation": "<select> elements must have an accessible name so that screen reader users can identify their purpose.",
        "tip": "Describe the purpose of the select list with a <label> element or aria attributes."
    },
    "EA-R41": {
        "content": "Duplicate accesskey attribute",
        "explanation": "The accesskey attribute can be used to specify a character on the keyboard that the user can press to jump directly to elements. A duplicate assignment is not permitted here and leads to unexpected behaviour.",
        "tip": "Change the access key attribute so that it is unique to the page."
    },
    "EA-R42": {
        "content": "Empty <th> element",
        "explanation": "The table head <th> element in a table describes the meaning of the respective column. Without visible text, the purpose of the row or column is unclear to both sighted and screenreader users.",
        "tip": "Insert a visible text content that describes the data in this column."
    },
    "EA-R43": {
        "content": "Headings must not be empty",
        "explanation": "This heading contains no text but can be reached by screen readers.",
        "tip": "Add a text to the heading or remove it."
    },
    "EA-R44": {
        "content": "Heading missing accessible name",
        "explanation": "This rule checks that each heading has a non-empty accessible name and is visible for screen readers. Screen readers notify users of the presence of a heading tag. If the heading is empty or the text is inaccessible, this could either confuse users or even keep them from accessing information about the structure of the page.",
        "tip": "Check if the heading has any content. The content may also be hidden using aria-hidden=\"true\" or display=\"none\"."
    },
    "EA-R45": {
        "content": "Paragraph has insufficient line-height",
        "explanation": "The line height of the paragraph (<p>) is less than 1.5. This can affect the readability of the text.",
        "tip": "Increase the line-height of the paragraph to at least 1.5"
    },
    "EA-R46": {
        "content": "!important letter-spacing in style attribute",
        "explanation": "This rule checks that the style attribute is not used to prevent adjusting letter-spacing by using !important, except if it is at least 0.12 times the font size. Using !important in the style attributes prevents this style from being overwritten.",
        "tip": "If possible, don't use !important in the style attribute or make sure the letter spacing is at least 0.12 times the font size."
    },
    "EA-R47": {
        "content": "!important word-spacing in style attribute",
        "explanation": "This rule checks that the style attribute is not used to prevent adjusting word-spacing by using !important, except if it is at least 0.16 times the font size. Using !important in the style attributes prevents this style from being overwritten.",
        "tip": "If possible, don't use !important in the style attribute or make sure the word-spacing is at least 0.16 times the font size."
    },
    "EA-R48": {
        "content": "!important line-height in style attribute",
        "explanation": "This rule checks that the style attribute is not used to prevent adjusting line-height by using !important, except if it is at least 1.5 times the font size. Using !important in the style attributes prevents this style from being overwritten.",
        "tip": "If possible, don't use !important in the style attribute or make sure the line-height is at least 1.5 times the font size."
    },
    "EA-R49": {
        "content": "<audio> or <video> element automatically plays audio",
        "explanation": "Audio or video that plays automatically cannot have audio that lasts for more than 3 seconds or needs an audio control mechanism to stop or mute it.",
        "tip": "Don't automatically play audio or make sure that there is an control mechanism to stop or mute available."
    },
    "EA-R50": {
        "content": "Invalid lang attribute detected",
        "explanation": "The lang attribute in the <html> element must be a valid language code and conform to the BCP 47 standard, e.g. \"de\" or \"en-us\".",
        "tip": "Make sure that a valid language code is set as the lang attribute of the <html> element."
    },
    "EA-R51": {
        "content": "Lang and xml:lang attributes do not match",
        "explanation": "The lang and xml:lang attributes on the <html>-element of a non-embedded HTML page need to have the same primary language subtag.",
        "tip": "Make sure the lang and xml:lang attributes on the <html>-element match."
    },
    "EA-R52": {
        "content": "<Iframe> elements with identical accessible names",
        "explanation": "<iframe> elements with identical accessible names should be avoided or at least embed the same resource or equivalent resources. Using the same accessible name can be misleading to screen reader users.",
        "tip": "Use unique title-Attributes for each frame or make sure that <iframe> elements with identical accessible names lead to the same resource."
    },
    "EA-R53": {
        "content": "<iframe> has negative tabindex",
        "explanation": "<iframe> elements with a negative tabindex attribute must not contain interactive elements. By setting the tabindex attribute value of an <iframe> element to -1 or some other negative number, it becomes impossible to move the focus into the browsing context of the <iframe> element.",
        "tip": "Remove the negative tabindex if the <iframe> contains focusable elements."
    },
    "EA-R54": {
        "content": "Meta viewport prevents zoom",
        "explanation": "Using <meta name=\"viewport\"> elements can limit the user's ability to zoom, especially on mobile devices. Zooming is a common and expected 'allowed' behavior on mobile web pages, so disabling it detracts from the mobile user experience especially for users with partial vision and low vision.",
        "tip": "Remove the user-scalable and maximum-scale attributes. Otherwise make sure that the content attribute doesn't set user-scalable to \"no\" and that the maximum-scale property is at least 2."
    },
    "EA-R55": {
        "content": "No data cells assigned to table header",
        "explanation": "This rule checks that each table header <th> has assigned cells <td> in a table element. If tables are not properly marked up, this creates the potential for confusing or inaccurate screen reader output.",
        "tip": "Remove table header cells that have no assigned cells or assign cells to the header."
    },
    "EA-R56": {
        "content": "Undefined ARIA attribute",
        "explanation": "This rule checks that each aria-* attribute specified is defined in <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA 1.1</a>. Invalid or misspelled aria attributes are not recognized by screen readers.",
        "tip": "Check that the aria attribute is not misspelled and specified in the <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA-specifications</a>. Make sure to use only valid aria attributes."
    },
    "EA-R57": {
        "content": "Unsupported ARIA state or property",
        "explanation": "This rule checks that <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria/\">WAI-ARIA</a> states or properties are allowed for the element they are specified on. The ARIA states or properties should be according to the official specification or they may be ignored or interpreted incorrectly by assistive technologies.",
        "tip": "Remove unspecified WAI-ARIA states or properties or correct them to a permitted value."
    },
    "EA-R58": {
        "content": "Invalid ARIA state or property value",
        "explanation": "This rule checks that the value of <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#state_prop_def\">ARIA states or properties</a> are allowed for the element they are specified on. The ARIA states or properties need to be according to the official specification or they are not accessible to assistive technology users.",
        "tip": "Remove unspecified ARIA values of states or properties or correct them to the correct value."
    },
    "EA-R59": {
        "content": "Autocomplete attribute is invalid",
        "explanation": "This rule applies to any HTML <input>, <select> and <textarea> element with an autocomplete attribute value. The autocomplete attribute needs a correct value to be recognized by the browser and screenreaders.",
        "tip": "Make sure <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete\">the autocomplete value</a> is supported."
    },
    "EA-R60": {
        "content": "No header cell assigned to data cells",
        "explanation": "This rule checks that each table header <th> has assigned cells <td> in a table element.",
        "tip": "Add a header cell <th> to every data cell <td> if possible."
    },
    "EA-R61": {
        "content": "Page has no heading",
        "explanation": "The document does not have any heading elements. Headings add structure to a website and help screen reader users to navigate and understand its content.",
        "tip": "Check if headings can be added to add structure to the website. Make sure to mark all heading texts correctly using using the tags <h1>-<h6> or with role=\"heading\"."
    },
    "EA-R62": {
        "content": "Presentational element has focusable descendants",
        "explanation": "This rule checks that elements with a role that makes its children presentational do not contain focusable elements, e.g. a link, button or input. Such elements are for example <button>, checkbox or <img>. Children of these elements are not detected correctly by assistive technologies and create an empty tab stop. ",
        "tip": "Don't add focusable elements as children of elements with a role that makes its children presentational e.g. a <button> or role=\"checkbox\"."
    },
    "EA-R63": {
        "content": "Decorative element is exposed to assistive technologies",
        "explanation": "This rule checks that elements marked as decorative either are not included in the accessibility tree or have a presentational role. Marking an element as decorative hides it from assistive technologies but making it focusable exposes it. Also some elements like <nav> can't have a decorative role if they own an accessible name, e.g. by an aria-label. This conflict should be avoided.",
        "tip": "Check if the element needs to be marked as decorative or hide it from assistive technologies, e.g. using aria-hidden=\"true\" or role=\"presentation\". In this case, also remove all aria label attributes."
    },
    "EA-R64": {
        "content": "Container missing required children",
        "explanation": "Some elements with an explicit semantic role need to have at least one of its required owned elements. For example, an element with the \"list\" role needs to own elements with the \"listitem\" role. Failing this requirement can make the element itself invalid.",
        "tip": "Check if the element role was used correctly or make sure to include the required child nodes."
    },
    "EA-R65": {
        "content": "Element missing required parent",
        "explanation": "Some elements with an explicit semantic role need to have a specific parent element. For example, an element with the \"listitem\" role needs a parent node with the \"list\" role. Failing this requirement makes the element itself invalid.",
        "tip": "Check if the element role was correctly used or make sure to use the required parent node and role."
    },
    "EA-R66": {
        "content": "Aria-hidden element has focusable content",
        "explanation": "By adding aria-hidden=\"true\" to an element, the element itself and all its descendants are hidden from assistive technologies. Exposing it to the sequential focus navigation may cause confusion for users of assistive technologies because the element can be reached, but it should be hidden.",
        "tip": "Check if the element needs to be hidden from assistive technology and if so remove it from the sequential focus navigation. To remove from the tab navigation, add the attribute tabindex=\"-1\", the style \"disabled:none\" or the disabled attribute."
    },
    "EA-R67": {
        "content": "Font size is very small",
        "explanation": "This rule checks that font sizes are larger than 9 pixels. Small font sizes are not easy to read and should be avoided if possible.",
        "tip": "Check if the font size can be increased to at least 10px. In general a font size of 16px or larger recommended for regular text."
    },
    "EA-R68": {
        "content": "Group is missing accessible name",
        "explanation": "Grouping related form controls makes forms more understandable for all users, as related controls are easier to identify. In order that assistive technologies can correctly identify the purpose of a group, it needs an accessible name, e.g. using a <legend> for a <fieldset> or aria attributes for elements with role=\"group\" or \"menubar\".",
        "tip": "Make sure that every group has an accessible name using aria-attributes like aria-label or a <legend> for a <fieldset>."
    },
    "EA-R69": {
        "content": "Headers attribute of cell references missing cell",
        "explanation": "The <a target=\"_blank\" href=\"https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140311/H43\">headers attribute</a> specifies one or more header cells a table cell is related to. It is only used by screen readers. This rule checks that the headers attribute on a cell refer to a corresponding cell in the same table element. If tables are not properly marked up, this creates the potential for confusing or inaccurate screen reader output.",
        "tip": "Check if there is another cell that has the id of the headers attribute value  in the same table. Otherwise either delete the headers attribute or create a corresponding cell with this id."
    },
    "EA-R70": {
        "content": "Element marked as decorative is exposed",
        "explanation": "This rule checks that elements marked as decorative either are not included in the accessibility tree, or have a presentational role. Marking an element as decorative hides it from assistive technologies, but making it focusable or adding ARIA attributes can expose it. This conflict should be avoided.",
        "tip": "Check if the element needs to be marked as decorative or hide it from assistive technologies, e.g. using aria-hidden=\"true\" or role=\"presentation\"."
    },
    "EA-R71": {
        "content": "Element with invalid lang attribute detected",
        "explanation": "Parts of a website can be marked as in a different language than the rest of the website using the lang attribute. The lang attribute of these elements must also be a valid language code and conform to the BCP 47 standard, e.g. \"de\" or \"en-us\".",
        "tip": "Make sure that a valid language code is set as the lang attribute of the element."
    },
    "EA-R72": {
        "content": "Link not distinguishable from surrounding text",
        "explanation": "This rule checks that inline links are distinguishable from the surrounding text through a difference not based on color alone. Links can be highlighted for example by underlining the text or using a border. Hover and focus states are also checked.",
        "tip": "Make sure that the link is distinguishable from the surrounding text not only by color. Also check this when hovering or focusing the link."
    },
    "EA-R73": {
        "content": "Menuitem missing accessible name",
        "explanation": "This rule checks that each element with a menuitem role has a non-empty accessible name. The menuitem role indicates the element is an option in a set of choices contained by a menu or menubar.",
        "tip": "Add an accessible name using the element's content or by using aria attributes."
    },
    "EA-R74": {
        "content": "Orientation of the page is restricted",
        "explanation": "This rule checks that page content is not restricted to either landscape or portrait orientation using the CSS transform property. Elements that are fixed to a certain rotation, using the orientation media feature with a value of landscape or portrait, can fail to rotate on mobile devices.",
        "tip": "Make sure that all elements on the website rotate correctly when switching from portrait to landscape mode."
    },
    "EA-R75": {
        "content": "Paragraph is all italic",
        "explanation": "While using italic text to highlight important content is good, avoid using italic text on longer paragraphs of text. Especially for people with dyslexia italic text can be more difficult to read.",
        "tip": "Avoid larger chunks of italic text and only use it to highlight important content."
    },
    "EA-R76": {
        "content": "Paragraph is all uppercase",
        "explanation": "While using uppercase text to highlight important content can be good, avoid using uppercase text on longer paragraphs of text. Especially for people with dyslexia uppercase text can be more difficult to read. Screen readers may also read each letter out individually.",
        "tip": "Avoid larger chunks of uppercase text and only use it to highlight important content."
    },
    "EA-R77": {
        "content": "Paragraphs of text is justified",
        "explanation": "People with certain cognitive disabilities have problems reading text that is both left and right justified. The uneven spacing between words in fully justified text can make reading difficult and, in some cases, impossible.",
        "tip": "Avoid using a justified text alignment in longer paragraphs of text."
    },
    "EA-R78": {
        "content": "Content is not included in a landmark region",
        "explanation": "<a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/general-principles.html\">Landmarks</a> programmatically identify sections of a page. It is a best practice to include all content on the page in landmarks, so that screen reader users who rely on them to navigate from section to section do not lose track of content. Example for regions are header, nav, footer or main. Native HTML5 landmarks such as &lt;nav&gt; are recommended over using ARIA roles such as role=\"nav\".",
        "tip": "Add all text elements to existing landmarks or create new ones. You can find an overview of <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/HTML5.html\">HTML landmarks here</a>."
    },
    "EA-R79": {
        "content": "<meta> element has refresh delay",
        "explanation": "This rule checks that the <meta> element is not used for delayed redirecting or refreshing. Because users do not expect a page to refresh automatically, such a refreshing can be disorienting. If a refresh or redirect is used, then the content attribute of the <meta> element has to be either 0 or greater than 72000 (20 hours).",
        "tip": "Don't use delayed refreshes or redirect or provide a functionality for the user to adjust the timer."
    },
    "EA-R80": {
        "content": "<meta> element has refresh delay (AAA)",
        "explanation": "This rule checks that the <meta> element is not used for delayed redirecting or refreshing. If a refresh or redirect is used, then the value of the <meta> element's content attribute has to be 0 without exception.",
        "tip": "Don't use delayed refreshes or redirect and set the delay to 0."
    },
    "EA-R81": {
        "content": "Region missing accessible name",
        "explanation": "The region role is used to identify document areas the author deems significant. Every region needs an accessible name so that screen reader users can identify its content and purpose.",
        "tip": "Add an accessible name to the region using aria attributes."
    },
    "EA-R82": {
        "content": "Element has invalid role",
        "explanation": "This rule checks that each role attribute has a valid value according to the <a target=\"_blank\" href=\"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles\">WAI-ARIA specifications</a>. Deprecated roles are also checked.",
        "tip": "Check the role attribute for spelling errors and whether the role exists in the specification."
    },
    "EA-R83": {
        "content": "Scrollable element is not keyboard accessible",
        "explanation": "This rule checks that scrollable elements can be scrolled by keyboard. To ensure there is some element from which arrow keys can be used to control the scroll position, focus must be on or in a scrollable region.",
        "tip": "Make sure that every scrollable element or one of its child elements is focusable."
    },
    "EA-R84": {
        "content": "Visible label is not part of accessible name",
        "explanation": "This rule checks that interactive elements like buttons or links have their full visible label as part of their accessible name, e.g., when using aria-label. This is especially important for users using speech input to control the website. Otherwise, the speech input cannot be interpreted correctly and may not work. Additional context that is not part of the visible name can be added using aria-describedby.",
        "tip": "Make sure that the entire visible label (not just a part) is included in the accessible name (set with e.g. aria-label)."
    },
    "EA-R85": {
        "content": "Insufficient text contrast (enhanced)",
        "explanation": "This is an AAA enhancement to the minimum contrast rule. Ensure that all text elements have sufficient color contrast between the foreground text and the background color behind it. The minimum enhanced contrast depends on the text size and is 7:1 or 4.5:1 for larger text.",
        "tip": "Increase the contrast, e.g., with a darker/lighter font or background color. Help is provided by the <a target=\"_blank\" href=\"https://dashboard.eye-able.com/tools/contrast-check\">contrast checker from Eye-Able</a> in the Dashboard under Tools."
    },
    "EA-R86": {
        "content": "ARIA Meter-element missing accessible name",
        "explanation": "A meter is a graphical display of a numeric value within a defined range. A element with the role \"meter\" must have an accessible name so that screen reader users can identify its content and purpose.",
        "tip": "Add an accessible name to the meter using a title, aria-label or aria-labelledby attribute."
    },
    "EA-R87": {
        "content": "ARIA Progressbar missing accessible name",
        "explanation": "A progressbar indicates the progress status for tasks that take a long time. A element with the role \"progressbar\" must have an accessible name so that screen reader users can identify its content and purpose.",
        "tip": "Add an accessible name to the progressbar using a title, aria-label or aria-labelledby attribute."
    },
    "EA-R88": {
        "content": "Missing aria-braille equivalent",
        "explanation": "This check ensures that there is a non-braille equivalent for aria-braillelabel and aria-brailleroledescription content. When used without a corresponding label or role description ARIA says to ignore these attributes.",
        "tip": "Ensure that you provide a non-braille equivalent for the mentioned aria attributes. This could be an aria-label or aria-roledescription attribute."
    },
    "EA-R89": {
        "content": "ARIA button, link or menuitem missing accessible name",
        "explanation": "It's crucial that every ARIA button (role=\"button\"), link (role=\"link\"), and menuitem (role=\"menuitem\") have a name that can be read by assistive technologies.",
        "tip": "Ensure each ARIA button, link, or menuitem has a descriptive and accessible name. You can use an inner text, a non-empty aria-label or aria-labelledby attribute."
    },
    "EA-R90": {
        "content": "Role missing required attributes",
        "explanation": "This rule checks that elements that have an explicit role also specify all required states and properties for that role. The state of the element is not communicated to screen reader users if a required attribute is omitted.",
        "tip": "Add the missing required ARIA attributes. For more information about the required attributes check the <a target=\"_blank\" href=\"https://www.w3.org/TR/wai-aria-1.1/#states_and_properties\">ARIA specification</a>."
    },
    "EA-R91": {
        "content": "ARIA tooltip missing accessible name",
        "explanation": "Every ARIA tooltip element (role=\"tooltip\") must have an accessible name that describes its purpose or function to assistive technology users.",
        "tip": "Ensure that every ARIA tooltip has a name that is clear and descriptive. This can be set using an visible inner text or attributes like aria-label and aria-labelledby."
    },
    "EA-R92": {
        "content": "<blink> element is deprecated",
        "explanation": "The <blink> element causes any text inside the element to blink at a predetermined rate. This cannot be interrupted by the user, nor can it be disabled as a preference. Therefore, content that uses blink fails the Success Criterion because blinking can continue for more than three seconds.",
        "tip": "Remove any <blink> elements from your webpage."
    },
    "EA-R93": {
        "content": "Page missing means to bypass repeated blocks",
        "explanation": "Providing ways to skip repetitive content aids users in navigating the site more effectively. This rule fails if the page has neither an internal skip link, a heading or a landmark region.",
        "tip": "Using <a target=\"_blank\" href=\"https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/\">appropriate landmarks elements</a> like &lt;nav&gt;, &lt;main&gt;, &lt;footer&gt;, <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">headings</a> or <a target=\"_blank\" href=\"https://www.w3.org/WAI/WCAG21/Techniques/html/H69.html\">internal skip links</a> can help users navigate the site more effectively."
    },
    "EA-R94": {
        "content": "Incorrect <dl> element structure",
        "explanation": "A definition list (<dl>) encloses a list of groups of terms (using <dt> elements) and descriptions (using <dd> elements) for example to display a glossary. A definition list is only allowed to contain <dt>, <dd>, <template>, <script> or <div> elements in a proper order.",
        "tip": "Check that your definition list contains only <dt>, <div> and <dd> elements. Also, make sure they are ordered correctly, <dt> should always come precede <dd> elements."
    },
    "EA-R95": {
        "content": "<dt> or <dd> element not contained <dl>",
        "explanation": "The description term <dt> and description details <dd> elements always have to be wrapped by a definition list <dl> element or the definition list is invalid. Otherwise assistive technologies might not be able to properly recognize the definition list.",
        "tip": "Make sure the parent element of <dt> or <dd> is a definition list <dl> or a <div> that is a child of a <dl>."
    },
    "EA-R96": {
        "content": "Form field has multiple labels",
        "explanation": "Each form field should have only one associated <label>. Otherwise there are inconsistencies in the way different assistive technologies and browser combinations interpret the label. Labels are connected to form fields using the for attribute on the <label> and the id attribute on the form field.",
        "tip": "Ensure each form field has only one associated <label>. Use the id of the form field to look for connected labels."
    },
    "EA-R98": {
        "content": "ARIA ID attribute value must be unique",
        "explanation": "An ID is a unique identifier for elements of the web page and accordingly must not be duplicated. This is especially important with ARIA elements as the id is used to attach accessible names or descriptions. Duplicate IDs are common validation errors that may break the accessibility of labels.",
        "tip": "Rename the ID so that it is only used once on the page. Make sure to check that your ARIA elements stay valid."
    },
    "EA-R99": {
        "content": "Lists must only contain <li> elements",
        "explanation": "Lists (<ul> or <ol>) need to be correctly structured to be readable and correctly announced by assistive technology. A list must only contain <li>, <script> or <template> as direct child nodes. The list items themselves can contain other elements.",
        "tip": "Make sure your list node (<ul> or <ol>) only has list item (<li>) as direct child nodes."
    },
    "EA-R101": {
        "content": "Avoid using <marquee> elements",
        "explanation": "The <marquee> element creates scrolling text that is difficult to read and click on. The <marquee> element is deprecated and can cause accessibility and usability issues, especially because it is hard to pause.",
        "tip": "Replace <marquee> elements with modern CSS animations or other techniques."
    },
    "EA-R102": {
        "content": "Avoid using server-side image maps",
        "explanation": "Server-side image maps are not accessible for keyboard users, who must use mouse clicks to access linked content. This makes the image inaccessible for those who navigate solely with a keyboard. Additionally, text alternatives cannot be provided for the interactive zones of a server-side image map, as can be done with client-side image maps.",
        "tip": "Use client-side image maps or other interactive elements for better accessibility."
    },
    "EA-R104": {
        "content": "Touch target is too small",
        "explanation": "Touch targets must be of sufficient size and spacing to be easily activated without unintentionally activating an adjacent target. Touch targets must be at least 24 x 24 CSS pixels in size or have a distance of 24px to the next target. Large touch targets help prevent user errors and ensure a better experience for mobile users. This rule depends on the viewport size and scroll position.",
        "tip": "Make sure your touch target is at least 24 x 24 CSS pixels in size or has a distance of 24px to the next target. There is an exception if there is another control that can provide the underlying functionality that meets the minimum size."
    },
    "EA-R105": {
        "content": "Ensure appropriate values for role attribute",
        "explanation": "Inappropriate role values can confuse assistive technology users or result in elements being ignored.",
        "tip": "Validate that the role attribute has a suitable value for the given element."
    },
    "EA-R106": {
        "content": "ARIA dialog missing accessible name",
        "explanation": "Screen reader users cannot understand the purpose of ARIA dialogs (elements with role=\"dialog\" or role=\"alertdialog\") that do not have an accessible name. An accessible name provides context to the dialog enabling screen reader users to understand its purpose and function.",
        "tip": "Make sure that the ARIA dialog has an accessible name. Use the aria-label or aria-labelledby attributes for this."
    },
    "EA-R107": {
        "content": "Ensure correct use of role=\"text\"",
        "explanation": "The role=\"text\" should be used on elements with no focusable descendants to avoid navigational challenges for screen reader users.",
        "tip": "Use role=\"text\" for elements without focusable child elements."
    },
    "EA-R108": {
        "content": "ARIA treeitem missing accessible name",
        "explanation": "A tree (role=\"tree\") is a hierarchical list with parent and child nodes that can be expanded and collapsed. A treeitem (role=\"treeitem\") is a node in a tree. Without an accessible name, screen readers are unable to determine the purpose of the treeitem.",
        "tip": "Assign an descriptive name to the treeitem using an inner text, an aria-label or aria-labelledby."
    },
    "EA-R110": {
        "content": "Form element missing a visible label",
        "explanation": "Visible labels improve form accessibility by providing clear context for sighted users. Relying solely on hidden labels, title, or aria-describedby can be limiting. The title and aria-describedby attributes provide additional information like hints. Because hints are presented differently than labels to accessibility APIs, this can cause problems with assistive technologies.",
        "tip": "Provide a visible and clear label. Ideally use a <label> element. If not possible aria-label or aria-labelledby can also be used."
    },
    "EA-R111": {
        "content": "Banner landmark is not at top level",
        "explanation": "With <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, blind users using a screen reader have the ability to jump to sections of a web page. The banner role (role=\"banner\") is for defining a global site header for example a search feature, the global navigation or a slogan. If the banner landmark is not a top-level landmark (and is contained within another landmark), it does not effectively define the predetermined header portion of the layout.",
        "tip": "Make sure that each banner landmark is not contained within another landmark."
    },
    "EA-R112": {
        "content": "Complementary landmark is not at top level",
        "explanation": "With <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, blind users using a screen reader have the ability to jump to sections of a web page. Complementary content like &lt;aside&gt; or role=\"complementary\" complements the main content of a document or page. Screen reader users have the option to skip complementary content when it appears at the top level of the page. This option is not available if you embed an &lt;aside&gt; element in another landmark.",
        "tip": "Make sure that each complementary landmark (&lt;aside&gt; or role=\"complementary\") is not contained within another landmark."
    },
    "EA-R113": {
        "content": "Contentinfo landmark is not at top level",
        "explanation": "With <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, blind users using a screen reader have the ability to jump to sections of a web page. The contentinfo role (role=\"contentinfo\") defines a footer, containing information such as copyright information, navigation links, and privacy statements. Placing it within another landmark can prevent blind screen reader users from quickly finding and navigating to the footer.",
        "tip": "Make sure the contentinfo landmark (role=\"contentinfo\") is not contained within another landmark."
    },
    "EA-R114": {
        "content": "Main landmark is not at top level",
        "explanation": "With <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, blind users using a screen reader have the ability to jump to sections of a web page. The main landmark (&lt;main role=\"main\"&gt;) role is used to indicate the primary content of a document. It is a best practice to ensure the main landmark is not contained within another landmark.",
        "tip": "Make sure the main landmark (&lt;main role=\"main\"&gt;) is not contained within another landmark."
    },
    "EA-R115": {
        "content": "More than one banner landmark exists",
        "explanation": "With <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, blind users using a screen reader have the ability to jump to sections of a web page. Having multiple banner landmarks can confuse screen reader navigation, making it more difficult to discern the primary header or introductory content.",
        "tip": "Make sure that each HTML page has only one banner landmark. Decide which banner landmark you want to keep and remove all other banner landmarks."
    },
    "EA-R116": {
        "content": "More than one contentinfo landmark exists",
        "explanation": "With <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, blind users using a screen reader have the ability to jump to sections of a web page. Multiple contentinfo landmarks (role=\"contentinfo\") can confuse assistive technology users by suggesting multiple footer regions.",
        "tip": "Make sure that each HTML page has only one contentinfo landmark. Decide which contentinfo landmark you want to keep and remove all other landmarks."
    },
    "EA-R117": {
        "content": "More than one main landmark exists",
        "explanation": "With <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, blind users using a screen reader have the ability to jump to sections of a web page. The main landmark (&lt;main role=\"main\"&gt;) role is used to indicate the primary content of a document. Multiple main landmarks can make it challenging for users to identify the core content area.",
        "tip": "Restrict your page to one main landmark (&lt;main role=\"main\"&gt;) to clearly indicate the primary content. Remove duplicate main landmarks."
    },
    "EA-R118": {
        "content": "Main landmark is missing",
        "explanation": "With <a target=\"_blank\" href=\"https://www.w3schools.com/accessibility/accessibility_landmarks.php\">landmarks</a>, blind users using a screen reader have the ability to jump to sections of a web page. Content outside of these sections is difficult to find, and its purpose may be unclear. A main landmark (&lt;main role=\"main\"&gt;) provides a quick way for assistive technology users to navigate to the primary content.",
        "tip": "Add a main landmark (<main>) to your website and include the main content of your page within it."
    },
    "EA-R119": {
        "content": "Landmark is not unique",
        "explanation": "Unique landmarks assist users in distinguishing between different sections of content. Duplicate landmarks can confuse users and make it difficult to navigate to the desired content. Some landmarks like <header> or <footer> can only exist once per page, while others like <nav> or <section>, need to have unique accessible names (e.g. from aria-label or aria-labelledby).",
        "tip": "Make sure the landmark has a unique role or role/label/title combination. For example, change the label to make the region unique."
    },
    "EA-R120": {
        "content": "Scope attribute in table is incorrect",
        "explanation": "The scope attribute in tables helps assistive technology users understand the relationship between headers and data cells. The scope attribute can only be used on table headers <th> and must have the value \"col\" or \"row\".",
        "tip": "Make sure that the scope attribute is used only on table headers <th> and that the value is \"col\" or \"row\"."
    },
    "EA-R121": {
        "content": "Page is missing a skip link",
        "explanation": "Skip links provide a link at the top of the page that, when activated, jumps the user to the beginning of the main content area. Otherwise, keyboard and screen reader users must navigate a long list of navigation links and other elements before ever reaching the main content. A typical skip link is \"skip to content\" using a link with an anchor link (e.g. #main-content). It is recommended that the link is hidden until the user navigates to it with a keyboard.",
        "tip": "Add a skip link to the main content to the page. If you already have a skip link, make sure it can be reached with the keyboard."
    },
    "EA-R122": {
        "content": "Ensure tabindex values are 0 or negative",
        "explanation": "Using tabindex values greater than 0 can disrupt the natural tab order, causing navigation difficulties for keyboard and assistive technology users.",
        "tip": "Set tabindex values to 0 or leave them unset for natural tab order. Use negative values for programmatically focusable elements."
    },
    "EA-R123": {
        "content": "Table has identical caption and summary",
        "explanation": "Having the same text in a table's <caption> element and its summary attribute is redundant and can potentially be confusing. The <caption> element is used as an on-screen title, while the summary attribute is used by screen readers to access a summary of the table's purpose.",
        "tip": "Make sure the <caption> text is different from the table's summary attribute to avoid confusion."
    },
    "EA-R124": {
        "content": "Identical links with different targets",
        "explanation": "Links with the same accessible name should have the same functionality/target to prevent confusion. The link description allows a user to distinguish each link from links on the web page that lead to other destinations and helps the user decide whether to follow the link.",
        "tip": "Avoid having links with identical descriptions (e.g. from inner text, alt- or aria-attributes) that direct to different URLs. Provide a link text that describes the purpose and target of the link."
    },
    "EA-R125": {
        "content": "Prüfen Sie, dass die Sprache der Seite korrekt ausgezeichnet ist",
        "explanation": "Die hinterlegte Sprache passt nicht zu allen Elementen auf der Seite. Dies ist erlaubt, wenn diese Elemente durch ein eigenes lang-Attribut korrekt ausgezeichnet werden. Andernfalls ist beispielsweise die Aussprache einer Sprachausgabe inkorrekt.",
        "tip": "Prüfen Sie, dass alle anderssprachigen Blöcke auf der Seite mit dem richten lang-Attribut versehen sind."
    }
};