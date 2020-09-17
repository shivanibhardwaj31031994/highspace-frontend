import React, { Component } from 'react'

class Footer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        var page=this.props.page.toLowerCase();
        if(['signup','login','forget-password'].indexOf(page)>-1){
            return(
                <div></div>
            ); 
        }
        return (
            <footer>
		        <div className="row">
		        	<div className="col-md-2">
		        		<img src="assets/images/footer-logo.png" className="img-fluid"/>
		        	</div>
		        	<div className="col-md-9 mx-auto">
		        		<div className="row">
		        			<div className="col-md-2">
		        				<ul className="footer-ul">
		        					<li className="f-title">Explore</li>
		        					<li><a href="/">Home</a></li>
		        					<li><a href="/about">About</a></li>
		        					<li><a href="/blog">Blog</a></li>
		        				</ul>
		        			</div>
		        			<div className="col-md-3">
		        				<ul className="footer-ul">
		        					<li className="f-title">Make Money with us</li>
		        					<li><a href="#">Become a Host</a></li>
		        					<li><a href="#">Learn more about Hosting</a></li>
		        				</ul>
		        			</div>
		        			<div className="col-md-3">
		        				<ul className="footer-ul">
		        					<li className="f-title">Contact</li>
		        					<li>BHIVE Workspace<br/>L-148, 5th Main Road, Sector 6, HSR Layout, Bengaluru</li>
		        					<li>Tel: <a href="tel:8169445606">+91 816 944 5606</a></li>
		        					<li>Emails:<br/>
										<a href="mailto:partners@highspace.in">partners@highspace.in</a>,<br/>
										<a href="mailto:hello@highspace.in">hello@highspace.in</a>
									</li>
		        				</ul>
		        			</div>
		        			<div className="col-md-4">
		        				<ul className="footer-ul">
		        					<li className="f-title">Opening hours</li>
		        					<li>Monday - Friday: 8:30am - 7:30pm</li>
			        				<li>Saturday: 9:00am - 5:00pm</li>
			        				<li>Sunday: 9:00am - 7:00pm</li>
			        			</ul>
			        		</div>
			        		<div className="col-12">
			        			<ul className="footer-social-ul">
			        				<li className="f-title">Connect with us</li>
			        				<li><a href="#"><i className="fa fa-facebook"></i> Facebook</a></li>
			        				<li><a href="#"><i className="fa fa-twitter"></i> Twitter</a></li>
			        				<li><a href="#"><i className="fa fa-instagram"></i> Instagram</a></li>
			        				<li><a href="#"><i className="fa fa-linkedin"></i> LinkedIn</a></li>
			        			</ul>
			        		</div>
			        		<div className="col-12">
			        			<ul className="footer-app-ul">
			        				<li className="f-title">Download on mobile</li>
			        				<li><a href="#"><img src="assets/images/play-store.png" className="img-fluid"/></a></li>
	        						<li><a href="#"><img src="assets/images/app-store.png" className="img-fluid"/></a></li>
	        					</ul>
	        				</div>
	        			</div>
	        		</div>
	        	</div>
	        </footer>
        )
    }
}

export default Footer
