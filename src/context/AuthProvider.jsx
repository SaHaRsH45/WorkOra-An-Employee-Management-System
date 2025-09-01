import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase.js";
import {
  collection,
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";

// Create AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ employee: [], admin: [] });
  const [loading, setLoading] = useState(true);

  // Real-time listener for employees
  useEffect(() => {
    const empColRef = collection(db, "employees");
    const unsubscribeEmp = onSnapshot(
      empColRef,
      (snapshot) => {
        const employees = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            docId: doc.id,
            id: data.id, // internal employee ID
            ...data,
          };
        });
        setUserData((prev) => ({ ...prev, employee: employees }));
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      }
    );

    const adminColRef = collection(db, "admins");
    const unsubscribeAdmin = onSnapshot(
      adminColRef,
      (snapshot) => {
        const admins = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            docId: doc.id,
            id: data.id,
            ...data,
          };
        });
        setUserData((prev) => ({ ...prev, admin: admins }));
      },
      (error) => console.error("Error fetching admins:", error)
    );

    return () => {
      unsubscribeEmp();
      unsubscribeAdmin();
    };
  }, []);

  // Function to add a task to an employee
  const addTaskToEmployee = async (empDocId, task) => {
    try {
      const empDocRef = doc(db, "employees", empDocId);
      const empSnap = await getDoc(empDocRef);

      if (!empSnap.exists()) {
        console.error("Employee document does not exist for docId:", empDocId);
        return false;
      }

      const empData = empSnap.data();

      // Determine next taskNumber
      const newTaskNumber =
        empData.tasks && empData.tasks.length > 0
          ? Math.max(...empData.tasks.map((t) => t.taskNumber || 0)) + 1
          : 1;

      const newTask = {
        ...task,
        taskNumber: newTaskNumber,
        createdAt: new Date().toISOString(),
      };

      // Update Firestore
      await updateDoc(empDocRef, {
        tasks: arrayUnion(newTask),
        "taskNumbers.newtask": increment(1),
        "taskNumbers.active": increment(1),
      });

      // Update local state immediately for UI responsiveness
      setUserData((prev) => {
        const updatedEmployees = prev.employee.map((e) =>
          e.docId === empDocId
            ? {
                ...e,
                tasks: [...(e.tasks || []), newTask],
                taskNumbers: {
                  active: (e.taskNumbers?.active || 0) + 1,
                  newtask: (e.taskNumbers?.newtask || 0) + 1,
                  completed: e.taskNumbers?.completed || 0,
                  failed: e.taskNumbers?.failed || 0,
                },
              }
            : e
        );
        return { ...prev, employee: updatedEmployees };
      });

      return true;
    } catch (error) {
      console.error("Error adding task:", error);
      return false;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        ...userData,
        setUserData,
        addTaskToEmployee,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
