import React from 'react'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibGVlb2ZoYW0iLCJhIjoiY2p3OTJjMXBlMGVrOTN6czJ0czV2eXZydSJ9.rX5aS34aFX0FPK_H6bZTVA'
})

class MainMap extends React.Component{
  constructor(){
    super()


  }

  render(){
    return(
      <Map
        style = "mapbox://styles/mapbox/streets-v9"
        center = {[-0.127683, 51.507332]}
        zoom = {[12]}
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
        <Layer
          type="symbol"
          id="marker"
          layout={{ 'icon-image': 'marker-20' }}>
          <Feature coordinates={[-0.127683, 51.507332]}/>
        </Layer>
      </Map>
    )
  }
}


export default MainMap
