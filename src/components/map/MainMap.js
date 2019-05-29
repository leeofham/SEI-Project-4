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
      venues: []
    }

  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      this.setState({ currentLocation: { lng: latitude, lat: longitude }})
    })
    axios.get('https://api.yelp.com/v3/businesses/search',{
      headers: {
        'Authorization': `Bearer ${process.env.YELP_API_KEY}` },
      params: {
        location: 'London',
        term: 'pub',
        limit: 50
      }
    })
      .then(res => this.setState({ venues: res}))

  }


  render(){
    console.log(this.state.data)
    return(
      <Map
        style = "mapbox://styles/mapbox/streets-v9"
        center = {[this.state.currentLocation.lat, this.state.currentLocation.lng ]}
        zoom = {[13]}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}>

        <Marker
          coordinates={[-0.127683, 51.507332]}
          anchor="bottom">
          <img
            src='./assets/map-pin.png'
            width='30px'
          />
        </Marker>
      </Map>
    )
  }
}


export default MainMap
