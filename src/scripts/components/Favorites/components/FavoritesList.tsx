import React, { useCallback, useState } from 'react'
import styles from '../styles.module.sass'
import { CurrentOpenedRequest } from '../../../types/currentOpeneRequestType'

type Props = {
    requestTitle: string
    countSavedVideoInRequest: number
    id: string
    onGetCurrentOpenRequest: (currentOpenedRequest: CurrentOpenedRequest) => void
    isShowPopUpChange: boolean
    onYoutubeSearchOrderClick: (id: string) => void
    sorting: string
    onDeleteFavoritesRequestClick: (id: string) => void
    nameRequest: string
}

export default function FavoritesList({
    requestTitle,
    countSavedVideoInRequest,
    id,
    onGetCurrentOpenRequest,
    isShowPopUpChange,
    onYoutubeSearchOrderClick,
    sorting,
    onDeleteFavoritesRequestClick,
    nameRequest
}: Props) {
    const [mouseOverItem, setMouseOverItem] = useState(false)

    const changeStateMouse = () => {
        if (!isShowPopUpChange) {
            setMouseOverItem(true)
        }
    }

    const handleGetIdItemsRequest = useCallback(
        (id: string) => {
            onYoutubeSearchOrderClick(id)
        },
        [onYoutubeSearchOrderClick]
    )

    const deleteIdItems = (id: string) => {
        onDeleteFavoritesRequestClick(id)
    }

    const handleSaveRequestBodyClick = useCallback(() => {
        const currentOpenedRequest = {
            requestId: id,
            requestTitle,
            sorting,
            countSavedVideoInRequest,
            nameRequest
        }
        onGetCurrentOpenRequest(currentOpenedRequest)
    }, [id, requestTitle, sorting, countSavedVideoInRequest, nameRequest])

    return (
        <div
            className={mouseOverItem ? styles.favoritesList__container_active : styles.favoritesList__container}
            onMouseOut={() => setMouseOverItem(false)}
        >
            <div
                onClick={() => handleGetIdItemsRequest(id)}
                className={styles.favoritesItem}
                onMouseEnter={changeStateMouse}
            >
                <div className={styles.favoritesList__title}>{nameRequest ? nameRequest : requestTitle}</div>
            </div>
            <div
                onMouseOut={() => setMouseOverItem(false)}
                onMouseEnter={changeStateMouse}
                className={styles.favoritesList__button}
            >
                <div className={styles.favoritesList__wideScreens}>
                    {mouseOverItem && (
                        <div className={styles.favoritesList__controlBlock}>
                            <div>
                                <button
                                    onMouseEnter={() => changeStateMouse}
                                    onMouseOut={() => setMouseOverItem(false)}
                                    className={styles.favoritesList__buttonEdit}
                                    onClick={handleSaveRequestBodyClick}
                                >
                                    Изменить
                                </button>
                            </div>
                            <div>
                                <button
                                    onMouseOut={() => setMouseOverItem(false)}
                                    onMouseEnter={changeStateMouse}
                                    className={styles.favoritesList__buttonDelete}
                                    onClick={() => deleteIdItems(id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
