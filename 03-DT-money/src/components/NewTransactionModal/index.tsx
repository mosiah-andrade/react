import * as Diolog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type NewTransationFormInputs = z.infer<typeof newTransactionFormSchema >

export function NewTransactionModal() {

    const {
        register,
        handleSubmit,
        formState: {
            isSubmitting
        }
    } = useForm<NewTransationFormInputs>({
        resolver: zodResolver(newTransactionFormSchema)
    })

    function handleCreateNewTransaction(data: NewTransationFormInputs) {
        console.log(data);
    }

    return (
        <div>
            <Diolog.Portal>
                <Overlay />

                <Content>
                    <Diolog.Title>Nova transação</Diolog.Title>

                    <CloseButton>
                        <X size={24}/>
                    </CloseButton>

                    <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                        <input 
                            type="text" 
                            placeholder='Descrição' 
                            required 
                            {... register('description')}
                        />
                        <input 
                            type="number" 
                            placeholder='Preço' 
                            required 
                            {... register('price', {valueAsNumber: true})}
                        />
                        <input 
                            type="text" 
                            placeholder='Categoria' 
                            required 
                            {... register('category')}
                        />

                        <TransactionType>
                            <TransactionTypeButton variante='income' value='income'>
                                <ArrowCircleUp size={24} />
                                Entrada
                            </TransactionTypeButton>

                            <TransactionTypeButton variante='outcome' value='outcome'>
                                <ArrowCircleDown size={24} />
                                Saída 
                            </TransactionTypeButton>

                        </TransactionType>

                        <button type="submit" disabled={isSubmitting}>
                            Cadastrar
                        </button>
                    </form>
                </Content>
            </Diolog.Portal>
        </div>
    )
}