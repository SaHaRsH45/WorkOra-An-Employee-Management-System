import { db, auth } from "./firebase.js";
import { employees, admin } from "./localdata.js";
import { collection, addDoc } from "firebase/firestore";

const uploadData = async () => {
  try {
    // Upload employees
    for (let emp of employees) {
      await addDoc(collection(db, "employees"), emp);
    }
    console.log("Employees uploaded successfully");

    // Upload admins
    for (let a of admin) {
      await addDoc(collection(db, "admins"), a);
    }
    console.log("Admins uploaded successfully");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

uploadData();
