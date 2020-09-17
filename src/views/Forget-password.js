import React, { Component } from 'react'
import axios from 'axios';
import { loadReCaptcha } from 'react-recaptcha-v3';
const common_func = require('./../components/Common_func');
common_func.load_map();

class ForgetPassword extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			form_data:{},
			errorMsg:false,
			axios_loader:false
		}
	}
	
	componentDidMount(){
		var thus=this;
        common_func.form_get(this.props).then(function(form_data){
            thus.setState({ form_data:form_data });
		});
		
        loadReCaptcha(common_func.captcha_site_key);
	}
	
	formHandler=(e)=>{
		e.preventDefault();
		var formdata=new FormData(e.target);
		common_func.check_token(this).then((token)=>{
            if(!token){ return false; }
			formdata.append('recaptha_token',token);
			axios.post(`/users/forget-password`,formdata)
        	.then(res => {
        	    this.responseHanlder(res,e);
			},(err)=>{
				this.setState({axios_loader:false});
                common_func.axios_err_handler(err);
            });
		});
	}

	responseHanlder=(res,e)=>{
        this.setState({axios_loader:false});
        if(typeof res.data.status!=='undefined'){ 
        }else if(typeof res.data.errorMsg!=='undefined'){
            this.setState({
                errorMsg:res.data.errorMsg
            });
            var thus=this;
            setTimeout(function(){
                thus.setState({errorMsg:false});
            },3000);
        }
    }
	
	render() {
        return (
            <div className="col-md-12">
		<div className="row main-sec">
			<div className="col-md-7 d-flex">
				<div className="form-image">
					<img src="assets/images/login.png" className="img-fluid"/>
				</div>
				<div className="form-slider theme-slider">
					<div className="item">
						<div className="item-title">Welcome!</div>
						<h6>Sign up to have the complete Highspace experience! Already a member? <a href="/login" className="theme-link">Log in</a></h6>
					</div>
				</div>
			</div>
			<div className="col-md-5">
				<div className="col-md-10 mx-auto form-parent">
					<div className="form-title sp-2">Reset your password</div>
					{this.state.errorMsg?(<div className="alert alert-danger text-center">{this.state.errorMsg}</div>):''}
                	{typeof this.state.form_data['field-type']!=='undefined'?(
					<form method="post" encType="multipart/form-data" onSubmit={this.formHandler}>
                    	<div className="row">
							<div className="col-12">
								<div className="form-group">
									{common_func.input_field('email',this.state.form_data,true)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								{this.state.axios_loader?(
                            	    <div className="text-center my-3">
                            	        <i className="fa fa-spinner fa-pulse fa-3x"></i>
                            	    </div>
                            	):(
                            		<button className="btn form-btn btn-block">{this.state.form_data['btn-label']}</button>
								)}
							</div>
						</div>
					</form>
					):''}
				</div>
			</div>
		</div>
	</div>
        )
    }
}

export default ForgetPassword