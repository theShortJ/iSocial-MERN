import React, {Fragment, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import Spinner from '../layout/Spinner';
import {getAllProfiles} from '../../actions/profile';
import ProfileItem from '../profiles/profileItem';

const Profiles = ({ profile: { profiles, loading }, getAllProfiles }) => {
    useEffect(() => {
        getAllProfiles();
        }, [getAllProfiles]
    );

    return (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with awesome developers!
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No developers found...</h4>
            )}
          </div>
        </Fragment>
    )
}

Profiles.propTypes = {
    getAllProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapReduxStateToProps = state => ({
    profile: state.profile
})

export default connect(mapReduxStateToProps, {getAllProfiles})(withRouter(Profiles));
