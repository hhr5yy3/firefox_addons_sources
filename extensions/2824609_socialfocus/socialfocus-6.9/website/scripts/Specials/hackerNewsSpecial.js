function formatHackerNewsNavigationElements(optionId, checkedValue) {
  let link = getNavigationElement(optionId);

  if (link instanceof Element) {
    if (link.tagName === "A" && !link.nextSibling) {
      link = document.querySelector(".topsel"); // we have wrapper on selected nav item then the sibling element("|" symbol which need to remove) is span with class topsel
    }

    removeVerticalLine(link, checkedValue);
  }

  if (link instanceof NodeList) {
    link.forEach((item) => removeVerticalLine(item, checkedValue));
  }
}

function getNavigationElement(optionId) {
  let element;

  switch (optionId) {
    case "socialFocus_hacker-news_navigation_hide_new": {
      element = document.querySelector('a[href="newest"]');
      break;
    }

    case "socialFocus_hacker-news_navigation_hide_submit": {
      element = document.querySelector('a[href="submit"]');
      break;
    }

    case "socialFocus_hacker-news_navigation_hide_past": {
      element = document.querySelector('a[href="front"]');
      break;
    }

    case "socialFocus_hacker-news_navigation_hide_comments": {
      element = document.querySelector('a[href="newcomments"]');
      break;
    }

    case "socialFocus_hacker-news_navigation_hide_ask": {
      element = document.querySelector('a[href="ask"]');
      break;
    }

    case "socialFocus_hacker-news_navigation_hide_show": {
      element = document.querySelector('a[href="show"]');
      break;
    }

    case "socialFocus_hacker-news_navigation_hide_jobs": {
      element = document.querySelector('a[href="jobs"]');
      break;
    }

    case "socialFocus_hacker-news_post_hide_hide_button": {
      element = document.querySelectorAll(".subline .clicky.hider");
      break;
    }

    default:
      element = null;
  }

  return element;
}

function removeVerticalLine(link, checkedValue) {
  const nextSibling = link.nextSibling;

  if (nextSibling && nextSibling.nodeType === Node.TEXT_NODE) {
    if (checkedValue) {
      nextSibling.nodeValue = nextSibling.nodeValue.replace("|", "");
    } else {
      if (nextSibling.nodeValue.includes("|")) {
        return;
      } else {
        nextSibling.nodeValue = nextSibling.nodeValue.concat("|") + " ";
      }
    }
  }
}
