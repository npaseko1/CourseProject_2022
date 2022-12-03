import React, {ChangeEvent, useEffect, useState} from "react";
import '../styles/signIn.scss'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Redirect} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {userRequest} from "../store/actions";

const LoginPage = () => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(false)
    const [redLogin, setRedLogin] = useState<boolean>(false)
    const [redPassword, setRedPassword] = useState<boolean>(false)
    const [alert, setAlert] = useState<boolean>(false)

    const user = useSelector((state: RootState) => state.user.user)
    const warning = useSelector((state: RootState) => state.user.error)
    const dispatch = useDispatch()

    const showPassword = (): void => {
        setChecked(!checked)
    }

    const loginHandler = (): void => {
        if (isValid()) {
            dispatch(userRequest({login: login, password: password}))
        }
    }

    const isValid = (): boolean => {
        let result = true
        setRedLogin(false)
        setRedPassword(false)

        if (!login.trim()) {
            setRedLogin( true)
            result = false
        }
        if (!password.trim()) {
            setRedPassword(true)
            result = false
        }
        return result
    }

    useEffect(() => {
        if (warning) {
            setAlert(true)
            setTimeout(() => setAlert(false), 2000)
        }
    }, [warning])

    return (
        <>
            <Header login/>
            <main className="sign-in-main">
                {alert && <div className="alert-wrapper active">
                    <div className="alert"><p>No such user!</p></div>
                </div>}
                <div className="sign-in-container">
                    <div className="sign-in-wrapper">
                        <h1 className="sign-in-title">Welcome to course</h1>
                        <input
                            value={login}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                            className={redLogin ? "sign-in-input login red" : "sign-in-input login"}
                            type="text"
                            placeholder="Enter Username"
                            name="uname"
                            required
                        />
                        <input
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword( e.target.value)}
                            className={redPassword ? "sign-in-input password red" : "sign-in-input password"}
                            type={checked ? "text" : "password"}
                            placeholder="Enter Password"
                            name="psw"
                            required
                        />
                        <div className="show-password">
                            <div
                                onClick={showPassword}
                                className="checkbox"
                            >
                                {checked && <svg
                                    className="checkbox-arrow"
                                    width="16"
                                    height="10"
                                    viewBox="0 0 16 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.85718 8.27556L2.07654 4.49492C1.79759 4.21598 1.34533 4.21598 1.06639 4.49492C0.787441 4.77387 0.787441 5.22613 1.06639 5.50508L5.3521 9.79079C5.63105 10.0697 6.08331 10.0697 6.36225 9.79079L14.9337 1.21936C15.2126 0.940416 15.2126 0.488155 14.9337 0.209209C14.6547 -0.0697365 14.2025 -0.0697365 13.9235 0.209209L5.85718 8.27556Z"
                                        fill="black"/>
                                </svg>}
                            </div>
                            <p>Show password</p>
                        </div>
                        <div
                            className="sign-in-login-button"
                            onClick={loginHandler}
                        >
                            <button className="sign-in-login" type="submit">Login</button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
            {user && <Redirect to="/"/>}
        </>
    )
}

export default LoginPage