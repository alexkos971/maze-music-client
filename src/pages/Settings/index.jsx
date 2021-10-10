import React from 'react';
import { connect } from 'react-redux';


const Settings = ({ dispatch, profile }) => {
    
    return (
        <div className="music__main-settings">
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps)(Settings)