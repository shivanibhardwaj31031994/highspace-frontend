import React, { Component } from 'react'
import "./../assets/css/home-page.css"
import $ from 'jquery'
import { Blog_sec } from '../components/Common_sec'

class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            head_tabs:'explore'
        }
    }
    
    componentDidMount(){
        var thus=this;
        $('.search-btns').on('click','a',function(e){
            e.preventDefault();
            var target=$(this).attr('data-target').toLowerCase();
            thus.setState({
                head_tabs:target
            });
        });
    }

    submitHandler = (e) =>{
        e.preventDefault();
    }

    render() {
        return (
            <div className="index-page">
            <section className="col-12 home-sections mt-0">
		<div className="img-portion">
			<img className="img-fluid" src="assets/images/home-1.png" />
		</div>
		<div className="search-btns">
			<ul>
				<li><a href="#" className={this.state.head_tabs=='explore'?'active':''} data-target="explore"><i className="icon fa fa-search"></i> Explore</a></li>
				<li><a href="#" className={this.state.head_tabs=='host'?'active':''} data-target="host"><i className="icon fa fa-user"></i> Host</a></li>
			</ul>
		</div>
		<div className={"search-form col-md-6 "+(this.state.head_tabs=='host'?'':'d-none')}>
			<div className="form-title">List your space for free and earn money.</div>
			<div className="row">
				<div className="col-12 mb-4">
					<a href="/signup" className="btn theme-btn mt-0 px-4">Sign up to Host</a>
				</div>
				<div className="col-12">
					<a href="#" className="theme-link">Learn more about hosting <i className="fa fa-chevron-right"></i></a>
				</div>
			</div>
		</div>
		<div className={"search-form col-md-6 "+(this.state.head_tabs=='explore'?'':'d-none')}>
			<div className="form-title">Book a unique space for your activity.</div>
			<div className="row">
				<div className="col-md-7">
					<form method="post" encType="multipart/form-data" action="#" onSubmit={this.submitHandler}>
						<div className="row">
							<div className="col-12">
								<div className="form-group">
									<label className="ng-binding ng-scope">Activity</label>
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className="fa fa-map"></i></span>
										</div>
										<input className="form-control" name="name" placeholder="What are you planning?" />
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="form-group">
									<label className="ng-binding ng-scope">Location</label>
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className="fa fa-map-marker"></i></span>
										</div>
										<input className="form-control" name="name" placeholder="Where?" />
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="form-group">
									<label className="ng-binding ng-scope">Date</label>
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className="fa fa-calendar-o"></i></span>
										</div>
										<input className="form-control" name="name" placeholder="When?" />
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<button type="submit" className="btn form-btn">Search</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	
	<section className="col-12 home-sections">
		<div className="img-portion">
			<img className="img-fluid" src="assets/images/home-2.png" />
		</div>
		
		<div className="theme-slider dir-rtl">
			<div className="item">
				<div className="item-title">A network of professional spaces.</div>
				<h6>We uncover new, creative spaces. Tap into our network of professional spaces for your creative works.</h6>
			</div>
		</div>
	</section>
	
	<section className="col-12 home-sections">
		<div className="img-portion">
			<img className="img-fluid" src="assets/images/home-3.png" />
		</div>
		
		<div className="theme-slider">
			<div className="item">
				<div className="item-title">Smooth bookings.</div>
				<h6>No more messy contracts. We build the tools to make booking a space as easy as the click of a button</h6>
			</div>
		</div>
	</section>
	
	<section className="col-12 home-sections">
		<div className="img-portion">
			<img className="img-fluid" src="assets/images/home-4.png" />
		</div>
		
		<div className="theme-slider dir-rtl">
			<div className="item">
				<div className="item-title">Honest pricing.</div>
				<h6>Our spaces are priced to fit your budget. Pay by the hour without worrying about hidden fees.</h6>
			</div>
		</div>
	</section>
	
	<section className="col-12 home-sections sec-style-1 mb-0">
		<div className="img-portion">
			<img className="img-fluid" src="assets/images/home-5.png" />
		</div>
		
		<div className="theme-slider">
			<div className="item">
				<div className="item-title">Join the community.</div>
				<h6>Explore & host from anywhere. Connect with memebers of our site. Leave comments, foolow people and much more!</h6>
				<a href="#" className="btn theme-btn">Get Started</a>
			</div>
		</div>
	</section>
  
	<Blog_sec></Blog_sec>
            </div>
        )
    }
}

export default Home
