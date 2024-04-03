import React, { useEffect, useState } from 'react'
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { fireDB } from '../firebase/FirebaseConfig';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import Graph from './Graph';

const TransactionContainer = () => {
    const [transactionId, setTransactionId] = useState('');

    const getTransactionIdHandler = (id) => {
        setTransactionId(id);
    };

    const [transactions, setTransactions] = useState([]);
    const [transactionTotal, setTransactionTotal] = useState({
        balance: 0.0,
        income: 0.0,
        expenses: 0.0,
    });

    const { balance, income, expenses } = transactionTotal;

    const transactionCollectionRef = collection(fireDB, "transactions");

    const { userID } = useGetUserInfo();

    const getTransactions = async () => {
        let unsubscribe;

        try {
            const queryTransactions = query(transactionCollectionRef, 
                where("userID", "==", userID), 
                orderBy("createdAt")
            );
            
            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalExpenses = 0;
                let totalIncome = 0;

                // lists all documents in collection
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({ ...data, id });

                    if (data.transactionType === "expense") {
                        totalExpenses += Number(data.transactionAmount);
                    } else {
                        totalIncome += Number(data.transactionAmount);

                    }
                });

                setTransactions(docs);

                let balance = totalIncome - totalExpenses;

                setTransactionTotal({
                    balance,
                    expenses: totalExpenses,
                    income: totalIncome,
                })
            });

        } catch (err) {
            console.error(err)
        }

        return () => unsubscribe();
    };

    useEffect(() => {
        getTransactions();
    }, [])
    

  return (
    <div>
        <AddTransaction id={transactionId} setTransactionId={setTransactionId} />

        {/* <Graph income={income} expenses={expenses} /> */}

        <div className='m-5 flex justify-center gap-2'>
        <div className="p-5 flex justify-center items-center gap-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">Balance:</h5>
          <div className="font-bold text-gray-700 dark:text-gray-400">
            {balance > + 0 ? (
              <h2>{balance.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
              })}</h2>
            ) : (
              <h2>-${balance.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              }) * -1}</h2>
            )}
          </div>
        </div>
        <div className="p-5 flex justify-center items-center gap-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">Income:</h5>
          <p className="font-bold text-gray-700 dark:text-gray-400">{income.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
              })}</p>
        </div>
        <div className="p-5 flex justify-center items-center gap-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="font-bold tracking-tight text-gray-900 dark:text-white">Expenses:</h5>
          <p className="font-bold text-gray-700 dark:text-gray-400">{expenses.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
              })}</p>
        </div>
      </div>
        <TransactionList getTransactionId={getTransactionIdHandler} />

    </div>
  )
}

export default TransactionContainer