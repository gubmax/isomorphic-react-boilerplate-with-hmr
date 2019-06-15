import React from 'react'
import { Route, Link } from 'react-router-dom'

const Index = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>

const App = () => (
  <div>
    <h1>Hello World!</h1>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>

    <Route path="/" exact component={Index} />
    <Route path="/about" component={About} />
    <Route path="/users" component={Users} />
  </div>
)

export default App
