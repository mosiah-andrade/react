import { Header } from "../../components/Header"
import { Summary } from "../../components/Summary"
import { SearchForm } from "./components/searchForm"
import { PriceHightlight, TransactionContainer, TransactionTable } from "./styles"
import { TransactionsContext } from "../../contexts/TransactionsContext"
import { dateFormatter, priceFormatter } from "../../utils/formatter"
import { useContextSelector } from "use-context-selector"



export function Transactions() {
  const transactions= useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionContainer>
        <SearchForm />
        <TransactionTable>
          <tbody>
            {transactions.map(transaction => {
              
              return (
                
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <PriceHightlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHightlight>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
                
              )
            })}
          </tbody>
        </TransactionTable>
      </TransactionContainer>
    </div>
  )}
