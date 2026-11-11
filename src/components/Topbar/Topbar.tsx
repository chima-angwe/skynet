import styles from './Topbar.module.css'
type Props = { query: string; onQuery: (query: string) => void; theme: 'dark' | 'light'; onThemeToggle: () => void }
export function Topbar({ query, onQuery, theme, onThemeToggle }: Props) { return <header className={styles.topbar}>
  <div className={styles.crumb}><b>Workspace</b></div>
  <div className={styles.actions}><label className={styles.search}><span>⌕</span><input value={query} onChange={e => onQuery(e.target.value)} placeholder="Search" /></label><button className={styles.theme} onClick={onThemeToggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? '☼' : '◐'}<span>{theme === 'dark' ? 'Light' : 'Dark'}</span></button></div>
</header> }
