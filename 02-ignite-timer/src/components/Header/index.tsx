import { HeaderContainer } from "./styles";
import logoIgnite from '../../assets/Ignite-logo.svg'
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from 'react-router-dom'
export function Header() {
    return(
        
        <HeaderContainer>
            <span>
                <img src={logoIgnite} alt="" width={44}/>
            </span>
            <nav>
                <NavLink to="/" title="Timer">
                   <Timer size={24}/>
                </NavLink>
                <NavLink to="/history" title="Histórico">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}