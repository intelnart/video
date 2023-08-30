// Main
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Redux
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { removeFavoriteQueries, setFavoriteQueries } from '../../store/slices/favoriteQueriesSlices'
import { removeVideoInfo, setCurrentRequest, setVideo } from '../../store/slices/videosSlice'
import { setFavoriteQueriesID } from '../../store/slices/favoriteQueriesIDSlices'

// Api
import { getRequestInfo } from '../../api/getFavoritesRequestApi'
import { getFavoriteRequestInParams } from '../../api/getFavoriteRequestInParams'
import { deleteFavoritesRequestApi } from '../../api/deleteFavoritesRequestApi'
import { editExistingRequestAPI } from '../../api/editSavedRequestApi'
import { getFavoritesRequestIdAPI } from '../../api/getFavoritesRequestIdApi'

// Styles
import styles from './styles.module.sass'

// Components
import EditAddRequestPopUp from '../Common/EditAddRequestPopUp'
import FavoritesList from './components/FavoritesList'
import Loader from '../Loader/Loader'

// Types
import { CurrentOpenedRequest } from '../../types/currentOpeneRequestType'
import { FavoriteQueriesState } from '../../types/slicesTypes'

export default function Favorites() {
    const { favoriteQueriesID } = useAppSelector(state => state.favoriteQueriesIDSlicesReducer)
    const { favoriteQueries } = useAppSelector(state => state.favoriteQueriesSlicesReducer)
    const filteredFavoriteQueries = favoriteQueries.filter(favoriteItem => favoriteItem !== null)
    const [isShowPopUpChange, setIsShowPopUpChange] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useAppSelector(state => state.userReducer)
    const idUser = id
    const [currentOpenedRequest, setCurrentOpenedRequest] = useState<CurrentOpenedRequest | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(removeFavoriteQueries())
        getFavoritesRequestIdAPI(id).then(docSnap => {
            if (docSnap && docSnap.exists()) {
                dispatch(setFavoriteQueriesID(docSnap.data()?.saveRequest))
            }
        })
        handleGetSavedRequired()
    }, [])

    const handleGetSavedRequired = useCallback(async () => {
        const request = await getRequestInfo(favoriteQueriesID)
        request.forEach(videoItem => dispatch(setFavoriteQueries(videoItem as FavoriteQueriesState)))
        setIsLoading(false)
        setIsShowPopUpChange(false)
    }, [getRequestInfo])

    const handleYoutubeSearchOrderClick = useCallback(
        (id: string) => {
            dispatch(removeVideoInfo())
            getFavoriteRequestInParams(id).then(result => {
                dispatch(setCurrentRequest(result?.docSnap))
                dispatch(setVideo(result?.response))
                navigate('/videos')
            })
        },
        [getFavoriteRequestInParams, navigate]
    )

    const handleDeleteFavoritesRequestClick = useCallback(
        (id: string) => {
            deleteFavoritesRequestApi(id, idUser).then(() => {
                const deleteElement = [...favoriteQueries]
                dispatch(removeFavoriteQueries())
                deleteElement.map(e => {
                    if (e.id !== id) {
                        dispatch(setFavoriteQueries(e))
                    }
                })
            })
        },
        [deleteFavoritesRequestApi]
    )

    const handleEditSavedRequestClick = useCallback(
        (requestId: string, requestTitle: string, sliderValue: number, valueSelect: string, nameRequest: string) => {
            editExistingRequestAPI(requestId, requestTitle, sliderValue, valueSelect, nameRequest).then(() => {
                dispatch(removeFavoriteQueries())
                favoriteQueries.map((i: FavoriteQueriesState) => {
                    const middleElement = {
                        id: i.id,
                        numberRequest: i.numberRequest,
                        saveRequest: i.saveRequest,
                        sorting: i.sorting,
                        nameRequest: i.nameRequest
                    }
                    if (i.id === requestId) {
                        middleElement.saveRequest = requestTitle
                        middleElement.nameRequest = nameRequest
                        middleElement.sorting = valueSelect
                        dispatch(setFavoriteQueries(middleElement))
                    } else {
                        dispatch(setFavoriteQueries(middleElement))
                    }
                })
                getFavoritesRequestIdAPI(id).then(docSnap => {
                    if (docSnap && docSnap.exists()) {
                        dispatch(setFavoriteQueriesID(docSnap.data()?.saveRequest))
                    }
                })
                dispatch(removeFavoriteQueries())
                handleGetSavedRequired()
            })
        },
        [editExistingRequestAPI, setIsShowPopUpChange]
    )

    const handleGetCurrentOpenRequestClick = useCallback(
        (currentOpenedRequest: CurrentOpenedRequest) => {
            setCurrentOpenedRequest(currentOpenedRequest)
            setIsShowPopUpChange(true)
        },
        [setCurrentOpenedRequest, setIsShowPopUpChange]
    )

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className={styles.favorites__wrapper}>
            <div className={styles.favorites__container}>
                <div className={styles.favorites__title}>Избранное</div>
                <div>
                    {filteredFavoriteQueries.map((favoriteItem: FavoriteQueriesState) => (
                        <FavoritesList
                            nameRequest={favoriteItem.nameRequest}
                            countSavedVideoInRequest={favoriteItem.numberRequest}
                            onDeleteFavoritesRequestClick={handleDeleteFavoritesRequestClick}
                            requestTitle={favoriteItem.saveRequest}
                            sorting={favoriteItem.sorting}
                            id={favoriteItem.id}
                            key={favoriteItem.id}
                            onGetCurrentOpenRequest={handleGetCurrentOpenRequestClick}
                            isShowPopUpChange={isShowPopUpChange}
                            onYoutubeSearchOrderClick={handleYoutubeSearchOrderClick}
                        />
                    ))}
                </div>
                {filteredFavoriteQueries.length === 0 && (
                    <div className={styles.favorites__notFound}>У вас нет избранных запросов</div>
                )}
                {isShowPopUpChange && (
                    <div className={styles.favorites__popUpContainer}>
                        <EditAddRequestPopUp
                            isOpenModalInFavorite={true}
                            onEditRequest={handleEditSavedRequestClick}
                            setShowPopUpChange={setIsShowPopUpChange}
                            currentOpenedRequest={currentOpenedRequest ?? null}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
