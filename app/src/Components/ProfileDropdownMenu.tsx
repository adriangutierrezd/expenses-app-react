import {
    LogOut,
    Settings,
    User,
    UserCircle2,
  } from "lucide-react"
  
import { NavLink } from "react-router-dom"

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../@/components/ui/dropdown-menu"
  
  export function ProfileDropdownMenu() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <UserCircle2 className='menu-icon cursor-pointer' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
          <NavLink className={'cursor-pointer'} to='/profile'>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </NavLink>
          <NavLink className={'cursor-pointer'} to='/settings'>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </NavLink>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  