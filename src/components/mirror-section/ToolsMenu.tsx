import React, { LegacyRef, useEffect, useRef, useState } from "react";
import ImageMirror from "./ImageMirror";
import { toolsTypes } from "../../types/toolsTypes";
import sharedPart from '../../assets/images/modifyPage/shareLogo.png'
import downloadPart from '../../assets/images/modifyPage/download.png'
import styles from './mirror.module.css'
import Image from "next/image";
import SharePopUp from "../popUps/share-popup";
import Link from "next/link";

export default function ToolsMenu({ data, onFlip }: toolsTypes) {
  const [showLinkInfo, setShowLinkInfo] = useState<[string, string]>(['hide-link-info', 'show-link-info']);
  const [modifyFlag, setModifyFlag] = useState<boolean>(true);
  const [imageName, setImageName] = useState<string>('');
  const [sharePopUp, setSharePopUp] = useState<boolean>(false);
  const downloadLink: LegacyRef<HTMLAnchorElement> = useRef(null);
  useEffect(() => {
    const imgName: string | null = localStorage.getItem('fileName')
    if (imgName !== null) {
      setImageName(imgName.slice(1, imgName.length - 1));
    }
  }, [])

  const SharePopup = (e: any) => {
    e.preventDefault()
    setSharePopUp(!sharePopUp)
  }

  return (
    <div className={styles.toolsMenu}>
      <div>
        <div className={styles.toolsName}>
          <h2>Format settings</h2>
        </div>
        <div className={styles.tools}>
          <p className={styles.flipDirection}>Flip direction</p>
          <ImageMirror data={data} onFlip={onFlip} setModifyFlag={setModifyFlag} imageName={imageName} />
        </div>
      </div>
      <div className={styles.imageTools}>
        <button className={styles.shareImage} onClick={SharePopup}>
          <Image src={sharedPart} alt='Share Logo' width={18} height={18} />
          <span className={styles.buttonInfo}>
            Share image
          </span>
        </button>
        <button className={styles.downloadImage}>
          <Link download href={`http://localhost:3000/api/download/${imageName}`} style={{ pointerEvents: modifyFlag ? 'none' : 'auto' }}>
            <div className={styles.downloadPart}>
              <Image src={downloadPart} alt='Download Logo' width={18} height={18} />
              <span className={styles.buttonInfo}>
                Download
              </span>
            </div>
          </Link>
        </button>
      </div>
      {sharePopUp
        ? <SharePopUp setSharePopUp={setSharePopUp} />
        : ''
      }
    </div>
  )
}