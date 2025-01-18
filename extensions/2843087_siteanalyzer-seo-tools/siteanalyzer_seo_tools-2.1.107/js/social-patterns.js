const socialPatterns = {
  vk: [
    "vk.com",
    "vkontakte.ru"
  ],
  telegram: [
    "t.me"
  ],
  facebook: [
    "facebook.com",
    "fb.com"
  ],
  twitter: [
    "twitter.com",
    "x.com",
  ],
  instagram: [
    "instagram.com"
  ],
  youtube: [
    "youtube.com",
    "youtu.be"
  ],
  pinterest: [
    "pinterest.com"
  ],
  discord: [
    "discord.com",
    "discord.gg"
  ],
  linkedin: [
    "linkedin.com"
  ],
};

/**
 * @param {string[]} links
 */
function findSocialLinks(links) {
  const socialLinks = {};
  const keys = Object.keys(socialPatterns);

  keys.forEach((key) => {
    const patterns = socialPatterns[key];
    const foundedLinks = [];

    links.forEach((link) => {
      for (const pattern of patterns) {
        if (link.includes(pattern)) {
          foundedLinks.push(link);
          break;
        }
      }
    });

    socialLinks[key] = foundedLinks;
  });

  return socialLinks;
}

function isLinkSocial(link) {
  const keys = Object.keys(socialPatterns);

  for(const key of keys) {
    const patterns = socialPatterns[key];
    for (const pattern of patterns) {
      if (link.includes(pattern)) {
        return true;
      }
    }
  }

  return false;
}