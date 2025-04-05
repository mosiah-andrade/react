import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { addNewCycleAction, interrupteCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
    task: string;
    MinutesAmount: number;
}

interface CycleContextType{
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number,
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    CreateNewCycle: (data: CreateCycleData) => void
    InterruptCycle: () => void
}

export const CyclesContext  = createContext({} as CycleContextType)


interface CyclesContextProviderProps {
    children: ReactNode
}


export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const [CyclesState, dispatch] = useReducer(cyclesReducer,{
        cycles:[],
        activeCycleId: null,
    }, 
    (initialState) => {
        const storedStateAsJSON = localStorage.getItem(
            '@ignite-Timer:cycles-state-1.0.0'
        )

        if (storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }
        
        return initialState
    })
    
    const { cycles, activeCycleId }  = CyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    const [amountSecondsPassed, setamountSecondsPassed] = useState(() =>{
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })
    
    useEffect(() =>{
        const stateJSON = JSON.stringify(CyclesState)

        localStorage.setItem('@ignite-Timer:cycles-state-1.0.0', stateJSON)
    }, [CyclesState])

    

    function setSecondsPassed(seconds: number) {
        setamountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function CreateNewCycle(data: CreateCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            MinutesAmount: data.MinutesAmount,
            startDate: new Date(),
            
        }

        dispatch(addNewCycleAction(newCycle))
        
        setamountSecondsPassed(0)
    }

    function InterruptCycle() {
        dispatch(interrupteCurrentCycleAction())

        

        document.title = "Ignite Timer"

    }

    return (
        <CyclesContext.Provider 
          value={{
                cycles,
                activeCycle, 
                activeCycleId, 
                markCurrentCycleAsFinished,
                amountSecondsPassed,
                setSecondsPassed, 
                InterruptCycle,
                CreateNewCycle
          }}  
        >
            {children}
        </CyclesContext.Provider>
    )

}