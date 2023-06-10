import axios from "axios";
import { option } from "fp-ts";
import * as Opt from "fp-ts/Option";
import { pipe } from "fp-ts/lib/function";
import jwtDecode from "jwt-decode";
import { navigate } from "svelte-navigator";

export type JwtPayload = {
  id: number;
  email: string;
  role: string;
  domaine: string;
  specialty: string;
};

export function hasFields(x: unknown, fields: string[]): boolean {
  if (typeof x === "object" && x) {
    let b = true;
    for (let i = 0; i < fields.length; i++) {
      b = b && fields[i] in x;
    }
    return b;
  }
  return false;
}

export function isJwtPayload(x: unknown): boolean {
  return hasFields(x, ["id", "email", "role", "domaine", "specialty"]);
}

export function logAndReturn<T>(x: T): T {
  // console.log(x);
  return x;
}

export const serverUrlBase = "http://localhost:8000";

export const decodeJwt = (jwt: string): JwtPayload =>
  pipe(jwt, jwtDecode<{ user_data: JwtPayload }>, (jwt) => jwt.user_data);
export const decodeJwtFromStore = (): option.Option<{
  user_data: JwtPayload;
}> =>
  pipe(
    localStorage.getItem("Auth"),
    option.fromNullable,
    option.map((jwt) => jwtDecode<{ user_data: JwtPayload }>(jwt))
  );
export const getJwt = (): option.Option<string> =>
  option.fromNullable(localStorage.getItem("Auth"));
export const setJwt = (jwt: string) => localStorage.setItem("Auth", jwt);

export const axiosConfig = {
  headers: {
    Auth: pipe(
      getJwt(),
      option.match(
        () => "",
        (x) => x
      )
    ),
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export function handleAxiosError(
  e: unknown,
  failure: () => void,
  fatal: () => void
) {
  if (axios.isAxiosError(e)) {
    if (e.status === 403) {
      navigate("/login");
    } else {
      failure();
    }
  } else {
    fatal();
  }
}

export function convertTimeToDate(time: number) {
  let date = new Date(time * 1000);

  // Hours part from the timestamp
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();

  let year = date.getFullYear().toString();
  let month = "0" + date.getMonth();
  let day = "0" + date.getDay();

  // Will display time in 10:30:23 format
  let formattedTime =
    day.substring(-2) +
    "-" +
    month.substr(-2) +
    "-" +
    year +
    " " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);
  return formattedTime;
}

export function formDataToObject(formData: any) {
  const normalizeValues = (values: string | any[]) =>
    values.length > 1 ? values : values[0];
  const formElemKeys = Array.from(formData.keys());

  return Object.fromEntries(
    // store array of values or single value for element key
    formElemKeys.map((key) => [key, normalizeValues(formData.getAll(key))])
  );
}

export function getRandom(items: any[]) {
  return Math.floor(Math.random() * items.length);
}
