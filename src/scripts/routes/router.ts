import Auth from '../components/Auth/Auth'
import Search from '../components/Search/Search'
import Videos from '../components/Videos/Videos'
import Favorites from '../components/Favorites/Favorites'

export const privateRoutes = [
    { path: '/search', element: Search },
    { path: '/videos', element: Videos },
    { path: '/favorites', element: Favorites }
]
export const publicRoutes = [{ path: '/authorization', element: Auth }]
