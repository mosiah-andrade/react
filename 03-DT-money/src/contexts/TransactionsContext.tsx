import { ReactNode, useEffect, useState,} from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
    id: number
    description: string
    type: 'income' | 'outcome'
    price: number
    category: string
    createdAt: Date;
  }

  interface CreateTransactionInput {
    description: string,
    price: number,
    category: string, 
    type: 'income' | 'outcome',
}
interface TransactionsContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>;
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
                    _sort: 'createdAt',
                    _order: 'desc',
                    q: query,
                }
            })
  
            const formattedData = response.data.map((transaction: any) => ({
                ...transaction,
                createdAt: transaction.createdAt ? new Date(transaction.createdAt) : new Date(),
              }));
              
  
      setTransactions(formattedData);

  }

   async function createTransaction(data: CreateTransactionInput) {
    const {description, price, category, type} = data;

    const response = await api.post('transactions', {
        description,
        price,
        category, 
        type,
        createdAt: new Date(),
    })

    setTransactions(state => [ response.data, ...transactions])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])
    return (
        <TransactionsContext.Provider value={{
            transactions,
            fetchTransactions,
            createTransaction
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}