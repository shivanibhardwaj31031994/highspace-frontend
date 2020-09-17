import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import history from './history'
import * as serviceWorker from './serviceWorker';
import './variables/Functions';
import './assets/css/common-style.css';
import './assets/css/form-page.css';
import './assets/js/script.js';
import { ProtectedRoute } from './Protected-route';
import Error_page from './controllers/Error_page'
const cookies = require('./components/Cookies');

const require_file=(path)=>{
  try{
    return require(`${path}`);
  }catch(err){
    return false;
  }
};

function Manage_path(props){
  var slug='Home',path=props.match.path.split('/');
  if(props.match.params.slug){
    slug=props.match.params.slug;
  }else{
    slug=path[path.length-1];
    slug=slug.length>0?slug:'Home';
  }
  slug=slug.Capitalize();
  var slug1=slug;
  slug=(typeof props.match.params.id!=='undefined' || slug=='Location')?'id/'+slug:slug;
  if(!require_file('./controllers/'+slug)){
    if(require_file('./views/'+slug) && ['header','footer'].indexOf(slug.toLowerCase())<0){
      slug='Home';
    }else if(require_file('./views/vendor/'+slug) && path[1]=='vendor' && ['sidebar','sidebardashboard'].indexOf(slug.toLowerCase())<0){
      slug1='vendor/'+slug;
      slug='Home';
    }else{
      slug='Error_page';
    }
  }
  
  let isLoggedIn=cookies.isLoggedIn();
  let redirect=false;
  if(['login','signup','forget-password'].indexOf(slug1.toLowerCase())>-1){
    if(isLoggedIn===true){
      const params = new URLSearchParams(window.location.search);
      redirect=params.has('redirect')?new URL(params.get('redirect')).pathname:'/vendor/profile';
    }
  }
  var Page=require_file('./controllers/'+slug).default;
  return (
    (typeof props.protected==='boolean' && isLoggedIn===false || redirect!==false)?
    <Redirect to={{ pathname:(typeof redirect!=='boolean'?redirect:'/login'), search:(typeof redirect==='boolean' || redirect=="/login"?'?redirect='+window.location.href:''), state: { from: props.location } }} />:
    <Page page={slug1} {...props.match.params}></Page>
  );
}

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/" exact render={Manage_path}/>
      <Route path="/:slug" exact component={Manage_path}/> 
      <ProtectedRoute path="/vendor/:slug" exact component={Manage_path}/>
      <ProtectedRoute path="/vendor/location" exact component={Manage_path}/>
      <ProtectedRoute path="/vendor/:slug/:id" exact component={Manage_path}/>
      <Route component={Error_page}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// Route exact, strict


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
