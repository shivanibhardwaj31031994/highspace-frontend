import React, { Component } from 'react'
import { Blog_sec } from '../components/Common_sec'
import "./../assets/css/contact-us.css"

class ContactUs extends Component {
    render() {
        return (
            <div className="contact-page">
            <section className="col-12 contact-sections header-por">
                <div className="img-portion">
                    <img className="img-fluid" src="assets/images/contact-us.png" />
                </div>
                
                <div className="theme-slider dir-rtl">
                    <div className="item">
                        <div className="item-title">We'd love to hear from you</div>
                        <h6>Have a question about booking, hosting, features or anything else?<br/>Our team is ready to answer all your questions</h6>
                    </div>
                </div>
            </section>
	
            <section className="col-12 contact-sections contact-details">
                <div className="col-sm-11 mx-auto">
                    <div className="row py-5">
                        <div className="col-4">
                            <i className="c-icon fa fa-phone"></i>
                            <div className="c-title">Call us</div>
                            <div className="c-des">
                                <p><a href="tel:8169445606">+91 816 944 5606</a></p>
                                <p>
                                    Monday - Friday<br/>
                                    8:00 AM - 5:30 PM IST
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <i className="c-icon fa fa-envelope"></i>
                            <div className="c-title">Send us a mail</div>
                            <div className="c-des">
                                <p>
                                    For partnering with us :-<br/>
                                    <a href="mailto:partners@highspace.in">partners@highspace.in</a>
                                <p>
                                </p>
                                    Say hello to us :-<br/>
                                    <a href="mailto:hello@highspace.in">hello@highspace.in</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-4">
                            <i className="c-icon fa fa-map-marker"></i>
                            <div className="c-title">Our Address</div>
                            <div className="c-des">
                                <p>
                                    BHIVE Workspace<br/>
                                    L-148, 5th Main Road, Sector 6,<br/>
                                    HSR Layout, Bengaluru
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="col-12 contact-sections join-sec">                
                <div className="py-5">
                    <div className="j-title">Join the Highspace community today</div>
                    <a href="login" className="btn style-1 j-btn">Get Started</a>
                </div>
            </section>

                <Blog_sec></Blog_sec>
            </div>
        )
    }
}

export default ContactUs