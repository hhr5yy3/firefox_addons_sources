import validUrl from './validUrl';

describe('validUrl', () => {
  it('should be url when https protocol is set', () => {
    const url = 'https://www.foo.bar';
    expect(validUrl(url)).toBe(true);
  });

  it('should be url when http protocol is set', () => {
    expect(validUrl('http://www.foo.bar')).toBe(true);
  });

  it('should be url when no protocol', () => {
    expect(validUrl('www.foo.bar')).toBe(true);
  });

  it('should be url when ww3 set', () => {
    expect(validUrl('ww3.schoole.com')).toBe(true);
  });

  it('ip is supported as url', () => {
    expect(validUrl('192.88.99.0')).toBe(true);
  });

  it('ip with url params is supported as url', () => {
    expect(validUrl('192.88.99.0/test')).toBe(true);
  });

  it('test string is not url', () => {
    expect(validUrl('test')).toBe(false);
  });

  it('test for undefined input', () => {
    expect(validUrl(undefined as any)).toBe(false);
  });

  it('test for null input', () => {
    expect(validUrl(null as any)).toBe(false);
  });

  it('domain with top-level domain should be valid url', () => {
    expect(validUrl('test.lt')).toBe(true);
  });

  it('url with shebangs should be valid', () => {
    expect(validUrl('https://primarycarearfoxhall.followmyhealth.com/Login/Home/Index#!/default#%2Fdefault')).toBe(true);
  });

  it('url with spaces should be invalid', () => {
    expect(validUrl('www. test .lt')).toBe(false);
  });
});
