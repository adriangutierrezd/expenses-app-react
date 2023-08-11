import { NavLink } from 'react-router-dom'
import { Menu, X, Home, CircleDollarSign, Folder, BarChart3 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ProfileDropdownMenu } from './ProfileDropdownMenu'


export default function Header(){

    const [menuOpen, setMenuOpen] = useState(false)
    const [menuClassName, setMenuClassName] = useState('hidden')
  
    const handleMenuState = () => {
      setMenuOpen(!menuOpen)
    }
  
    useEffect(() => {
  
      const className = menuOpen ? 'open' : 'hidden'
      setMenuClassName(className)
  
      if(menuOpen){
        document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
      }else{
        document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
      }
  
    }, [menuOpen])
  

    return(
        <header className='p-4'>
        <nav className='flex justify-between'>
  
          <ul className={menuClassName}>
            <li><X className='ml-auto cursor-pointer' onClick={handleMenuState} /></li>
            <li>
              <NavLink onClick={handleMenuState} to="/">
                <Home />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleMenuState} to="/expenses">
              <CircleDollarSign />
              Expenses
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleMenuState} to="/categories">
              <Folder />
              Categories
              </NavLink>
            </li>
            <li>
              <NavLink onClick={handleMenuState} to="/stats">
              <BarChart3 />
              Stats
              </NavLink>
            </li>
          </ul>
  
          <Menu className='menu-icon cursor-pointer' onClick={handleMenuState} />
          <ProfileDropdownMenu/>
  
          
        </nav>
      </header>
    )
}