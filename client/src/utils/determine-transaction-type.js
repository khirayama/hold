import transactionTypes from 'constants/transaction-types';

export default function determineTransactionType(transaction) {
  if (
    transaction.toAccount === null &&
    transaction.fromAccount !== null
  ) {
    return transactionTypes.PAYMENT;
  } else if (
    transaction.toAccount !== null &&
    transaction.fromAccount === null
  ) {
    return transactionTypes.INCOME;
  } else if (
    transaction.toAccount !== null &&
    transaction.fromAccount !== null
  ) {
    return transactionTypes.TRANSFER;
  }
  return null;
}
