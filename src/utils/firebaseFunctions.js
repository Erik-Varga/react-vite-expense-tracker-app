import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, orderBy, query, setDoc } from "firebase/firestore"
import { fireDB } from "../firebase/FirebaseConfig";

// Save New Transaction Item
export const saveItem = async (data) => {
    await setDoc(doc(fireDB, 'transactionItems', `${Date.now()}`), data, { merge : true });
};

// Get All Transaction Items
export const getAllTransactions = async () => {
    const items = await getDocs(
        query(collection(fireDB, 'transactionItems'), orderBy('id', 'desc'))
    );
    return items.docs.map((doc) => doc.data());
};

// Get All RecipeBook
export const getAllTransactionBook = async () => {
    const items = await getDocs(
        query(collection(fireDB, 'transactions'), orderBy('id', 'desc'))
    );
    return items.docs.map((doc) => doc.data());
};