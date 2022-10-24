import axios from "axios";
import React, { useState } from "react";
import { mirrorTypes } from "../types/mirrorTypes";

export default function ImageMirror({ data, onFlip, setModifyFlag, imageName }: mirrorTypes) {
  const [flipH, setFlipH] = useState<[string, string]>(["\u25EE", "\u25ED"]);
  const [flipV, setFlipV] = useState<[string, string]>(["\u25EE", "\u25ED"]);

  // Mirror flip image horizontal
  const flipHorizontal = () => {
    axios.put('/api/mirror/flip', { flipX: !data.flipHorizontal, flipY: data.flipVertical, imageName: imageName }).then((res) => {
      console.log(res);
      
    });
    setFlipH([flipH[1], flipH[0]]);
    setModifyFlag(false);
    onFlip(
      {
        ...data,
        count: data.count + 1,
        flipHorizontal: !data.flipHorizontal,
        flipVertical: data.flipVertical
      }
    );
  }

  // Mirror flip image vertical
  const flipVertical = () => {
    axios.put('/api/mirror/flip', { flipX: data.flipHorizontal, flipY: !data.flipVertical, imageName: imageName });
    setFlipV([flipV[1], flipV[0]]);
    setModifyFlag(false);
    onFlip(
      {
        ...data,
        count: data.count + 1,
        flipHorizontal: data.flipHorizontal,
        flipVertical: !data.flipVertical
      }
    );
  }

  return (
    <>
      <button className="flip-horizontal" onClick={flipHorizontal}>{flipH[0]}</button>
      <button className="flip-vertical" onClick={flipVertical}><div>{flipV[0]}</div></button>
    </>
  )
}