

import {storage} from '../firebase.js'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    
    // Upload the file
    await uploadBytes(storageRef, file);
    
    // Get the download URL
    const url = await getDownloadURL(storageRef);
    
    return url; // Return the URL to use in your app
};

export {uploadImage}