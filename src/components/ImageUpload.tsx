// import React, { useEffect, useRef, useState } from 'react';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import DragDropInput from './DragDropInput';
// // import DropboxChooser from 'react-dropbox-chooser';
// // import useDrivePicker from 'react-google-drive-picker';
// // import axios from 'axios';

// const ImageUpload = () => {
//   // const dropboxApyKey: any = process.env.REACT_APP_DROPBOX_APY_KEY;
//   // const googleDriveKey: any = process.env.REACT_APP_GOOGLE_DRIVE_APY_KEY;
//   // const googleClientId: any = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
//   // const [openPicker, authResult] = useDrivePicker();
//   const [errorMsg, setErrorMsg] = useState<string>('');
//   // const oauthToken = useRef<string>("");
//   const router = useRouter();

//   // DropBox File Selecter
//   // const dropboxSuccess = (files: any) => {
//   //   const dropboxlink = files[0].link;
//   //   const dropBoxName = files[0].name;
//   //   const dropBoxMimeType = "image/" + dropBoxName.slice(dropBoxName.lastIndexOf(".") + 1);
//   //   axios
//   //     .get(dropboxlink, {
//   //       headers: {
//   //         "Content-Type": "application/octet-stream",
//   //       },
//   //       responseType: "arraybuffer",
//   //     })
//   //     .then((res) => {
//   //       let blob = new Blob([res.data], { type: dropBoxMimeType });
//   //       const formData = new FormData();
//   //       formData.append("file", blob, dropBoxName);
//   //       axios.post("http://localhost:4000/upload", formData).then((res) => {
//   //         if (res.data.status === "Denied") {
//   //           return;
//   //         }
//   //         // Save share link to local storage 
//   //         localStorage.setItem('url', JSON.stringify(res.data.url));
//   //       })
//           // router.push('/modify');
//   //     });
//   // }
//   // On cancal void
//   // const cancelSuccess = () => {
//   //   return;
//   // }

//   // Google Drive File Picker 
//   // const handleOpenPicker = (e: React.MouseEvent<HTMLElement>) => {
//   //   openPicker({
//   //     clientId: googleClientId,
//   //     developerKey: googleDriveKey,
//   //     viewId: "DOCS_IMAGES",
//   //     showUploadView: false,
//   //     showUploadFolders: false,
//   //     supportDrives: true,
//   //     multiselect: false,
//   //     callbackFunction: (data) => {
//   //       if (data.action === "picked") {
//   //         let doc = data.docs[0];
//   //         axios.get(
//   //           "https://www.googleapis.com/drive/v3/files/" +
//   //           doc.id +
//   //           "?alt=media",
//   //           {
//   //             headers: { Authorization: "Bearer " + oauthToken.current },
//   //             responseType: "arraybuffer",
//   //           }
//   //         )
//   //           .then((res) => {
//   //             let blob = new Blob([res.data], { type: doc.mimeType });
//   //             const formData = new FormData();
//   //             formData.append("file", blob, doc.name);
//   //             axios.post("http://localhost:4000/upload", formData).then((res) => {
//   //               if (res.data.status === "Denied") {
//   //                 return;
//   //               }
//   //               // Save share link to local storage 
//   //               localStorage.setItem('url', JSON.stringify(res.data.url));
//   //             })
//   //             router.push('/modify');
//   //           });
//   //       }
//   //     },
//   //   })
//   // }
//   // useEffect(() => {
//   //   if (authResult) {
//   //     oauthToken.current = authResult.access_token;
//   //   }
//   // }, [authResult]);

//   return (
//     <div id='upload-section'>
//       <form className='upload-form'>
//         <DragDropInput setErrorMsg={setErrorMsg} />
//         <span className={errorMsg ? 'error' : 'default'}>{errorMsg}</span>
//         <div id='upload-link'>
//           {/* <DropboxChooser appKey={dropboxApyKey}
//             success={dropboxSuccess}
//             linkType="direct"
//             cancel={cancelSuccess}
//             multiselect={false}
//             extensions={['.jpg', '.png', '.jpeg']}>
//             <img src={dropboxLogo} alt="DropBox Logo" className='dropbox logo' />
//           </DropboxChooser> */}
//           {/* <div>
//             <img src={googleDriveLogo} alt="Google Drive Logo" className='google-drive logo' onClick={(e: React.MouseEvent<HTMLElement>) => handleOpenPicker(e)} />
//           </div> */}
//         </div>
//       </form>
//     </div>
//   )
// }

// export default ImageUpload;