import { NextPage } from "next";
import Image from "next/image";
import styles from './section.module.css'
import uploadIcon from '../../assets/images/uploadPage/uploadIcon.png'
import descriptionImg from '../../assets/images/uploadPage/1.png'
import dropboxImg from '../../assets/images/uploadPage/dropbox.png'
import googledriveImg from '../../assets/images/uploadPage/googledrive.png'
import axios from "axios";
import { useRef } from "react";
import { useRouter } from "next/router";

export const ImageUpload: NextPage = () => {
  const dragRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const onDragEnter = (e: any) => {
    if (dragRef.current !== null) {
      e.target.draggable = true;
      dragRef.current.classList.add('dragover')
    }
  };
  const onDragLeave = (e: any) => {
    if (dragRef.current !== null) {
      e.target.draggable = false;
      dragRef.current.classList.remove('dragover');
    }
  }

  const upload = (e: any) => {
    e.preventDefault()
    if (e.target.files !== null) {
      if (!e.target.files[0].name.match(/\.(jpg|jpeg|png)$/)) {
        // setErrorMsg("Please select valid image.");
        return false;
      }
      // Converting file into form data
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      axios.post('/api/upload', formData, config).then((res) => {
        if (res.data.status === "Denied") {
          return;
        }

        // Save share link to local storage 
        localStorage.setItem('fileName', JSON.stringify(res.data.fileName));
        localStorage.setItem('url', JSON.stringify(res.data.url));

        // If file is selected redirect to specified path
        router.push("/mirror");
      })
    }
  }
  const disableClick = (e: any) => {
    e.preventDefault();
    e.target.disable = true;
  }
  return (
    <div className={styles.fileUpload}>
      <div className={styles.descriptionIconPart}>
        <Image src={descriptionImg} alt='descriptionImg' />
      </div>
      <div className={styles.descriptionPart}>
        <div className={styles.descriptionHeaderPart}>
          Mirror image in a few clicks
        </div>
        <div className={styles.descriptionPghPart}>
          Convallis scelerisque posuere aenean sollicitudin id.Mattis vestibulum molestie ultricies hendrerit scelerisque eu.Orci, diam rutrum gravida amet, volutpat neque, suspendisse in nulla.
        </div>
      </div>
      <div className={styles.uploadDropPart} ref={dragRef} onDragEnter={onDragEnter} onDragLeave={onDragLeave}>
        <input type="file" className={styles.dropInputPart} value='image' name='image' accept='image/*' title='' onChange={upload} onClick={disableClick} />
        <div className={styles.uploadPart}>
          <div className={styles.uploadDescription}>
            Upload an image or drop it here.
          </div>
          <div className={styles.uploadButtonPart}>
            <button className={styles.uploadButton}>
              <Image src={uploadIcon} alt='uploadIcon' />
              <div>
                <input type="file" className={styles.uplaodInputPart} name="image" accept='image/*' title='' onChange={upload} />
                Uplaod Image
              </div>
            </button>
          </div>
          <div className={styles.dropAndDrive}>
            <button className={styles.dropboxButton}>
              <Image src={dropboxImg} alt='dropboxImg' />
              <div>
                Dropbox
              </div>
            </button>
            <button className={styles.googleDriveButton}>
              <Image src={googledriveImg} alt='googledriveImg' />
              <div>
                Google Drive
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* <div className='upPartUpload'>
            <input type='file' accept='image/*' ref={inputFileRef} onChange={fileInputHandler} style={{"display": "none"}}></input>
            <button className="btn" onClick={clickOnTheInputFile}>Select Image From Local Drive<span className="fas fa-chevron-right"></span></button>
            <button className="btn">
            <DropboxChooser  
                appKey={dropboxApyKey}
                success={dropboxSuccess}
                linkType="direct"
                multiselect={false}
                extensions={['.jpg','.png','.jpeg']} >Select Image From Dropbox<span className="fas fa-chevron-right"></span> 
            </DropboxChooser>
            </button>
            
            <button className="btn" onClick={handleOpenPicker}> Select Image From Google Drive <span className="fas fa-chevron-right"></span> </button>
        </div> */}
      {/* <div className="dragDiv">
            <h3>Drop your file here</h3>
            <div onDragOver={dragOver} onDragLeave={dragLeaveHandler} onDrop={dropHandler} className="drag-area">
                <div className="icon">
                <i className="fas fa-images"></i>
                </div>

                <span className="header">Drag & Drop</span>
                <span className="support">Supports: JPEG, JPG, PNG</span>
            </div> */}
      {/* </div> */}
    </div>
  )
}