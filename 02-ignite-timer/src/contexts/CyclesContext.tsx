import { createContext, ReactNode, useState, useReducer } from "react";

interface CreateCycleData {
    task: string;
    MinutesAmount: number;
}

interface Cycle {
    id: string;
    task: string;
    MinutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
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
    const [cycles, dispatch] = useReducer((state: Cycle[], action: any) =>{
        
        if (action.type === 'ADD_NEW_CYCLE') {
            return [...state, action.payload.newCycle ]
        }

        return state
    }, [])

    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setamountSecondsPassed] = useState(0)
    
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number) {
        setamountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId,
            },
        })
        // setcycle(
        //     (state) => state.map(cycle => {
        //         if (cycle.id === activeCycleId) {
        //             return {...cycle, finishedDate: new Date()}
        //         } else {
        //             return cycle
        //         }
        //     }),    
        // )
    }

    function CreateNewCycle(data: CreateCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            MinutesAmount: data.MinutesAmount,
            startDate: new Date(),
            
        }

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle,
            },
        })

        // setcycle((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setamountSecondsPassed(0)
    }

    function InterruptCycle() {
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload: {
                activeCycleId,
            },
        })

        // setcycle((state) => 
        //     state.map(cycle => {
        //         if (cycle.id === activeCycleId) {
        //             return {...cycle, interruptedDate: new Date()}
        //         } else {
        //             return cycle
        //         }
        //     })
        // )

        setActiveCycleId(null)
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