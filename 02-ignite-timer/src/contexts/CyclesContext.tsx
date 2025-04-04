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

interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const [CyclesState, dispatch] = useReducer(
        (state: CyclesState, action: any) =>{

            switch(action.type) {
                case 'ADD_NEW_CYCLE':
                    return {
                        ...state, 
                        cycles: [...state.cycles, action.payload.newCycle],
                        activeCycleId: action.payload.newCycle.id,
                    }
                    
                case 'INTERRUPT_CURRENT_CYCLE':
                    return {
                        ...state,
                        cycles: state.cycles.map(cycle => {
                            if (cycle.id === state.activeCycleId) {
                                return {...cycle, interruptedDate: new Date()}
                            } else {
                                return cycle
                            }
                        }),
                        activeCycleId: null,
                    }
                    
                case 'MARK_CURRENT_CYCLE_AS_FINISHED':
                    return {
                        ...state,
                        cycles: state.cycles.map(cycle => {
                            if (cycle.id === state.activeCycleId) {
                                return {...cycle, finishedDate: new Date()}
                            } else {
                                return cycle
                            }
                        }),
                        activeCycleId: null,
                    }
                default:
                    return state
            }

        }, 
        
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
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
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
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle,
            },
        })
        
        setamountSecondsPassed(0)
    }

    function InterruptCycle() {
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
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