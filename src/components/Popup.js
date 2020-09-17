import React, { Component } from 'react'
import "./../assets/css/popup.css"

class Popup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            popup:this.check_var(this.props.visible,false),
            header:this.check_var(this.props.header,false),
            body:this.check_var(this.props.body,false),
            btn_title:this.check_var(this.props['btn-title'],false),
            btn_link:this.check_var(this.props['btn-link'],false),
        }
    }
    
    visible=(props={})=>{
        this.setState({popup:true,...props});
    }
    check_var(v,val=''){
        return typeof v!=='undefined'?v:val;
    }
    
    btnHandler=(e)=>{
        e.preventDefault();
        if(this.state.btn_link){
            window.location.href=this.state.btn_link;
        }else{
            window.history.back();
        }
        return false;
    }

    cancelBtnHandler=(e)=>{
        e.preventDefault();
        this.setState({popup:false});
    }

    render() {
        if(this.state.popup===false){
            return('');
        }
        return (
            <div className="theme-popup">
                <div className="popup-modal">
                    {this.state.header?(
                        <div className="modal-header">
                            {this.state.header}
                        </div>
                    ):''}
                    {this.state.body?(
                        <div className="modal-body">
                            {this.state.body}
                        </div>
                    ):''}
                    <div className="row popup-footer">
                        <div className="col-6 pr-0">
                            {this.state.btn_title?(
                                <a href="#" onClick={this.btnHandler} className="btn style-1 btn-block">{this.state.btn_title}</a>
                            ):''}
                        </div>
                        <div className="col-6">
                            <a href="#" onClick={this.cancelBtnHandler} className="btn style-1 btn-block clr-2">Cancel</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Popup
