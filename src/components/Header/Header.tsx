import styles from './Header.module.css'
import { Link } from 'react-router-dom'

export function Header() {

  return (
    <header className={styles.headermain}>
        <Link to={"/"}>
            <h1 className={styles.logo}>Dev<span>Magnata</span></h1>
        </Link>
        
    </header>
  )
}
