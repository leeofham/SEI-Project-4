import React from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'

import axios from 'axios'
import Auth from '../../lib/Auth'

import MainModal from '../modals/MainModal'
import CreateModal from '../modals/CreateModal'
import EditModal from '../modals/EditModal'

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_KEY
})

class MainMap extends React.Component{
  constructor(){
    super()

    this.state = {
      events: {},
      currentLocation: {
        lat: false,
        lng: false
      },
      pubs: null,
      marker: {},
      zoom: [12],
      popup: false,
      pubId: '',
      pubEvent: '',
      eventListings: [],
      create: false,
      listing: false,
      edit: false,
      errors: {}
    }

    this.toggleCreate = this.toggleCreate.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.toggleListing = this.toggleListing.bind(this)

    this.handleChangeCreate = this.handleChangeCreate.bind(this)
    this.handleSubmitCreate = this.handleSubmitCreate.bind(this)
    this.handleChangeEdit = this.handleChangeEdit.bind(this)
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this)

    this.getListings = this.getListings.bind(this)
    this.showListings = this.showListings.bind(this)
    this.filterArray = this.filterArray.bind(this)
    this.getDayOfWeek = this.getDayOfWeek.bind(this)
    this.getEvent = this.getEvent.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
    this.delete = this.delete.bind(this)
    this.canModify = this.canModify.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      this.setState({ currentLocation: {lng: latitude, lat: longitude }})
    })
    axios('/api/yelp/pubs')
      .then(res => this.setState({ pubs: res.data }))
    axios('/api/events')
      .then(res => this.setState({ eventListings: res.data }))
  }

  handleChangeCreate(e) {
    const events = { ...this.state.events, [e.target.name]: e.target.value }
    this.setState({ events })
  }

  handleSubmitCreate(e) {
    e.preventDefault()
    const token = Auth.getToken()
    axios.post('/api/events', this.state.events, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.setState({create: !this.state.create}))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChangeEdit(e) {
    const events = { ...this.state.events, [e.target.name]: e.target.value }
    this.setState({ events })
  }

  handleSubmitEdit(e) {
    e.preventDefault()
    const token = Auth.getToken()
    axios.put(`/api/events/${this.state.pubEventId}`, this.state.events, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => window.location.reload())
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  delete(e) {
    const token = Auth.getToken()
    axios.delete(`/api/events/${e}`,{
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => window.location.reload())
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

  deleteEvent(){
    this.setState({pubEventId: event.target.value})
    this.delete(event.target.value)
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
      .then(res =>
        this.setState({ pubEvent: res.data}))
      .then(() => this.setState({events: this.state.pubEvent}))
      .then(() => delete this.state.events.created_by)
      .then(() => delete this.state.events.id)
      .then(() => delete this.state.events.venue.id)
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

  canModify(user) {
    return Auth.getPayload().sub === user
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
    {if(!this.state.pubs)
      return(
        <div className='loading-image'></div>
      )}
    console.log(this.state)
    return(
      <main>
        <MainModal
          listing={this.state.listing}
          toggleListing={this.toggleListing}
          filterArray={this.filterArray}
          canModify={this.canModify}
          getDayOfWeek={this.getDayOfWeek}
          toggleEdit={this.toggleEdit}
          deleteEvent={this.deleteEvent}
        />

        <CreateModal
          create={this.state.create}
          toggleCreate={this.toggleCreate}
          handleChangeCreate={this.handleChangeCreate}
          handleSubmitCreate={this.handleSubmitCreate}
          marker={this.state.marker}
          errors={this.state.errors}
        />

        <EditModal
          edit={this.state.edit}
          toggleEdit={this.toggleEdit}
          handleChangeEdit={this.handleChangeEdit}
          handleSubmitEdit={this.handleSubmitEdit}
          marker={this.state.marker}
          pubEvent={this.state.pubEvent}
        />

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
