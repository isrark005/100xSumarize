import './App.css'
import { Dashboard } from './components/dashboard/Dashboard'
import { Header } from './components/header/Header'
import { config } from './config/config'

function App() {
console.log(config)
  return (
    <>
    <Header/>
    <Dashboard/>
    </>
  )
}

export default App
