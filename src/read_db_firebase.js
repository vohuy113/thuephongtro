import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const readDb = async () => {
  const querySnapshot = await getDocs(collection(db, "roomify"));
  //console.log("--+", querySnapshot.docs);
  return querySnapshot;
  // querySnapshot.forEach((doc) => {
  //console.log(doc.id, "=>", doc.data());
  //});
};
export default readDb;
