import { dataTypes } from "./dataTypes";

export type deleteTypes = {
  data: dataTypes;
  onFlip: Function;
  imageName: string | null;
  setDeletePopUp: Function;
}