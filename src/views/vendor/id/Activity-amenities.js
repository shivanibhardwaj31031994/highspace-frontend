import React, { Component } from 'react'
import Siderbar from './Siderbar'
import $ from 'jquery'
const common_func = require('./../../../components/Common_func');

class ActivityAmenities extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            form_data:{
                'fields':{}
			},
			form_btn:'',
			multiple_amentity:1
        }
        this.siderbar = React.createRef();
    }

    componentDidMount(){
        var thus=this;
        common_func.form_get(this.props).then(function(form_data){
            thus.siderbar.current.setState({page_index:form_data['space-position']});
            thus.setState({ form_data:form_data },function(){
				if(typeof this.state.form_data['field-type']['amenities-others']['attr']['defaultValue']!=='undefined'){
					this.setState({multiple_amentity:this.state.form_data['field-type']['amenities-others']['attr']['defaultValue'].length});
				}
			});
        });
	}
	
	addAmentity=(e,rem=false)=>{
		e.preventDefault();
		this.setState({
			multiple_amentity:this.state.multiple_amentity+(rem===true?-1:1)
		});
	}

	changeHandler=(e)=>{
		var tar=$(e.target).find('.form-control');
		var tar1=$(e.target).parent().find('.custom-control-input');
		if(tar.length>0){
			if(tar1.is(':checked')){
				if(tar.closest('.other-par').length>0){
					tar.closest('.other-par').removeClass('d-none');
				}
				tar.removeAttr('disabled').removeClass('d-none');
			}else{
				if(tar.closest('.other-par').length>0){
					tar.closest('.other-par').addClass('d-none');
				}
				tar.attr('disabled',true).addClass('d-none');
			}
		}
	}
    formBtnLoad=(data)=>{
        this.setState({form_btn:data});
    }

    render() {
		const checkboxCheck=(name,i,dis=null)=>{
			if(typeof this.state.form_data['field-type']!=='undefined'){
				var dis_ret={};
				if(dis===true){
					if(typeof this.state.form_data['field-type'][name+'-extra']['attr']['defaultValue']!=='undefined' && typeof this.state.form_data['field-type'][name+'-extra']['attr']['defaultValue'][i]!=='undefined'){
						dis_ret={defaultValue:this.state.form_data['field-type'][name+'-extra']['attr']['defaultValue'][i]};
					}
				}
				if(typeof this.state.form_data['field-type'][name]['attr']['defaultValue']!=='undefined' && this.state.form_data['field-type'][name]['attr']['defaultValue'].indexOf(`${(i)}`)>-1){
					return dis===true?dis_ret:{defaultChecked:true};
				}
			}
			return dis===false?false:(dis===true?{disabled:true,className:'form-control d-none'}:{});
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
				<div className="form-title sp-2">Pricing & Amenities</div>
				<form method="post" encType="multipart/form-data" onSubmit={(e)=> this.siderbar.current.form_handler(e)}>
                	<div className="row">
						<div className="col-12">
							<div className="form-group">
								<div>
									{common_func.input_field('price',this.state.form_data,false)}
								</div>
								<div className="row mt-1">
									<div className="col-md-4">
										{common_func.input_field('price',this.state.form_data)}
									</div>
								</div>
							</div>
							<div className="form-group">
								<div>
									{common_func.input_field('activities',this.state.form_data,false)}
								</div>
								<div className="sub-txt">
									<strong>Pro tip: </strong> Selecting multiple choices makes for better space visiblity.
								</div>
								<div className="my-2">
									{common_func.input_field('activities',this.state.form_data,false,true)}
								</div>
								<div className="row ckbx-group style-1">
									<div className="col-6">
										{[...Array(5)].map((x,i)=>
											<div key={i}>
												{common_func.input_field('activities['+(i+1)+']',this.state.form_data,null,false)}
											</div>
										)}
									</div>
									<div className="col-6">
										{[...Array(3)].map((x,i)=>
											<div key={i}>
												{common_func.input_field('activities['+(i+6)+']',this.state.form_data,null,false)}
											</div>
										)}			
										<div className="custom-control custom-checkbox">
											<input type="checkbox" className="custom-control-input" name="activities[]" {...checkboxCheck('activities',9)} defaultValue="9" data-required="true"/>
											<label className="custom-control-label" onClick={this.changeHandler}>Others
												<div className="mt-1">
													<textarea className="form-control" name="activities-extra[9]" placeholder="Others" rows="1" {...checkboxCheck('activities',9,true)}></textarea>
												</div>
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className="form-group">
								<div>
									{common_func.input_field('amenities',this.state.form_data,false)}
								</div>
								<div className="sub-txt">
									<strong>Pro tip: </strong> More amenities equals more revenue!
								</div>
								<div className="my-2">
									{common_func.input_field('amenities',this.state.form_data,false,true)}
								</div>
								<div className="row ckbx-group style-1">
									<div className="col-6">
										{[...Array(10)].map((x,i)=>
											<div key={i}>
												<div className="custom-control custom-checkbox style-1">
													<input {...(typeof this.state.form_data['field-type']['amenities']['attr']!=='undefined'?this.state.form_data['field-type']['amenities']['attr']:{})} type="checkbox" className="custom-control-input" name="amenities[]" defaultValue={i+1} {...checkboxCheck('amenities',i+1)}/>
													<label className="custom-control-label" onClick={this.changeHandler}>{this.state.form_data['field-type']['amenities']['options'][i]}
														<input type="text" placeholder="Additional Cost" className="form-control" name={"amenities-extra["+(i+1)+"]"} {...checkboxCheck('amenities',i+1,true)}/>
													</label>
												</div>
											</div>
										)}
									</div>
									<div className="col-6">
										{[...Array(10)].map((x,i)=>
											<div key={i}>
												<div className="custom-control custom-checkbox style-1">
													<input {...(typeof this.state.form_data['field-type']['amenities']['attr']!=='undefined'?this.state.form_data['field-type']['amenities']['attr']:{})} type="checkbox" className="custom-control-input" name="amenities[]" defaultValue={i+11} {...checkboxCheck('amenities',i+11)}/>
													<label className="custom-control-label" onClick={this.changeHandler}>{this.state.form_data['field-type']['amenities']['options'][i+11]}
														<input type="text" placeholder="Additional Cost" className="form-control" name={"amenities-extra["+(i+11)+"]"} {...checkboxCheck('amenities',i+11,true)}/>
													</label>
												</div>
											</div>
										)}
									</div>
									<div className="col-7">
										<div className="custom-control custom-checkbox style-1">
											<input {...(typeof this.state.form_data['field-type']['amenities']['attr']!=='undefined'?this.state.form_data['field-type']['amenities']['attr']:{})} type="checkbox" className="custom-control-input" name="amenities[]" defaultValue="10" {...checkboxCheck('amenities',10)}/>
											<label className="custom-control-label w-100" onClick={this.changeHandler}>{this.state.form_data['field-type']['amenities']['options'][10]}											
												<div className={"other-par"+(checkboxCheck('amenities',10,false)?"":" d-none")} nofocus="true">
													{[...Array(this.state.multiple_amentity)].map((x,i)=>
														<div className="input-group input-box" key={i}>
															{common_func.input_field('amenities-others['+i+']',this.state.form_data,null,false)}
															<div className="price-box">
																{common_func.input_field('amenities-others-price['+i+']',this.state.form_data,null,false)}
															</div>
															{i>0 && i+1>=this.state.multiple_amentity?(
																<a href="#" onClick={(e)=>this.addAmentity(e,true)} className="close-btn"><i className="fa fa-close"></i></a>
															):''}
														</div>
													)}
													<button type="button" onClick={(e)=>this.addAmentity(e)} className="btn btn-gray mt-2"><i className="fa fa-plus"></i> Add more</button>
												</div>
											</label>
										</div>
									</div>
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
				<img className="img-fluid" src="/assets/images/vendor-amenities.gif"/>
			</div>
		</div>
	</div>
  </section>
        )
    }
}

export default ActivityAmenities;