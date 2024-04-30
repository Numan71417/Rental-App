import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { toast } from 'react-toastify';


export const uploadToFirebase = async (selectedFile) => {
    try {
        if (selectedFile) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(selectedFile.name);

            const snapshot = await fileRef.put(selectedFile);
            const downloadURL = await snapshot.ref.getDownloadURL();

            console.log(downloadURL);
            return downloadURL;
        } else {

            toast.error("Please Select an image to upload")
            throw new Error("Please select an image to upload");
        }
    } catch (error) {
        toast.error('Error uploading image:', error)
        console.error('Error uploading image:', error);
        throw error;
    }
};
