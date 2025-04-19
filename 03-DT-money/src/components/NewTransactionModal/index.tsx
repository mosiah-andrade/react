import * as Diolog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type NewTransationFormInputs = z.infer<typeof newTransactionFormSchema >

export function NewTransactionModal() {
    const  createTransaction  = useContextSelector(TransactionsContext, (context) =>{
        return context.createTransaction;
    })

    const {
        control,
        register,
        handleSubmit,
        formState: {
            isSubmitting
        },
        reset
    } = useForm<NewTransationFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransationFormInputs) {
        const {description, price, category, type} = data;

        await createTransaction({
            description,
            price,
            category,
            type,

        })


        reset();
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

                      <Controller 
                        control={control}
                        name='type'
                        render={({field}) => {


                            return(
                                <TransactionType 
                                    onValueChange={field.onChange} 
                                    value={field.value}
                                >
                                    <TransactionTypeButton 
                                        variante='income' value='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>
        
                                    <TransactionTypeButton variante='outcome' value='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saída 
                                    </TransactionTypeButton>
        
                                </TransactionType>
                            )
                        }}
                      />

                        <button type="submit" disabled={isSubmitting}>
                            Cadastrar
                        </button>
                    </form>
                </Content>
            </Diolog.Portal>
        </div>
    )
}