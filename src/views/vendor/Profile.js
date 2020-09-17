import React, { Component } from 'react'
import "./../../assets/css/profile-page.css"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
const common_func = require('./../../components/Common_func');
const cookies = require('./../../components/Cookies');

class Profile extends Component {
	constructor(props) {
		super(props)
	
		const isLoggedIn=cookies.isLoggedIn();
		const user_data=cookies.isLoggedIn(true);
		const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
		let join_in=new Date(user_data['createdAt']);
		join_in=monthNames[join_in.getMonth()]+' '+join_in.getFullYear();
		this.state = {
			isLoggedIn:isLoggedIn,
			user_data:user_data,
			join_in:join_in,
			profile_edit:false,
			form_data:{},
			monthNames:monthNames,
			dropdown_cal:false,
			ajax_loader:false
		}
	}
	
	componentDidMount(){
		cookies.callback_func((data)=>{
			this.setState({user_data:data});
		});
		common_func.form_get({...this.props,page:'update-profile'}).then((form_data)=>{
            this.setState({ form_data:form_data });
		});
	}

	editProfile=(e,state=true)=>{
		e.preventDefault();
		this.setState({profile_edit:state});
	}
	
	clickHandler=(e)=>{
		e.preventDefault();
		this.setState({dropdown_cal:this.state.dropdown_cal?false:true})
	}
	
	clickCalendarHandler=(date,e)=>{
		common_func.jquery('[name="birthday"]').val(date.getDate()+' '+this.state.monthNames[date.getMonth()]+', '+date.getFullYear());
		this.setState({dropdown_cal:false})
	}
	
	submitHandler=(e)=>{
		e.preventDefault();
		this.setState({ajax_loader:true})
		var formdata=new FormData(e.target);
		common_func.ajax.post(`/form/post/update-profile`,formdata,{headers:{Authorization:`Bearer ${common_func.cookie.get('usertoken')}`}})
        .then(res => {
			if(typeof res.data.token!=='undefined'){
				common_func.cookies.set_data('usertoken',res.data.token);
			}
			if(typeof res.data.status!=='undefined'){ 
				this.setState({profile_edit:false});
			}else if(typeof res.data.errorMsg!=='undefined'){
				this.setState({
					errorMsg:res.data.errorMsg
				});
			}
        }).catch(common_func.axios_err_handler).finally(()=>{
			this.setState({ajax_loader:false})
		});
	}

	check_val=(name,ret=false,val1=false)=>{
		let val=typeof this.state.user_data['others'][name]!=='undefined'?this.state.user_data['others'][name]:(val1?val1:'');
		return ret===true?val:{defaultValue:val};
	}

    render() {
        return (
        <section className="col-12 profile-section">
	        <div className="profile-top"></div>
			<div className="pl-5">
				<div className="row">
					<div className="col-sm-2 profile-sidebar">
						<div className="pro-pic">
							<img src={this.state.user_data['profile-pic']}/>
							{this.state.profile_edit?(
								<a className="pic-add"><i className="fa fa-plus-circle"></i> Add Image</a>
							):''}
						</div>
						<div className="mt-5">
							<ul className="main-ul">
								<li><a><i className="icon fa fa-comments"></i> 10 reviews</a></li>
								<li><a><i className="icon fa fa-check-circle-o"></i> Verified</a></li>
							</ul>
						</div>
					</div>
					<div className="col-sm-10 pr-0">
						<div className="pro-sec">
							<div className="par-flex">
								<div className="par">
									<div className="pro-name mt-3">
										<span className="txt-1">{this.state.user_data['full-name']}</span> <i className={"icon fa fa-"+(this.state.user_data['is-vendor']?'user-secret':'meh-o')}></i>
									</div>
									<div className="txt-3">
										{this.state.user_data['others']['address']?(
											<span>
												{this.state.user_data['others']['address']}
												<span className="dot-icon"></span> 
											</span>
										):''}
										Joined in {this.state.join_in}
									</div>
								</div>
								{this.state.profile_edit?(
									<div className="ml-auto align-self-end">
										<a href="#" onClick={(e)=>this.editProfile(e,false)} className="btn theme-btn clr-1">Cancel</a>
									</div>
								):(
									<div className="ml-auto align-self-end">
										<a href="#" onClick={this.editProfile} className="btn theme-btn">Edit Profile</a>
										{this.state.user_data['is-vendor']?(
											<a href="vendor/dashboard" className="btn theme-btn ml-2">Dashboard</a>
										):''}
									</div>
								)}
							</div>
							<div className="line-separator w-100 mt-3"></div>
						</div>

						<div className="row mr-0">
							{this.state.profile_edit?(
								<div className="col-sm-8 mt-5">
								{typeof this.state.form_data['field-type']!=='undefined'?(
									<form method="post" encType="multipart/form-data" onSubmit={this.submitHandler}>
										<div className="row">
											<div className="col-6">
												<div className="form-group">
													{common_func.input_field('first-name',this.state.form_data,true,null,{defaultValue:this.state.user_data['first-name']})}
												</div>
											</div>
											<div className="col-6">
												<div className="form-group">
													{common_func.input_field('last-name',this.state.form_data,true,null,{defaultValue:this.state.user_data['last-name']})}
												</div>
											</div>
											<div className="col-12">
												<div className="form-group">
													{common_func.input_field('about',this.state.form_data,true,null,this.check_val('about'))}
												</div>
											</div>
											<div className="col-8">
												<div className="form-group">
													{common_func.input_field('address',this.state.form_data,true,null,this.check_val('address'))}
												</div>
											</div>
											<div className="col-12"><div className="line-separator py-4"></div></div>
											<div className="col-8">
												<div className="form-group">
													{common_func.input_field('mobile',this.state.form_data,true,null,{defaultValue:this.state.user_data['mobile']})}
												</div>
											</div>
											<div className="col-8">
												<div className="rb-cal form-group">
													<div className="dropdown">
														{common_func.input_field('birthday',this.state.form_data,true,null,{onClick:this.clickHandler,...this.check_val('birthday')})}
														{this.state.dropdown_cal?(
															<div className="calendar-menu">
																<Calendar
																	onClickDay={this.clickCalendarHandler}
																	defaultValue={this.check_val('birthday',true,false)?new Date(this.check_val('birthday',true,false)):new Date()}
																	maxDate={new Date()}
																/>
															</div>
														):''}
													</div>
												</div>
											</div>
											<div className="col-8">
												<div className="form-group">
													{common_func.input_field('aadhar-number',this.state.form_data,true,null,this.check_val('aadhar-number'))}
												</div>
											</div>
											{this.state.ajax_loader?(
												<div className="col-12 text-right mt-5">
													<div className="text-center my-3">
														<i className="fa fa-spinner fa-pulse fa-3x"></i>
													</div>
												</div>
											):(
												<div className="col-12 text-right mt-5">
													<button className="btn theme-btn">Save Changes</button>
													<a href="#" onClick={(e)=>this.editProfile(e,false)} className="btn theme-btn clr-1 ml-3">Cancel</a>
												</div>
											)}
										</div>
									</form>
								):''}						
								</div>
							):(
								<div className="col-sm-8">						
									{this.check_val('about',true,false)?(
										<div className="other-sec mt-4">
											<div className="txt-2">About</div>
											<div className="txt-3">
												{this.check_val('about',true)}
											</div>
											<div className="line-separator py-4"></div>
										</div>						
									):(
										<div className="mt-4"></div>
									)}
									<div className="other-sec">
										<div className="txt-2">Details</div>
										<div className="media-details">
											<div className="media">
												<i className="icon fa fa-envelope"></i>
												<div className="media-body">
													<div className="txt1">Email</div>
													<div className="txt2 d-flex">
														<a href={"mailto:"+this.state.user_data['email']}>{this.state.user_data['email']}</a>
														<span className="ml-2">(Public)</span>
														<div className="media-right">
															<i className="icon-right fa fa-check-circle-o"></i>
														</div>
													</div>
												</div>
											</div>
											{typeof this.state.user_data['mobile']!=='undefined'?(
												<div className="media">
													<i className="icon fa fa-phone"></i>
													<div className="media-body">
														<div className="txt1">Mobile number</div>
														<div className="txt2 d-flex">
															<a href={'tel:'+this.state.user_data['mobile']}>{this.state.user_data['mobile']}</a>
															<span className="ml-2">(Private)</span>
															<div className="media-right">
																<a>Verify mobile number</a>
																<i className="icon-right fa fa-times-circle-o"></i>
															</div>
														</div>
													</div>
												</div>
											):''}
											{this.check_val('birthday',true,false)?(
												<div className="media">
													<i className="icon fa fa-birthday-cake"></i>
													<div className="media-body">
														<div className="txt1">Birthday</div>
														<div className="txt2 d-flex">
															{this.check_val('birthday',true)}
															<span className="ml-2">(Private)</span>
														</div>
													</div>
												</div>
											):''}
											<div className="media">
												<i className="icon fa fa-user-circle"></i>
												<div className="media-body">
													<div className="txt1">ID Proof</div>
													<div className="txt2 d-flex">
														Aadhar card
														<div className="media-right">
															Under review
															<i className="icon-right fa fa-info-circle"></i>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
							</div>
						<div className="py-5"></div>
					</div>
				</div>
			</div>
        </section>
        )
    }
}

export default Profile