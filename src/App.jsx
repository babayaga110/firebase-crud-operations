import React, { useEffect, useState } from "react";
import "./App.css";
import CustomerTable from "./component/Table/CustomerTable";
import { useForm } from "react-hook-form";
import { Timestamp, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { Box, Button, Modal } from "@mui/joy";
import { PersonAdd } from "@mui/icons-material";
import { db_firestore } from "./firebase/config";
import Create from "./component/Form/Create";
import Update from "./component/Form/Update";
import Delete from "./component/Form/Delete";

function App() {
  const [open, setOpen] = useState({ isOpen: false, type: "create", id: null });
  const [customers, setCustomers] = useState([]);
  const { control, handleSubmit, reset } = useForm();

  const handleOperation = async (data) => {
    try {
      let customerRef;
      switch (open.type) {
        case "create":
          customerRef = doc(collection(db_firestore, "customers"));
          await setDoc(customerRef, { ...data, id: customerRef.id, createdAt: Timestamp.now() });
          break;
        case "update":
          customerRef = doc(db_firestore, "customers", open.id);
          await updateDoc(customerRef, { ...data, updatedAt: Timestamp.now() });
          break;
        case "delete":
          customerRef = doc(db_firestore, "customers", open.id);
          await deleteDoc(customerRef);
          break;
        default:
          throw new Error("Invalid operation type");
      }
      reset();
      handleClose();
      alert(`${open.type.charAt(0).toUpperCase() + open.type.slice(1)} successful!`);
    } catch (error) {
      console.error(`Error handling ${open.type}:`, error);
    }
  };

  const handleClose = () => setOpen({ isOpen: false, type: "create", id: null });

  useEffect(() => {
    const q = query(collection(db_firestore, "customers"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newCustomers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCustomers(newCustomers);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (open.id) {
      const customerToUpdate = customers.find(customer => customer.id === open.id);
      if (customerToUpdate) {
        reset(customerToUpdate);
      }
    } else {
      reset({ customerName: "", role: "", email: "", skills: "" });
    }
  }, [open, customers, reset]);

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Button
        variant="solid"
        color="neutral"
        sx={{ width: "fit-content", alignSelf: "flex-end" }}
        startDecorator={<PersonAdd />}
        onClick={() => setOpen({ ...open, isOpen: true, type: "create" })}
      >
        Add Customer
      </Button>
      <CustomerTable customers={customers} handleDelete={setOpen} handleUpdate={setOpen} />
      <Modal open={open.isOpen} onClose={handleClose}>
        {open.type === "create" && <Create control={control} handleSubmit={handleSubmit} onSubmit={handleOperation} /> ||
        open.type === "update" && <Update control={control} handleSubmit={handleSubmit} onSubmit={handleOperation} /> ||
        open.type === "delete" && <Delete handleDelete={() => handleOperation()} handleClose={handleClose} />}
      </Modal>
    </Box>
  );
}

export default App;