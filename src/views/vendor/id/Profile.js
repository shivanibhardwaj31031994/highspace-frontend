import React, { Component } from 'react'
import Siderbar from './Siderbar'
import jwt_decode from 'jwt-decode';
import DragAndDrop from './../../../components/DragAndDrop';
const common_func = require('./../../../components/Common_func');

class Profile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            form_data:{
                'fields':{}
			},
			form_btn:'',
			add_profile:false,
			profile_pic:[]
        }
        this.siderbar = React.createRef();
        this.drap_drop = React.createRef();
	}
	
    componentDidMount(){
        var thus=this;
        common_func.form_get(this.props).then(function(form_data){
			thus.siderbar.current.setState({page_index:form_data['space-position']});
            thus.setState({ form_data:form_data });
		});
	}
	
	dragFormHandler=(e)=>{
		this.drap_drop.current.submitHandler(e,this.props.page,this.props.id);
	}
	
	updateState=()=>{
		this.setState({});
	}

	addNew=(val=false)=>{
		this.setState({
			add_profile:val
		});
	}
    formBtnLoad=(data)=>{
        this.setState({form_btn:data});
    }

    render() {
		const user=jwt_decode(common_func.cookie.get('usertoken'));
		const radioCheck=(val)=>{
			if(typeof this.state.form_data['field-type']!=='undefined'){
				if(typeof this.state.form_data['field-type']['profile-id']['attr']['defaultValue']!=='undefined'){
					if(this.state.form_data['field-type']['profile-id']['attr']['defaultValue']==val){
						return {defaultChecked:true,value:val};
					}
				}else{
					return {defaultChecked:true,value:val};
				}
			}
			return {value:val};
		}
        return (
            <section className="col-12 vendor-section">
            <div className="row">
            <div className="col-md-2 ltr-portion">
               <Siderbar {...this.props} onLoad={this.formBtnLoad} ref={this.siderbar}></Siderbar>
       	 	</div>
		<div className="col-md-6">
		{typeof this.state.form_data['field-type']!=='undefined'?(
            <div className="col-md-10 mx-auto vendor-form">
				<div className="form-title sp-2">Profile</div>
				<form method="post" className="d-none" encType="multipart/form-data" onSubmit={this.dragFormHandler} id="dragAndDrop">
					{common_func.input_field('profile-pic',this.state.form_data,null,false,{onChange:(e)=>this.drap_drop.current.fileHandler(e)},{defaultValue:''})}
					<button>submit</button>
            	</form>
				<form method="post" encType="multipart/form-data" onSubmit={(e)=> this.siderbar.current.form_handler(e)}>
                	<div className="row">
						<div className="col-12">
							<div className="custom-control custom-radio">
								<input type="radio" className="custom-control-input" data-required="true" name="profile-id" {...radioCheck('000000000000000000000000')}/>
								<label className="custom-control-label" onClick={(e)=>this.addNew()}>
									<div className="media radio-media">
										<i className="fa fa-user align-self-top"></i>
										<div className="media-body">
											<div className="r-title">Use default Profile details</div>
											<div className="r-des">{typeof user['name']!=='undefined'?user['name']:user['first-name']+' '+user['last-name']}</div>
										</div>
									</div>
								</label>
							</div>
							{typeof this.state.form_data['profiles']==='object' && this.state.form_data['profiles'].map((x,i)=>
								<div className="custom-control custom-radio" key={i}>
									<input type="radio" className="custom-control-input" data-required="true" name="profile-id" {...radioCheck(this.state.form_data['profiles'][i]['id'])}/>
									<label className="custom-control-label" onClick={(e)=>this.addNew()}>
										<div className="media radio-media">
											<i className="fa fa-user align-self-top"></i>
											<div className="media-body">
												<div className="r-title">{this.state.form_data['profiles'][i]['name']}</div>
												<div className="r-des">{this.state.form_data['profiles'][i]['mobile']}</div>
											</div>
										</div>
									</label>
								</div>
							)}
							<div className="custom-control custom-radio">
								<input type="radio" className="custom-control-input" data-required="true" name="profile-id"/>
								<label className="custom-control-label" onClick={(e)=>this.addNew(true)}>
									<div className="media radio-media">
										<i className="fa fa-user align-self-top"></i>
										<div className="media-body">
											<div className="r-title">Add New Profile</div>
										</div>
									</div>
								</label>
							</div>
							{this.state.add_profile===true?(
								<div className="react-parent">
									<div className="line-separator"></div>
									<div className="form-group">
										<label>Add your profile photo</label>
										<div className="sub-txt">
											<strong>Pro tip: </strong> No logo, No watermarks. A friendly common profile image to instills a sense of trust and verification
										</div>
										<div className="row mt-3">
											{this.drap_drop.current!==null?(
												<div className="col-3">
													<input type="hidden" name="profile-pic" value={Object.keys(this.drap_drop.current.state.img_data).length>0?Object.keys(this.drap_drop.current.state.img_data)[0]:''}/>
													<img src={Object.keys(this.drap_drop.current.state.img_data).length>0?this.drap_drop.current.state.img_preview[Object.values(this.drap_drop.current.state.img_data)[0]].toString():"assets/images/avatar.jpg"} className="img-fluid"/>
												</div>
											):''}
											<div className="col-4 pl-0">
												<DragAndDrop className="drag-drop style-1" page={this.props.page} id={this.props.id} uploadSingle={true} updateState={this.updateState} ref={this.drap_drop}>
													<div className="media">
														<i className="fa fa-cloud-upload"></i>
														<div className="media-body">
															<h5>Drop files here</h5>
															<p>or <span>browse for files</span></p>
														</div>
													</div>													
												</DragAndDrop>
											</div>
										</div>
									</div>
									<div className="form-group">
										<label>Add the customer's contact person <span className="form-req">*</span></label>
										<div className="sub-txt">
											<strong>Pro tip: </strong> Do not use a business name.
										</div>
										<div className="row">
											<div className="col-6 mt-2">
												{common_func.input_field('first-name',this.state.form_data)}
											</div>
											<div className="col-6 mt-2">
												{common_func.input_field('last-name',this.state.form_data)}
											</div>
											<div className="col-6">
												<div className="form-group">
													<div className="input-group">
														<div className="input-group-prepend">
															<span className="input-group-text"><i className="fa 	fa-angle-down"></i> 91</span>
														</div>
														{common_func.input_field('mobile',this.state.form_data,null,false)}
													</div>
													{common_func.input_field('mobile',this.state.form_data,false,true)}
												</div>
											</div>
										</div>
									</div>
								</div>
							):(
								<div className="line-separator"><span></span></div>
							)}
							<div className="form-group style-1">
								{common_func.input_field('source',this.state.form_data,false)}
								<div className="row ckbx-group">
									<div className="col-6">
										{[...Array(6)].map((x,i)=>
											<div key={i}>
												{common_func.input_field('source['+(i+1)+']',this.state.form_data)}
											</div>
										)}
									</div>
									<div className="col-6">
										{[...Array(4)].map((x,i)=>
											<div key={i}>
												{common_func.input_field('source['+(i+7)+']',this.state.form_data)}
											</div>
										)}
										{common_func.input_field('other-source',this.state.form_data)}
									</div>
								</div>
							</div>
							<div className="form-group style-1">
								<label>Review and agree to the Highspace policies <span className="form-req">*</span></label>
								<div className="custom-control custom-checkbox">
									<input type="checkbox" name="agree" className="custom-control-input" data-required="true" {...(typeof this.state.form_data['form-id']!=='undefined'?{defaultChecked:true}:{})}/>
									<label className="custom-control-label">I agree to the Highspace <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</label>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 form-btm">
							{this.state.form_btn}
						</div>
					</div>
				</form>
			</div>
		):''}
		</div>
		<div className="col-md-4">
			<div className="img-portion">
				<img className="img-fluid" src="assets/images/vendor-profile.gif"/>
			</div>
		</div>
	</div>
  </section>
        )
    }
}

export default Profile
