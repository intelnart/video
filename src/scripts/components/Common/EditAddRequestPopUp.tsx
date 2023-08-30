import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import styles from '../Videos/styles.module.sass'
import { SubmitHandler, useForm } from 'react-hook-form'
import RangeSlider from '../Videos/components/RangeSlider'
import { CurrentOpenedRequest } from '../../types/currentOpeneRequestType'
import { getRequestInfo } from '../../api/getFavoritesRequestApi'
import { removeFavoriteQueries, setFavoriteQueries } from '../../store/slices/favoriteQueriesSlices'
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux'
import { FavoriteQueriesState } from '../../types/slicesTypes'

type Props = {
    isOpenModalInFavorite?: boolean
    setIsModalActive?: Dispatch<SetStateAction<boolean>>
    inputValue?: string | null
    onEditRequest?: (
        requestId: string,
        requestTitle: string,
        sliderValue: number,
        valueSelect: string,
        nameRequest: string
    ) => void
    saveRequest?: (request: string, sliderValue: number, sorting: string, nameRequest: string) => void
    setShowPopUpChange?: Dispatch<SetStateAction<boolean>>
    currentOpenedRequest?: CurrentOpenedRequest | null
}

export default function EditAddRequestPopUp({
    isOpenModalInFavorite,
    setIsModalActive,
    inputValue,
    onEditRequest,
    saveRequest,
    setShowPopUpChange,
    currentOpenedRequest
}: Props) {
    const { favoriteQueriesID } = useAppSelector(state => state.favoriteQueriesIDSlicesReducer)
    const [sliderValue, setSliderValue] = useState(currentOpenedRequest?.countSavedVideoInRequest ?? 12)
    const [valueSelect, setValueSelect] = useState('relevance')
    const dispatch = useAppDispatch()
    const { handleSubmit, register } = useForm({
        mode: 'onBlur'
    })

    useEffect(() => {
        getSavedRequired()
    }, [])

    const getSavedRequired = async () => {
        const request = await getRequestInfo(favoriteQueriesID)
        dispatch(removeFavoriteQueries())
        request.forEach((videoItem: any) => dispatch(setFavoriteQueries(videoItem)))
    }

    const onSubmit: SubmitHandler<Record<string, string>> = data => {
        if (saveRequest) {
            saveRequest(data.requestTitle, sliderValue, valueSelect, data.nameRequest)
        }
        if (currentOpenedRequest?.requestId && onEditRequest) {
            onEditRequest(
                currentOpenedRequest?.requestId,
                data.requestTitle,
                sliderValue,
                valueSelect,
                data.nameRequest
            )
        }
    }

    const handleCloseModal = useCallback(() => {
        if (setIsModalActive) {
            setIsModalActive(false)
        }
        if (setShowPopUpChange) {
            setShowPopUpChange(false)
        }
    }, [setIsModalActive])

    const onChangeValue = useCallback((e: any) => {
        setValueSelect(e.target.value)
    }, [])

    return (
        <div className={styles.requestPopUp}>
            <div className={styles.requestPopUp__container}>
                <div className={styles.requestPopUp__title}>
                    {isOpenModalInFavorite ? 'Изменить' : 'Сохранить запрос'}
                </div>
                <form className={styles.requestPopUp__form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.requestPopUp__requestTitleBlock}>
                        <div className={styles.requestPopUp__labelRequestTitle}>Запрос</div>
                        <input
                            className={styles.requestPopUp__input}
                            defaultValue={(isOpenModalInFavorite
                                ? currentOpenedRequest?.requestTitle
                                : inputValue
                            )?.toString()}
                            placeholder="Введите запрос"
                            type="text"
                            {...register('requestTitle')}
                            // disabled={!isOpenModalInFavorite}
                        />
                    </div>
                    <div className={styles.requestPopUp__requestNameBlock}>
                        <div className={styles.requestPopUp__labelRequestStar}>*</div>
                        <div className={styles.requestPopUp__labelRequestName}>Название</div>
                        <input
                            defaultValue={currentOpenedRequest?.nameRequest ?? ''}
                            className={styles.requestPopUp__input}
                            placeholder="Укажите название"
                            type="text"
                            {...register('nameRequest')}
                        />
                    </div>
                    <div className={styles.requestPopUp__selectBlock}>
                        <div className={styles.requestPopUp__labelSelect}>Сортировать по</div>
                        <div className={styles.selectContainer}>
                            <select onChange={onChangeValue} className={styles.requestPopUp__select}>
                                <option selected={currentOpenedRequest?.sorting === 'relevance'} value="relevance">
                                    Без сортировки
                                </option>
                                <option selected={currentOpenedRequest?.sorting === 'title'} value="title">
                                    По алфавиту
                                </option>
                                <option selected={currentOpenedRequest?.sorting === 'date'} value="date">
                                    По дате
                                </option>
                                <option selected={currentOpenedRequest?.sorting === 'viewCount'} value="viewCount">
                                    От наибольшего кол-во просмотров
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.requestPopUp__rangeSliderContainer}>
                        <RangeSlider
                            sliderValue={sliderValue}
                            setSliderValue={setSliderValue}
                            countSavedVideoInRequest={currentOpenedRequest?.countSavedVideoInRequest ?? 0}
                        />
                    </div>
                    <div className={styles.requestPopUp__controlButton}>
                        <button type="button" className={styles.dontSave} onClick={handleCloseModal}>
                            {isOpenModalInFavorite ? 'Не изменять' : 'Не сохранять'}
                        </button>
                        <button type="submit" className={styles.saving}>
                            {isOpenModalInFavorite ? 'Изменить' : 'Cохранить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
