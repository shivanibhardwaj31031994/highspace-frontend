import React, { Component } from 'react'
const cookies = require('./../components/Cookies');

class Header extends Component {
	constructor(props) {
		super(props)
	
		const isLoggedIn=cookies.isLoggedIn();
		const user_data=cookies.isLoggedIn(true);
		const links={
			'about-us':'About',
			'blogs':'Blog',
			'contact-us':'Contact',
		};
		let dropdowns={
			'saved':['Saved','heart'],
			'my-bookings':['My bookings','square'],
			'chats':['Messages','comments']
		};
		if(user_data['is-vendor']){
			dropdowns=Object.assign(dropdowns,{
				'Home':false,
				'dashboard':['Dashboard','th-large'],
				'booking-requests':['Customer bookings','building'],
				'listing':['Listings','bars'],
				'reviews':['Rating & Reviews','pencil-square-o'],
			});
		}
		dropdowns=Object.assign(dropdowns,{
			'Account':false,
			'profile':['My profile','user-circle'],
			'account':['Account','briefcase'],
			'settings':['Settings & Privacy','cog'],
			'logout':['Logout','sign-out'],
		});
		const navbar_dark=['about-us','contact-us','vendor/profile'].indexOf(this.props.page.toLowerCase())>-1;
		this.state = {
			navbar_dark:navbar_dark,
			links:links,
			isLoggedIn:isLoggedIn,
			user_data:user_data,
			dropdowns:dropdowns
		}
	}
	
	componentDidMount(){
		cookies.callback_func((data)=>{
			this.setState({user_data:data});
		});
	}
	
	clickHandler=(e,tar)=>{
		if(tar==='logout'){
			e.preventDefault();
			cookies.remove_data('usertoken');
			window.location.href='/';
		}
	}

    render() {
        return (
            <header>
            	<nav className={"navbar navbar-expand-md "+(this.state.navbar_dark?"navbar-dark":"")}>
            		<a className="navbar-brand" href="/">Highspace</a>
            		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            			<span className="navbar-toggler-icon"></span>
            		</button>
            		<div className="collapse navbar-collapse" id="collapsibleNavbar">
            			<ul className="navbar-nav ml-auto">
            				{Object.keys(this.state.links).map((val,key)=>
								<li className="nav-item" key={key}>
									<a className="nav-link" href={val}>{this.state.links[val]}</a>
								</li>
							)}
							{this.state.isLoggedIn?(
								<a className="btn nav-btn-1" href={'vendor/'+(this.state.user_data['is-vendor'] && !this.props.page.match(/vendor\/dashboard/i)?'dashboard':'location')}>{this.state.user_data['is-vendor']?(this.props.page.match(/vendor\/dashboard/i)?'Add a space':'List your space'):'Become a Host'}</a>
							):''}
							{this.state.isLoggedIn?(
								<li className="nav-item dropdown">
									<a className="nav-link nav-btn dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
										<i className="fa fa-user"></i>
									</a>
									<div className="dropdown-menu dropdown-menu-right">
										<div className="dropdown-header">
											<div className="media dropdown-media">
												<img src={this.state.user_data['profile-pic']} className="pro-pic"/>
												<div className="media-body">
													<div className="txt-1">{this.state.user_data['full-name']}</div>
													{this.state.user_data['others']['address']?(
														<div className="txt-2">{this.state.user_data['others']['address']}</div>
													):''}
													<div className="mt-2">
														<span className="pro-type"><i className={"fa fa-"+(this.state.user_data['is-vendor']?'user-secret':'meh-o')}></i> Highspace {this.state.user_data['is-vendor']?'Host':'User'}</span>
													</div>
												</div>
											</div>
										</div>
										{Object.keys(this.state.dropdowns).map((val,key)=>
											<div key={key}>
												{this.state.dropdowns[val]===false?(
													<div className="dropdown-divider">{val}</div>
												):(
													<a className="dropdown-item" href={"vendor/"+val} onClick={(e)=>this.clickHandler(e,val)}>
														{typeof this.state.dropdowns[val][1]!=='undefined'?(
															<i className={"fa fa-"+this.state.dropdowns[val][1]}></i>
														):''}
														{this.state.dropdowns[val][0]}</a>
												)}
											</div>
										)}
									</div>
								</li>
							):(
								<li className="nav-item">
									<a className="nav-link nav-btn" href="login"><i className="fa fa-user"></i> Sign in</a>
								</li>
							)}
            			</ul>
            		</div>  
            	</nav>
            </header>
        )
    }
}

export default Header
