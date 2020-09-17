import React, { Component } from 'react'
import Form from './../components/Form'
import Slider from "react-slick"
// import $ from 'jquery'

class Signup extends Component {
    render() {
        const settings = {
            dots:true,
		    infinite:false,
		    speed:300,
		    slidesToShow:1,
		    slidesToScroll:1
        };
        return(
          <div className="col-md-12">
	        	<div className="row main-sec">
	        		<div className="col-md-7 d-flex">
	        			<div className="form-image">
	        				<img src="assets/images/login.png" alt="login-page" className="img-fluid" />
	        			</div>
	        			<Slider className="form-slider theme-slider" {...settings}>
				        	<div className="item">
	        					<div className="item-title">Welcome!</div>
				        		<h6>Sign up to have the complete Highspace experience! Already a member? <a href="/login" className="theme-link">Log in</a></h6>
				        	</div>
				        	<div className="item">
	        					<div className="item-title">Welcome!</div>
				        		<h6>Sign up to have the complete Highspace experience! Already a member? <a href="/login" className="theme-link">Log in</a></h6>
				        	</div>
				        	<div className="item">
	        					<div className="item-title">Welcome!</div>
				        		<h6>Sign up to have the complete Highspace experience! Already a member? <a href="/login" className="theme-link">Log in</a></h6>
				        	</div>
				        </Slider>
	        		</div>
	        		<div className="col-md-5">
	        			<div className="col-md-10 mx-auto form-parent">
	        				
                            <Form page="signup"></Form>
                  
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

export default Signup
