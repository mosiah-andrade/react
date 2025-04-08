import * as Diolog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay } from './styles'
import { X } from 'phosphor-react'


export function NewTransactionModal() {
    return (
        <div>
            <Diolog.Portal>
                <Overlay />

                <Content>
                    <Diolog.Title>Nova transação</Diolog.Title>

                    <CloseButton>
                        <X size={24}/>
                    </CloseButton>

                    <form action="">
                        <input type="text" placeholder='Descrição' required />
                        <input type="number" placeholder='Preço' required />
                        <input type="text" placeholder='Categoria' required />

                        <button type="submit">
                            Cadastrar
                        </button>
                    </form>
                </Content>
            </Diolog.Portal>
        </div>
    )
}