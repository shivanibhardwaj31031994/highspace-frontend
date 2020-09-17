import React, { Component } from 'react'
import $ from 'jquery'
import axios from 'axios'
import {cookies} from './Cookies'

class DragAndDrop extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          progress:0,
          files:[],
          img_preview:{},
          file_uploads:0,
          img_data:{},
        }
    }
    
    componentDidMount(){
      $('body').on('dragenter dragover dragleave',function(e){
        var tar=$('.drag-drop');
		  	if(e.type==='dragleave'){
          tar.removeClass('hover');
		  	}else{
          tar.addClass('hover');
		  	}
      });
      this.updateState();
    }
    handleDragEnter = e => {
	  	e.preventDefault();
	  	e.stopPropagation();
	  };
	  handleDragLeave = e => {
	  	e.preventDefault();
	  	e.stopPropagation();
	  };
	  handleDragOver = e => {
	  	e.preventDefault();
	  	e.stopPropagation();
	  };
	  handleDrop = e => {
	  	e.preventDefault();
	  	e.stopPropagation();
      $(e.target).removeClass('hover');
      var tar=$('#dragAndDrop')
      tar.find('input')[0].files = e.dataTransfer.files;
      var event = new Event("change", { bubbles: true });
      tar.find('input')[0].dispatchEvent(event);
	  };

    updateState=()=>{
      this.props.updateState();
    }
    fileHandler=(e)=>{
      if(e.target.files && e.target.files.length > 0){
        for(let i=0;i<e.target.files.length;i++){
          let key=Date.now()+''+i;
          let tar_file=e.target.files[i];
          const reader=new FileReader();
          reader.addEventListener('load',()=>
            this.setState(prevState=>({img_preview:{...prevState.img_preview,[key]:reader.result}}),function(){
              this.submitHandler(tar_file,key);
              this.updateState();
            })
          );
          reader.readAsDataURL(e.target.files[i]);
        }
      }
    }
    
    submitHandler=(e,key)=>{
      let page=this.props.page;
      let id=this.props.id;
      let formData=new FormData();
      formData.append('file',e);
      if(typeof this.props.uploadSingle!=="undefined"){
        this.setState({files:[{name:e.name,formdata:formData,preview:key}]},function(){
          this.updateState();
          this.uploadHandler(this.state.files[0]);
        });
      }else{
        this.setState(prevState=>({files:[...prevState.files,{name:e.name,formdata:formData,preview:key}]}),function(){
          this.updateState();
          if(this.state.files.length==1){
            this.uploadHandler(this.state.files[0]);
          }
        });
      }
    };

    uploadCheck=(res,err,preview)=>{
      if(err===false && typeof res.data.files!=='undefined'){
        if(typeof this.props.uploadSingle!=="undefined"){
          this.setState(prevState=>({img_data:{[res.data.files[0]]:preview}}));
        }else{
          this.setState(prevState=>({img_data:{...prevState.img_data,[res.data.files[0]]:preview}}));
        }
      }
      if(err===false && typeof res.data.status==='undefined'){
        err=true;
      }
      this.state.files.shift();
			this.setState(prevState=>({progress:0,files:prevState.files,file_uploads:prevState.file_uploads+(err===false?1:0)}),function(){
        this.updateState();
        if(this.state.files.length>0){
					this.uploadHandler(this.state.files[0]);
				}
      });      
    }

    uploadHandler=(files)=>{
        let page=this.props.page;
        let formData=files.formdata;
        page=page.match('/')?(page.split('/')[1]=='id'?page.split('/')[2].toLowerCase():page.split('/')[1].toLowerCase()):page.toLowerCase();
        axios.post(`/form/post/upload/${page}`,formData,{
          headers:{
            'Content-Type':'multipart/form-data',
            'Authorization':`Bearer ${cookies.get('usertoken')}`
          },
          onUploadProgress: progressEvent => {
            var par=parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
            this.setState({progress:par},function(){
              this.updateState();
            });
            // Clear percentage
            // setTimeout(() => setUploadPercentage(0), 10000);
          }
        }).then(res => {
          this.uploadCheck(res,false,files.preview);
        }).catch(err=>{
          this.uploadCheck(err,true,files.preview);
        });
    }

	  clickHanlder=(e)=>{
		  $('#dragAndDrop').find('input').click();
    }
    
    render() {
        return (
            <div onClick={this.clickHanlder} onDrop={this.handleDrop} onDragOver={this.handleDragOver} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave} className={this.props.className}>
            {this.props.children}
            </div>
        )
    }
}

export default DragAndDrop
