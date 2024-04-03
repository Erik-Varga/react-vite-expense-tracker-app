import React, { useEffect, useState } from 'react'
import moment from 'moment';
import TransactionDataService from '../utils/transactionDataService';
import Header from '../pages/Header';
import toast from 'react-hot-toast';
import { serverTimestamp } from 'firebase/firestore';
import { useGetUserInfo } from '../hooks/useGetUserInfo';

const AddTransaction = ({ id, setTransactionId }) => {
    const [description, setDescription] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionType, setTransactionType] = useState('expense');
    const [dateUpdated, setDateUpdated] = useState('');
    const [flag, setFlag] = useState(true);
    const [message, setMessage] = useState({ error: false, msg: '' });
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [buttonLabel, setButtonLabel] = useState('Add Transaction');

    const { userID } = useGetUserInfo();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setButtonLabel('Add Transaction');
        if (description === '' || transactionAmount === '' || transactionType === '') {
            setMessage({ error: true, msg: 'Required Field' });
            return;
        }
        const newTransaction = {
            id: `${Date.now()}`,
            description: description,
            transactionAmount: transactionAmount,
            transactionType: transactionType,
            createdAt: serverTimestamp(),
            dateUpdated: moment().format('MMMM Do YYYY, h:mm a'),
            userID: userID,
        }
        // console.log(newRecipe);

        try {
            if (id !== undefined && id !== "") {
                await TransactionDataService.updateTransaction(id, newTransaction);
                setTransactionId('');
                // setMessage({ error: false, msg: 'Transaction updated successfully!' });
                toast.success('Transaction updated successfully!')
            } else {
                await TransactionDataService.addTransaction(newTransaction);
                // setMessage({ error: false, msg: 'New Recipe added successfully!' });
                toast.success('Transaction added successfully!')
            }
        } catch (error) {
            // setMessage({ error: true, msg: error.message });
            toast.error('An error has occurred!')
        }
        setDescription('');
        setTransactionAmount('');
        setTransactionType('');
    };

    const editHandler = async () => {
        setMessage('');
        setButtonLabel('Save Changes');
        try {
            const docSnap = await TransactionDataService.getTransaction(id);
            // console.log('record is: ', docSnap.data());
            setDescription(docSnap.data().description);
            setTransactionAmount(docSnap.data().transactionAmount);
            setTransactionType(docSnap.data().transactionType);
            setDateUpdated(docSnap.data().dateUpdated);
        } catch (error) {
            setMessage({ error: true, msg: error.message })
        }
    };

    useEffect(() => {
        // console.log('ID: ', id)
        if (id !== undefined && id !== "") {
            editHandler();
        }
    }, [id]);

    return (
        <div className='flex flex-col items-center justify-center'>
            <Header />
            {message?.msg && (

                <div className="p-4 m-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                    <span className="font-medium hover:cursor-pointer" onClick={() => setMessage('')}>{message?.msg}</span>
                </div>
            )}
            <div className="w-[95%] md:w-[75%] border-2 border-gray-200 rounded-md flex flex-col items-center justify-center gap-4 p-4">
                <form onSubmit={handleSubmit} className="w-full mx-auto">
                    <div className="flex justify-center items-center gap-2">

                        {/* <MdOutlineDescription className='text-4xl text-gray-700' /> */}

                        {/* description */}
                        {/* <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label> */}
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description'
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <div className='w-full flex items-center justify-center gap-2'>
                            {/* transactionAmount */}
                            {/* <label htmlFor="transactionAmount" className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label> */}
                            <div className='my-5'>
                                <select
                                    onChange={(e) => setTransactionType(e.target.value)}
                                    id="transactionType"
                                    name='transactionType'
                                    value={transactionType}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                // required
                                >
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </div>
                            $<input
                                type="text"
                                id="transactionAmount"
                                value={transactionAmount}
                                onChange={(e) => setTransactionAmount(e.target.value)}
                                placeholder='Amount'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />

                        </div>

                    </div>

                    <div>{dateUpdated && dateUpdated}</div>
                    <div className="flex justify-center">
                        <button type='submit' className='border w-1/2 p-2 rounded hover:opacity-75'>
                            {buttonLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTransaction