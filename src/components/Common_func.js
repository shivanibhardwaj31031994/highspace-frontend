import React from 'react'
import axios from 'axios';
import $ from 'jquery'
import InputMask from 'react-input-mask';

export const GoogleMapsAPI="AIzaSyC55f0HfYojz4UNEYC-ZA1lZzdyxg_Y480";

export const cookies = require('./Cookies');

export const cookie=cookies.cookies;

export const jquery=$;

export const ajax=axios;

export const captcha_site_key='6LeQrqsZAAAAAL7w__fRD3iIEE4zok9NriH0jkw7';

export function check_token(thus){
    if(typeof window.recaptcha==='undefined'){
        thus.responseHanlder({data:{errorMsg:'Google Captcha not loaded.'}},'');
        return false;
    }
    thus.setState({axios_loader:true});
    return window.grecaptcha.execute(this.captcha_site_key).then((token)=>{
        return token;
    }).catch(err=>{
        thus.responseHanlder({data:{errorMsg:'Google Captcha not verified.'}},'');
        thus.setState({axios_loader:false});
        return err;
    });
}

export function load_map(){
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`
    document.body.appendChild(script);
}

export function form_group(params){
    const type=params.form_data['field-type'][params.key_val] && typeof params.form_data['field-type'][params.key_val]['attr']['type']!=='undefined'?params.form_data['field-type'][params.key_val]['attr']['type']:'';
    const ret=['checkbox','radio'].indexOf(type)>-1?(
        <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input"/>
            <label className="custom-control-label">{params.form_data['fields'][params.key_val]}</label>
        </div>
    ):(
        <div className="form-group">
            <label>{params.form_data['fields'][params.key_val]} {typeof params.form_data['field-type'][params.key_val]['attr']['required']!=='undefined'?(<span className="form-req">*</span>):''}</label>
            <input {...params.form_data['field-type'][params.key_val]['attr']}/>
            <label className="error d-none" data-errors={params.form_data['field-type'][params.key_val]['errors']}></label>
        </div>
    );
    return(
        <div className={params.form_data['field-type'][params.key_val]['class']}>
            {ret}
        </div>
    );
};

export function input_field(name,form_data,label=null,err=null,props={},append={}){
    var name_exp=name.split('[');
    name=name_exp[0];
    if(form_data['field-type'] && typeof form_data['field-type'][name]!=='undefined'){
        var label_txt=label!==null?<label>{form_data['fields'][name]} {typeof form_data['field-type'][name]['attr']['required']!=='undefined' || typeof form_data['field-type'][name]['attr']['data-required']!=='undefined'?(<span className="form-req">*</span>):''}</label>:'';
        var err_label=err!==false?<label className="error d-none" data-errors={form_data['field-type'][name]['errors']}></label>:'';
        if(err===true){
            return err_label;
        }else if(label===false){
            return label_txt;
        }else{
            var def_val={};
            if(typeof form_data['field-type'][name]['attr']['defaultValue']==='object' && typeof name_exp[1]!=='undefined'){
                def_val={defaultValue:form_data['field-type'][name]['attr']['defaultValue'][name_exp[1].replace(']','')]};
            }
            var ret='';
            if(form_data['field-type'][name]['attr']['type']=='checkbox'){
                if(!form_data['field-type'][name]['attr']['name'].match(/\[\]$/)){
                    form_data['field-type'][name]['attr']['name']+='[]';
                }
                if(!form_data['field-type'][name]['attr']['className'].match('custom-control-input')){
                    form_data['field-type'][name]['attr']['className']+=' custom-control-input';
                }
                var end_no=typeof name_exp[1]==='undefined'?'':name_exp[1].replace(']','');
                var end=end_no.length>0?end_no:form_data['field-type'][name]['options'].length;
                var start=end_no.length>0?(end_no-1):0;
                ret=[];
                var val=[];
                if(typeof form_data['field-type'][name]['attr']['defaultValue']!=='undefined'){
                    val=form_data['field-type'][name]['attr']['defaultValue'];
                }
                for(var i=start;i<end;i++){
                    var def_attr={};
                    if(val.indexOf(`${(i+1)}`)>-1){
                        def_attr['defaultChecked']=true;
                    }
                    form_data['field-type'][name]['attr']['value']=(i+1);
                    var attr=JSON.stringify(form_data['field-type'][name]['attr']);
                    attr=JSON.parse(attr);
                    delete attr['defaultValue'];
                    ret.push(
                        <div key={i} className="custom-control custom-checkbox">
				    		<input {...props} {...attr} {...def_attr} {...append}/>
				    		<label className="custom-control-label">{form_data['field-type'][name]['options'][i]}</label>
				    	</div>
                    );
                }
            }else if(form_data['field-type'][name]['type']=='select'){
                ret=(
                    <select {...props} {...form_data['field-type'][name]['attr']} {...def_val} {...append}>
                        {form_data['field-type'][name]['options'].map((key,i)=>
                            <option key={i} value={i+1}>{key}</option>
                        )}
                    </select>
                );
            }else if(form_data['field-type'][name]['type']=='textarea'){
                ret=<textarea {...props} {...form_data['field-type'][name]['attr']} {...def_val} {...append}></textarea>;
            }else{
                if(typeof form_data['field-type'][name]['attr']['mask']!=='undefined'){
                    ret=<InputMask {...props} {...form_data['field-type'][name]['attr']} {...def_val} {...append}/>;
                }else{
                    ret=<input {...props} {...form_data['field-type'][name]['attr']} {...def_val} {...append}/>;
                }
            }
            if(label===null && err===false){
                if(Array.isArray(ret)){
                    return (
                        <div>
                            {Object.keys(ret).map((i,key) => 
                                <div key={i}>
                                    {ret[key]}
                                </div>
                            )}
                        </div>
                    );
                }else{
                    return ret;
                }
            }else{
                return (
                    <div>
                        {label_txt}
                        {ret}
                        {err_label}
                    </div>
                );
            }
        }
    }else if(typeof form_data['field-type']!=='undefined'){
        if(err===true){
            return <label className="error d-none"></label>;
        }else if(label===false){
            return <label>{name}</label>;
        }else{
            return <input {...props} name={name} className="form-control" {...append}/>;
        }
    }
}

export function updateInputValue(e){
    const { target: {value} } = e;
    this.setState({ recipeName: value });
}
 

export function form_get(props,ret=false){
    var id='';
    var slug=props.page.match('/')?(props.page.split('/')[1]=='id'?props.page.split('/')[2].toLowerCase():props.page.split('/')[1].toLowerCase()):props.page.toLowerCase();
    if(typeof props.id!=='undefined'){
        id='/'+props.id;
    }
    return axios.get(`/form/get/`+slug+id,{headers:{Authorization:`Bearer ${cookie.get('usertoken')}`}})
      .then(res => {
        if(ret===true){
            return res;
        }
        var form_data={"fields":{}};
        if(typeof res.data==='object' && typeof res.data['fields']!=='undefined'){
            form_data = res.data;
            Object.keys(form_data['fields']).map((key,i) => form_data['field-type'][key]=get_data(form_data,key));
        }
        return form_data;
    }).catch(axios_err_handler);
}

export function axios_err_handler(err){
    if(err.response){
        if(err.response.status===403){
            cookies.remove_data('usertoken');
            window.location.reload();
        }else if(err.response.status===401){
            if(typeof err.response.data['redirect-url']!=='undefined'){
                window.location.href=err.response.data['redirect-url'];
            }
        }
    }
    return {"fields":{}};
}

export function get_data(obj,key){
    var data=obj;
    var data_ret={
        'type':'input',
        'attr':{
            'className':'form-control',
            'name':key
        },
        'class':'col-12',
        'errors':''
    };
    if(data['field-type'] && data['field-type'][key]){
        if(data['field-type'][key]['options']){
            data_ret['options']=data['field-type'][key]['options'];
        }
        if(data['field-type'][key]['errors']){
            data_ret['errors']=data['field-type'][key]['errors'];
        }
        if(data['field-type'][key]['class']){
            data_ret['class']=data['field-type'][key]['class'];
        }
        if(data['field-type'][key]['type']){
            data_ret['type']=data['field-type'][key]['type'];
        }
        if(data['field-type'][key]['attr']){
            data_ret['attr']=data['field-type'][key]['attr'];
            if(data['field-type'][key]['attr']['class']){
                data_ret['attr']['className']=data['field-type'][key]['attr']['class'];
                delete data['field-type'][key]['attr']['class'];
            }
            data_ret['attr']['className']=data_ret['attr']['className']?data_ret['attr']['className']+' form-control':'form-control';
            data_ret['attr']['name']=key;
        }
    }
    return data_ret;
}