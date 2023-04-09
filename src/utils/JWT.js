import { decode } from "jsonwebtoken";

export function decodeJWT(token) {
  return decode(token);
}