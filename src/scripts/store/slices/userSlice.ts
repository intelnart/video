import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../../types/slicesTypes'

const initialState: UserState = {
    email: null,
    id: null,
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.email = action.payload.email
            state.id = action.payload.id
            state.token = action.payload.token
        },
        removeUserInfo(state) {
            state.email = null
            state.id = null
            state.token = null
        }
    }
})
export const { setUser, removeUserInfo } = userSlice.actions

export default userSlice.reducer
