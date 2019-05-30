import React from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Create from '../events/Create'
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
      active: false,
      pubId: '',
      modal: false,
      eventListings: []
    }

    this.toggleCreate = this.toggleCreate.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

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
      .then(() => this.setState({modal: !this.state.modal}))
  }

  markerClicked(marker){
    this.setState({active: true})
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
    this.setState({modal: !this.state.modal})
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
        <div className={`modal ${this.state.modal ? ' is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Plan your next beer!</p>
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
          {this.state.active &&

          <Popup
            coordinates={[this.state.marker.coordinates.longitude, this.state.marker.coordinates.latitude]}
            anchor="bottom-left"
            offset={[-2, -40]}

          >
            <div>
              <p className="is-size-6">{this.state.marker.name}</p>
              <p>{this.state.marker.location.address1}</p>
              <p>{this.state.marker.location.zip_code}</p>
              <Link to={`/pub/${this.state.pubId}`}>More info</Link>
              <br />
              <a onClick={this.toggleCreate}>Create an Event!</a>

            </div>
          </Popup>}
        </Map>
      </main>
    )
  }
}


export default MainMap
