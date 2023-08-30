import React from 'react'
import styles from './styles.module.sass'
import sibdevLogo from '../../../images/sibdev-logo.svg'

export default function Loader() {
    return (
        <div className={styles.loader}>
            <img src={sibdevLogo} alt="" />
        </div>
    )
}
