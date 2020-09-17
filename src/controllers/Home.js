import React, { Component } from 'react'
import Header from './../views/Header'
import Footer from './../views/Footer'


class Home extends Component {
    render() {
        const Page=require('./../views/'+this.props.page).default;
        return (
            <div>
                <Header {...this.props}></Header>
                <Page {...this.props}></Page>
                <Footer {...this.props}></Footer>
            </div>
        )
    }
}

export default Home
