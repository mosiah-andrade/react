import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Diolog from '@radix-ui/react-dialog'

import logoImg from '../../assests/logo.svg'

export function Header() {
    return (
        <HeaderContainer>

            <HeaderContent>
                <img src={logoImg} alt="" />
                <Diolog.Root>
                    <Diolog.Trigger asChild>
                        <NewTransactionButton>Nova transação</NewTransactionButton>
                    </Diolog.Trigger>
                    
                    <Diolog.Portal>
                        <Diolog.Overlay />

                        <Diolog.Content>
                            <Diolog.Title>Nova transação</Diolog.Title>
                            
                            <Diolog.Close />
                        </Diolog.Content>
                    </Diolog.Portal>

                </Diolog.Root>
            </HeaderContent>
        </HeaderContainer>
    )
}