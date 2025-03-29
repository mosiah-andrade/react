import { HandPalm, Play } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import {differenceInSeconds} from 'date-fns'


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
    markCurrentCycleAsFinished: () => void
}

export const CyclesContext = createContext({} as CycleContextType)

export function Home() {
    
    const [cycles, setcycle] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
   
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

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
                <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
                    <NewCycleForm />
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