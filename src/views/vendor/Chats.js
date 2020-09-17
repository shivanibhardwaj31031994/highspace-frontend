import React, { Component } from 'react'
import SidebarDashboard from './SidebarDashboard'
import Popup from '../../components/Popup';

class Chats extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
        this.siderbar = React.createRef();
    }

    componentDidMount(){
    }
    
    render() {
        const props={
            visible:true,
            header:'This feature is coming soon!',
            body:'Meanwhile you can go back to your previous screen.',
            'btn-title':'Previous screen'
        };

        return (
        <section className="col-12 vendor-section">
            <Popup {...props}></Popup>
	        <div className="row">
		        <div className="col-md-3 pr-5 d-flex">
                    <SidebarDashboard {...this.props} ref={this.siderbar}></SidebarDashboard>
                </div>
		        <div className="col-md-9 vendor-form">
                    <div className="form-title sp-2">Chats</div>
                </div>
        	</div>
        </section>
        )
    }
}

export default Chats
