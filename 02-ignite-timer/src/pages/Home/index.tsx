import { HandPalm, Play } from "phosphor-react";
import { useEffect, useState } from "react";
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

export function Home() {
    
    const [cycles, setcycle] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
   
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

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

    const currentSeconde = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconde / 60)
    const secondsAmount = currentSeconde % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        if(activeCycle){
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    const task = watch('task')
    const isSubmitDisabled = !task;


    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                
                <NewCycleForm />
                <Countdown 
                    activeCycle={activeCycle} 
                    setcycle={setcycle} 
                    activeCycleId={activeCycleId}
                />

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