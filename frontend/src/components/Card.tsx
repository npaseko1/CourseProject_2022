import React from "react";
import '../styles/mainPage.scss'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

interface IProps {
    id: number,
    image: string,
    title: string,
    subtitle: string
}

const Card = (props: IProps) => {
    return (
        <Link to={`/card/${props.id}`} className="card">
            <img className="card-image" alt={"pic"} src={props.image}/>
            <h5>{props.title}</h5>
            <p title={props.subtitle}>{props.subtitle}</p>
        </Link>
    )
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
}

export default Card