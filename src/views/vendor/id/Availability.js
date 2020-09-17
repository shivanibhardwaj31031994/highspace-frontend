import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import Siderbar from './Siderbar'
import $ from 'jquery'
const common_func = require('./../../../components/Common_func');

class Availability extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            form_data:{
                'fields':{}
			},
			form_btn:'',
			options:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
			options_val:[]
        }
        this.siderbar = React.createRef();
    }

    componentDidMount(){
        var thus=this;
        common_func.form_get(this.props).then(function(form_data){
			thus.setState({ form_data:form_data });
			thus.siderbar.current.setState({page_index:form_data['space-position']});
			if(typeof form_data['field-type']['days']['attr']['defaultValue']!=='undefined'){
				var val=form_data['field-type']['days']['attr']['defaultValue'];
				for(var i=0;i<val.length;i++){
					if(val[i]==="true"){
						val[i]=true;
					}else if(val[i].length>0){
						val[i]=val[i].split(',');
					}else{
						delete val[i];
					}
				}
				thus.setState({ options_val:val });
			}
        });
	}
	
	radioHandler=(e,i,val)=>{
		var opt_val=this.state.options_val;
		opt_val[i]=val;
		this.setState({
			options_val:opt_val
		});
	}

	checkboxHandler=(e,i)=>{
		var opt_val=this.state.options_val;
		if($(e.target).parent().find('[type="checkbox"]:checked').length){
			opt_val[i]=$(e.target).closest('.rdo-parent').find('[type="radio"]:nth(0):checked').length>0?true:['','am','','am'];
		}else if(typeof opt_val[i]!=='undefined'){
			delete opt_val[i];
		}
		this.setState({
			options_val:opt_val
		});
	}

	timeHandler=(e,i,pos=0)=>{
		var val=$(e.target).val();
		var opt_val=this.state.options_val;
		opt_val[i]=typeof opt_val[i]!=='undefined'?opt_val[i]:['','am','','am'];
		if(e.target.nodeName.toLowerCase()=='select'){
			opt_val[i][(2*pos+1)]=val.toLowerCase();
		}else{
			opt_val[i][(2*pos)]=val;
		}
		this.setState({
			options_val:opt_val
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
				<div className="form-title sp-2">Availability</div>
				<form method="post" encType="multipart/form-data" onSubmit={(e)=> this.siderbar.current.form_handler(e)}>
               		<div className="row">
						<div className="col-12">
							<div className="form-group">
								<label>Enter your operating hours <span className="form-req">*</span></label>
								<div className="sub-txt">
									<div>Operating hours are the time slots in a week when your space is open for hosting (i.e general bookings.)</div>
									<div>Guests will not be able to book days and time outside your operating hours.</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							{this.state.options.map((key,i) =>
								<div className="form-group mb-0" key={i}>
									<div className="row">
										<div className={typeof this.state.options_val[i]==='object'?"col-md-7":"col-12"}>
											<label className="ng-binding ng-scope">{key}</label>
											<div className="rdo-parent">
												<div className=" style-1">
													<div className="custom-control custom-checkbox">
														<input type="checkbox" className="custom-control-input" {...(typeof this.state.options_val[i]!=='undefined'?{defaultChecked:true}:{})}/>
														<input type="hidden" name="days[]" value={typeof this.state.options_val[i]!=='undefined'?this.state.options_val[i]:''}/>
														<label className="custom-control-label" onClick={(e)=>this.checkboxHandler(e,i)}></label>
													</div>
												</div>
												<div className="rdo-btn">
													<div className="custom-control custom-radio custom-control-inline">
														<input type="radio" name={key} className="custom-control-input" {...(typeof this.state.options_val[i]!=='object'?{defaultChecked:true}:{})} {...(typeof this.state.options_val[i]==='undefined'?{disabled:true}:{})} />
														<label className="custom-control-label" onClick={(e)=>this.radioHandler(e,i,true)}>All day</label>
													</div>
													<div className="custom-control custom-radio custom-control-inline">
														<input type="radio" name={key} className="custom-control-input" {...(typeof this.state.options_val[i]==='object'?{defaultChecked:true}:{})} {...(typeof this.state.options_val[i]==='undefined'?{disabled:true}:{})}/>
														<label className="custom-control-label" onClick={(e)=>this.radioHandler(e,i,['','am','','am'])}>Set hours</label>
													</div>
												</div>
											</div>
										</div>
										{typeof this.state.options_val[i]==='object'?(
										<div className="col-md-5 pl-0">
											<label className="ng-binding ng-scope">Operating hours</label>
											<div className="hrs-parent">
												<div className="col-6">
													<div className="input-group">
														<InputMask mask="99:99" className="form-control" 	placeholder="00:00" data-mask="true" {...(typeof this.state.options_val[i]==='object'?{defaultValue:this.state.options_val[i][0]}:{})} onBlur={(e)=>this.timeHandler(e,i)} minLength="5" required/>
														<div className="input-group-append">
															<select onChange={(e)=>this.timeHandler(e,i)} {...(typeof this.state.options_val[i]==='object'?{defaultValue:this.state.options_val[i][1]}:{})}>
															  <option value="am">AM</option>
 															  <option value="pm">PM</option>
 															</select>
 														</div>
													</div>
												</div>
												<div className="col-6">
													<div className="input-group">
														<InputMask mask="99:99" className="form-control" 	placeholder="00:00" data-mask="true" {...(typeof this.state.options_val[i]==='object'?{defaultValue:this.state.options_val[i][2]}:{})} onBlur={(e)=>this.timeHandler(e,i,1)} minLength="5" required/>
														<div className="input-group-append">
															<select onChange={(e)=>this.timeHandler(e,i,1)} {...(typeof this.state.options_val[i]==='object'?{defaultValue:this.state.options_val[i][3]}:{})}>
 															  <option value="am">AM</option>
 															  <option value="pm">PM</option>
 															</select>
														</div>
													</div>
												</div>
											</div>
										</div>
										):''}
									</div>
								</div>
							)}
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
				<img className="img-fluid h-full" src="/assets/images/vendor-availability.gif"/>
			</div>
		</div>
	</div>
  </section>
        )
    }
}

export default Availability
