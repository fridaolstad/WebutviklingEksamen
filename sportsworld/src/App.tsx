
import { AthleteProvider } from './context/AthleteContext'
import { FinanceProvider } from './context/FinanceContext'
import AppRouting from './routing/AppRouting'
import PageFooter from './components/shared/PageFooter'

function App() {
  return (
   <AthleteProvider>
    <FinanceProvider>
      <div className='flex flex-col min-h-screen'>
        <main>
      <AppRouting/>
       </main>
       <PageFooter/>
      </div>
    </FinanceProvider>
   </AthleteProvider>
  )
}

export default App
