import React, { Component } from 'react'
import Siderbar from './Siderbar'
const common_func = require('./../../../components/Common_func');

class PaymentDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            form_data:{
                'fields':{}
			},
			form_btn:'',
			add_account:false
        }
        this.siderbar = React.createRef();
    }

    componentDidMount(){
        var thus=this;
        common_func.form_get(this.props).then(function(form_data){
			thus.setState({ form_data:form_data });
			thus.siderbar.current.setState({page_index:form_data['space-position']});
        });
	}
	
	addNew=(val)=>{
		this.setState({
			add_account:val
		});
	}
    formBtnLoad=(data)=>{
        this.setState({form_btn:data});
    }

    render() {
		var Form_group=(params)=>{
            return(
                <div className={params.form_data['field-type'][params.key_val]['class']}>
                	<div className="form-group mb-0">
						{common_func.input_field(params.key_val,this.state.form_data,false)}
						{common_func.input_field(params.key_val,this.state.form_data)}
	            	</div>
	            </div>
            );
        };
        
        return (
            <section className="col-12 vendor-section">
            <div className="row">
            <div className="col-md-2 ltr-portion">
                <Siderbar {...this.props} onLoad={this.formBtnLoad} ref={this.siderbar}></Siderbar>
       	 	</div>
            <div className="col-md-6">
			{typeof this.state.form_data['field-type']!=='undefined'?(
            <div className="col-md-10 mx-auto vendor-form">
				<div className="form-title sp-2">Payment details</div>
				<form method="post" encType="multipart/form-data" onSubmit={(e)=> this.siderbar.current.form_handler(e)}>
                	<div className="row">
						<div className="col-12">
							{typeof this.state.form_data['payment-details']!=='undefined'?(
								<div>
								{this.state.form_data['payment-details']['data'].map((x,i)=>
									<div key={i}>
										<div className="custom-control custom-radio">
											<input type="radio" className="custom-control-input" name="paymentdetail-id" data-required="true" value={x['id']} {...(typeof this.state.form_data['payment-details']['defaultValue']!=='undefined' && this.state.form_data['payment-details']['defaultValue']==x['id']?{defaultChecked:true}:{})}/>
											<label className="custom-control-label" onClick={(e)=>this.addNew(false)}>
												<div className="media radio-media">
													<i className="fa fa-university align-self-top"></i>
													<div className="media-body">
														<div className="r-title">Use Account {x['account-number']}</div>
														<div className="r-des">{x['name']}</div>
													</div>
												</div>
											</label>
										</div>
									</div>
								)}
								<div className="custom-control custom-radio">
									<input type="radio" data-required="true" className="custom-control-input" name="paymentdetail-id"/>
									<label className="custom-control-label" onClick={(e)=>this.addNew(true)}>
										<div className="media radio-media">
											<i className="fa fa-university align-self-top"></i>
											<div className="media-body">
												<div className="r-title">Add New Account</div>
											</div>
										</div>
									</label>
								</div>
								</div>
							):''}

							{typeof this.state.form_data['payment-details']==='undefined' || this.state.add_account===true?(
								<div>
									<div className="line-separator"></div>
									<div className="form-group mb-0">
										<label nofocus="true">Enter your payment details</label>
									</div>
									<div className="row">
										{Object.keys(this.state.form_data['fields']).map((key,i) =>
											<Form_group form_data={this.state.form_data} key_val={key} key={i}></Form_group>
										)}
									</div>
								</div>
							):''}
						</div>
					</div>
					<div className="row">
						<div className="col-12 form-btm mt-3">
							{this.state.form_btn}
						</div>
					</div>
				</form>
			</div>
			):''}
		</div>
		<div className="col-md-4">
			<div className="img-portion">
				<img className="img-fluid" src="assets/images/vendor-payment.gif"/>
			</div>
		</div>
	</div>
  </section>
        )
    }
}

export default PaymentDetails
