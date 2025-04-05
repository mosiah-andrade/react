import { createContext, ReactNode, useState, useReducer } from "react";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import { addNewCycleAction, interrupteCurrentCycleAction } from "../reducers/cycles/actions";

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
    const [CyclesState, dispatch] = useReducer(cyclesReducer,
        {
            cycles:[],
            activeCycleId: null,
        },
    )

    const [amountSecondsPassed, setamountSecondsPassed] = useState(0)
    
    const { cycles, activeCycleId }  = CyclesState;
    
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number) {
        setamountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinished())
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