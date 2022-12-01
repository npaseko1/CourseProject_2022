import React from "react";
import '../styles/common.scss'
import '../styles/createPost.scss'
import Facebook from '../assets/svg/Facebook.svg'
import Instagram from '../assets/svg/Instagram.svg'
import Telegram from '../assets/svg/Telegram.svg'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

interface IProps {
    create?: boolean,
    onClick?: () => void
}

const Footer = (props: IProps) => {
    return (
        <>
            {props.create ?
                <footer className="add-card-footer">
                    <div className="add-card-footer-container">
                        <Link to="/"><button className="cancel"><p>Cancel</p></button></Link>
                        <button onClick={props.onClick} className="publish"><p>Publish</p></button>
                    </div>
                </footer> :
                <footer className="footer-wrapper">
                    <div className="footer-container">
                        <p>2022 © made by Nadia</p>
                        <div className="footer-links">
                            <ul className="footer-icons">
                                <li className="footer-icon-one">
                                    <a href="">
                                        <img src={Facebook} alt={"icon"}/>
                                    </a>
                                </li>
                                <li className="footer-icon-one">
                                    <a href="">
                                        <img src={Instagram} alt={"icon"}/>
                                    </a>
                                </li>
                                <li className="footer-icon-one">
                                    <a href="">
                                        <img src={Telegram} alt={"icon"}/>
                                    </a>
                                </li>
                            </ul>
                            <a href="" className="footer-support">Support</a>
                        </div>
                    </div>
                </footer>
            }
        </>
    )
}

Footer.propTypes = {
    create: PropTypes.bool,
    onClick: PropTypes.func
}

export default Footer