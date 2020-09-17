import React, { Component } from 'react'
import Siderbar from './Siderbar'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import MapPopup from './../../../components/MapPopup'
const common_func = require('./../../../components/Common_func');
        
class Location extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            form_data:{
                'fields':{}
            },
            form_btn:''
        }
        this.siderbar = React.createRef();
        this.mapPopup = React.createRef();
    }

    componentDidMount(){        
        var thus=this;
        common_func.form_get(this.props).then(function(form_data){
            thus.setState({ form_data:form_data });
            let page_index=typeof form_data['space-position']!=='undefined'?form_data['space-position']:0;
            thus.siderbar.current.setState({page_index:page_index});
        });
    }
    
    locationHandler=(e)=>{
        geocodeByPlaceId(e.place_id).then(results =>{
            var arr={administrative_area_level_2:'district',administrative_area_level_1:'state',postal_code:'zip-code'};
            for(var i in results[0]['address_components']){
                if(typeof arr[results[0]['address_components'][i]['types'][0]]!=='undefined'){
                    arr[results[0]['address_components'][i]['types'][0]]=[arr[results[0]['address_components'][i]['types'][0]],results[0]['address_components'][i]['long_name']];
                }
            }
            for(var i in arr){
                var name=typeof arr[i]==='object'?arr[i][0]:arr[i];
                var val=typeof arr[i]==='object'?arr[i][1]:'';
                common_func.jquery('[name="'+name+'"]').val(val).trigger('input');
            }
            let loc=results[0]['geometry']['location'];
            common_func.jquery('[name="latitude"]').val(loc.lat()).trigger('input');
            common_func.jquery('[name="longitude"]').val(loc.lng()).trigger('input');
        }).catch(error => console.error(error));
    }
    mapPopupHandler=(e)=>{
        e.preventDefault();
        common_func.jquery('body').addClass('popup-visible');
        this.mapPopup.current.setState({visible:true});
    }
    popupResponse=()=>{
        const state=this.mapPopup.current.state;
        if(state.input_address.length>0){
            this.setState(prevState=>({
                form_data:{...prevState['form_data'],'field-type':{...prevState['form_data']['field-type'],'address':{...prevState['form_data']['field-type']['address'],'attr':{...prevState['form_data']['field-type']['address']['attr'],'defaultValue':state.address}}}}
            }));
            common_func.jquery('[name="address"]').val(state.address).trigger('input');
            common_func.jquery('[name="district"]').val(state.city).trigger('input');
            common_func.jquery('[name="state"]').val(state.state).trigger('input');
            common_func.jquery('[name="zip-code"]').val(state['pin-code']).trigger('input');
            common_func.jquery('[name="latitude"]').val(state.lat).trigger('input');
            common_func.jquery('[name="longitude"]').val(state.lng).trigger('input');
        }
    }
    formBtnLoad=(data)=>{
        this.setState({form_btn:data});
    }

    render() {
        return (
            <section className="col-12 vendor-section">
            <div className="row">
            <div className="col-md-2 ltr-portion">
                <Siderbar {...this.props} onLoad={this.formBtnLoad} ref={this.siderbar}></Siderbar>
            </div>
            <div className="col-md-6">
            {typeof this.state.form_data['field-type']!=='undefined'?(
                <div className="col-md-10 mx-auto vendor-form">
                    <MapPopup ref={this.mapPopup} lat={typeof this.state.form_data['field-type']['latitude']['attr']['defaultValue']!=='undefined'?this.state.form_data['field-type']['latitude']['attr']['defaultValue']:false} lng={typeof this.state.form_data['field-type']['longitude']['attr']['defaultValue']!=='undefined'?this.state.form_data['field-type']['longitude']['attr']['defaultValue']:false} onResponse={this.popupResponse}></MapPopup>
                    <div className="form-title sp-2">Location</div>
                    <form method="post" encType="multipart/form-data" onSubmit={(e)=> this.siderbar.current.form_handler(e)}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    {common_func.input_field('address',this.state.form_data,false)}
                                    <GooglePlacesAutocomplete
                                        apiKey={common_func.GoogleMapsAPI}
                                        initialValue={typeof this.state.form_data['field-type']['address']['attr']['defaultValue']!=='undefined'?this.state.form_data['field-type']['address']['attr']['defaultValue']:''}
                                        onSelect={this.locationHandler}
                                        autocompletionRequest={{
                                            componentRestrictions:{
                                                country:"in"
                                            }
                                        }}
                                        renderInput={(props) => (
                                          <div className="input-group">
                                            {common_func.input_field('address',this.state.form_data,null,false,props)}
                                            <div className="input-group-append">
                                                <button className="btn" type="button" onClick={this.mapPopupHandler}>
                                                    <span className="txt-sep">Search maps</span>
                                                    <i className="fa fa-search"></i>
                                                </button>
                                            </div>
                                          </div>
                                        )}
                                    />
                                    {common_func.input_field('address',this.state.form_data,null,true)}
                                    {common_func.input_field('latitude',this.state.form_data,null,false)}
                                    {common_func.input_field('longitude',this.state.form_data,null,false)}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    {common_func.input_field('street-name',this.state.form_data,true)}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    {common_func.input_field('district',this.state.form_data,true)}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    {common_func.input_field('state',this.state.form_data,true)}
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="form-group">
                                    {common_func.input_field('landmark',this.state.form_data,true)}
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    {common_func.input_field('zip-code',this.state.form_data,true)}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    {common_func.input_field('other',this.state.form_data,false)}
                                    <div className="sub-txt">You can include details about your location such as local enteries, public<br/>transportations, popular landmarks. etc.</div>
                                    {common_func.input_field('other',this.state.form_data)}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 form-btm">
                                {this.state.form_btn}
                            </div>
                        </div>
                    </form>
                </div>
            ):''}
            </div>
            <div className="col-md-4">
                <div className="img-portion">
                    <img className="img-fluid" src="/assets/images/vendor-location.gif"/>
                </div>
            </div>
        </div>
      </section>
        )
    }
}

export default Location
