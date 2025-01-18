Sentry.init({
  ...window.SENTRY,
  release: "3.6.12",
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "CreateHTMLCallback"
  ]
});
