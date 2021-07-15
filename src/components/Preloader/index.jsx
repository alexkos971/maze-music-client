import React from "react"
import "./Preloader.scss";

const Preloader = () => {
	return (					
		<div className="loader">
			<span className="loader first"></span>
			<span className="loader second"></span>
			<span className="loader thirth"></span>
			<span className="loader fourth"></span>
		</div>
	)
}

export default Preloader;