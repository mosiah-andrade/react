import { HandPalm, Play } from "phosphor-react";
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {useForm} from 'react-hook-form'
import { useEffect, useState } from "react";
import {differenceInSeconds} from 'date-fns'


import { CountContainer,
     FormContainer, 
     HomeContainer, 
     MinutesAmountInput, 
     Separator, 
     StartCountDownButton, 
     StopCountDownButton, 
     TaskInput } from "./styles";



const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    MinutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser de no min 5 minutos')
        .max(60, 'O ciclo precisa ser no maximo de 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

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
    const [amountSecondsPassed, setamountSecondsPassed] = useState(0)


    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            MinutesAmount: 0,
        
        }
    })
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)
    
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
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        type="text" 
                        id="task"  
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                        disabled={!!activeCycle}
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"/>
                        <option value="Projeto 2"/>
                        <option value="Projeto 3"/>
                        <option value="Projeto 4"/>
                    </datalist>
                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput 
                    type="number" 
                    id="minutesAmount" 
                    placeholder="00" 
                    step={5}
                    min={5}
                    max={60}
                    disabled={!!activeCycle}
                    {...register('MinutesAmount',{ valueAsNumber: true })}
                />

                    <span>minutos.</span>
                </FormContainer>

                <CountContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountContainer>

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