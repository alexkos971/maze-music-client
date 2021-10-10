import React from 'react';
import { connect } from "react-redux";
import CardsTemp from "../../components/CardsTemp";

const Search = ({ artists, night }) => {
	return (
		<div className={`music__main-search`}>
			<div className={`music__main-bg ${!night ? "night" : ""}`}></div>
			
			<div className="music__main-search-container">
				<h2 className="subtitle">Search</h2>
		
				<div  className="music__main-search-container-input">
					<i className="fas fa-search" onClick={(e) => {
						if (e.target.nextSibling) {
						e.target.nextSibling.focus()
						}
					}}></i>
					<input type="text" placeholder='Type some track, artist, album or playlist'/>
				</div>

				<div className="music__main-search-container-recent">
					<h2 className="subtitle">Recent listened</h2>
					
					<CardsTemp items={artists} to="Artists"/>
				</div>
			
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		artists: state.artists.recomendArtists,
		night: state.interface.night
	}
}

export default connect(mapStateToProps)(Search);