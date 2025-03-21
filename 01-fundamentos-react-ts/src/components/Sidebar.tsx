import {PencilLine} from '@phosphor-icons/react'

import styles from './Sidebar.module.css'
import { Avatar } from './Avatar'

export function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img 
            className={styles.cover}
            src="https://images.unsplash.com/photo-1502951682449-e5b93545d46e?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <div className={styles.profile}>
            <Avatar src="https://github.com/mosiah-andrade.png"/>
                <strong>Mosiah Andrade</strong>
                <span>Web developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20}/> 
                     Editar deu perfil
                </a>
            </footer>
        </aside>
    )
}