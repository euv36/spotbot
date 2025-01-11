import React, { useEffect, useState } from 'react';
import { initDB, addTransaction, getAllTransactions } from './indexedDB'; // Импортируем функции

const FinancialTracker = () => {
	const [transactions, setTransactions] = useState([]); // Массив для хранения транзакций
	const [newTransaction, setNewTransaction] = useState({
		amount: 0,
		category: '',
	}); // Состояние для нового ввода

	useEffect(() => {
		const setupDB = async () => {
			const db = await initDB(); // Инициализация базы данных
			const allTransactions = await getAllTransactions(db); // Получаем все транзакции
			setTransactions(allTransactions); // Обновляем состояние
		};
		setupDB();
	}, []);

	const handleAddTransaction = async () => {
		const db = await initDB(); // Получаем доступ к базе данных
		await addTransaction(db, newTransaction); // Добавляем новую транзакцию
		setTransactions([...transactions, newTransaction]); // Обновляем состояние с транзакциями
	};

	return (
		<div>
			<h1>Financial Tracker</h1>
			<div>
				<input
					type='number'
					value={newTransaction.amount}
					onChange={e =>
						setNewTransaction({ ...newTransaction, amount: e.target.value })
					}
					placeholder='Amount'
				/>
				<input
					type='text'
					value={newTransaction.category}
					onChange={e =>
						setNewTransaction({ ...newTransaction, category: e.target.value })
					}
					placeholder='Category'
				/>
				<button onClick={handleAddTransaction}>Add Transaction</button>
			</div>
			<ul>
				{transactions.map((transaction, index) => (
					<li key={index}>
						{transaction.amount} - {transaction.category}
					</li>
				))}
			</ul>
		</div>
	);
};

export default FinancialTracker;
