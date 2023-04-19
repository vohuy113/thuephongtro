import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const writeDoccument = async (data) => {
  await setDoc(doc(db, "roomify", ""), {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
  });
};
