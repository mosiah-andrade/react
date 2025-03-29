import { useEffect, useState } from "react";
import { CountContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";

interface CountdownProps {
    activeCycle: any
    setcycle: any
    activeCycleId: any
}

export function Countdown({activeCycle, setcycle, activeCycleId}:CountdownProps){
    const [amountSecondsPassed, setamountSecondsPassed] = useState(0)

    const totalSeconds = activeCycle ? activeCycle.MinutesAmount * 60 : 0

    useEffect(() => {
        let interval: number = 0; 

        if(activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(), 
                    activeCycle.startDate
                )
                
                if (secondsDifference >= totalSeconds) {
                    setcycle(
                        (state) => state.map(cycle => {
                            if (cycle.id === activeCycleId) {
                                return {...cycle, finishedDate: new Date()}
                            } else {
                                return cycle
                            }
                        }),    
                    )

                    setamountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                    document.title="Ignite Timer"
                } else {
                    setamountSecondsPassed(secondsDifference)

                }    
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId])
    
    return (
        <CountContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountContainer>
    )
}