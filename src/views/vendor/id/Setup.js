import React, { Component } from 'react'
import Siderbar from './Siderbar'
import $ from "jquery"
const common_func = require('./../../../components/Common_func');

class Setup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            form_data:{
                'fields':{}
			},
			form_btn:'',
			multiple_floor:false,
			multiple_floor_len:3,
			multiple_floor_val:[],
			age_res:false,
        }
        this.siderbar = React.createRef();
    }

    componentDidMount(){
        var thus=this;
        common_func.form_get(this.props).then(function(form_data){
			thus.setState({ form_data:form_data });
			thus.siderbar.current.setState({page_index:form_data['space-position']});
			if(typeof thus.state.form_data['field-type']['multiple-floors']['attr']['defaultValue']!=='undefined' && thus.state.form_data['field-type']['multiple-floors']['attr']['defaultValue'].length>0){
				thus.setState({
					multiple_floor:true,
					multiple_floor_len:thus.state.form_data['field-type']['multiple-floors']['attr']['defaultValue'].length
				});
				$('[name="multiple_floor"]').attr('checked',true);
			}
			if(typeof thus.state.form_data['field-type']['age-restriction']['attr']['defaultValue']!=='undefined' && thus.state.form_data['field-type']['age-restriction']['attr']['defaultValue']>0){
				thus.setState({ age_res:true });
				$('[name="age-res"]:nth(1)').click();
			}
        });
	}

	addFloor=(e,rem=false)=>{
		e.preventDefault();
		this.setState({
			multiple_floor_len:this.state.multiple_floor_len+(rem===true?-1:1)
		});
	}

	clickHandler=(e)=>{
		e.preventDefault();
		var tar=$(e.target).attr('data-target');
		if(tar=='multiple_floor'){
			this.setState({
				multiple_floor:$(e.target).parent().find('input:checked').length
			});
		}else if(tar=='age-res-0' || tar=='age-res-1'){
			this.setState({
				age_res:tar=='age-res-1'?true:false
			});
		}
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
				<div className="form-title sp-2">Setup</div>
				<form method="post" encType="multipart/form-data" onSubmit={(e)=> this.siderbar.current.form_handler(e)}>
                    <div className="row">
						<div className="col-12">
							<div className="form-group">
                                {common_func.input_field('floor-area',this.state.form_data,false)}
                                <div className="sub-txt">Mention only the area of your floors the guests can use.</div>
								<div className="row align-items-center">
									<div className="col-5">
                                        {common_func.input_field('floor-area',this.state.form_data)}
									</div>
									<div className="col-7">
										<div className="custom-control custom-checkbox mb-0">
											<input type="checkbox" name="multiple_floor" className="custom-control-input"/>
											<label className="custom-control-label" data-target="multiple_floor" onClick={this.clickHandler}>Multiple Floors</label>
										</div>
									</div>
								</div>
								{this.state.multiple_floor?(
								<div className="row mt-2">
									<div className="col-9">
										<div className="row">
											{[...Array(this.state.multiple_floor_len)].map((x,i)=>
												<div className="col-4 pr-0" key={i}>
													<div className="input-box">
														{common_func.input_field('multiple-floors['+i+']',this.state.form_data,null,null,{},{placeholder:`Floor ${i+1} Area`})}
														{i>0 && i+1>=this.state.multiple_floor_len?(
															<a href="#" onClick={(e)=>this.addFloor(e,true)} className="close-btn"><i className="fa fa-close"></i></a>
														):''}
													</div>
												</div>
											)}
										</div>
									</div>
									<div className="col-3 align-self-start">
										<button type="button" className="btn btn-gray add-btn" onClick={this.addFloor}><i className="fa fa-plus"></i></button>
									</div>
								</div>
								):''}
							</div>
						</div>
						<div className="col-12">
							<div className="form-group">
                                {common_func.input_field('age-restriction',this.state.form_data,false)}
								<div className="row align-items-center">
									<div className="col-4">
										<div className="custom-control custom-radio mb-0">
											<input type="radio" name="age-res" className="custom-control-input" defaultChecked/>
											<label className="custom-control-label" data-target="age-res-0" onClick={this.clickHandler}>No</label>
										</div>
									</div>
									<div className="col-2">
										<div className="custom-control custom-radio mb-0">
											<input type="radio" name="age-res" className="custom-control-input"/>
											<label className="custom-control-label" data-target="age-res-1" onClick={this.clickHandler}>Yes</label>
										</div>
									</div>
									{this.state.age_res?(
									<div className="col-3 pl-0">
                                        {common_func.input_field('age-restriction',this.state.form_data)}
									</div>
									):''}
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="form-group">
                                {common_func.input_field('guests-allowed',this.state.form_data,false)}
								<div className="row">
									<div className="col-3 pr-0">
                                        {common_func.input_field('guests-allowed',this.state.form_data)}
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="form-group">
                                {common_func.input_field('common-rules',this.state.form_data,false)}
								<div className="sub-txt">Pick from a selection of common rules:</div>
                                {common_func.input_field('common-rules',this.state.form_data,null,false)}
								<div className="sub-txt">Other specific rules you want your guests to conform to:</div>
                                {common_func.input_field('other-rules',this.state.form_data)}
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
				<img className="img-fluid" src="/assets/images/vendor-setup.gif"/>
			</div>
		</div>
	</div>
  </section>
        )
    }
}

export default Setup
