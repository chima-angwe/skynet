import type { Section } from "../../App";
import styles from "./Sidebar.module.css";
type Props = {
  active: Section;
  onNavigate: (section: Section) => void;
  onSignOut: () => void;
};
const groups: {
  label: string;
  items: { name: Section; icon: string; label?: string }[];
}[] = [
  { label: "", items: [{ name: "Overview", icon: "◫" }] },
  {
    label: "INFRASTRUCTURE",
    items: [
      { name: "Cloud compute", icon: "▤" },
      { name: "GPU compute", icon: "▧" },
      { name: "Domains", icon: "◎" },
      { name: "Hosting", icon: "⌘" },
    ],
  },
  {
    label: "ACCOUNT",
    items: [{ name: "Billing", label: "Settings", icon: "◷" }],
  },
];
export function Sidebar({ active, onNavigate, onSignOut }: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}><img src="/skynet-logo.png" alt="Skynet" /></div>
      <nav>
        {groups.map((group) => (
          <div className={styles.group} key={group.label}>
            <div className={styles.label}>{group.label}</div>
            {group.items.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.name)}
                className={`${styles.item} ${active === item.name ? styles.active : ""}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.label ?? item.name}
                {item.name === "Cloud compute" && <i>3</i>}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className={styles.bottom}>
        <div className={styles.usage}>
          <div>
            <span>Monthly usage</span>
            <b>$142.57</b>
          </div>
          <div className={styles.bar}>
            <i />
          </div>
          <small>$142.57 of $500.00</small>
        </div>
        <button className={styles.help}>
          ◉ <span>Help & support</span>
          <b>↗</b>
        </button>
        <button className={styles.profile} onClick={onSignOut}>
          <div className={styles.person}>JD</div>
          <span>
            Jane Doe<small>Pro plan · Sign out</small>
          </span>
          <b>↗</b>
        </button>
      </div>
    </aside>
  );
}



