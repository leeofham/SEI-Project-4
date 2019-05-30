import React from 'react'
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_KEY
})

class MainMap extends React.Component{
  constructor(){
    super()

    this.state = {
      currentLocation: {
        lat: false,
        lng: false
      },
      pubs: null,
      marker: null,
      zoom: [12],
      active: false,
      pubId: ''
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      this.setState({ currentLocation: {lng: latitude, lat: longitude }})
    })

    axios('/api/yelp/pubs')
      .then(res => this.setState({ pubs: res.data }))

  }

  markerClicked(marker){
    this.setState({active: true})
    this.setState({ marker })
    this.setState({currentLocation: {lat: marker.coordinates.longitude, lng: marker.coordinates.latitude}})
    this.setState({zoom: [15]})
    this.setState({pubId: marker.id})
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
    return(
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
              <Link to='/event/create'>Create an Event!</Link>

            </div>
          </Popup>}
      </Map>
    )
  }
}


export default MainMap
