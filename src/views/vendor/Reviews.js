import React, { Component } from 'react'
import SidebarDashboard from './SidebarDashboard'
import { Scrollbars } from 'react-custom-scrollbars';
import DashboardCalendar from '../../components/DashboardCalendar';

class Reviews extends Component {
    constructor(props) {
        super(props)
    
        const space_list=['location','about','setup','photos','availability','cancellations','activity-amenities','profile','payment-details'];
        this.state = {
            space_data:false,
            space_active:0,
            space_list:space_list
        }
        this.siderbar = React.createRef();
        this.dasboardCalendar = React.createRef();
    }

    componentDidMount(){
        this.siderbar.current.getSpaces().then(res=>{
            this.setState({space_data:res},function(){
                this.dasboardCalendar.current.getBlockSlot(this.state.space_data[this.state.space_active]['id']);
            });
        });
    }

    spaceHandler=(e,key)=>{
        e.preventDefault();
        this.setState({space_active:key},function(){
            this.dasboardCalendar.current.getBlockSlot(this.state.space_data[this.state.space_active]['id']);
        });
    }
    
    render() {
        return (
        <section className="col-12 vendor-section">
	        <div className="row">
		        <div className="col-md-3 pr-5 d-flex">
                    <SidebarDashboard {...this.props} ref={this.siderbar}></SidebarDashboard>
                </div>
		        <div className="col-md-9 vendor-form">
                    <div className="form-title sp-2">Your Reviews</div>
		            <div className="row">
		                <div className="col-md-7 vendor-form">
                            <div className="row">
                                <div className="col-sm-6">
                                    {this.state.space_data?(
                                        <div className="row vendor-box ml-0 mb-0">
                                            {this.state.space_data[this.state.space_active]['photos'].length>0?(
                                                <div className="col-sm-5 p-0 img-box">
                                                    <img src={"uploads/"+this.state.space_data[this.state.space_active]['photos']}/>
                                                </div>
                                            ):''}
                                            <div className={this.state.space_data[this.state.space_active]['photos'].length?"col-sm-7 p-0":"col-12"}>
                                                <div className={(this.state.space_data[this.state.space_active]['photos'].length?'':'p-0')+"card"}>
                                                    <div className="card-body">
                                                        <div className="card-title w-100">
                                                            {this.state.space_data[this.state.space_active]['space-name']}
                                                            <div className="rating"><i className="icon fa fa-star"></i> <strong>4.5</strong> (128)</div>
                                                        </div>
                                                        <div className="card-bottom mt-4 d-flex flex-fill">
                                                            <div className="align-self-end flex-fill">
                                                                <div className="small-text">30 Day Revenue</div>
                                                                <div className="price">
                                                                    <strong>₹ 3,40,500</strong>
                                                                    <sup><i className="fa fa-arrow-up"></i> 14%</sup>
                                                                </div>
                                                                <a href={"vendor/"+(this.state.space_data[this.state.space_active]['space-position']>8?'location':this.state.space_list[this.state.space_data[this.state.space_active]['space-position']])+"/"+(this.state.space_data[this.state.space_active]['id'])} onClick={(e)=>{this.siderbar.current.editListingHandler(e)}} className="btn style-1 mt-2 btn-block">Edit Listing</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ):''}
                                </div>
                                <div className="col-sm-6 rdo-parent">
                                    {this.state.space_data?(
                                        <div className="vendor-box h-100">
                                            <div className="space-listing">
                                                <Scrollbars
                                                    renderThumbVertical={({ style, ...props }) =>
                                                        <div {...props} style={{ ...style, backgroundColor:'#30485e','borderRadius':'inherit' }}/>
                                                }>
                                                    {Object.keys(this.state.space_data).map((val,key)=>
                                                        <div className="custom-control custom-radio" key={key}>
                                                            <input type="radio" name="space-name" className="custom-control-input" {...val==0?{defaultChecked:true}:{}}/>
                                                            <label className="custom-control-label" onClick={(e)=>this.spaceHandler(e,val)}>{this.state.space_data[val]['space-name']}</label>
                                                        </div>
                                                    )}
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    ):''}
                                </div>
                            </div>
                            <div className="sec-title">Latest Guest Reviews</div>
                
                        {[...Array(2)].map((key,val)=>
                            <div className="vendor-box style-1" key={val}>
                                <div className="row">
                                    <div className="col-sm-5 pr-0">
                                        <div className="media media-box">
                                            <img src="assets/images/profile.png" className="align-self-start"/>
                                            <div className="media-body">
                                                <div className="media-top">
                                                    <div className="txt-1">Guest Singh</div>
                                                    <div className="txt-1 mt-3">June 23, 2020</div>
                                                    <div className="txt-2">12:00 - 20:00</div>
                                                </div>
                                                <div className="d-flex">
                                                    <div className="align-self-end">
                                                        <div className="txt-1">Rating</div>
                                                        <div className="media-rating">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4 d-flex pr-0">
                                        <div className="w-100 detail-box">
                                            <div className="d-title">Lorem ipsum dolor</div>
                                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum perspiciatis error dolorem blanditiis veritatis eos necessitatibus aliquam</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 d-flex flex-wrap">
                                        <div className="w-100 d-flex">
                                            <button className="btn style-1 btn-block align-self-end">Reply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>
                        <div className="col-md-4 px-0">
                            <DashboardCalendar ref={this.dasboardCalendar}></DashboardCalendar>
                        </div>
                    </div>
                </div>
        	</div>
        </section>
        )
    }
}

export default Reviews
