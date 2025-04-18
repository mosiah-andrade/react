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
    fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext<TransactionsContextType>({} as TransactionsContextType) 

export function TransactionsProvider( {children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
        const url = new URL('http://localhost:4000/transactions')


        if (query) {
            url.searchParams.append('q', query)
        }
      const response = await fetch(url);
      const rawData = await response.json();
  
      const formattedData = rawData.map((transaction: any) => ({
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