import React from 'react'
import axios from 'axios'



class PubShow extends React.Component{
  constructor(){
    super()

    this.state = {
      pub: []
    }
  }

  componentDidMount(){
    axios(`https://api.yelp.com/v3/businesses/${this.props.match.params.id}`)
      .then(res => this.setState({ pubs: res.data }))
  }


  render(){
    return(
      <h1>Hello World</h1>
    )
  }



}



export default PubShow
