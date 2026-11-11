import { useEffect, useMemo, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { Overview } from './features/overview'
import { CloudBuilder } from './features/cloud-builder'
import { ResourcePage } from './features/resource-page'
import { AuthPage } from './features/auth'
import styles from './App.module.css'

export type Section = 'Overview' | 'Cloud compute' | 'GPU compute' | 'Domains' | 'Hosting' | 'Billing'
export type CloudInstance = { name: string; type: string; spec: string; region: string; status: 'Running' | 'Stopped'; date: string }

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = window.localStorage.getItem('skynet-theme')
    return saved === 'light' || saved === 'dark' ? saved : window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [section, setSection] = useState<Section>('Overview')
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'reset' | null>('signin')
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  const [cloudBuilderOpen, setCloudBuilderOpen] = useState(false)
  const [extraCloud, setExtraCloud] = useState<CloudInstance[]>([])
  const [platform, setPlatform] = useState('Cloud VPS')
  const [cpu, setCpu] = useState(2)
  const [ram, setRam] = useState(4)
  const [storage, setStorage] = useState(80)
  const [storageType, setStorageType] = useState('SSD')
  const [os, setOs] = useState('Ubuntu 24.04 LTS')
  const [region, setRegion] = useState('Lagos')
  const [ips, setIps] = useState(1)
  const [gpuUnits,setGpuUnits] = useState(1)
  const price = useMemo(() => cpu * 4 + ram * 2 + storage * (storageType === 'NVMe' ? .11 : storageType === 'HDD' ? .035 : .06) + ips * 2 + (platform === 'GPU VPS' ? 125 * gpuUnits : platform === 'Dedicated cloud' ? 190 : 0), [cpu, ram, storage, storageType, ips, platform, gpuUnits])
  const navigate = (nextSection: Section) => {
    setSection(nextSection)
    setQuery('')
    setCloudBuilderOpen(false)
    if (nextSection === 'GPU compute') setPlatform('GPU VPS')
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('skynet-theme', theme)
  }, [theme])

  if (authMode) return <AuthPage mode={authMode} theme={theme} onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} onModeChange={setAuthMode} onComplete={() => { setAuthMode(null); setNotice('Welcome to your Skynet workspace.') }} />
  return <div className={styles.shell}>
    <Sidebar active={section} onNavigate={navigate} onSignOut={() => setAuthMode('signin')} />
    <main className={styles.main}>
      <Topbar query={query} onQuery={setQuery} theme={theme} onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      {notice && <button className={styles.notice} onClick={() => setNotice('')}>{notice}<span>×</span></button>}
      {section === 'Overview' && <Overview onNavigate={navigate} />}
      {(section === 'Cloud compute' || section === 'GPU compute') && (cloudBuilderOpen
        ? <CloudBuilder section={section} platform={platform} setPlatform={setPlatform} cpu={cpu} setCpu={setCpu} ram={ram} setRam={setRam} storage={storage} setStorage={setStorage} storageType={storageType} setStorageType={setStorageType} os={os} setOs={setOs} region={region} setRegion={setRegion} ips={ips} setIps={setIps} gpuUnits={gpuUnits} setGpuUnits={setGpuUnits} price={price} onDeploy={(name) => { const type = section === 'GPU compute' ? 'GPU VPS' : platform; setExtraCloud(items => [{ name: name || `new-${type === 'GPU VPS' ? 'gpu' : 'cloud'}-${String(items.length + 1).padStart(2, '0')}`, type, spec: `${cpu} vCPU · ${ram} GB RAM · ${storage} GB ${storageType}`, region, status: 'Running', date: 'Created just now' }, ...items]); setCloudBuilderOpen(false); setNotice('Instance created in this demo workspace.') }} onCancel={() => setCloudBuilderOpen(false)} />
        : <ResourcePage key={section} section={section} query={query} extraCloud={extraCloud} onAdd={() => setCloudBuilderOpen(true)} />)}
      {['Domains', 'Hosting', 'Billing'].includes(section) && <ResourcePage key={section} section={section} query={query} extraCloud={extraCloud} onAdd={() => setNotice(`${section} workflow opened.`)} onSignOut={() => setAuthMode('signin')} />}
    </main>
  </div>
}
export default App
