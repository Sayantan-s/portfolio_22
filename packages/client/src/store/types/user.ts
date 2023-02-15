import { User } from "./auth";

export interface IUpdateUser {
  userId: string;
  details: User["details"];
}
