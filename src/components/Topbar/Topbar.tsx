import styles from './Topbar.module.css'
type Props = { theme: 'dark' | 'light'; onThemeToggle: () => void }
export function Topbar({ theme, onThemeToggle }: Props) { return <header className={styles.topbar}>
  <div className={styles.crumb}><span className={styles.orgAvatar}>A</span><b>Acme Studio</b><span className={styles.separator}></span></div>
  <div className={styles.actions}><button className={styles.theme} onClick={onThemeToggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? '☼' : '◐'}</button></div>
</header> }
