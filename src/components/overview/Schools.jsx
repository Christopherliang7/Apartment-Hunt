import React from 'react';
import axios from 'axios';
import googleKey from './googleApi.js'

class Schools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const fakeRequest = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.692390,-73.914880&radius=2000&type=restaurant&key=${googleKey}`
        const frontReq = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
        axios({method: 'get', url: `/schools/?location=${this.props.location.latitude},${this.props.location.longitude}&radius=5000&type=school&key=${googleKey}`, headers: { "Access-Control-Allow-Origin": '*'} })
            .then((response) => {
                console.log('request made and recieved', response)
                this.setState({
                    schoolList: response.data
                })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }




    render() {
        if (this.state.schoolList !== undefined) {
            const empty = '☆'
            const star = '★'
            return (
                <div>
                    {this.state.schoolList.map((school, index) => {
                        return (
                            <div key={index} className='singleSchool'>
                                {school.name}<br></br> 
                                <img src={school.photos === undefined ?
                                'https://visualsound.com/wp-content/uploads/2019/05/unavailable-image.jpg' : 
                                `https://maps.googleapis.com/maps/api/place/photo?maxheight=100&photoreference=
                                ${school.photos[0].photo_reference}&key=${googleKey}`}
                                className='modalImage'></img><br></br>
                                Rating:{school.rating} {star.repeat(Math.round(school.rating))}{empty.repeat(5-Math.round(school.rating))}<br/>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>please wait while we find schools</div>
            )
        }
    }
}

export default Schools