
export type PostPropsType = {
    message: string
    likesCount: number
}

export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type MyPostsPropsType = {
    posts: PostsType[]
    addPost: (postText: string) => void
    newMyPostText: string //
    updateNewMyPostText: (newText: string)=> void
}

export type ProfileType = {
    posts: PostsType[]
    addPost: (postText: string) => void
    newMyPostText: string //
    updateNewMyPostText: (newText: string)=> void
}

export type DialogsType = {
    name: string
    id: number
}

export type DialogItemPropsType = {
    dialogs: DialogsType[]
}

export type MessagesType = {
    message: string
    id: number
}

export type MessagePropsType = {
    messages: MessagesType[]
}

export type DialogsPropsType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
}

export const store: StoreType = {
    _state : {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, why nobody love me!', likesCount: 15},
                {id: 2, message: 'It\'s our new program! Hey!', likesCount: 2},
            ],
            newMyPostText: ''  //
        },
        dialogsPage: {
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'I love you'},
                {id: 3, message: 'How are you?'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'},
                {id: 6, message: 'Yo'},
            ],
            dialogs: [
                {id: 1, name: 'Natalia'},
                {id: 2, name: 'Alex'},
                {id: 3, name: 'Katya'},
                {id: 4, name: 'Uliana'},
                {id: 5, name: 'Sergey'},
                {id: 6, name: 'Larisa'},
            ],
        }
    },
    addPost() {
        const newPost: PostsType = {id: 4, message: this._state.profilePage.newMyPostText, likesCount: 0}
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newMyPostText = ''
        this.rerenderEntireTree()
    },
    updateNewMyPostText (newText: string) {
        this._state.profilePage.newMyPostText = newText
        this.rerenderEntireTree()
    },
    subscribe (observer: ()=> void) {
        this.rerenderEntireTree = observer
    },
    rerenderEntireTree () {
        console.log('state was changed')
    },
    getState() {
        return this._state
    }
}

export type StoreType = {
    _state: RootStateType
    addPost: () => void
    updateNewMyPostText: (newText: string) => void
    subscribe: (observer: ()=> void) => void
    rerenderEntireTree: ()=> void
    getState: () => RootStateType
}


/*export let state = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi, why nobody love me!', likesCount: 15},
            {id: 2, message: 'It\'s our new program! Hey!', likesCount: 2},
        ],
        newMyPostText: ''  //
    },
    dialogsPage: {
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'I love you'},
            {id: 3, message: 'How are you?'},
            {id: 4, message: 'Yo'},
            {id: 5, message: 'Yo'},
            {id: 6, message: 'Yo'},
        ],
        dialogs: [
            {id: 1, name: 'Natalia'},
            {id: 2, name: 'Alex'},
            {id: 3, name: 'Katya'},
            {id: 4, name: 'Uliana'},
            {id: 5, name: 'Sergey'},
            {id: 6, name: 'Larisa'},
        ],
    }
}*/


export type RootStateType = {
    profilePage: {
        posts: PostsType[]
        newMyPostText: string //
    }
    dialogsPage: {
        messages: MessagesType[]
        dialogs: DialogsType[]
    }
}

/*export const addPost = () => {
    const newPost: PostsType = {id: 4, message: state.profilePage.newMyPostText, likesCount: 0}
    state.profilePage.posts.push(newPost)
    state.profilePage.newMyPostText = ''

    rerenderEntireTree(state)
}*/

/*export const updateNewMyPostText = (newText: string) => {
    state.profilePage.newMyPostText = newText

    rerenderEntireTree(state)
}*/

/*
export const subscribe = (observer: (state: RootStateType)=> void) => {
    rerenderEntireTree = observer
}*/
