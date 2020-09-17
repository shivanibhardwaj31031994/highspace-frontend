import React, { Component } from 'react'
import Form from './../components/Form'

class Login extends Component {
    render() {
        return (
          <div className="col-md-12">
	        	<div className="row main-sec">
	        		<div className="col-md-7 d-flex">
	        			<div className="form-image">
	        				<img src="assets/images/login.png" alt="login-page" className="img-fluid" />
	        			</div>
	        			<div className="form-slider theme-slider">
	        				<div className="item">
	        					<div className="item-title">Welcome!</div>
	        					<h6>Sign in to have the complete Highspace experience. New to Highspace? <a href="signup" className="theme-link">Sign up</a></h6>
	        				</div>
	        			</div>
	        		</div>
	        		<div className="col-md-5">
	        			<div className="col-md-10 mx-auto form-parent">
	
	                  	<Form page="login"></Form>
                  
	        			<div className="row">
                  			<div className="col-12">
	        				<a href="forget-password" className="form-link">Forget your password?</a>
	        				</div>
                  		</div>
	        			</div>
	        			<p className="copyright-text">All rights reserved in 2020 by Highspace. Proudly powered by a Hot Coffee</p>
	        		</div>
	        	</div>
	        </div>
        )
    }
}

export default Login
