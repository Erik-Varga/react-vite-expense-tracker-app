import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, orderBy, query, setDoc } from "firebase/firestore"
import { fireDB } from "../firebase/FirebaseConfig";

const transactionCollectionRef = collection(fireDB, 'transactions');

class TransactionDataService {

    addTransaction = (newTransaction) => {
        return addDoc(transactionCollectionRef, newTransaction);
    };

    updateTransaction = (id, updatedTransaction) => {
        const transactionDoc = doc(fireDB, 'transactions', id);
        return updateDoc(transactionDoc, updatedTransaction);
    };

    deleteTransaction = (id) => {
        const transactionDoc = doc(fireDB, 'transactions', id);
        return deleteDoc(transactionDoc)
    };

    getAllTransactions = () => {
        return getDocs(query(transactionCollectionRef, orderBy('id')));
    };

    getTransaction = (id) => {
        const transactionDoc = doc(fireDB, 'transactions', id);
        return getDoc(transactionDoc);
    };
}

export default new TransactionDataService();