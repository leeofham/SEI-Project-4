import React from 'react'
import axios from 'axios'



class PubShow extends React.Component{
  constructor(){
    super()

    this.state = {
      pubs: '',
      active: false
    }
    this.toggleActive = this.toggleActive.bind(this)
  }

  toggleActive(){
    this.setState({active: !this.state.active})
  }

  componentDidMount(){
    axios(`/api/yelp/pubs/${this.props.match.params.id}`)
      .then(res => this.setState({ pubs: res.data }))
  }

  

  render(){
    {if(!this.state.pubs) return(<h1 className="title"> Loading... </h1>)}

    const { name, location } = this.state.pubs
    const displayPhone = this.state.pubs.display_phone

    return(
      <section className="section">
        <div className="container">
          <div className='columns is-multiline'>
            <div className='column is-half-desktop is-full-tablet'>
              <h1 className="title">{name}</h1>
              <p>{location.address1}, {location.address2}</p>
              <p>{location.city}, {location.zip_code}</p>
              <p>{displayPhone}</p>
            </div>
            <div className='column is-half-desktop is-full-tablet'>
              <h1 className='title'>Events listing</h1>
            </div>
          </div>
        </div>
      </section>
    )
  }



}



export default PubShow
