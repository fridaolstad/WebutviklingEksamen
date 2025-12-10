
import { AthleteProvider } from './context/AthleteContext'
import { FinanceProvider } from './context/FinanceContext'
import AppRouting from './routing/AppRouting'

function App() {
  return (
   <AthleteProvider>
    <FinanceProvider>
      <AppRouting/>
    </FinanceProvider>
   </AthleteProvider>
  )
}

export default App
