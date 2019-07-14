import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import About from './About';
import Experience from './Experience';
import Education from './Education';
import GithubRepo from './GithubRepo';

const Profile = ({ match, profile: { profile, loading }, auth, getProfileById }) => {

    useEffect(() => {

        getProfileById(match.params.id);

    }, [getProfileById, match])

    return (
        <Fragment>
            <div className="container">
                {profile === null || loading ? <Spinner />
                    :
                    <Fragment>
                        <Link to='/profiles' className="btn btn-light">Back to the profiles page</Link>
                        { auth.isAuthenticated 
                            && auth.loading === false 
                            && auth.user._id === profile.profile.user._id ? (
                                <Link to='/edit-profile' className="btn btn-dark">Edit Profile</Link>
                            )
                            : ''
                        }

                        <div className="profile-grid my-1">
                            <ProfileTop profile={profile} />
                            <About profile={profile} />
                            {
                                profile.profile.experience.length > 0 
                                ?
                                <Experience profile={profile} />
                                : 
                                ''
                            }
                            {
                                profile.profile.education.length > 0
                                ?
                                <Education profile={profile} />
                                :
                                ''
                            }
                            {
                                profile.profile.githubusername && (
                                    <GithubRepo username={profile.profile.githubusername} />   
                                )
                            }
                               
                        </div>

                    </Fragment>
                        
                }   
            </div>
        </Fragment>
        
    )
}

Profile.propTypes = {
    getProfileById : PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);
