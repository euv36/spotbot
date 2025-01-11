import { openDB } from 'idb';

const DB_NAME = 'SpotBotDB';
const STORE_NAME = 'transactions';

// Функция для инициализации базы данных
export const initDB = async () => {
	try {
		const db = await openDB(DB_NAME, 1, {
			upgrade(db) {
				if (!db.objectStoreNames.contains(STORE_NAME)) {
					const store = db.createObjectStore(STORE_NAME, {
						keyPath: 'id',
						autoIncrement: true,
					});
					store.createIndex('amount', 'amount');
					store.createIndex('category', 'category');
				}
			},
		});
		return db;
	} catch (error) {
		console.error('Failed to initialize IndexedDB:', error);
	}
};

// Функция для добавления данных
export const addTransaction = async (db, transaction) => {
	try {
		const tx = db.transaction(STORE_NAME, 'readwrite');
		const store = tx.objectStore(STORE_NAME);
		await store.add(transaction);
		await tx.done;
	} catch (error) {
		console.error('Failed to add transaction:', error);
	}
};

// Функция для получения всех транзакций
export const getAllTransactions = async db => {
	try {
		const tx = db.transaction(STORE_NAME, 'readonly');
		const store = tx.objectStore(STORE_NAME);
		const allTransactions = await store.getAll();
		await tx.done;
		return allTransactions;
	} catch (error) {
		console.error('Failed to get all transactions:', error);
	}
};

// Функция для поиска транзакций по категории
export const getTransactionsByCategory = async (db, category) => {
	try {
		const tx = db.transaction(STORE_NAME, 'readonly');
		const store = tx.objectStore(STORE_NAME);
		const index = store.index('category');
		const transactions = await index.getAll(category);
		await tx.done;
		return transactions;
	} catch (error) {
		console.error('Failed to get transactions by category:', error);
	}
};

// Функции для удаления и обновления (опционально)
export const deleteTransaction = async (db, id) => {
	try {
		const tx = db.transaction(STORE_NAME, 'readwrite');
		const store = tx.objectStore(STORE_NAME);
		await store.delete(id);
		await tx.done;
	} catch (error) {
		console.error('Failed to delete transaction:', error);
	}
};

export const updateTransaction = async (db, transaction) => {
	try {
		const tx = db.transaction(STORE_NAME, 'readwrite');
		const store = tx.objectStore(STORE_NAME);
		await store.put(transaction);
		await tx.done;
	} catch (error) {
		console.error('Failed to update transaction:', error);
	}
};
