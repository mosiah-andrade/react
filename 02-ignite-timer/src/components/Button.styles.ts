import styled, {css} from "styled-components";

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerprops{
    variant: ButtonVariant;
}

const buttonVariants = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    success: 'green'
}
export const ButtonContainer = styled.button<ButtonContainerprops> `

    width: 100px;
    height: 40px;
    border-radius: 4px;
    border: 0;
    margin: 8px;
    
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white}

    /* ${props => {
        return css`
            background-color: ${buttonVariants[props.variant]}
        `
    }}*/

`