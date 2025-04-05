import { createContext, ReactNode, useState, useReducer } from "react";
import { ActionTypes, Cycle, cyclesReducer } from '../reducers/cycles'

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
        dispatch({
            type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
            payload: {
                activeCycleId,
            },
        })
    }

    function CreateNewCycle(data: CreateCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            MinutesAmount: data.MinutesAmount,
            startDate: new Date(),
            
        }

        dispatch({
            type: ActionTypes.ADD_NEW_CYCLE,
            payload: {
                newCycle,
            },
        })
        
        setamountSecondsPassed(0)
    }

    function InterruptCycle() {
        dispatch({
            type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
            payload: {
                activeCycleId,
            },
        })

        

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