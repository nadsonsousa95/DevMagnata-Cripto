import styles from './404.module.css';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Moeda não encontrada.</p>
      <Link to="/" className={styles.homeButton}>
        Voltar para a Home
      </Link>
    </div>
  );
}