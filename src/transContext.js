
import React, { createContext, useReducer } from "react";
import { TransactionReducer } from './transReducer';

const initialTransactions = [
    // { amount: 500, description: "Cash" },
    // { amount: -50, description: "Cold Drink" },
    // { amount: 100, description: "Deposit" },
    // { amount: -200, description: "Utility Bill" },

]

export const TransactionContext = createContext(initialTransactions);

export const TransactionProvider = ({ children }) => {
    let [state, dispatch] = useReducer(TransactionReducer, initialTransactions);

    function addTransaction(transObj) {
        dispatch({
            type: "ADD_TRANSACTION",
            payload: {
                amount: transObj.amount,
                description: transObj.description,
                id: transObj.id
            },
        })
    }

    function deleteTransaction(transObj) {
        dispatch({
            type: "DELETE_TRANSACTION",
            payload: {
                id: transObj.id
            },
        })
    }

    return (
        <TransactionContext.Provider value={{
            transactions: state,
            addTransaction,
            deleteTransaction
        }}>
            {children}
        </TransactionContext.Provider>
    )
}