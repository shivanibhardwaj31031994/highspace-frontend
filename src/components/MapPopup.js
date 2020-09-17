import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import Geocode from "react-geocode";
import "./../assets/css/map-popup.css";
var common_func=require('./Common_func');
Geocode.setApiKey(common_func.GoogleMapsAPI);
Geocode.enableDebug();

class MapPopup extends Component {
    constructor(props) {
        super(props)
    
        const lat=props.lat?props.lat:12.9116186;
        const lng=props.lng?props.lng:77.6324333;
        this.state = {
            visible:false,
            height:'600px',
            zoom:15,lat:props.lat,lng:props.lng,
			input_address:'',address:'',city:'',state:'','pin-code':'',
			mapPosition:{lat: lat,lng: lng},
			markerPosition:{lat: lat,lng: lng}
		}
    }

    componentDidMount(){
        if(this.props.lat!==false && this.props.lng!==false){
            this.onMarkerDragEnd({latLng:{lng:()=>{return this.state.lng},lat:()=>{return this.state.lat}}});
        }
    }

    shouldComponentUpdate(nextProps,nextState){
        if(this.state.markerPosition.lat !== nextState.lat || this.state.address !== nextState.address || this.state.city !== nextState.city || this.state.state !== nextState.state || this.state['pin-code'] !== nextState['pin-code'] || this.state.input_address !== nextState.input_address || this.state.visible !== nextState.visible){
			return true;
		}else{
			return false;
		}
    };
    onChange=(event)=>{
        this.setState({ [event.target.name]: event.target.value });
    }
    onInfoWindowClose=(e)=>{
    };
    onMarkerDragEnd=(e)=>{
        let newLat = e.latLng.lat(),newLng = e.latLng.lng();
        Geocode.fromLatLng(newLat,newLng).then(response =>{
            if(window.google){
                this.locationHandler({place_id:response.results[0].place_id,description:response.results[0].formatted_address})
            }    
        },error => { console.error(error); });
    }
    locationHandler=(e)=>{
        geocodeByPlaceId(e.place_id).then(results =>{
            var arr={administrative_area_level_2:'district',administrative_area_level_1:'state',postal_code:'zip-code'};
            for(var i in results[0]['address_components']){
                if(typeof arr[results[0]['address_components'][i]['types'][0]]!=='undefined'){
                    arr[arr[results[0]['address_components'][i]['types'][0]]]=results[0]['address_components'][i]['long_name'];
                }
            }
            let loc=results[0]['geometry']['location'];
            this.setState({
              lat:loc.lat(),
              lng:loc.lng(),
              input_address:e.description,address:e.description,city:arr['district'],state:arr['state'],'pin-code':arr['zip-code'],
              markerPosition:{lat:loc.lat(),lng:loc.lng()},
              mapPosition: {lat:loc.lat(),lng:loc.lng()}
            })
        }).catch(error => console.error(error));
    }
    closePopup=(e,success=false)=>{
        e.preventDefault();
        common_func.jquery('body').removeClass('popup-visible');
        this.setState({visible:false});
        if(success==true){
            this.props.onResponse();
        }
    }
    changeHandler=(e)=>{
        e.preventDefault();
        console.log(e.target.value);
        this.setState({input_address:e.target.value});
    }
    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
				props => (
					<GoogleMap google={ this.state.google }
					  defaultZoom={ this.state.zoom }
					  defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
					>
                      {this.state.address.length>0?(
						<InfoWindow
							onClose={this.onInfoWindowClose}
							position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
							</div>
						</InfoWindow>
                        ):''}
						{this.state.address.length>0?(
                        <Marker google={this.state.google}
						    name={'Dolores park'}
						    draggable={true}
						    onDragEnd={ this.onMarkerDragEnd }
						    position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
                        ):''}
                        <Marker/>
					</GoogleMap>
				)
			)
        );
        let map;
		if(this.state.lat !== undefined && this.state.visible===true) {
			map = (
            <div className="popup-parent">
            <div className="map-popup">
				<div className="popup-header">
                    <a href="#" className="close-btn" onClick={this.closePopup}><i className="fa fa-close"></i></a>
                    <GooglePlacesAutocomplete
                        onSelect={this.locationHandler}
                        autocompletionRequest={{
                            componentRestrictions:{
                                country:"in"
                            }
                        }}
                        initialValue={this.state.input_address}
                        renderInput={(props) => (
                            <div className="input-group">
                                <input className="form-control" {...props}/>
                                <div className="input-group-append">
                                    <button className="btn" type="button">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                    <button className="btn theme-btn pos-right" onClick={(e)=>this.closePopup(e,true)}>Done</button>
                </div>
                
				<div className="popup-body">
                    <AsyncMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${common_func.GoogleMapsAPI}&libraries=places`}
                        loadingElement={
                            <div style={{ height: `100%` }} />
                        }
                        containerElement={
                            <div style={{ height: this.state.height }} />
                        }
                        mapElement={
                            <div style={{ height: `100%` }} />
                        }
                    />
                </div>
			</div>
			</div>);
		}else{
			map = '';
		}
        return (map);
    }
}

export default MapPopup
