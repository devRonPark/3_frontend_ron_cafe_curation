const timeFormatForTimer = time => {
  const minutes = Math.floor(time / 60).toString();
  const seconds = (time % 60).toString();

  return `
    ${minutes.length === 1 ? `0${minutes}` : minutes} :
    ${seconds.length === 1 ? `0${seconds}` : seconds}
  `;
};
// 10분으로 설정된 타이머
export const tenMinuteTimer = (start, func) => {
  const timerId = setInterval(() => {
    const endTime = start.getTime() + 601000;
    const currentTime = new Date().getTime();
    const gap = Math.floor((endTime - currentTime) / 1000);
    if (gap < 1) {
      return () => clearInterval(timer);
    }
    const leftTime = timeFormatForTimer(gap);
    func(leftTime);
  }, 1000);
  return timerId;
};
