import React from "react";
import '../styles/common.scss'
import Logo from '../assets/img/Logo.png'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import PropTypes from 'prop-types';
import {TUser} from "../interfaces/interfaces";

interface IProps {
    login?: boolean,
    create?: boolean
}

const Header = (props: IProps) => {
    const user = useSelector((state: RootState) => state.user.user)

    return (
        <header className="header-wrapper">
            <div className="header-container">
                <Link to="/" className="header-logo">
                    <img src={Logo} alt={"logo"}/>
                </Link>
                {!props.login ?
                    user ?
                        <div className="header-user">
                            {!props.create ?
                                <Link to="/createPost" className="button-sign-in-wrapper">
                                    <button className="button-sign-in">Create a Post</button>
                                </Link> : null
                            }
                            <img className="user-image" alt={"user"} src={user.img}/>
                        </div> :
                        <Link to="/login" className="button-sign-in-wrapper">
                            <button className="button-sign-in">Sign In</button>
                        </Link>
                    : null
                }
            </div>
        </header>
    )
}

Header.propTypes = {
    login: PropTypes.bool,
    create: PropTypes.bool
}

export default Header