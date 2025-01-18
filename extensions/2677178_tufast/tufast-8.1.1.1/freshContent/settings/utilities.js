export const time = {
  getMinutes: (clicks) => {
    const clickValue = clicks * 3;
    return Math.floor(clickValue / 60) ?? 0;
  },
  getSeconds: (clicks) => {
    const clickValue = clicks * 3;
    return clickValue % 60;
  }
};
