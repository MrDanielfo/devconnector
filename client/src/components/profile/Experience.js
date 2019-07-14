import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const Experience = ({profile: {profile: { experience }}}) => {
    return (
      <div className="profile-exp bg-white p-2">
        {experience && (
          <Fragment>
            <h2 className="text-primary">Experience</h2>
            {experience.map(exp => (
              <div key={exp._id}>
                <h3 className="text-dark">{exp.company}</h3>
                {exp.to ? (
                  <p>
                    From: <Moment format="YYYY/MM/DD">{exp.from}</Moment>{' '}
                    To: <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                  </p>
                ) : (
                  <p>
                    From: <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    Current
                  </p>
                )}
                <p>
                  <strong>Position: </strong>
                  {exp.title}
                </p>
                <p>
                  <strong>Description: </strong>
                  {exp.description}
                </p>
              </div>
            ))}
          </Fragment>
        )}
      </div>
    );
}

Experience.propTypes = {
    profile: PropTypes.object.isRequired
}

export default Experience

