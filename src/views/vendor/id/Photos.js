import React, { Component } from 'react'
import Siderbar from './Siderbar'
import Slider from 'react-slick';
import DragAndDrop from './../../../components/DragAndDrop'
const common_func = require('./../../../components/Common_func');

class Photos extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            form_data:{
                'fields':{}
			},
			form_btn:'',
			img_preview:false,
			img_data:{}
        }
        this.siderbar = React.createRef();
		this.drap_drop = React.createRef();
    }

	componentDidMount(){
        var thus=this;
        common_func.form_get(this.props).then(function(form_data){
			thus.setState({ form_data:form_data });
			thus.siderbar.current.setState({page_index:form_data['space-position']});
        });
    }

	dragFormHandler=(e)=>{
		this.drap_drop.current.submitHandler(e,this.props.page,this.props.id);
	}

	uploadRemoveHandler=(e)=>{
		e.preventDefault();
	}

	clickPreview=(e,src)=>{
		e.preventDefault();
		this.setState({img_preview:src});
	}
	updateState=()=>{
		this.setState({});
	}
    formBtnLoad=(data)=>{
        this.setState({form_btn:data});
    }

    render(){
        const slider_config = {
            dots:true,
		    infinite:false,
		    speed:300,
		    slidesToShow:3,
		    slidesToScroll:1
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
				<div className="form-title sp-2">Photos</div>
				<form method="post" className="d-none" encType="multipart/form-data" onSubmit={this.dragFormHandler} id="dragAndDrop">
					{common_func.input_field('photos',this.state.form_data,null,false,{onChange:(e)=>this.drap_drop.current.fileHandler(e)},{defaultValue:''})}
					<button>submit</button>
            	</form>
				<form method="post" encType="multipart/form-data" onSubmit={(e)=> this.siderbar.current.form_handler(e)}>
                	<div className="row">
						<div className="col-12">
							<div className="form-group">
								<label>Add photos of your space (atleast 5) <span className="form-req">*</span></label>
								<div className="sub-txt">
									<strong>Pro tips:</strong>
									<div>Add atleast 5 high resolution images. (&lt;2 MB)</div>
									<div>Stick to horizontal orientation for your photos.</div>
								</div>
								<DragAndDrop className="drag-drop" page={this.props.page} id={this.props.id} updateState={this.updateState} ref={this.drap_drop}>
                                	<div className="media-par">
										<div className="media">
											<i className="fa fa-cloud-upload"></i>
											<div className="media-body">
												<h5>Drop files here</h5>
												<p>or <span>browse for files</span></p>
											</div>
										</div>
									</div>
									{this.drap_drop.current!==null?(
										<div className="row upload-progress">
											{this.drap_drop.current.state.file_uploads>0?(
												<div className="col-sm-3">
													<div className="upload-box">
														<p>{this.drap_drop.current.state.file_uploads} files</p>
														<p>uploaded</p>
														<div className="link clr-1">
															<i className="fa fa-check"></i>
														</div>
													</div>
												</div>
											):(
												<div className="col-sm-3 p-2"></div>
											)}
											{this.drap_drop.current.state.files.length>0?(
												<div className="col-sm-6 px-0 ml-auto">
													<div className="upload-box">
														<p className="text-uppercase">{this.drap_drop.current.state.files[0]['name']}</p>
														<div className="progress-bar">
															<div className="progress-line" style={{width:this.drap_drop.current.state.progress+"%"}}></div>
														</div>
														<a href="#" onClick={this.uploadRemoveHandler} className="link"><i className="fa fa-times"></i></a>
													</div>
												</div>
											):''}
											{this.drap_drop.current.state.files.length>1?(
												<div className="col-sm-3 ml-auto">
													<div className="upload-box">
														<p>{this.drap_drop.current.state.files.length-1} files</p>
														<p>queued</p>
														<a href="#" onClick={this.uploadRemoveHandler} className="link"><i className="fa fa-times"></i></a>
													</div>
												</div>
											):(
												<div className="col-sm-3 p-2"></div>
											)}
										</div>
									):''}
								</DragAndDrop>
							</div>
						</div>
						{(typeof this.state.form_data['field-type']['photos']['attr']['defaultValue']!=='undefined') || (this.drap_drop.current!==null && Object.keys(this.drap_drop.current.state.img_data).length)>0?(
							<div className="col-12">
								<div className="form-group">
									<label className="ng-binding ng-scope">Preview and reorder your photos</label>
									<div className="vendor-slider">
										<div className="prev-img">
											<img src={this.state.img_preview!==false?this.state.img_preview:(typeof this.state.form_data['field-type']['photos']['attr']['defaultValue']!=='undefined'?"uploads/"+this.state.form_data['field-type']['photos']['attr']['defaultValue'][0]:this.drap_drop.current.state.img_preview[this.drap_drop.current.state.img_data[Object.keys(this.drap_drop.current.state.img_data)[0]]].toString())} className="img-fluid"/>
										</div>
										<Slider className="theme-slider" {...slider_config}>
											{typeof this.state.form_data['field-type']['photos']['attr']['defaultValue']!=='undefined' && this.state.form_data['field-type']['photos']['attr']['defaultValue'].map((x,i)=>
												<div className="item" key={i}>
													<div className="img-outer">
														<a href="#" className="dots-btn" onClick={(e)=>this.clickPreview(e,"uploads/"+x)}>{i+1}</a>
														<input type="hidden" name="photos[]" value={x}/>
														<img src={"uploads/"+x} className="img-fluid"/>
													</div>
												</div>
											)}
											{this.drap_drop.current && Object.keys(this.drap_drop.current.state.img_data).map((x,i)=>
												<div className="item" key={i}>
													<div className="img-outer">
														<a href="#" className="dots-btn" onClick={(e)=>this.clickPreview(e,this.drap_drop.current.state.img_preview[this.drap_drop.current.state.img_data[x]].toString())}>{typeof this.state.form_data['field-type']['photos']['attr']['defaultValue']!=='undefined'?this.state.form_data['field-type']['photos']['attr']['defaultValue'].length+i+1:i+1}</a>
														<input type="hidden" name="photos[]" value={x}/>
														<img src={this.drap_drop.current.state.img_preview[this.drap_drop.current.state.img_data[x]].toString()} className="img-fluid"/>
													</div>
												</div>
											)}
										</Slider>
									</div>
								</div>
							</div>
						):''}
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
			<div className="img-portion clr-1">
				<img className="img-fluid" src="/assets/images/vendor-photos.gif"/>
			</div>
		</div>
	</div>
  </section>
        )
    }
}

export default Photos;