import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FavoriteQueriesID = {
    favoriteQueriesID: string[]
}

const initialState: FavoriteQueriesID = {
    favoriteQueriesID: []
}

const favoriteQueriesIDSlices = createSlice({
    name: 'queriesID',
    initialState,
    reducers: {
        setFavoriteQueriesID(state, action: PayloadAction<string[]>) {
            state.favoriteQueriesID = action.payload
        },
        removeFavoriteQueriesID(state) {
            state.favoriteQueriesID = []
        }
    }
})
export const { setFavoriteQueriesID, removeFavoriteQueriesID } = favoriteQueriesIDSlices.actions

export default favoriteQueriesIDSlices.reducer
