import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const profileItem = ({
    profile: { user: {_id, name, avatar}, status, company, skills, location} }) => {
    return (
        <div className = "profile bg-light">
            <img src={avatar} alt = "" className = "round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span> at {company}</span>}</p>
                <p className = "my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className = 'btn btn-primary'>View Profile</Link>
            </div>
            <ul>
                {skills.map( (skill, index) => (
                    <li className = "text-primary" key = {index}>
                        <i className = "fas fa-check">{skill}</i>
                    </li>)
                )};
            </ul>
        </div>
    )
}

profileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default profileItem
