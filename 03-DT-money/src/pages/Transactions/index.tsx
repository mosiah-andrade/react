import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/searchForm";
import { PriceHightlight, TransactionContainer, TransactionTable } from "./styles";
import { useState, useEffect } from "react";


interface Transaction {
    id: number;
    description: string;
    type: 'income'| 'outcome';
    price: number;
    category: string;
    createdAt: string;
}


export function Transactions() {
    const [transactions, setTransactions] = useState<Transaction>([])


    async function loadTransactions() {
        const response = await fetch('https://expert-train-v6rjj7gq45xpcx996-4000.app.github.dev/')
        const data = await response.json()
        setTransactions(data)
        console.log(data)
    }

    useEffect(() => {
        loadTransactions()
    }, [])

    return (
        <div>
            <Header />
            <Summary/>

           <TransactionContainer>
                <SearchForm/>
                <TransactionTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                        <PriceHightlight variant={transaction.type}>R$ {transaction.price}</PriceHightlight>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.createAt}</td>
                                </tr>
                            )
                        })}
                    
                    </tbody>
                </TransactionTable>
           </TransactionContainer>
        </div>
    )
}