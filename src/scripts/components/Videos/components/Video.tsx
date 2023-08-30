import React from 'react'
import styles from '../styles.module.sass'

type Props = {
    titleVideo: string
    thumbnails: string
    channelTitle: string
    viewSwitcherGrid: boolean
}

export default function Video({ titleVideo, thumbnails, channelTitle, viewSwitcherGrid }: Props) {
    return (
        <div className={viewSwitcherGrid ? styles.videoItem__visibleGrid : styles.videoItem__visibleList}>
            <img src={thumbnails} />
            <div>
                <div className={styles.videoItem__title}>{titleVideo}</div>
                <div className={styles.videoItem__chanelTitle}>{channelTitle}</div>
            </div>
        </div>
    )
}
