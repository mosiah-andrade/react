import {createContext, ReactNode, useEffect, useState,} from 'react'

interface Transaction {
    id: number
    description: string
    type: 'income' | 'outcome'
    price: number
    category: string
    createdAt: Date
  }

interface TransactionsContextType {
    transactions: Transaction[];
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext<TransactionsContextType>({} as TransactionsContextType) 

export function TransactionsProvider( {children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
      const response = await fetch('http://localhost:4000/transactions');
      const rawData = await response.json();
  
      const formattedData = rawData.map((transaction: any) => ({
          ...transaction,
          createdAt: new Date(transaction.createAt), // Fix the typo and convert to Date
      }));
  
      setTransactions(formattedData);
  }

  useEffect(() => {
    loadTransactions()
  }, [])
    return (
        <TransactionsContext.Provider value={{transactions}}>
            {children}
        </TransactionsContext.Provider>
    )
}