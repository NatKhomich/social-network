import {actionsTypes, PostType, ProfileType} from '../types/Types';
import {v1} from 'uuid';

const dialogsInintialState: ProfileType = {
    posts: [
        {id: v1(), message: 'Hi, why nobody love me!', likesCount: 15},
        {id: v1(), message: 'It\'s our new program! Hey!', likesCount: 2},
    ],
    newMyPostText: ''
}

const ProfilePageReducer = (state: ProfileType = dialogsInintialState, action: actionsTypes): ProfileType => {
    switch (action.type) {

        case 'ADD-POST':
            const newPost: PostType = {id: action.id, message: action.newMyPostText, likesCount: 0}
            state.newMyPostText = ''
            return {...state, posts: [newPost, ...state.posts]}

        case 'UPDATE-NEW-MY-POST-TEXT':
            // state.newMyPostText = action.newText
            return {...state, newMyPostText: action.newText}

        default:
            return state
    }
};

export const addPostActionCreator = (newMyPostText: string) => {
    return {
        type: 'ADD-POST',
        newMyPostText: newMyPostText,
        id: v1()
    } as const
}

export const onChangePostActionCreator = (newText: string) => {
    return {
        type: 'UPDATE-NEW-MY-POST-TEXT',
        newText: newText
    } as const
}

export default ProfilePageReducer;