export type VideosState = {
    videos: Videos[]
    currentRequest: string | null
}

export type Videos = {
    etag: string
    id: {
        kind: string
        videoId: string
    }
    kind: string
    snippet: VideosSnippet
}

export type FavoriteQueriesState = {
    id: string
    nameRequest: string
    numberRequest: number
    saveRequest: string
    sorting: string
}

type VideosSnippet = {
    channelId: string
    channelTitle: string
    description: string
    liveBroadcastContent: string
    publishTime: string
    publishedAt: string
    thumbnails: {
        default: VideosSnippetThumbnail
        height: VideosSnippetThumbnail
        medium: VideosSnippetThumbnail
    }
    title: string
}

type VideosSnippetThumbnail = {
    height: number
    url: string
    width: number
}

export type UserState = {
    email: string | null
    id: string | null
    token: string | null
}
