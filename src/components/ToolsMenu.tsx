import axios from "axios";
import { useRouter } from "next/router";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { toolsTypes } from "../types/toolsTypes";
import QRCode from 'react-qr-code';
import ImageMirror from "./ImageMirror";
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from "next-share";

export default function ToolsMenu({ data, onFlip }: toolsTypes) {
  const [showLinkInfo, setShowLinkInfo] = useState<[string,string]>(['hide-link-info', 'show-link-info']);
  const [modifyFlag, setModifyFlag] = useState<boolean>(true);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');
  const downloadLink: LegacyRef<HTMLAnchorElement> = useRef(null);
  const router = useRouter();
  useEffect(() => {
    const url: string | null = localStorage.getItem('url');
    const imgName: string | null = localStorage.getItem('fileName')
    if (url !== null && imgName !== null) {
      setShareUrl(url.slice(1, imgName.length - 1));
      setImageName(imgName.slice(1,imgName.length-1));
    }
  }, [])

  const showUrl = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowLinkInfo([showLinkInfo[1], showLinkInfo[0]]);
  }

  // Image Delete and readirect default root 
  const deleteImage = () => {
    onFlip(
      {
        ...data,
        count: 0,
        flipHorizontal: false,
        flipVertical: false
      }
    );
    localStorage.clear();
    
    axios.delete(`api/delete/${imageName}`);

    router.push('/');
    
  }

  const downloadLinkHandler = () => {
    if (modifyFlag === false && downloadLink.current !== null) {
      downloadLink.current.click();
    }
  }
  
  return (
    <div id="tools-menu">
      <div className="tool-name">
        <h2>Tools Menu</h2>
      </div>
      <div className="tools">
        <div className="tools-share">
          <div className="menu">
            <ImageMirror data={data} onFlip={onFlip} setModifyFlag={setModifyFlag} imageName={imageName} />
            <button className="download-Image" onClick={downloadLinkHandler}><a download href={`http://localhost:3000/api/download/${imageName}`} style={{ pointerEvents: modifyFlag ? 'none' : 'auto' }} ref={downloadLink}>Download Image</a></button>
            <a href="/" onClick={deleteImage} className="delete-Image-link">Delete Image</a>
          </div>
          <div id="share-social-network">
            <FacebookShareButton url={shareUrl} style={{ margin: 'auto' }}>
              <FacebookIcon size={50} borderRadius={50} />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} style={{ margin: 'auto' }}>
              <TwitterIcon size={50} borderRadius={50} />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl} style={{ margin: 'auto 10px auto 5px' }}>
              <LinkedinIcon size={50} borderRadius={50} />
            </LinkedinShareButton>
            <div className="share-link">
              <button onClick={showUrl}>Share Link</button>
              <span className={showLinkInfo[0]}>{shareUrl}</span>
            </div>
          </div>
        </div>
        <div className="image-QR">
          <QRCode value={shareUrl} size={130} level={'Q'} />
        </div>
      </div>
    </div>
  )
}