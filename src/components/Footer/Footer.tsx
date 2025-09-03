import styles from './Footer.module.css'

export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.title}>DevMagnata</p>
          <p className={styles.creator}>Criado por Nadson Sousa</p>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}