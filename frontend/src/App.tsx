import React, {useEffect} from 'react';
import {MainPage} from "./pages/mainPage";
import LoginPage from "./pages/loginPage";
import SingleCardPage from "./pages/singleCardPage";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CreatePost from "./pages/createPost";
import SingleTagPage from "./pages/singleTagPage";
import {useDispatch} from "react-redux";
import {storageUserRequest} from "./store/actions";
import ErrorBoundary from "./ErrorBoundary";

export const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const id: string = localStorage.getItem('user')
        if (id) dispatch(storageUserRequest({id: id}))
    }, [])

    return (
        <ErrorBoundary>
            <Router>
                <Switch>
                    <Route path="/login" render={() => <LoginPage/>}/>
                    <Route path="/createPost" render={() => <CreatePost />}/>
                    <Route path="/tag/:id" render={(props) =>
                        <SingleTagPage {...props} />}/>
                    <Route path="/card/:id" render={(props) =>
                        <SingleCardPage {...props}/>}/>
                    <Route path="/" render={() => <MainPage />}/>
                </Switch>
            </Router>
        </ErrorBoundary>
    )
}