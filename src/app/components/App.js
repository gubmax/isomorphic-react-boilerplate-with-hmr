import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import useStyles from 'isomorphic-style-loader/useStyles'

import { HomePage, UsersPage } from '@app/components/pages'
import s from './App.css'
import LogoIcon from './logo.svg'

const App = () => {
  useStyles(s)
  return (
    <div className={s.wrapper}>
      <header>
        <LogoIcon className={s.logo} />
        <nav className={s.nav}>
          <Link to="/" className={s.link}>Home</Link>
          <Link to="/users" className={s.link}>Users</Link>
        </nav>
      </header>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users" component={UsersPage} />
      </Switch>
    </div>
  )
}

export default App
