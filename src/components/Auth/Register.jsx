import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { toast } from "react-toastify";

const Register = ({ onRegister }) => {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create Firebase Auth User
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // 2. Get max existing employee id
      const employeesRef = collection(db, "employees");
      const q = query(employeesRef, orderBy("id", "desc"), limit(1));
      const querySnapshot = await getDocs(q);

      let newId = 1; // default first ID
      if (!querySnapshot.empty) {
        const lastEmployee = querySnapshot.docs[0].data();
        newId = lastEmployee.id + 1; // increment last ID
      }

      // 3. Prepare employee data
      const employeeData = {
        id: newId,
        firstname,
        email,
        password, // keeping plain password because your schema has it
        taskNumbers: {
          active: 0,
          completed: 0,
          failed: 0,
          newtask: 0,
        },
        tasks: [],
      };

      // 4. Save employee data in Firestore
      await setDoc(doc(db, "employees", userId), employeeData);

      toast.success("Employee registered successfully!",{position:"top-center"});
      if (onRegister) onRegister();
      setTimeout(() => {
    navigate("/login");
  }, 1500);

      // Reset form
      setFirstname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Registration failed: " + error.message,{position:"bottom-center"});
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1B2432]">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1B2432]">
          Register Employee
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2432] text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2432] text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B2432] text-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1B2432] text-white py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
