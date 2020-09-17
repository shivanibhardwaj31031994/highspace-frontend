import React, { Component } from 'react'
import {Redirect} from "react-router-dom"
import "./../../assets/css/vendor.css"
import "./../../assets/css/vendor-dashboard.css"
import Popup from '../../components/Popup';
const common_func = require('./../../components/Common_func');

class SidebarDashboard extends Component {
    constructor(props) {
        super(props)
    
        const user_data=common_func.cookies.isLoggedIn(true);
		this.state = {
            user_data:user_data,
			sidebar:{
                'dashboard':['th-large','Dashboard'],
                'booking-requests':['building','Booking Requests'],
                'chats':['comments','Chats'],
                'reviews':['pencil-square-o','Reviews'],
                'analytics':['line-chart','Analytics'],
                'revenue':['credit-card-alt','Revenue'],
                'help':['question-circle','Help'],
                'settings':['cog','Settings'],
            }
        }
        
        this.popup = React.createRef();
    }

    getSpaces=()=>{
        return common_func.ajax.get(`/vendor/get/spaces`,{headers:{Authorization:`Bearer ${common_func.cookie.get('usertoken')}`}}).then(res=>{
            if(typeof res.data.status!=='undefined'){
                return res.data.space_data;
            }
            return {};
        }).catch(common_func.axios_err_handler);
    }

    editListingHandler=(e)=>{
        e.preventDefault();
        this.popup.current.visible({'btn_link':e.target.href});
    }
    
    render() {
        if(!this.state.user_data['is-vendor']){
            return(
                <Redirect to={{ pathname:'/vendor/profile', state: { from: this.props.location } }} />
            );   
        }
        const props={
            visible:false,
            header:'Need to edit this listings?',
            body:"If you click 'Proceed' below, you will be redirected to the vendor onboarding form.",
            'btn-title':'Proceed'
        };
        return (
        <div className="ltr-portion">
            <Popup {...props} ref={this.popup}></Popup>
            <div className="ltr-pic">
                <img src={this.state.user_data['profile-pic']} className="img-fluid"/>
            </div>
            <div className="ltr-title">{this.state.user_data['full-name']}</div>
            <div className="ltr-bottom">
                <ul className="main-ul">
                    {Object.keys(this.state.sidebar).map((key,val)=>
                        {return(val<6 && (
                            <li key={val} className={this.props.slug==key?'active':''}>
                                <a href={"/vendor/"+key}>
                                    <i className={"icon fa fa-"+this.state.sidebar[key][0]}></i>
                                    <span>{this.state.sidebar[key][1]}</span>
                                </a>
                            </li>
                        ))}
                    )}
                </ul>
                <div className="py-1"></div>
                <ul className="main-ul">
                    {[6,7].map((key,val)=>
                        <li key={val}>
                            <a href={"/vendor/"+Object.keys(this.state.sidebar)[key]}>
                                <i className={"icon fa fa-"+this.state.sidebar[Object.keys(this.state.sidebar)[key]][0]}></i>
                                <span>{this.state.sidebar[Object.keys(this.state.sidebar)[key]][1]}</span>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
        )
    }
}

export default SidebarDashboard
