import {apiGet, apiPut, apiPost, apiDelete} from './client';

export const createTransaction = (TransactionData) => {
    return apiPost('/transaction/new', TransactionData);
}

export const viewAllTransactions = () => {
    return apiGet('/transaction/view/all');
}

export const viewTransactionById = (TransactionId) => {
    return apiGet(`/transaction/view/id/${TransactionId}`);
}

export const viewTransactionByName = (TransactionName) => {
    return apiGet(`/transaction/view/name/${TransactionName}`);
}

export const filterTransactionByAmount = () => {
    return apiGet(`/transaction/filter/amount`);
}

export const filterTransactionByTime = () => {
    return apiGet(`/transaction/filter/time/`);
}

export const filterTransactionByType = (TransactionType) => {
    return apiGet(`/transaction/filter/type/${TransactionType}`);
}

export const filterTransactionByCategory = (TransactionCategory) => {
    return apiGet(`/transaction/filter/category/${TransactionCategory}`);
}

export const updateTransaction = (TransactionId, TransactionData) => {
    return apiPut(`/transaction/update/${TransactionId}`, TransactionData);
}

export const deleteTransactionById = (TransactionId) => {
    return apiDelete(`/transaction/delete/id/${TransactionId}`);
}

export const deleteTransactionByName = (TransactionName) => {
    return apiDelete(`/transaction/delete/name/${TransactionName}`);
}