import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

type TransactionType = 'deposit' | 'withdraw';

interface Transaction {
  type: TransactionType;
  amount: number;
  date: string;
  balance: number;
}

const BankTransactions = () => {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string>('');

  const handleTransaction = (type: TransactionType): void => {
    const numAmount = parseFloat(amount);
    
    if (numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (type === 'withdraw' && numAmount > balance) {
      setError('Insufficient funds');
      return;
    }

    const newBalance = type === 'deposit' 
      ? balance + numAmount 
      : balance - numAmount;

    const newTransaction: Transaction = {
      type,
      amount: numAmount,
      date: new Date().toLocaleString(),
      balance: newBalance
    };

    setBalance(newBalance);
    setTransactions([newTransaction, ...transactions]);
    setAmount('');
    setError('');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Bank Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-green-600">
              ${balance.toFixed(2)}
            </div>
            <div className="text-gray-500">Current Balance</div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="flex-1"
              />
              <Button 
                onClick={() => handleTransaction('deposit')}
                className="bg-green-600 hover:bg-green-700"
              >
                Deposit
              </Button>
              <Button 
                onClick={() => handleTransaction('withdraw')}
                className="bg-red-600 hover:bg-red-700"
              >
                Withdraw
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {transactions.length === 0 ? (
              <div className="text-center text-gray-500">
                No transactions yet
              </div>
            ) : (
              transactions.map((transaction, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-3 border rounded"
                >
                  <div>
                    <div className={`font-medium ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {transaction.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Balance: ${transaction.balance.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankTransactions;