import {v1} from 'uuid';
import {PostType} from './Posts/Post/Post';
import {Dispatch} from 'redux';
import {changeStatusLoadingAC, ErrorType} from '../../app/appReducer';
import {handleServerAppError} from "../../common/utils/handleServerAppError";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../../common/utils/handleServerNetworkError";
import {profileAPI, UpdateProfileType} from "../../api/profileApi";
import {AppRootStateType, AppThunkType} from "../../app/store";

const profileInintialState: ProfileType = {
    posts: [
        {id: v1(), message: 'Hi, why nobody love me!', likesCount: 15},
        {id: v1(), message: 'It\'s our new program! Hey!', likesCount: 2},
    ],
    profile: {
        aboutMe: '',
        contacts: {
            facebook: '',
            website: '',
            vk: '',
            twitter: '',
            instagram: '',
            youtube: '',
            github: '',
            mainLink: '',
        },
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        userId: '',
        photos: {
            small: '',
            large: '',
        }
    },
    status: '',
    sidebar: {
        about: [
    {
        id: 1,
        icon: '',
        info: 'Live In',
        description: ''
    },
    {
        id: 2,
        icon: '',
        info: 'From',
        description: 'Aden, Yemen'
    },
    {
        id: 3,
        icon: '',
        info: 'From',
        description: 'Relationship'
    }
],
}
}

export const profileReducer = (state: ProfileType = profileInintialState, action: ActionsType): ProfileType => {
    switch (action.type) {
        case 'profile/ADD-POST':
            const newPost: PostType = {id: action.id, message: action.newPostText, likesCount: 0}
            return {...state, posts: [newPost, ...state.posts]}
        case 'profile/SET-USER-PROFILE':
            return {...state, profile: action.profile}
        case 'profile/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
};

export const addPostAC = (newPostText: string) => ({type: 'profile/ADD-POST', newPostText, id: v1()} as const)
export const setUserProfileAC = (profile: ProfileResponseType) => ({type: 'profile/SET-USER-PROFILE', profile} as const)
export const setStatusAC = (status: string) => ({type: 'profile/SET-STATUS', status} as const)

export const setUserProfileTC = (userId: string) => (dispatch: Dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    profileAPI.getProfile(userId)
        .then(res => {
            dispatch(setUserProfileAC(res.data))
            dispatch(changeStatusLoadingAC('succeeded'))
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}
export const getStatusTC = (userId: number) => (dispatch: Dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    profileAPI.getStatus(userId)
        .then(res => {
            dispatch(setStatusAC(res.data))
            dispatch(changeStatusLoadingAC('succeeded'))
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export const updateStatusTC = (status: string) => (dispatch: Dispatch) => {
    dispatch(changeStatusLoadingAC('loading'))
    profileAPI.updateStatus(status)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setStatusAC(status))
                dispatch(changeStatusLoadingAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export const updateProfileTC = (profile: UpdateProfileType): AppThunkType => (dispatch, getState: () => AppRootStateType) =>  {
   let userId: string | null | number
    userId = getState().auth.loginData.id
    dispatch(changeStatusLoadingAC('loading'))
    profileAPI.updateProfile(profile)
        .then(res => {
            if (res.data.resultCode === 0) {
                //@ts-ignore
                dispatch(setUserProfileTC(userId))
                dispatch(changeStatusLoadingAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error.message, dispatch)
        })
}



type ActionsType = ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>

export type ProfileResponseType = {
    aboutMe: string
    contacts: ContactsType,
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: string
    photos: {
        small: string
        large: string
    }
}
export type ContactsType = {
    facebook: string
    website: null | string
    vk: string
    twitter: string
    instagram: string
    youtube: null | string
    github: string
    mainLink: null | string
}

export type ProfileType = {
    posts: PostType[]
    profile: ProfileResponseType
    status: string
    sidebar: SidebarType
}

export type SidebarType = {
    about: AboutType[]
}

export type AboutType = {
    id: number
    icon: string
    info: string
    description: string
}