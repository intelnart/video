import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FavoriteQueriesState } from '../../types/slicesTypes'

type FavoriteState = {
    favoriteQueries: FavoriteQueriesState[]
}

const initialState: FavoriteState = {
    favoriteQueries: []
}

const favoriteQueriesSlices = createSlice({
    name: 'queries',
    initialState,
    reducers: {
        setFavoriteQueries(state, action: PayloadAction<FavoriteQueriesState>) {
            state.favoriteQueries.push(action.payload)
        },
        removeFavoriteQueries(state) {
            state.favoriteQueries = []
        }
    }
})
export const { setFavoriteQueries, removeFavoriteQueries } = favoriteQueriesSlices.actions

export default favoriteQueriesSlices.reducer
