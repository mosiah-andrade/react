import { HandPalm, Play } from "phosphor-react";
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {FormProvider, useForm} from 'react-hook-form'

import {  
    HomeContainer, 
    StartCountDownButton, 
    StopCountDownButton,
} from "./styles";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    MinutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser de no min 5 minutos')
        .max(60, 'O ciclo precisa ser no maximo de 60 minutos')
})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    const {CreateNewCycle, InterruptCycle, activeCycle} = useContext(CyclesContext)
   
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            MinutesAmount: 0,
        
        }
    })

    const { handleSubmit, watch, /*reset*/} = newCycleForm

    

    const task = watch('task')
    const isSubmitDisabled = !task;


    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(CreateNewCycle)} action="">
            
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
                {activeCycle ? (
                    <StopCountDownButton onClick={InterruptCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountDownButton>

                ) : (
                    <StartCountDownButton  type="submit" disabled={isSubmitDisabled}>
                        <Play size={24}/>
                        Começar
                    </StartCountDownButton>

                )}
            </form>
        </HomeContainer>
    )
}