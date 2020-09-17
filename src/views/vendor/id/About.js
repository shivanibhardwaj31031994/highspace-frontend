import React, { Component } from 'react'
import Siderbar from './Siderbar'
const common_func = require('./../../../components/Common_func');

class About extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            form_data:{
                'fields':{}
			},
			form_btn:'',
			multiple_space_type:1
        }
        this.siderbar = React.createRef();
    }

    componentDidMount(){
        var thus=this;
        common_func.form_get(this.props).then(function(form_data){
			thus.setState({ form_data:form_data });
			thus.siderbar.current.setState({page_index:form_data['space-position']});
			if(typeof thus.state.form_data['field-type']!=='undefined'){
				if(typeof thus.state.form_data['field-type']['space-type']['attr']['defaultValue']!=='undefined' && thus.state.form_data['field-type']['space-type']['attr']['defaultValue'].length>0){
					thus.setState({
						multiple_space_type:thus.state.form_data['field-type']['space-type']['attr']['defaultValue'].length,
					});
				}
			}
        });
	}
	
	addSpaceType=(e,rem=false)=>{
		e.preventDefault();
		this.setState({
			multiple_space_type:this.state.multiple_space_type+(rem===true?-1:1)
		});
	}
    formBtnLoad=(data)=>{
        this.setState({form_btn:data});
    }

    render() {
        return (
        <section className="col-12 vendor-section">
	    <div className="row">
		<div className="col-md-2 ltr-portion">
            <Siderbar {...this.props} onLoad={this.formBtnLoad} ref={this.siderbar}></Siderbar>
        </div>
		<div className="col-md-6">
		{typeof this.state.form_data['field-type']!=='undefined'?(
            <div className="col-md-10 mx-auto vendor-form">
				<div className="form-title sp-2">About</div>
				<form method="post" encType="multipart/form-data" onSubmit={(e)=> this.siderbar.current.form_handler(e)}>
                	<div className="row">
						<div className="col-12">
							<div className="form-group">
                                {common_func.input_field('space-name',this.state.form_data,false)}
								<div className="sub-txt">Use unique adjectives, along with the type of space and location.<br/>For eg. Professional Recording Studio in Whitefield</div>
                                {common_func.input_field('space-name',this.state.form_data)}
							</div>
						</div>
						<div className="col-12">
							<div className="form-group">
                                {common_func.input_field('space-type',this.state.form_data,false)}
                                <div className="sub-txt">Mention what type of space you want to list?<br/>For eg.(Studio, Venues, Private Office, Dance space, Hostel etc.)<br/>Feel free to add multiple purposes</div>
								<div className="row">
                                	{[...Array(this.state.multiple_space_type)].map((x,i)=>
										<div className="col-4 pr-0" key={i}>
											<div className="input-box">
												{common_func.input_field('space-type['+i+']',this.state.form_data)}
												{i>0 && i+1>=this.state.multiple_space_type?(
													<a href="#" onClick={(e)=>this.addSpaceType(e,true)} className="close-btn"><i className="fa fa-close"></i></a>
												):''}
											</div>
										</div>
									)}
									<div className="col-3 align-self-start">
										<button type="button" className="btn btn-gray add-btn" onClick={this.addSpaceType}><i className="fa fa-plus"></i></button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="form-group">
                                {common_func.input_field('description',this.state.form_data,false)}
								<div className="sub-txt">
									Answer the following questions while providing the description
									<ol>
										<li>Type of activites that can be done in your space?</li>
										<li>Mention the unique features which your space provides.</li>
										<li>Add anything that you feel is important for users to know about your space.</li>
									</ol>
								</div>
                                {common_func.input_field('description',this.state.form_data)}
							</div>
						</div>
						<div className="col-12">
							<div className="form-group">
                                {common_func.input_field('instruction',this.state.form_data,false)}
								<div className="sub-txt">Include directions to your building, access, floor, elevators etc.</div>
                                {common_func.input_field('instruction',this.state.form_data)}
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
				<img className="img-fluid" src="/assets/images/vendor-about.gif"/>
			</div>
		</div>
	</div>
  </section>
        )
    }
}

export default About
