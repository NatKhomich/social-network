import {combineReducers, createStore} from 'redux';
import profilePageReducer from './profilePageReducer';
import dialogsPageReducer from './messengerPageReducer';
import usersPageReducer from './usersPageReducer';
import authReducer from './authReducer';

//новый стейт
let rootReducer = combineReducers({
    profilePage: profilePageReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    auth: authReducer
})

export let store  = createStore(rootReducer)
export type AppStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store