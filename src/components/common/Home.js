import React from 'react'
import LoginForm from './LoginForm'
import axios from 'axios'
import Auth from '../lib/Auth'
import Flash from '../lib/Flash'

class Home extends React.Component{
  constructor() {
    super()

    this.state = {
      data: {},
      errors: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.errorMessage = this.errorMessage.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        Flash.setMessage('success', res.data.message)
        this.props.history.push('/map')
      })
      .catch(() => this.setState({ errors: 'Invalid credentials' }))
  }

  errorMessage(){
    if(this.state.errors !== ''){
      return true
    }

  }

  render(){
    return(
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered is-multiline">
              <div className="column is-one-third-desktop is-full-tablet home-title">
                <h1 className="title">
                  Drinking sessions
                </h1>
                <h2 className="subtitle">
                  The app that connects you with your friends in your local area, so you can arrange your next pub trip.
                </h2>
              </div>
              <div className="column is-one-third-desktop is-full-tablet login-form">
                <LoginForm
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  data={this.state.data}
                  state={this.state}
                  errorMessage={this.errorMessage}
                />

              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
