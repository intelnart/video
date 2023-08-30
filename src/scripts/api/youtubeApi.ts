import axios from 'axios'

const KEY = 'AIzaSyCM3VTFbsoA9UxeQl4SHJzTyjY2CLCvq0k'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        key: KEY
    }
})
