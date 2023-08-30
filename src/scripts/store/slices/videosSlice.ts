import { createSlice } from '@reduxjs/toolkit'
import { VideosState } from '../../types/slicesTypes'

const initialState: VideosState = {
    videos: [],
    currentRequest: null
}

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setVideo(state, action) {
            state.videos = action.payload
        },
        setCurrentRequest(state, action) {
            state.currentRequest = action.payload
        },
        removeVideoInfo(state) {
            state.videos = []
            state.currentRequest = null
        }
    }
})
export const { setVideo, setCurrentRequest, removeVideoInfo } = videosSlice.actions

export default videosSlice.reducer
