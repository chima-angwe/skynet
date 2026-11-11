import type { Section } from '../../App'
import styles from './Overview.module.css'
type Props = { onNavigate: (section: Section) => void }
const products = [
  { icon: '▤', title: 'Cloud compute', text: '3 instances', section: 'Cloud compute' as Section },
  { icon: '▧', title: 'GPU compute', text: 'Accelerated servers', section: 'GPU compute' as Section },
  { icon: '◎', title: 'Domains', text: '2 domains', section: 'Domains' as Section },
  { icon: '⌘', title: 'Hosting', text: '2 active plans', section: 'Hosting' as Section },
]
export function Overview({ onNavigate }: Props) { return <div className={styles.page}>
  <div className={styles.welcome}><div><h1>Overview</h1><p>Welcome back, Jane.</p></div><button onClick={() => onNavigate('Cloud compute')} className={styles.primary}>＋ &nbsp;New resource</button></div>
  <div className={styles.stats}>
    <article className={styles.stat}><div className={styles.statHead}>INSTANCES</div><div className={styles.statValue}>03</div><div className={styles.statFoot}><i className={styles.greenDot}/> All operational</div></article>
    <article className={styles.stat}><div className={styles.statHead}>MONTHLY SPEND</div><div className={styles.statValue}>$142<span className={styles.cents}>.57</span></div><div className={styles.statFoot}>↓ 4.2% <span>vs last month</span></div><div className={styles.spark}><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
    <article className={styles.stat}><div className={styles.statHead}>DOMAINS</div><div className={styles.statValue}>02</div><div className={styles.statFoot}><i className={styles.amberDot}/> 1 renewal soon</div></article>
    <article className={styles.stat}><div className={styles.statHead}>HOSTING</div><div className={styles.statValue}>02</div><div className={styles.statFoot}><i className={styles.greenDot}/> All active</div></article>
  </div>
  <section className={styles.section}><div className={styles.sectionTitle}><h2>Resources</h2></div><div className={styles.products}>{products.map(p => <button key={p.title} className={styles.product} onClick={() => onNavigate(p.section)}><div className={styles.productTop}><span className={styles.productIcon}>{p.icon}</span><span className={styles.arrow}>↗</span></div><h3>{p.title}</h3><p>{p.text}</p></button>)}</div></section>
  <section className={styles.panel}><div className={styles.panelTitle}><h2>Recent activity</h2><button>View all →</button></div><div className={styles.activity}><span className={styles.activityIcon}>↻</span><span><b>Instance restarted</b><small>cloud-prod-01</small></span><time>12 min ago</time></div><div className={styles.activity}><span className={`${styles.activityIcon} ${styles.blue}`}>＋</span><span><b>Domain connected</b><small>acme.studio</small></span><time>Yesterday</time></div></section>
 </div> }
