
import { AthleteProvider } from './context/AthleteContext'
import { FinanceProvider } from './context/FinanceContext'
import AppRoutes from './routing/AppRoutes';

function App() {
  return (
   <AthleteProvider>
    <FinanceProvider>
      <AppRoutes></AppRoutes>
    </FinanceProvider>
   </AthleteProvider>
  )
}

export default App
