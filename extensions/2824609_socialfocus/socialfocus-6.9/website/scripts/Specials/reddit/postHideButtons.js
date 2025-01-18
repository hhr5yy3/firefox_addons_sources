function handlePostHideButtons(isInit, checkedValue, typeButtonToHide) {
  function getPostHideButtonsContainer() {
    const redditPostContainer = document.querySelector("shreddit-post");

    if (!redditPostContainer || !redditPostContainer.shadowRoot) {
      return null;
    }

    const postButtonSection = redditPostContainer.shadowRoot.querySelector(
      `div:has(span[data-post-click-location="vote"])`
    );

    return postButtonSection;
  }

  if (isInit) {
    const observer = new MutationObserver(() => {
      const postButtonSection = getPostHideButtonsContainer();

      if (postButtonSection) {
        observer.disconnect();

        hideCheckPostButtons(postButtonSection, checkedValue, typeButtonToHide);
      }
    });

    observer.observe(document, { childList: true, subtree: true });
  } else {
    const postButtonSection = getPostHideButtonsContainer();

    if (postButtonSection) {
      hideCheckPostButtons(postButtonSection, checkedValue, typeButtonToHide);
    }
  }
}

function hideCheckPostButtons(
  postsButtonSection,
  checkedValue,
  typeButtonToHide
) {
  const isHideButtonValue = checkedValue
    ? "display: none !important;"
    : "display: block !important;";

  const commentsButton = postsButtonSection.querySelector(
    `button[data-post-click-location="comments-button"]`
  );

  const upDownVoteButtons = postsButtonSection.querySelector(
    `span:has(span[data-post-click-location="vote"])`
  );

  const voteCounts = postsButtonSection.querySelector(
    `span > span[data-post-click-location="vote"] span:has(faceplate-number)`
  );

  const shareButton = postsButtonSection.querySelector(
    `slot[name="share-button"]`
  );

  const awardsButton = postsButtonSection.querySelector("award-button");

  switch (typeButtonToHide) {
    case "comments":
      commentsButton.style.cssText = isHideButtonValue;
      break;

    case "upDownVote":
      upDownVoteButtons.style.cssText = isHideButtonValue;
      break;

    case "voteCounts":
      voteCounts.style.cssText = isHideButtonValue;
      break;

    case "share":
      shareButton.style.cssText = isHideButtonValue;
      break;

    case "awards":
      awardsButton.style.cssText = isHideButtonValue;
      break;

    default:
      break;
  }
}
