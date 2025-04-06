import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { PriceHightlight, TransactionContainer, TransactionTable } from "./styles";

export function Transactions() {
    return (
        <div>
            <Header />
            <Summary/>

           <TransactionContainer>
                <TransactionTable>
                    <tbody>
                        <tr>
                            <td width="50%">Desenvolvimento de site</td>
                            <PriceHightlight variant="income">R$ 12.000,00</PriceHightlight>
                            <td>Venda</td>
                            <td>13/04/2022</td>
                        </tr>
                        <tr>
                            <td width="50%">Netflix</td>
                            <PriceHightlight variant="outcome">- R$ 100,00</PriceHightlight>
                            <td>Entretendimento</td>
                            <td>10/04/2022</td>
                        </tr>
                    
                    </tbody>
                </TransactionTable>
           </TransactionContainer>
        </div>
    )
}