import React, { Component } from 'react'

class Common_sec extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export function SampleArrows(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style }}
        onClick={onClick}
      />
    );
}
export const Blog_sec=()=>{
    return(
        <section className="col-12 com-sections blog-section my-0">
		<div className="sec-title">
            Highspace Blog
		    <div className="sec-subtitle">For more articles, please <a href="blogs" className="link">visit our Blog</a></div>
        </div>
		<div className="row">
			<div className="col-md-4">
				<div className="card blog-box">
					<img className="card-img-top" src="assets/images/blog-1.png" />
					<div className="card-body">
						<div className="card-cat">Highspace <span className="dot-icon"></span> 5 min read</div>
						<h4 className="card-title">Don't Let Small Workspace Stop You</h4>
						<div className="card-bottom">
							<span className="time">Jun 10</span>
							<a href="#" className="btn btn-primary">Read <i className="fa fa-chevron-right"></i></a>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-4">
				<div className="card blog-box">
					<img className="card-img-top" src="assets/images/blog-2.png" />
					<div className="card-body">
						<div className="card-cat">Highspace <span className="dot-icon"></span> 6 min read</div>
						<h4 className="card-title">Fashion Designers and Their Space Issues</h4>
						<div className="card-bottom">
							<span className="time">22 Dec, 2019</span>
							<a href="#" className="btn btn-primary">Read <i className="fa fa-chevron-right"></i></a>
						</div>
					</div>
				</div>
			</div>
			<div className="col-md-4">
				<div className="card blog-box">
					<img className="card-img-top" src="assets/images/blog-3.png" />
					<div className="card-body">
						<div className="card-cat">Highspace <span className="dot-icon"></span> 10 min read</div>
						<h4 className="card-title">The Emerging Market Trend Towards Shared Spaces</h4>
						<div className="card-bottom">
							<span className="time">16 Feb</span>
							<a href="#" className="btn btn-primary">Read <i className="fa fa-chevron-right"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    );
}
export default Common_sec
