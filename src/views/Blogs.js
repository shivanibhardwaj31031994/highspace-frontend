import React, { Component } from 'react'
import Popup from '../components/Popup';

class Blogs extends Component {
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
		        <div className="col-12 p-5">
                    <h1 className="text-center">Blogs</h1>
                </div>
        	</div>
        </section>
        )
    }
}

export default Blogs
