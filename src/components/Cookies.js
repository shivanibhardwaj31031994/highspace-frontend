import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';

export const cookies = new Cookies();

var usertoken=cookies.get('usertoken');
const func=[];

export function set_data(name,token){
    let data=get_token_details(token,true);
    let ret=false;
    if(data){
        let opt=data.exp?{path:'/',expires:new Date(data.exp*1000)}:{};
        cookies.set(name,token,opt);
        ret=true;
        if(name=='usertoken'){
            usertoken=token;
            callback_run();
        }
    }
    return ret;
}

function callback_run(){
    for(let k of func){
        k(isLoggedIn(true));
    }
}

export function callback_func(f){
    if(typeof f==='function'){
        func.push(f);
    }
}

export function remove_data(name){
    cookies.remove(name);
    cookies.remove(name,{path:'/'});
}

export function isLoggedIn(ret_data=false){
    let isLoggedIn=false;
    if(usertoken){
        isLoggedIn=get_token_details(usertoken,ret_data);        
    }
    if(isLoggedIn===false){
        cookies.remove('usertoken',{path:'/'});
    }
    return isLoggedIn;
}

function get_token_details(token,ret_data){
    let ret=false;
    try{
        var data=jwt_decode(token);
        data['profile-pic']=typeof data['profile-pic']!=='undefined'?data['profile-pic']:'assets/images/avatar.jpg';
        data['full-name']=data['first-name']+' '+data['last-name'];	
        data['others']=typeof data['others']!=='undefined'?data['others']:{};	
        if(typeof data.email!=='undefined'){
            ret=ret_data===false?true:data;;
        }
    }catch(err){
    }
    return ret;
}