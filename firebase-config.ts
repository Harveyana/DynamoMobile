import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
//   storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
//   projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
//   authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
// };

const firebaseConfig = {
    apiKey: "AIzaSyAquUZm9nIuW6vIkFgrKQeiN-Vug1Ygs-I",
    authDomain: "qaya-a252a.firebaseapp.com",
    projectId: "qaya-a252a",
    storageBucket: "qaya-a252a.appspot.com",
    messagingSenderId: "654730279692",
    appId: "1:654730279692:web:6ac35cb5912ed01a0b6729",
    measurementId: "G-QCPPBX1EPV"
};

console.log(firebaseConfig);

// let app;
// if (getApps().length === 0) {
 const app = initializeApp(firebaseConfig);
// }
// const fbApp = getApp();
const fbStorage = getStorage(app);

/**
 *
 * @param {*} uri
 * @param {*} name
 */
const uploadToFirebase = async(uri:string, name:string) => {
    console.log('upload started')
        const fetchResponse = await fetch(uri);
        const theBlob = await fetchResponse.blob();
        console.log('the blob',theBlob)

        const storageRef = ref(getStorage(), `images/${name}`);
        console.log("uploading image");


        return await uploadBytesResumable(storageRef, theBlob).then(
            async (snapshot) => {
            //   bytes.close();
              return await getDownloadURL(storageRef);
            }
        );


        // const uploadTask = uploadBytesResumable(storageRef, theBlob);

        // // Listen for state changes, errors, and completion of the upload.
        // uploadTask.on('state_changed',(snapshot) => {
        //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     console.log('Upload is ' + progress + '% done');
        //     switch (snapshot.state) {
        //         case 'paused':
        //             console.log('Upload is paused');
        //         break;
        //         case 'running':
        //             console.log('Upload is running');
        //         break;
        //     }
        // },
        // (error) => {
        //     // A full list of error codes is available at
        //     // https://firebase.google.com/docs/storage/web/handle-errors
        //     switch (error.code) {
        //         case 'storage/unauthorized':
        //             console.log("User doesn't have permission to access the object");
        //         break;
        //         case 'storage/canceled':
        //             console.log("User canceled the upload");
        //         break;
        //         case 'storage/unknown':
        //             console.log("Unknown error occurred, inspect error.serverResponse");
        //         break;
        //     }
        // },
        // () => {
        //     // Upload completed successfully, now we can get the download URL
        //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //         console.log('File available at', downloadURL);
        //         //perform your task
        //         return downloadURL
        //     });
        // });

  
};


async function uploadImageAsync(uri:string, name:string) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const fileRef = ref(fbStorage, `images/${name}`);
    const result = await uploadBytes(fileRef, blob);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await getDownloadURL(fileRef);
  }

export { app, fbStorage, uploadToFirebase, uploadImageAsync };