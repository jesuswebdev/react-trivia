import axios from "axios";
import { API_URL, GUEST_TOKEN } from "../config";

export const parseGameDuration = duration => {
  duration = Math.floor(duration / 1000);
  return `${
    duration / 60 > 1 ? `${Math.floor(duration / 60)}m` : ""
  } ${duration % 60}s`;
};
export const parseQuestionDuration = duration => {
  return Number(duration / 1000).toFixed(1);
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
  baseURL: API_URL,
  headers: {
    Authorization: "Bearer " + GUEST_TOKEN
  }
});
