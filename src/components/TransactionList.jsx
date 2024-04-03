import React, { useEffect, useState } from 'react'
import TransactionDataService from '../utils/transactionDataService';

const TransactionList = ({ getTransactionId }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    const data = await TransactionDataService.getAllTransactions();
    // console.log(data.docs);
    setTransactions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  };

  const deleteHandler = async (id) => {
    await TransactionDataService.deleteTransaction(id);
    getTransactions();
  }

  return (
    <>
      {/* <pre>{JSON.stringify(recipes, undefined, 2)}</pre> */}
      <div className="relative overflow-x-auto m-2 shadow-md sm:rounded-lg">
        <div className='flex m-3'>Number of transactions: {transactions.length}</div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* <th scope="col" className="px-6 py-3">
                #
              </th> */}
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((doc, index) => {
              return (
                <tr key={doc.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">
                  {doc.description}
                </td>
                <td className="px-6 py-4">
                  ${doc.transactionAmount}
                </td>
                <td className="px-6 py-4">
                  {doc.dateUpdated}
                </td>

                  <td className="flex jc gap-2 px-6 py-4">
                    <button
                      type='button'
                      onClick={(e) => getTransactionId(doc.id)}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type='button'
                      onClick={(e) => deleteHandler(doc.id)}
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}


          </tbody>
        </table>
      </div>

    </>
  )
}

export default TransactionList