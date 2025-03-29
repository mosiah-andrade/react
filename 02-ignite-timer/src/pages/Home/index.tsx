import { HandPalm, Play } from "phosphor-react";
import { createContext, useState } from "react";
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

interface Cycle {
    id: string;
    task: string;
    MinutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CycleContextType{
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    MinutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no min 5 minutos')
    .max(60, 'O ciclo precisa ser no maximo de 60 minutos')
})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
    export const CyclesContext = createContext({} as CycleContextType)
    
    const [cycles, setcycle] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setamountSecondsPassed] = useState(0)
    
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            MinutesAmount: 0,
        
        }
    })

    const { handleSubmit, watch, reset} = newCycleForm

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number) {
        setamountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        setcycle(
            (state) => state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return {...cycle, finishedDate: new Date()}
                } else {
                    return cycle
                }
            }),    
        )
    }

    function handleCreateNewCycle(data: NewCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            MinutesAmount: data.MinutesAmount,
            startDate: new Date(),
            
        }

        setcycle((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setamountSecondsPassed(0)

        reset()
    }

    function handleInterruptCycle() {

        setcycle((state) => 
            state.map(cycle => {
                if (cycle.id === activeCycleId) {
                    return {...cycle, interruptedDate: new Date()}
                } else {
                    return cycle
                }
            })
        )

        setActiveCycleId(null)
        document.title = "Ignite Timer"

    }

    const task = watch('task')
    const isSubmitDisabled = !task;


    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <CyclesContext.Provider 
                    value={{
                        activeCycle, 
                        activeCycleId, 
                        markCurrentCycleAsFinished,
                        amountSecondsPassed,
                        setSecondsPassed
                    }}
                >
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>
                {activeCycle ? (
                    <StopCountDownButton onClick={handleInterruptCycle} type="button">
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