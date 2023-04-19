import { database } from "../firebase";
import { onValue, ref } from "firebase/database";

export const getListLike = (userID) => {
    const starCountRef = ref(database, `Users/${userID}/listLike`);
    return new Promise((resolve, reject) => {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}
