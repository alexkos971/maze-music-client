import { connect } from "react-redux";
import React from "react";

const MainBcg = ({ night }) => (
    <div className={`music__main-bg ${!night ? 'night' : ''}`}></div>
)

const mapStateToProps = (state) => {
    return {
        night: state.interface.night
    }
}
export default connect(mapStateToProps)(MainBcg);