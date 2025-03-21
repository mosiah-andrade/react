import { useState } from 'react';
import { ThumbsUp, Trash } from '@phosphor-icons/react'
import styles from './Comentario.module.css'
import { Avatar } from './Avatar'

export function Comment({ content, onDeleteComment }) {

    const [likeCount, setLikeCount] = useState(0);

    function handleDeleteComment(){
        onDeleteComment(content);
    }

    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1;
        })
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/mosiah-andrade.png"/>

            <div className={styles.comentarioBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Mosiah Andrade</strong>
                            <time title="11 de Maio ás 08:13h" dateTime='2022-05-11 08:13;00'>Cerca de 1h atrás</time> 
                        </div>

                        <button onClick={handleDeleteComment} title='Deletar comentario'>
                            <Trash size={24}/>
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>

            </div>
        </div>
    )
}
