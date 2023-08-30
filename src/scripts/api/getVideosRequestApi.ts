import youtube from './youtubeApi'

export const getVideosRequestApi = async (termFromSearchBar: string) => {
    return await youtube.get('/search', {
        params: {
            q: termFromSearchBar,
            order: 'relevance',
            maxResults: 12
        }
    })
}
