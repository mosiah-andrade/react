import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {useForm} from 'react-hook-form'
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    MinutesAmount: zod
        .number()
        .min(5, 'O ciclo precisa ser de no min 5 minutos')
        .max(60, 'O ciclo precisa ser no maximo de 60 minutos')
})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            MinutesAmount: 0,
        
        }
    })

export function NewCycleForm (){
    return (
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
    )
}