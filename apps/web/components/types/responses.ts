import { iBloodtype, iDistrcits } from "../constants";

export interface IAnnouncement {
  age: number;
  bloodtype: iBloodtype;
  date: string;
  district: iDistrcits;
  hospital: string;
  id: number;
  name: string;
  surname: string;
  note: string;
  phonenumber: string;
}
