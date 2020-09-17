import React, { Component } from 'react'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import TwitterLogin from "react-twitter-login";
import { loadReCaptcha } from 'react-recaptcha-v3';
const common_func = require('./Common_func');
const Form_group=common_func.form_group;
common_func.load_map();

class Form extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            form_data:{
                'fields':{}
            },
            errorMsg:false,
            axios_loader:false
        }
    }
    
    
    componentDidMount(){
        common_func.ajax.get(`/form/get/`+this.props.page)
          .then(res => {
            const form_data = res.data;
            Object.keys(form_data['fields']).map((key,i) => form_data['field-type'][key]=common_func.get_data(form_data,key));
            this.setState({ form_data:form_data });
        },common_func.axios_err_handler);
        
        loadReCaptcha(common_func.captcha_site_key);
    }

    handle_submit=(e)=>{
        e.preventDefault();
        var data=new FormData(e.target);
        
        const captcha=common_func.check_token(this);
        if(typeof captcha!=='object'){
            this.setState({axios_loader:false});
            this.responseHanlder({data:{errorMsg:"Google Captcha library not loaded."}},'');
        }else{
            captcha.then((token)=>{
                if(!token){ return false; }
                var page=this.props.page;
                var url=`/form/post/${page}`;
                if(page=='login'){
                    url=`/users/login`;
                }else if(page=='signup'){
                    url=`/users/signup`;
                }
                data.append('recaptha_token',token);
                common_func.ajax.post(url,data)
                .then(res => {
                    this.responseHanlder(res,page);
                },(err)=>{
                    this.setState({axios_loader:false});
                    common_func.axios_err_handler(err);
                });
            });
        }
    }

    responseHanlder=(res,page)=>{
        this.setState({axios_loader:false});
        if(typeof res.data.token!=='undefined' && (page=='login' || page=='social-login')){
            if(common_func.cookies.set_data('usertoken',res.data.token)){
                const params = new URLSearchParams(window.location.search);
                window.location.href=params.has('redirect')?params.get('redirect'):'/vendor/profile';
            }
        }else if(typeof res.data.status!=='undefined'){
            if(page=='signup'){
                window.location.href='/login';
            }
        }else if(typeof res.data.errorMsg!=='undefined'){
            this.setState({
                errorMsg:res.data.errorMsg
            });
            var thus=this;
            setTimeout(function(){
                thus.setState({errorMsg:false});
            },3000);
        }else if(typeof res.data.error!=='undefined'){
            if(typeof res.data.error==='object'){
            }
        }
    }

    signup(res,type){
        var postData=false;
        if (type === 'facebook' && res.email) {
            postData = {
                name: res.name,
                provider: type,
                email: res.email,
                provider_id: res.id,
                token: res.accessToken,
                'profile-pic': res.picture.data.url
            };
        }else if (type === 'google' && typeof res.profileObj!=='undefined' && res.profileObj.email) {
            postData = {
                name: res.profileObj.name,
                provider: type,
                email: res.profileObj.email,
                provider_id: res.googleId,
                token: res.accessToken,
                'profile-pic': res.profileObj.imageUrl
            };
        }
        if(postData){
            const captcha=common_func.check_token(this);
            if(typeof captcha!=='object'){
                this.setState({axios_loader:false});
                this.responseHanlder({data:{errorMsg:"Google Captcha library not loaded."}},'');
            }else{
                captcha.check_token(this).then((token)=>{
                    if(!token){ return false; }
                    postData.recaptha_token=token;
                    common_func.ajax.post(`/users/signup`,postData)
                    .then((res) => {
                        this.responseHanlder(res,'social-login');
                    },(err)=>{
                        this.setState({axios_loader:false});
                        common_func.axios_err_handler(err);
                    });
                });
            }
        }
    }
        
    render() {
        const responseGoogle = (response) => {
            this.signup(response,'google');
        }
        const responseFacebook = (response) => {
            this.signup(response,'facebook');
        }
        const responseTwitter = (response) => {
            this.signup(response,'twitter');
        }
        return (
            <div data-parent>
                <div className="form-title sp-2">{this.state.form_data['form-title']}</div>
	            <div className="social-logins">
	            	<ul>
	            		<li>
                            {/* vblbvz_Tkvgall9oHB17KoF9 */}
                            <GoogleLogin
                                clientId="257192819048-io9eifecam07jrn3r87ao9fsjk229ka7.apps.googleusercontent.com"
                                render={renderProps => (
                                    <a href="#" onClick={renderProps.onClick} disabled={renderProps.disabled} className="social-btn-1"><i className="fa fa-google" aria-hidden="true"></i> {this.state.form_data['form-title']} with Google</a>
                                )}
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </li>
	            		<li>
                            {/* d477749e0f29a25250b6a974d8fd1a10 */}
                            <FacebookLogin
                                appId="277786943649014"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                render={renderProps => (
                                    <a href="#" onClick={renderProps.onClick} disabled={renderProps.disabled} className="social-btn-2"><i className="fa fa-facebook-square" aria-hidden="true"></i></a>
                                )}
                            />
                        </li>
	            		<li>
                            <TwitterLogin
                                authCallback={responseTwitter}
                                consumerKey="PyHxgJuyORZqhDiuKAne8LcxT"
                                consumerSecret="RBqOgWJfflgk2GLGmKtHFnHituqvf3vROPfAqzOPpfKficIrI9"
                                callbackUrl="https://alexandrtovmach.github.io/react-twitter-login/"
                                children={
                                    <a href="#" className="social-btn-3"><i className="fa fa-twitter"  aria-hidden="true"></i></a>
                                }
                            />
                        </li>
	            	</ul>
	            </div>
	            <div className="line-separator mt-5"><span>OR</span></div>
                
                {this.state.errorMsg?(<div className="alert alert-danger text-center">{this.state.errorMsg}</div>):''}
                
                {typeof this.state.form_data['field-type']!=='undefined'?(
                <form method="post" encType="multipart/form-data" onSubmit={this.handle_submit}>
                    <div className="row">
                        {Object.keys(this.state.form_data['fields']).map((key,i) =>
                            <Form_group form_data={this.state.form_data} key_val={key} key={i}></Form_group>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {this.state.axios_loader?(
                                <div className="text-center my-3">
                                    <i className="fa fa-spinner fa-pulse fa-3x"></i>
                                </div>
                            ):(
                                <button className="btn form-btn btn-block">{this.state.form_data['btn-label']}</button>
                            )}
	            		</div>
			        </div>
                </form>
                ):''}
            </div>
        )
    }
}

export default Form
