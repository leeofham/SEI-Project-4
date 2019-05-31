import React from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import Create from '../events/Create'
import Edit from '../events/Edit'

import Auth from '../../lib/Auth'


const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_KEY
})

class MainMap extends React.Component{
  constructor(){
    super()

    this.state = {
      events: {

      },
      currentLocation: {
        lat: false,
        lng: false
      },
      pubs: null,
      marker: {},
      zoom: [12],
      popup: false,
      pubId: '',
      create: false,
      listing: false,
      edit: false,
      eventListings: [],
      pubEvent: ''
    }

    this.toggleCreate = this.toggleCreate.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleListing = this.toggleListing.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.getListings = this.getListings.bind(this)
    this.showListings = this.showListings.bind(this)
    this.filterArray = this.filterArray.bind(this)
    this.getDayOfWeek = this.getDayOfWeek.bind(this)

    this.getEvent = this.getEvent.bind(this)


  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      this.setState({ currentLocation: {lng: latitude, lat: longitude }})
    })

    axios('/api/yelp/pubs')
      .then(res => this.setState({ pubs: res.data }))
  }

  handleChange(e) {

    const events = { ...this.state.events, [e.target.name]: e.target.value }
    this.setState({ events })
  }

  handleSubmit(e) {
    e.preventDefault()

    const token = Auth.getToken()

    axios.post('/api/events', this.state.events, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.setState({create: !this.state.create}))
  }

  markerClicked(marker){
    this.setState({popup: true})
    this.setState({ marker })
    this.setState({currentLocation: {lat: marker.coordinates.longitude, lng: marker.coordinates.latitude}})
    this.setState({zoom: [15]})
    this.setState({pubId: marker.id})
    this.setState({events: {
      venue: {
        yelp_id: marker.id,
        name: marker.name,
        lat: marker.coordinates.latitude,
        lng: marker.coordinates.longitude,
        image: marker.image_url
      }
    }
    })
  }


  toggleCreate(){
    this.setState({create: !this.state.create})
  }

  toggleEdit(){
    this.setState({edit: !this.state.edit})
    this.setState({pubEventId: event.target.value})
    this.getEvent(event.target.value)
  }

  getEvent(e){
    axios(`/api/events/${e}`)
      .then(res => this.setState({ pubEvent: res.data }))
  }

  toggleListing(){
    this.setState({listing: !this.state.listing})
  }

  showListings(){
    this.getListings()
    this.toggleListing()
  }

  getListings(){
    axios('/api/events')
      .then(res => this.setState({eventListings: res.data}))
  }

  filterArray(){
    return this.state.eventListings.filter(event => event.venue.yelp_id === this.state.marker.id)
  }

  getDayOfWeek(date) {
    const day = date.slice(0,3)
    const month = date.slice(3,5)
    const year = date.slice(5,9)
    const usDate = month+day+year
    const dayOfWeek = new Date(usDate).getDay()
    return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]
  }

  render(){
    {if(this.state.currentLocation.lat === false)
      return(
        <section className='section'>
          <div className='container'>
            <h1>Loading..</h1>
          </div>
        </section>
      )}
    console.log(this.state)
    return(
      <main>
        <div className={`modal ${this.state.listing ? ' is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Whos drinking here?</p>
              <button className="delete" aria-label="close" onClick={this.toggleListing}></button>
            </header>
            <section className="modal-card-body">
              {this.state.listing && this.filterArray().map(listing =>
                <div key={listing.id}>
                  <div className='level'>
                    <div className='level-left'>
                      <h2 className='subtitle'>{listing.date},</h2>
                    </div>
                    <div className='level-right'>
                      <button className='button is-primary' onClick={this.toggleEdit} value={listing.id}>Edit</button>
                      <button className='button is-danger'>Delete</button>
                      <button className='button'>Attending</button>
                    </div>
                  </div>
                  <div>
                    {this.getDayOfWeek(listing.date)} - {listing.start} & {listing.end},<br/> Created by {listing.created_by.username} <hr/>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>


        <div className={`modal ${this.state.create ? ' is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Plan your next beer</p>
              <button className="delete" aria-label="close" onClick={this.toggleCreate}></button>
            </header>
            <section className="modal-card-body">
              <Create
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                pubId={this.state.marker.name}

              />
            </section>
          </div>
        </div>


        <div className={`modal ${this.state.edit ? ' is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Plan your next beer</p>
              <button className="delete" aria-label="close" onClick={this.toggleEdit}></button>
            </header>
            <section className="modal-card-body">
              <Edit
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                pubId={this.state.marker.name}
                pubEvent = {this.state.pubEvent}
              />
            </section>
          </div>
        </div>


        <Map
          style = "mapbox://styles/mapbox/streets-v9"
          center = {[this.state.currentLocation.lat, this.state.currentLocation.lng ]}
          zoom = {this.state.zoom}
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}>
          {this.state.pubs && this.state.pubs.businesses.map(marker =>
            <Marker
              key={marker.id}
              coordinates={[marker.coordinates.longitude, marker.coordinates.latitude]}
              onClick={() => this.markerClicked(marker)}
              anchor="bottom">

              <img
                src='./assets/map-pin.png'
                width='30px'
              />
            </Marker>

          )}
          {this.state.popup &&

          <Popup
            coordinates={[this.state.marker.coordinates.longitude, this.state.marker.coordinates.latitude]}
            anchor="bottom-left"
            offset={[-2, -40]}

          >
            <div>
              <p className="is-size-6">{this.state.marker.name}</p>
              <p>{this.state.marker.location.address1}</p>
              <p>{this.state.marker.location.zip_code}</p>
              <a onClick={this.toggleCreate}>Create an Event!</a>
              <br />
              <a onClick={this.showListings}>Events on here!</a>

            </div>
          </Popup>}
        </Map>
      </main>
    )
  }
}


export default MainMap
