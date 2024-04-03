import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

const categoryCollectionRef = collection(firestore, 'categories');

class CategoryDataService {

    addCategories = (newCategory) => {
        return addDoc(categoryCollectionRef, newCategory);
    };

    updateCategory = (id, updatedCategory) => {
        const categoryDoc = doc(firestore, 'categories', id);
        return updateDoc(categoryDoc, updatedCategory);
    };

    deleteCategory = (id) => {
        const categoryDoc = doc(firestore, 'categories', id);
        return deleteDoc(categoryDoc)
    };

    getAllCategories = () => {
        // return getDocs(categoryCollectionRef);
        return getDocs(query(categoryCollectionRef, orderBy('categoryName')));
    };

    getCategory = (id) => {
        const categoryDoc = doc(firestore, 'categories', id);
        return getDoc(categoryDoc);
    };
}

export default new CategoryDataService();