import { dataTypes } from "./dataTypes";

export type mirrorTypes = {
  data: dataTypes;
  onFlip: Function;
  setModifyFlag: Function;
  imageName: string;
}