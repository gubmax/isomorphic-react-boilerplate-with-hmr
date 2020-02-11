import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import useStyles from 'isomorphic-style-loader/useStyles'

import { HomePage, UsersPage } from '@app/components/pages'
import s from './App.css'
import LogoIcon from './logo.svg'

const App = () => {
  useStyles(s)
  return (
    <>
      <LogoIcon className={s.logo} />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/users" component={UsersPage} />
      </Switch>
    </>
  )
}

export default App
