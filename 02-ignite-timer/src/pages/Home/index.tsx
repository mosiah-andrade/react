import { Play } from "phosphor-react";
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { CountContainer,
     FormContainer, 
     HomeContainer, 
     MinutesAmountInput, 
     Separator, 
     StartCountDownButton, 
     TaskInput } from "./styles";

import {useForm} from 'react-hook-form'

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    MinutesAmount: zod.number().min(5, 'O ciclo precisa ser de no min 5 minutos').max(60, 'O ciclo precisa ser no maximo de 60 minutos')
})

export function Home() {
    
    const {register, handleSubmit, watch} = useForm({
        resolver: zodResolver(newCycleFormValidationSchema)
    })

    function handleCreateNewCycle(data) {
        console.log(data)
    }

    const task = watch('task')
    const isSubmitDisabled = !task;


    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        type="text" 
                        id="task"  
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"/>
                        <option value="Projeto 2"/>
                        <option value="Projeto 3"/>
                        <option value="Projeto 4"/>
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                    type="number" 
                    id="minutesAmount" 
                    placeholder="00" 
                    step={5}
                    min={5}
                    max={60}
                    {...register('minuteAmount',{ valueAsNumber: true })}
                />

                    <span>minutos.</span>
                </FormContainer>

                <CountContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountContainer>

                <StartCountDownButton  type="submit" disabled={isSubmitDisabled}>
                    <Play />
                    Começar
                </StartCountDownButton>

            </form>
        </HomeContainer>
    )
}