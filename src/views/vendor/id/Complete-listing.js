import React, { Component } from 'react'
import Siderbar from './Siderbar'
import Slider from 'react-slick';
const common_func = require('./../../../components/Common_func');

class CompleteListing extends Component {
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
        common_func.form_get(this.props,true).then(function(res){
            var data=res.data?res.data.form_data:res;
            thus.siderbar.current.setState({page_index:data['space-position']});
            thus.setState({ form_data:data});
        });
    }
    formBtnLoad=(data)=>{
        this.setState({form_btn:data});
    }

    render() {
        const slider_config = {
            dots:true,
		    infinite:false,
		    speed:300,
		    slidesToShow:1,
		    slidesToScroll:1
        };

        return (
            <section className="col-12 vendor-section">
            <div className="row">
            <div className="col-md-2 ltr-portion">
                <Siderbar {...this.props} onLoad={this.formBtnLoad} ref={this.siderbar}></Siderbar>
       	 	</div>
        <div className="col-md-6">
        {typeof this.state.form_data['photos']!=='undefined'?(
        <div className="col-md-10 mx-auto vendor-form">
            <div className="form-title sp-2">Everything's ready!</div>
            <form method="post" encType="multipart/form-data">
                <div className="row">
                    <div className="col-12">
                        <label>Customize/ Update your listing</label>
                        <div className="listing-slider">
                            <Slider className="theme-slider" {...slider_config}>
                                {Object.keys(this.state.form_data['photos']).map((x,i)=>
                                    <div className="item" key={i}>
                                        <img src={"uploads/"+this.state.form_data['photos'][i]} className="img-fluid"/>
                                    </div>
                                )}
                            </Slider>
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">{this.state.form_data['space-name']} - {this.state.form_data['space-type']}</div>
                                    <div className="card-subtitle">{this.state.form_data['street-name']} <span className="dot-icon"></span> {this.state.form_data['state']} <span className="dot-icon"></span> <i className="fa fa-group"></i> {this.state.form_data['guests-allowed']}</div>
                                    <div className="card-bottom mt-3">
                                        <div className="rating"><i className="fa fa-star"></i> <strong>4.5</strong> (128)</div>
                                        <div className="price"><strong>₹ {this.state.form_data['price']}</strong>/hr</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 form-btm">
                        <a href="#" onClick={(e)=>this.siderbar.current.btn_handler(e,'prev')} className="theme-link">Back</a>
						<a href={"vendor/location/"+this.props.id} className="btn form-btn style-1 mr-3 bg-none">Edit Listing</a>
						<a href="vendor/dashboard" className="btn form-btn style-1">Publish</a>
                        {/* <button type="submit" className="btn form-btn style-1">Publish</button> */}
                    </div>
                </div>
            </form>
        </div>
    ):''}
    </div>
    <div className="col-md-4">
        <div className="img-portion">
            <img className="img-fluid" src="assets/images/vendor-complete.gif"/>
        </div>
    </div>
</div>
</section>
        )
    }
}

export default CompleteListing
