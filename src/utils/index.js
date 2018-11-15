import axios from "axios";

export const shuffleOptions = options => {
  let ramdomized = [];
  let finished = false;

  while (!finished) {
    let index = Math.floor(Math.random() * 4);

    if (!ramdomized.some(r => r === index)) {
      ramdomized.push(index);
    }
    if (ramdomized.length === 4) {
      finished = true;
    }
  }
  return [...Array(4)].map((_, i) => options[ramdomized[i]]);
};

const addZero = number => {
  return number < 10 ? "0" + number : number;
};

export const transformDate = date => {
  const newDate = new Date(date);
  const fullDate = `${addZero(newDate.getHours())}:${addZero(
    newDate.getMinutes()
  )} del 
  ${addZero(newDate.getDate())}-${addZero(
    newDate.getMonth() + 1
  )}-${newDate.getFullYear()}`;
  return fullDate;
};

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});
