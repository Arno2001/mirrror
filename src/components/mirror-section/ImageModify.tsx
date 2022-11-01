import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { modifyTypes } from "../../types/modifyTypes";
import styles from "./mirror.module.css";
import refreshImage from "../../assets/images/modifyPage/newImage.png";
import deleteImg from "../../assets/images/modifyPage/delete.png";
import DeletePopUp from "../popUps/delete-popup";
import { Oval } from 'react-loader-spinner';

export default function ImageModify({ data, onFlip }: modifyTypes) {
  const [imageName, setImageName] = useState<string | null>(null);
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const loader = useRef<HTMLDivElement>(null);
  const loaderImage = useRef<any>(null);

  useEffect(() => {
    const imgName = localStorage.getItem('fileName')
    if (imgName !== null) {
      setImageName(imgName.slice(1, imgName.length - 1));
    }
  }, [])

  setTimeout(() => {
    if (loader.current !== null && loaderImage.current !== null) {
      loader.current.style.display = 'none';
      loaderImage.current.style.display = 'block';
    }
  }, 2000)

  // Mirror scale  
  let mirror;
  if (data.flipHorizontal && !data.flipVertical) {
    mirror = "flipX";
  } else if (data.flipVertical && !data.flipHorizontal) {
    mirror = "flipY";
  } else if (data.flipHorizontal && data.flipVertical) {
    mirror = "flipXY";
  } else {
    mirror = "flip";
  }

  const deletePopup = (e: any) => {
    e.preventDefault()
    setDeletePopUp(!deletePopUp)
  }

  return (
    <div className={styles.uploadedimage}>
      <div className={styles.processing} ref={loader}>
        <h2 className={styles.processingName}>Processing...</h2>
        <div className={styles.loaderPart}>
          <div className={styles.designLoader}></div>
          <div className={styles.loader}>
            <Oval
              height={80}
              width={80}
              color="rgb(74,187,252)"
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="lightgrey"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        </div>
      </div>
      <div className={styles.imagePart} ref={loaderImage}>
        <div className={styles.imageButtonPart}>
          <button>
            <Image src={refreshImage} alt='new Image' />
          </button>
          <button onClick={deletePopup} className={styles.deleteButton}>
            <Image src={deleteImg} alt='Delete Image' />
          </button>
        </div>
        <div className={styles.imageSuccess}>
          <Image src={'/images/' + (imageName ? imageName : '')} width={780} height={520} objectFit='contain' alt="Modified" className={mirror} />
        </div>
      </div>
      {deletePopUp
        ? <DeletePopUp data={data} onFlip={onFlip} imageName={imageName} setDeletePopUp={setDeletePopUp} />
        : ''
      }
    </div>
  )
}