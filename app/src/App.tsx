import { Dashboard } from './Components/Dashboard'
import { Route, Routes } from 'react-router-dom'
import { CategoriesPage } from './Components/CategoriesPage'
import { ExpensesPage } from './Components/ExpensesPage'
import { StatsPage } from './Components/StatsPage'
import { SignUpPage } from './Components/SignUpPage'
import { SignInPage } from './Components/SignInPage'
import { NotFoundPage } from './Components/NotFoundPage'
import { Layout } from './Layouts/UserLayout'
import { SettingsPage } from './Components/SettingsPage'
import { ProfilePage } from './Components/ProfilePage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='/categories' element={<CategoriesPage/>}/>
          <Route path='/expenses' element={<ExpensesPage/>}/>
          <Route path='/stats' element={<StatsPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/settings' element={<SettingsPage/>}/>          
        </Route>
          <Route path='/sign-in' element={<SignInPage/>}/>
          <Route path='/sign-up' element={<SignUpPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>
  )
}

export default App
