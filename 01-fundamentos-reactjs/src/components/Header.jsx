import styles from'./Header.module.css'

import igniteLogo from '../assets/Ignite-logo.svg'

export function Header() {
    return (
        <header className={styles.header}>
            <img src={igniteLogo} alt="Logo tipo do Ignite" />
            <strong >Ignite Feed</strong>
        </header>
    );
}