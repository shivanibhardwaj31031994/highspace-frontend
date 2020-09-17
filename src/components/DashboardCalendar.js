import React, { Component } from 'react'
import Calendar from 'react-calendar';
import InputMask from 'react-input-mask';
import 'react-calendar/dist/Calendar.css';
const common_func = require('./Common_func');

class DashboardCalendar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            block_mode:false,
            date_blocked:false,
            date_sel:false,
            date_sel_val:false,
            location_id:false,
            entire_day:false,
            ajax_loader:false,
            block_dates:{},
            block_data:[],
        }
    }
    
    getBlockSlot=(id,year=false)=>{
        this.setState({location_id:false});
        year=year==false?new Date().getFullYear():year;
        common_func.ajax.get(`/vendor/get/blockslot/${id}/${year}`,{headers:{Authorization:`Bearer ${common_func.cookie.get('usertoken')}`}}).then(res=>{
            if(typeof res.data.status!=='undefined'){
                let block_dates={};
                for(let k in res.data.data){
                    let date=new Date(res.data.data[k]['date']);
                    block_dates[date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()]=k;
                }
                this.setState({block_data:res.data.data,location_id:id,block_dates:block_dates});
            }
        }).catch(common_func.axios_err_handler).finally(()=>{
        });
    }
    
    clickHandler=(date,argv=true)=>{
        if(this.state.block_mode){
            const date_sel=(argv?date.getDate():false);
            if(date_sel){
                const date_sel_val=date_sel?date.toString():false;
                const key=date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
                this.setState({date_sel:date_sel,date_sel_val:date_sel_val,date_blocked:(typeof this.state.block_dates[key]!=='undefined'?this.state.block_dates[key]:false)});
            }else{
                this.setState({date_sel:date_sel});
            }
        }
    }

    dateHandler=(e)=>{
        let date=new Date(this.state.date_sel_val);
        date.setDate(e.target.value);
        this.setState({date_sel:e.target.value,date_sel_val:date.toString()});
    }

    calenderTileHandler=({date,view})=>{
        if(view==='month'){
            let key=date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
            if(typeof this.state.block_dates[key]!=='undefined'){
                return this.state.block_data[this.state.block_dates[key]]['time'].length<4?'block-fullday':'block-day';
            }
        }
    }

    entireDayhandler=(e)=>{
        const entire_day=this.state.entire_day;
        this.setState({entire_day:entire_day?false:true});
    }

    blockingMode=(e)=>{
        e.preventDefault();
        const mode=this.state.block_mode===true?false:true;
        this.setState({block_mode:mode});
    }

    formHandler=(e)=>{
        e.preventDefault();
        this.setState({ajax_loader:true});
        const formdata=new FormData(e.target);
        common_func.ajax.post('/vendor/post/blockslot/'+this.state.location_id,formdata,{headers:{Authorization:`Bearer ${common_func.cookie.get('usertoken')}`}}).then(res=>{
            if(typeof res.data.status!=='undefined'){
                if(this.state.date_blocked!==false){
                    const date_blocked=this.state.date_blocked;
                    const date=new Date(this.state.block_data[date_blocked]['date']);
                    const key=date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
                    const id=this.state.location_id;
                    delete this.state.block_dates[key];
                    delete this.state.block_data[date_blocked];
                    this.setState({date_blocked:false,location_id:false},function(){
                        this.setState({location_id:id});
                    });
                }else{
                    const date=new Date(res.data.data['date']);
                    const key=date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
                    const id=this.state.location_id;
                    this.setState(prevState=>({block_data:[...prevState.block_data,res.data.data],block_dates:{...prevState.block_dates,[key]:prevState.block_data.length},location_id:false}),function(){
                        this.setState({location_id:id});
                    });
                }
                this.clickHandler(new Date(),false);
            }
        }).catch(common_func.axios_err_handler).finally(()=>{
            this.setState({ajax_loader:false});
        });
    }

    render() {
        if(this.state.location_id===false){
            return '';
        }
        return (
            <div className={"vendor-box style-1 "+(this.state.block_mode?'block-mode':'')}>
                <Calendar
                    tileClassName={this.calenderTileHandler}
                    onClickDay={this.clickHandler}
                />
                
                <div className="sec-title mt-4">Block Slots</div>
                <button className="btn style-1 btn-block" onClick={this.blockingMode}>{this.state.block_mode?'Exit':'Enter'} Blocking Mode</button>
                
                {this.state.block_mode && this.state.date_sel!==false?(
                    <form method="post" encType="multipart/form-data" onSubmit={this.formHandler} data-parent>
                        <input type="hidden" name="date" onChange={(e)=>{}} value={this.state.date_sel_val}/>
                        {this.state.date_blocked===false?(
                            <div className="sec-title mt-4">Select Date and Time</div>
                        ):(
                            <input type="hidden" name="date-unblock" onChange={(e)=>{}} value={this.state.block_data[this.state.date_blocked]['_id']}/>
                        )}
                        {this.state.date_blocked===false?(
                            <div className="row mb-4">
                                <div className="col-3">
                                    <input type="text" className="form-control" name="date1" pattern="[0-9]{1,}" max="31" min="1" placeholder="DD" required="" value={this.state.date_sel} onChange={this.dateHandler}/>
                                </div>
                                <div className="col-9">
                                    {this.state.entire_day?'':(
                                        <div className="row">
                                            <div className="col-6 pl-0">
                                                <div className="input-group time-input">
                                                    <InputMask mask="99:99" name="time[0]" type="text" className="form-control" placeholder="00:00" data-mask="true" minLength="5" required=""/>
                                                    <div className="input-group-append">
                                                        <select name="time[1]">
                                                            <option value="am">AM</option>
                                                            <option value="pm">PM</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-6 pl-0">
                                                <div className="input-group time-input">
                                                    <InputMask mask="99:99" name="time[2]" type="text" className="form-control" placeholder="00:00" data-mask="true" minLength="5" required=""/>
                                                    <div className="input-group-append">
                                                        <select name="time[3]">
                                                            <option value="am">AM</option>
                                                            <option value="pm">PM</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <div className="custom-control custom-checkbox custom-control-inline">
                                        <input type="checkbox" className="form-control custom-control-input" name="entire-day" {...this.state.entire_day?{defaultChecked:true}:{}}/>
                                        <label className="custom-control-label" onClick={this.entireDayhandler}>Entire Day.</label>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className="p-2"></div>
                        )}
                        {this.state.ajax_loader?(
                            <div className="text-center my-3">
                                <i className="fa-loader fa fa-spinner fa-pulse fa-3x"></i>
                            </div>
                        ):(
                            <div className="row">
                                <div className="col-5">
                                    <button type="button" onClick={(e)=>this.clickHandler(e,false)} className="btn style-1 btn-block btn-1">Cancel</button>
                                </div>
                                <div className="col-7 pl-0">
                                    <button className="btn style-1 btn-block btn-2">{this.state.date_blocked!==false?'Unblock Slot':'Block Slot'}</button>
                                </div>
                            </div>
                        )}
                    </form>
                ):this.state.block_mode===false && (
                    <div data-parent>
                        <div className="sec-title">Upcoming Bookings</div>
                        {[...Array(2)].map((key,val)=>
                            <div className="booking-box" key={val}>
                                <div className="row">
                                    <div className="col-sm-5 align-self-center">
                                        <div className="txt-1 mb-1">Guest Singh</div>
                                        <div className="txt-2">June 3, 2020</div>
                                    </div>
                                    <div className="col-sm-7 pl-0 d-flex align-items-center">
                                        <div className="txt-1 mr-3 ml-auto">12:00 - 20:00</div>
                                        <a href="#" className="link"><i className="icon fa fa-chevron-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

export default DashboardCalendar
