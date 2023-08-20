import { HomePage } from './Components/HomePage'
import { Route, Routes } from 'react-router-dom'
import { CategoriesPage } from './Components/CategoriesPage'
import { ExpensesPage } from './Components/ExpensesPage'
import { SignUpPage } from './Components/SignUpPage'
import { SignInPage } from './Components/SignInPage'
import { NotFoundPage } from './Components/NotFoundPage'
import { Layout } from './Layouts/UserLayout'
import { SettingsPage } from './Components/SettingsPage'
import { ProfilePage } from './Components/ProfilePage'
import { UserProvider } from './context/user'
import { Toaster } from '../@/components/ui/toaster'

function App() {

  const path = window.location.pathname

  if(window.localStorage.getItem('loggedUser') == 'null' && !['/sign-in', '/sign-up'].includes(path)){
    window.location.href = '/sign-in'
    return 
  }

  

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/categories' element={<CategoriesPage/>}/>
          <Route path='/expenses' element={<ExpensesPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/settings' element={<SettingsPage/>}/>          
        </Route>
          <Route path='/sign-in' element={<SignInPage/>}/>
          <Route path='/sign-up' element={<SignUpPage/>}/>
          <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      <Toaster/>
    </UserProvider>
  )
}

export default App
