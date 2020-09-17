import React, { Component } from 'react'
import Siderbar from './Siderbar'
const common_func = require('./../../../components/Common_func');

class Cancellations extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            form_data:{
                'fields':{}
			},
			form_btn:''
        }
        this.siderbar = React.createRef();
    }

    componentDidMount(){
        var thus=this;
        common_func.form_get(this.props).then(function(form_data){
			thus.siderbar.current.setState({page_index:form_data['space-position']});
            thus.setState({ form_data:form_data },function(){
				common_func.jquery('[name="option"]:nth('+(this.state.form_data['field-type']['option']['attr']['defaultValue']-1)+')').click();
			});
		});

		common_func.jquery('body').on('click','[name="option"]',function(e){
			common_func.jquery('.rdo-des.active').removeClass('active');
			common_func.jquery(this).closest('.rdo-parent').find('.rdo-des').addClass('active');
		});
    }
    formBtnLoad=(data)=>{
        this.setState({form_btn:data});
    }

    render() {
		const radioCheck=(i)=>{
			if(typeof this.state.form_data['field-type']!=='undefined' && ((typeof this.state.form_data['field-type']['option']['attr']['defaultValue']!=='undefined' && this.state.form_data['field-type']['option']['attr']['defaultValue']==i) || (typeof this.state.form_data['field-type']['option']['attr']['defaultValue']!=='undefined' && i===1))){
				return {defaultChecked:true};
			}
			return {"data-required":true};
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
				<div className="form-title sp-2">Cancellations</div>
				<form method="post" encType="multipart/form-data" onSubmit={(e)=> this.siderbar.current.form_handler(e)}>
               		<div className="row">
						<div className="col-12">
							<div className="form-group">
								<label>Choose your cancellation and refund policy <span className="form-req">*</span></label>
								<div className="sub-txt">
									<strong>Pro tip: </strong> Hosts with more flexiable cancellation policies attract more bookings.
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="form-group">
								<div className="rdo-parent">
									<div className="custom-control custom-radio custom-control-inline">
										<input type="radio" className="custom-control-input" name="option" value="1" {...radioCheck(1)}/>
										<label className="custom-control-label"></label>
									</div>
									<div className="rdo-des flex-fill">
										<label>Very Flexible</label>
										<div className="row">
											<div className="col-sm-4">
												<div className="box-par bg1-success">
													<div className="title">Full refund</div>
													<div className="sub-title">Before 24 hours</div>
												</div>
											</div>
											<div className="col-sm-4">
												<div className="box-par bg1-warning">
													<div className="title">No refund</div>
													<div className="sub-title">Less than a day</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className="rdo-parent">
									<div className="custom-control custom-radio custom-control-inline">
										<input type="radio" className="custom-control-input" name="option" value="2" {...radioCheck(2)}/>
										<label className="custom-control-label"></label>
									</div>
									<div className="rdo-des flex-fill">
										<label>Flexible</label>
										<div className="row">
											<div className="col-sm-4">
												<div className="box-par bg1-success">
													<div className="title">Full refund</div>
													<div className="sub-title">Before 7 days</div>
												</div>
											</div>
											<div className="col-sm-4">
												<div className="box-par bg1-warning">
													<div className="title">50% refund</div>
													<div className="sub-title">7days - 24 hours</div>
												</div>
											</div>
											<div className="col-sm-4">
												<div className="box-par bg1-danger">
													<div className="title">No refund</div>
													<div className="sub-title">Less than a day</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className="rdo-parent">
									<div className="custom-control custom-radio custom-control-inline">
										<input type="radio" className="custom-control-input" name="option" value="3" {...radioCheck(3)}/>
										<label className="custom-control-label"></label>
									</div>
									<div className="rdo-des flex-fill">
										<label>Standard 30 days</label>
										<div className="row">
											<div className="col-sm-4">
												<div className="box-par bg1-success">
													<div className="title">Full refund</div>
													<div className="sub-title">Before 30 days</div>
												</div>
											</div>
											<div className="col-sm-4">
												<div className="box-par bg1-warning">
													<div className="title">50% refund</div>
													<div className="sub-title">30 days - 7 days</div>
												</div>
											</div>
											<div className="col-sm-4">
												<div className="box-par bg1-danger">
													<div className="title">No refund</div>
													<div className="sub-title">Less than 7 days</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className="rdo-parent">
									<div className="custom-control custom-radio custom-control-inline">
										<input type="radio" className="custom-control-input" name="option" value="4" {...radioCheck(4)}/>
										<label className="custom-control-label"></label>
									</div>
									<div className="rdo-des flex-fill">
										<label>Standard 90 days</label>
										<div className="row">
											<div className="col-sm-4">
												<div className="box-par bg1-success">
													<div className="title">Full refund</div>
													<div className="sub-title">Before 90 days</div>
												</div>
											</div>
											<div className="col-sm-4">
												<div className="box-par bg1-warning">
													<div className="title">50% refund</div>
													<div className="sub-title">90 days - 14 days</div>
												</div>
											</div>
											<div className="col-sm-4">
												<div className="box-par bg1-danger">
													<div className="title">No refund</div>
													<div className="sub-title">Less than 14 days</div>
												</div>
											</div>
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
				<img className="img-fluid h-full" src="/assets/images/vendor-setup.gif"/>
			</div>
		</div>
	</div>
  </section>
        )
    }
}

export default Cancellations
