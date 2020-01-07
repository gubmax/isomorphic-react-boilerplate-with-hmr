import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { HomePage, UsersPage } from '@app/components/pages'

const App = () => (
  <>
    <h1>Hello World!</h1>
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

export default App
