import React, { Component } from 'react'
import Header from './../views/Header'
import Footer from './../views/Footer'

class Error_page extends Component {
    render() {

        return (
            <div>            
                <Header page="404"></Header>
                <h1 className="text-center my-5">Error 404 : Page Not found</h1>
                <Footer page="404"></Footer>
            </div>
        )
    }
}

export default Error_page
