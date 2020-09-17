import React, { Component } from 'react'
import "./../../../assets/css/vendor.css"
import "./../../../assets/css/vendor-page.css"
const common_func = require('./../../../components/Common_func');

class Siderbar extends Component {
    constructor(props) {
        super(props)

        this.state={
            sidebar:{'location':"Location",'about':"About",'setup':"Setup",'photos':"Photos",'availability':"Availability",'cancellations':"Cancellations",'activity-amenities':"Pricing & Amenities",'profile':"Finishing Up",'complete-listing':"Complete Listing"},
            page_index:0
        };
        var page=props.page.match('/')?(props.page.split('/')[1]=='id'?props.page.split('/')[2].toLowerCase():props.page.split('/')[1].toLowerCase()):props.page.toLowerCase();
        this.state.page=page;
        if(page=='payment-details'){
            this.state.page_active=8;
        }else{
            this.state.page_active=(Object.keys(this.state.sidebar).indexOf(page))+1;
        }
    }

    componentDidMount(){
        this.form_btn();
    }

    btn_handler = (e,type,id=false) => {
        if(e!==null){
            e.preventDefault();
        }
        var link=false;
        if(type=='prev'){
            link=Object.keys(this.state.sidebar)[this.state.page_active-2];
            if(this.state.page=='complete-listing'){
                link='payment-details';
            }else if(this.state.page=='payment-details'){
                link='profile';
            }
        }else if(type=='next'){
            link=Object.keys(this.state.sidebar)[this.state.page_active];
            if(this.state.page=='profile'){
                link='payment-details';
            }
        }
        if(link!==false){
            id=typeof this.props.id==='undefined'?id:this.props.id;
            link=id===false?'vendor/'+link:'vendor/'+link+'/'+id;
            window.location.href=link;
        }
    }
    form_btn=(loader=false)=>{
        let data=loader?(
            <div className="text-center my-3">
                <i className="fa fa-spinner fa-pulse fa-3x"></i>
            </div>
        ):(
            <div>
                {this.state.page!=='location'?(
                    <a href="#" onClick={(e)=>this.btn_handler(e,'prev')} className="theme-link">Back</a>
                ):''}
                <button type="submit" className="btn form-btn">Save & Continue</button>
            </div>
        );
        this.props.onLoad(data);
    }

    form_handler = (e) =>{
        e.preventDefault();
        var formdata=new FormData(e.target);
        var id=typeof this.props.id==='undefined'?'':'/'+this.props.id;
        this.form_btn(true);
        common_func.ajax.post(`/form/post/`+this.state.page+id,formdata,{headers:{Authorization:`Bearer ${common_func.cookie.get('usertoken')}`}})
        .then(res => {
            this.responseHanlder(res,e);
        }).catch(common_func.axios_err_handler).finally(()=>{
            this.form_btn();
        });
    }
    
    responseHanlder=(res,e)=>{
        if(typeof res.data.token!=='undefined'){
            common_func.cookies.set_data('usertoken',res.data.token);
        }
        if(typeof res.data.status!=='undefined'){ 
            this.btn_handler(null,'next',res.data.id);
        }else if(typeof res.data.errorMsg!=='undefined'){
            this.setState({
                errorMsg:res.data.errorMsg
            });
        }        
    }
    
    render() {
        if(this.state.page_index>0 && this.state.page_index<7 && this.state.page_active>(this.state.page_index+1)){
            window.location.href='vendor/'+Object.keys(this.state.sidebar)[this.state.page_index]+'/'+this.props.id;
            return false;
        }
        const Get_li = (params) => {
            var sidebar = params.sidebar;
            var id=params['key-id'];
            var key=Object.keys(sidebar)[id-1];
            var attr={};
            var edit='';
            if((id-1)<=this.state.page_index){
                var path_id=typeof params.path_id==='undefined'?'':'/'+params.path_id;
                attr=((id-1)==this.state.page_index)?(this.state.page_active==id?{className:"active"}:''):{className:'active complete'};
                if(this.state.page_active!=id){
                    edit=<a href={"vendor/"+key+path_id} className="edit-btn">Edit</a>;
                }
            }
            return(
               <li {...attr}><span>{this.state.sidebar[key]}</span>{edit}</li>
            );
        }

        return (
        <div>
            <div className="ltr-title">List your space</div>
            <div className="ltr-bottom">
                <ul className="main-ul">
                    <li className={this.state.page_index<5?'active':'active complete'}>
                        <span>Basic Details</span>
                        <ul className="sub-ul">
                            {[1,2,3,4].map((key,i)=>
                                <Get_li path_id={this.props.id} sidebar={this.state.sidebar} key-id={key} key={i}></Get_li>
                            )}
                        </ul>
                    </li>
                    {[5,6,7,8,9].map((key,i)=>
                        <Get_li path_id={this.props.id} sidebar={this.state.sidebar} key-id={key} key={i}></Get_li>
                    )}
                </ul>
            </div>
        </div>
        )
    }
}

export default Siderbar
