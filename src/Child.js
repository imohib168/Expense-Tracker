import React, { useContext, useState } from 'react'
import { TransactionContext } from './transContext'

export const Child = () => {

    const { transactions, addTransaction, deleteTransaction } = useContext(TransactionContext)

    const handleAddition = (e) => {
        e.preventDefault();
        if (Number(amount) === 0) {
            alert("Kindly Enter Value")
            return false;
        }
        addTransaction({
            amount: Number(amount),
            description: description,
            id: transactions.length
        })

        setAmount(0);
        setDescription("")
    }

    const getIncome = () => {
        let income = 0;
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].amount > 0) {
                income += transactions[i].amount
            }
        }
        return income;
    }

    const getExpense = () => {
        let expense = 0;
        for (let j = 0; j < transactions.length; j++) {
            if (transactions[j].amount < 0) {
                expense += transactions[j].amount
            }
        }
        return expense;
    }

    let [description, setDescription] = useState("")
    let [amount, setAmount] = useState(0);

    return (
        <div className="container">
            {/* Header */}
            <div className="header">
                <h1>Expense Tracker</h1>
            </div>

            {/* Balance */}
            <div className="Balance-counter">
                <h3>Your Current Balance</h3>
                <h2>+$ {(getIncome() + getExpense()).toFixed(2)}</h2>
            </div>

            {/* Account Summary */}
            <div className="Expense-counter">
                <div>
                    <h3>INCOME</h3>
                    <h3 className="pl">+$ {getIncome().toFixed(2)}</h3>
                </div>
                {/* <span>|</span> */}
                <div>
                    <h3>EXPENSE</h3>
                    <h3 className="min">-$ {Math.abs(getExpense()).toFixed(2)}</h3>
                </div>
            </div>

            {/* Transaction History */}
            <div className="history">
                <h3 className="historyh3">History</h3>
                <div>
                    <ul className="transaction-list">
                        {transactions.map((transObj, ind) => {
                            return (<li key={ind} >
                                <span>{transObj.description}</span>
                                <span>$ {transObj.amount}</span>
                                <button onClick={() => deleteTransaction({ id: transObj.id })} className="del-btn">X</button>
                            </li>
                            )
                        })}
                    </ul>
                </div>
            </div>


            {/* Transaction form (Add New Transaction) */}
            <div className="transaction-form">
                <h3 className="Add_new-transaction">Add New Transaction</h3>
                <form onSubmit={handleAddition}>
                    <div>
                        <label htmlFor="Description">Description</label>
                        <input
                            type="text"
                            id="Description"
                            required
                            placeholder="Enter Description"
                            autoComplete="off"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="Amount">Amount</label>
                        <input
                            type="number"
                            id="Amount"
                            required
                            placeholder="Enter Amount"
                            autoComplete="off"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div>
                        <button type="submit" className="btn">Add Transaction</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
