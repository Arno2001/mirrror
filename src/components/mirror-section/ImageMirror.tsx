import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { mirrorTypes } from "../../types/mirrorTypes";
import horizontal from '../../assets/images/modifyPage/flip-horizontal.png'
import vertical from '../../assets/images/modifyPage/flip-vertical.png'
import styles from './mirror.module.css'

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
    <div className={styles.flipButtons}>
      <button className={styles.flipHorizontal} onClick={flipHorizontal}>
        <div>
          <Image src={horizontal} alt='flip horizontal' width={27} height={26}/>
        </div>
        <span>Flip Horizontally</span>
      </button>
      <button className={styles.flipVertical} onClick={flipVertical}>
        <div>
          <Image src={vertical} alt='flip vertical' width={27} height={26}/>
        </div>
        <span>Flip Vertically</span>
      </button>
    </div>
  )
}