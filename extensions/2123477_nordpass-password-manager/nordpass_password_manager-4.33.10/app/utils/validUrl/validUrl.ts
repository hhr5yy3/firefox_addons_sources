import isUrl from 'is-url';

const validURL = (url: string): boolean => {
  if (isUrl(url)) {
    return true;
  }
  // isUrl does not assume URI's without protocol to be URI's
  return isUrl(`https://${url}`);
};

export default validURL;
