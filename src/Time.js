const padLeft = (number) => {
  if (number < 10) {
    return "0" + number;
  }
  return number;
};

const Time = ({ timestamp }) => {
  const date = new Date(timestamp);
  const hours = padLeft(date.getHours());
  const minutes = padLeft(date.getMinutes());
  const seconds = padLeft(date.getSeconds());
  const day = padLeft(date.getDay() + 2);
  const month = padLeft(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export default Time;
