import React from "react";
import { ref, set, update, push, onChildRemoved, remove } from "firebase/database";
import { database } from "../firebase";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
const writeUserData = (uid, name, email, imageUrl, birthday, address, phone) => {
    if (uid) {
        set(ref(database, 'Users/' + uid), {
            fullname: name,
            email: email,
            avatar: imageUrl,
            birthday: birthday,
            address: address,
            phone: phone,
        }, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Data saved successfully!");
            }
        });
    } else {
        console.log("User not authenticated");
    }
}
export const writeLikePostToData = (uid, postID) => {
    const postListRef = ref(database, `Users/${uid}/listLike`);
    //const newPostRef = push(postListRef);
    update(postListRef, {
        [postID]: 'true'
    })
    return postID;
    // set(newPostRef, {
    //     title: title,
    //     description: description,
    //     image: imageURL,
    //     acreage: acreage,
    //     price: price
    // });
    //console.log(newPostRef)
    // return newPostRef.key;
}
// export const getPostIdOnClick = async (postId) => {
//     //const id = await getDoc(doc(db, 'roomify'))
//     console.log(doc(db, 'roomify', `${postId}`))
// }
export const removeLikePostData = (uid, postRef) => {
    remove(ref(database, `Users/${uid}/listLike/${postRef}`)).then();
}
export const getDocId = () => {
    const docRef = db.collection('roomify').doc('25FSHYBTAy5zpkK2g4DC');

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log(doc.id); // This will log the document ID
        } else {
            console.log('No such document!');
        }
    }).catch((error) => {
        console.log('Error getting document:', error);
    });
}
export default writeUserData;

