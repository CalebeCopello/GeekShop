import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlide = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state,action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        }
    }
})

export const { setCredentials } = authSlide.actions

export default authSlide.reducer