import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { useNavigate } from 'react-router-dom'
import { getFavoritesRequestIdAPI } from '../../api/getFavoritesRequestIdApi'
import { removeVideoInfo, setCurrentRequest, setVideo } from '../../store/slices/videosSlice'
import { setFavoriteQueriesID } from '../../store/slices/favoriteQueriesIDSlices'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './styles.module.sass'
import { getVideosRequestApi } from '../../api/getVideosRequestApi'

export default function Search() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useAppSelector(state => state.userReducer) || { id: '' }
    const { videos, currentRequest } = useAppSelector(state => state.videosReducer) || { id: '' }
    const { register, handleSubmit } = useForm()

    useEffect(() => {
        dispatch(removeVideoInfo())
        getFavoritesRequestIdAPI(id).then(docSnap => {
            if (docSnap && docSnap.exists()) {
                dispatch(setFavoriteQueriesID(docSnap.data()?.saveRequest))
            }
        })
    }, [location.pathname])

    const onSubmit: SubmitHandler<Record<string, string>> = data => {
        const valueRequest = data.request
        videos.length !== 0 && dispatch(removeVideoInfo())
        getVideosRequestApi(valueRequest).then(response => dispatch(setVideo(response.data.items)))
        navigate('/videos')
        dispatch(setCurrentRequest(valueRequest))
    }

    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.search__title}>Поиск видео</div>
                <div className={styles.search__inputContainer}>
                    <input
                        className={styles.search__input}
                        defaultValue={currentRequest ?? ''}
                        placeholder="Что хотите посмотреть?"
                        type="text"
                        {...register('request')}
                    />
                    <button className={styles.search__button} type="submit">
                        Найти
                    </button>
                </div>
            </form>
        </div>
    )
}
