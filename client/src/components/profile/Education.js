import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Education = ({profile: {profile : {education}}}) => {
    return (
      <div className="profile-edu bg-white p-2">
        {education && (
          <Fragment>
            <h2 className="text-primary">Education</h2>
            {education.map(edu => (
              <div key={edu._id}>
                <h3>{edu.school}</h3>
                {edu.current ? (
                  <p>From: {edu.from.substring(0, 10)} - Current</p>
                ) : (
                  <p>From: {edu.from.substring(0, 10)} To: {edu.to.substring(0, 10)}</p>
                )}
                <p>
                  <strong>Degree: </strong>
                  {edu.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong>
                  {edu.fieldofstudy}
                </p>
                <p>
                  <strong>Description: </strong>
                  {edu.description}
                </p>
              </div>
            ))}
          </Fragment>
        )}
      </div>
    );
}

Education.propTypes = {
    profile: PropTypes.object.isRequired
}

export default Education
