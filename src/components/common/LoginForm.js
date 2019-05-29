import React from 'react'
import { Link } from 'react-router-dom'


const LoginForm = ({ handleChange, handleSubmit }) => {
  return(
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            name="email"
            placeholder="eg: john.smith@gmail.com"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            name="password"
            type="password"
            placeholder="eg: ••••••••"
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="button is-primary">Login</button>
      <Link to='/register'><button className="button is-primary">Register</button></Link>
    </form>
  )
}

export default LoginForm
