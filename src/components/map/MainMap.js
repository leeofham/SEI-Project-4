import React from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import axios from 'axios'


const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_API_KEY
})

class MainMap extends React.Component{
  constructor(){
    super()

    this.state = {
      currentLocation: {
        lat: -0.127683,
        lng: 51.507332
      },
      pubs: null,
      marker: {},
      zoom: [12],
      name: ''
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
    this.setState({marker: marker.name})
    this.setState({currentLocation: {lat: marker.coordinates.longitude, lng: marker.coordinates.latitude}})
    this.setState({name: marker.name})
    this.setState({zoom: [15]})
  }


  render(){
    console.log(this.state)
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
            <h2 className='title'>{this.state.name}</h2>
            <img
              src='./assets/map-pin.png'
              width='30px'
            />
          </Marker>
        )}
      </Map>
    )
  }
}


export default MainMap
