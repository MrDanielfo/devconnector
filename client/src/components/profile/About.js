import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const About = ({profile : { profile: {user: {name}, bio, skills} }}) => {
    return (
      <div className="profile-about bg-light p-2">
        {bio && (
          <Fragment>
            <h2 className="text-primary">{`${name.trim().split(' ')[0]}'s Bio`}</h2>
            <p>bio</p>
          </Fragment>
        )}

        {   skills && (

            <Fragment>
                <div className="line" />
                    <h2 className="text-primary">Skill Set</h2>
                        <div className="skills">
                            {skills.map((skill, index) => (
                                <div className="p-1" key={index}>
                                    <i className="fa fa-check" /> {skill}
                                </div>
                            ))}
                        </div>
            </Fragment>

            )
        }

        </div> 
    );
}

About.propTypes = {
    profile: PropTypes.object.isRequired
}

export default About;
