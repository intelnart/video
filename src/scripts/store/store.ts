import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import videosReducer from './slices/videosSlice'
import favoriteQueriesSlicesReducer from './slices/favoriteQueriesSlices'
import favoriteQueriesIDSlicesReducer from './slices/favoriteQueriesIDSlices'

const rootReducer = combineReducers({
    userReducer,
    videosReducer,
    favoriteQueriesSlicesReducer,
    favoriteQueriesIDSlicesReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
