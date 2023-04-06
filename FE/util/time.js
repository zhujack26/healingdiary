import moment from "moment-timezone";

export const timeAgo = (date) => {
  const timezone = "Asia/Seoul";
  const now = moment().tz(timezone);
  const targetDate = moment.utc(date).tz(timezone);
  const seconds = Math.floor((now - targetDate) / 1000);
  if (seconds < 60) {
    return "몇초전";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days}일 전`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}개월 전`;
  }

  const years = Math.floor(months / 12);
  return `${years}년 전`;
};
