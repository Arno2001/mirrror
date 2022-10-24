import { useReducer } from "react";
import Reducer from "../src/components/AppReducer";
import Header from "../src/components/Header";
import ImageModify from "../src/components/ImageModify";
import ToolsMenu from "../src/components/ToolsMenu";

export default function Modify() {
  const [data, dispatch] = useReducer(Reducer, []);

  const imageSizes = (sizes: object) => {
    dispatch({
      type: 'sizes',
      payload: {
        sizes: sizes,
      }
    });
  }
  const onFlipFunc = (flip: boolean) => {
    dispatch({
      type: 'flip',
      payload: {
        updated: flip
      }
    });
  }
  return (
    <div className="App" >
      <Header />
      < div id='modify-image' >
        <ToolsMenu data={data} onFlip={onFlipFunc} />
        <ImageModify data={data} imageSizes={imageSizes} />
      </div>
    </div>
  )
}