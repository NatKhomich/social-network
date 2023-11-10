import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {CircularProgress, LinearProgress} from '@mui/material';
import {AppRootStateType} from './store';
import {initializeAppTC, RequestStatusType} from './appReducer';
import imageError from '../common/image/404.jpg'
import {selectAppIsInitialized, selectAppStatus} from './appSelectors';
import {withSuspense} from "../common/hoc/withSuspense";
import Navbar from '../features/Navbar/Navbar';
import HeaderContainer from '../features/Header/HeaderContainer';
import ErrorSnackbar from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {NotFound404} from "../common/components/NotFound404/NotFound404";
import {Music} from "../features/Music/Music";
import {News} from "../features/News/News";
import {Settings} from "../features/Settings/Settings";

const ProfileContainer = React.lazy(() => import('../features/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('../features/Users/UsersContainer'))
const MessengerContainer = React.lazy(() => import('../features/Messenger/MessengerContainer'))
const Login = React.lazy(() => import('../features/Auth/Login'))


type AppType = MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<AppType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.isInitialized) {
            return <div
                style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        } else {
            return <div className={'root'}>
                <HeaderContainer/>
                {this.props.status === 'loading' ? <LinearProgress color="primary"/> : ''}
                <div className={'appWrapper'}>
                    <div className={'container'}>
                        <Navbar/>
                        <div className={'content'}>

                            <Switch>
                                <Route exact path="/" render={() => <Redirect to={'/social-network/profile'}/>}/>

                                <Route path={'/social-network/profile/:userId?'} render={withSuspense(ProfileContainer)}/>
                                <Route path={'/social-network/messenger'} render={withSuspense(MessengerContainer)}/>
                                <Route path={'/social-network/users'} render={withSuspense(UsersContainer)}/>
                                <Route path={'/social-network/login'} render={withSuspense(Login)}/>

                                <Route path={'/social-network/music'} render={() => <Music />}/>
                                <Route path={'/social-network/news'} render={() => <News />}/>
                                <Route path={'/social-network/settings'} render={() => <Settings />}/>

                                <Route path="/404" render={() => <img src={imageError} alt="error"/>}/>
                                <Route path="*" render={() => <NotFound404/>}/>
                            </Switch>
                        </div>
                    </div>
                </div>
                <ErrorSnackbar/>
            </div>
        }
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        status: selectAppStatus(state),
        isInitialized: selectAppIsInitialized(state)
    }
}

type MapStateToPropsType = {
    status: RequestStatusType
    isInitialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}

export const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {
        initializeApp: initializeAppTC
    })
)(App);