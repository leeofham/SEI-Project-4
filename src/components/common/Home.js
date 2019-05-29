import React from 'react'
import LoginForm from './LoginForm'
import axios from 'axios'

class Home extends React.Component{
  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }

  handleSubmit(e) {
    e.preventDefault()

    // const token = Auth.getToken()

    axios.post('/api/login', this.state.data, {
      // headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/map'))
  }
  render(){
    return(
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered is-multiline">
              <div className="column is-half-desktop is-full-tablet">
                <h1 className="title">
                  SEI project 4
                </h1>
                <h2 className="subtitle">
                  Check out who is out in your area.
                </h2>
              </div>
              <div className="column is-half-desktop is-full-tablet">
                <LoginForm
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  data={this.state.data}
                  errors={this.state.errors}
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
