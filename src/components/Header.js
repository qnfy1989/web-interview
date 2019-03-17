import React from 'react'
import { Icon } from 'semantic-ui-react'
import logo from '../logo.png'

function Header() {
  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <div className={'flex-row'}>
        <>
          <Icon size="large" name="calendar plus outline" />
          <p className={'icon-text'}>Book</p>
        </>
      </div>
      <div className={'flex-row'}>
        <>
          <Icon size="large" name="calendar outline" />
          <p className={'icon-text'}>Appointments</p>
        </>
      </div>
      <div className={'flex-row'}>
        <>
          <Icon size="large" name="users" />
          <p className={'icon-text'}>Family Members</p>
        </>
      </div>
    </header>
  )
}

export default Header
