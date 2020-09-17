import React, { Component } from 'react'
import "./../assets/css/aboutus-page.css"
import Slider from "react-slick"
import { Blog_sec,SampleArrows } from '../components/Common_sec';

class About_us extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const settings = {
            dots:true,
            arrows:true,
		    infinite:false,
		    speed:300,
		    slidesToShow:1,
            slidesToScroll:1,
            nextArrow:<SampleArrows />,
            prevArrow:<SampleArrows />
        };
        return (
            <div className="about-page">
                <section className="col-12 about-sections content-sec header-sec">
                    <div className="row sec-row">
                        <div className="col-sm-6">
                            <div className="c-main-title">About us</div>
                            <div className="c-title">We Connect People<br/>with unique spaces</div>
                            <div className="c-des col-sm-10 pl-0">
                                <p>Highspace is on a misson to revolutionize the way people find and book spaces to create meaningful events.</p>
                                <p>We provide an online platform that lets space owners and planners find each other, creating a smarter and hassel-free experience for both.</p>
                            </div>
                            <div className="mt-5">
                                <button className="btn style-1 c-btn">Find out more <i className="fa fa-arrow-down"></i></button>
                            </div>
                        </div>
                        <div className="col-sm-6 text-center">
                            <img src="assets/images/about-1.png" className="img-fluid"/>
                        </div>
                    </div>    
                </section>

                <section className="col-12 about-sections slider-sec">
                    <div className="img-portion">
                        <Slider className="theme-slider" {...settings}>
                            <div className="item-par">
                                <div className="content-portion">
                                    <div className="item-box">
                                        <img src="assets/images/about-21.png" className="item-img"/>
                                        <div className="item-title">Tell me what you want</div>
                                        <div className="txt-2">You just need to decide the kind of space you're looking for. You don't need to worry about searching for great spaces before starting anything exiciting for you and your work. When space is your need, we take care of it.</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item-par">
                                <div className="content-portion">
                                    <div className="item-box">
                                        <img src="assets/images/about-22.png" className="item-img"/>
                                        <div className="item-title">Let us do all the work</div>
                                        <div className="txt-2">Sit back and relax, and let us do the heavy lifting for you. Filtering our database accoding to your preferences, we connect you directly to the vendors offering spaces that match with your needs.</div>
                                    </div>
                                </div>
                            </div>
                            <div className="item-par">
                                <div className="content-portion">
                                    <div className="item-box">
                                        <img src="assets/images/about-23.png" className="item-img"/>
                                        <div className="item-title">Get the perfect space</div>
                                        <div className="txt-2">Once we've finialized the space in tailored to your needs, the space is booked! We go through some paperwork and once done, the space is all yours!</div>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </section>

                <section className="col-12 about-sections content-sec">
                    <div className="row sec-row">
                        <div className="col-sm-5 text-center">
                            <img src="assets/images/about-3.png" className="img-fluid"/>
                        </div>
                        <div className="col-sm-7">
                            <div className="c-title">Why you'd love renting with us</div>
                            <div className="c-des col-sm-10 pl-0">
                                <p>We believe that access to inspiring spaces and changes in work surroundings are key drivers of innovation for all types of professionals.</p>
                                <p>We help people deal with the problem of rising rent, by sharing 'underused' spaces of other businesses.</p>
                                <p>Hishspace is the first platform to easily discover and book these unique and inspiring spaces that fit in your budget.</p>
                                <p>You can turn your passion into a great passive income by consistenly practicing and refining your skills in your own rented space, as and when required.</p>
                            </div>
                        </div>
                    </div>    
                </section>

                <section className="col-12 about-sections content-sec">
                    <div className="row sec-row">
                        <div className="col-sm-7">
                            <div className="c-title">Why you'd love hosting with us</div>
                            <div className="c-des col-sm-10 pl-0">
                                <p>If you have an 'underused' space, it can be rented out to earn a few extra bucks when you're not working.</p>
                                <p>Sharing your workspace as a Host could make you money while aiding someone who is in need of a temporary space to jump start their business or practice their passion.</p>
                                <p>Highspace makes it easier to fill underutilized time and space, and unlock the potential of your property.</p>
                            </div>
                        </div>
                        <div className="col-sm-5 text-center">
                            <img src="assets/images/about-3.png" className="img-fluid"/>
                        </div>
                    </div>    
                </section>
                
                <section className="col-12 about-sections detail-points">
                    <div className="row py-5">
                        <div className="col-4">
                            <div className="d-parent">
                                <i className="d-icon fa fa-bookmark-o"></i>
                                <div className="d-title">List your space for free</div>
                                <div className="d-des">
                                    <p>Have an empty space and still figuring out what to do with it? Get it listed on our platform. Set the pictures of your spaces, get it listed and watch people making full usage of your space.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="d-parent">
                                <i className="d-icon fa fa-heart-o"></i>
                                <div className="d-title">State your preferences</div>
                                <div className="d-des">
                                    <p>Mention the type of audience you are looking to entice through our platform and watch the crowd gather in front of your space.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="d-parent">
                                <i className="d-icon fa fa-diamond"></i>
                                <div className="d-title">Reap your benefits</div>
                                <div className="d-des">
                                    <p>Collaborating with us will increase your visibility amongst your target audience which converts to broadening customer base and rising revenues. So what are you waiting for? Partner with us and start earning!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="col-12 about-sections our-team">
                    <div className="row con-par">
                        <div className="content-portion">
                            <div className="item-box">
                                <i className="icon fa fa-sitemap"></i>
                                <div className="item-title">Our Team</div>
                                <div className="txt-2">Our people are at the Heart of Highspace. We believe in creating a healthy company culture where people are excited to come into work every day and make an impact.</div>
                                <button className="mt-5 btn theme-btn">View Openings <i className="fa fa-arrow-right"></i></button>
                            </div>
                        </div>
                        <div className="col-sm-10 ml-auto">
                            <img className="img-fluid" src="assets/images/about-4.png" />
                        </div>
                    </div>
                </section>

                <section className="col-12 about-sections join-sec">                
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

export default About_us