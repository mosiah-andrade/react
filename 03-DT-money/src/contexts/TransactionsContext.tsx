import {createContext, ReactNode, useEffect, useState,} from 'react'
import { api } from '../lib/axios'

interface Transaction {
    id: number
    description: string
    type: 'income' | 'outcome'
    price: number
    category: string
    createdAt: Date;
  }

interface TransactionsContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext<TransactionsContextType>({} as TransactionsContextType) 

export function TransactionsProvider( {children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
        const response = await api.get('/transactions',{
                params: {
                    q: query,
                }
            })
  
      const formattedData = response.data.map((transaction: any) => ({
          ...transaction,
          createdAt: new Date(transaction.createAt), // Fix the typo and convert to Date
      }));
  
      setTransactions(formattedData);

  }

  useEffect(() => {
    fetchTransactions()
  }, [])
    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}