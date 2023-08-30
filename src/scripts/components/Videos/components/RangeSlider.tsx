import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from '../styles.module.sass'

type Props = {
    sliderValue: number
    setSliderValue: Dispatch<SetStateAction<number>>
    countSavedVideoInRequest: number
}

export default function RangeSlider({ sliderValue, setSliderValue, countSavedVideoInRequest }: Props) {
    const defaultValueSliderFullness = countSavedVideoInRequest ? (countSavedVideoInRequest / 50) * 100 : 24
    const sliderProps = {
        min: 0,
        max: 50,
        value: countSavedVideoInRequest ?? 12
    }

    const [sliderFullness, setSliderFullness] = useState(defaultValueSliderFullness)

    const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setSliderValue(Number(e.target.value))
            setSliderFullness((Number(e.target.value) / 50) * 100)
        }
    }
    return (
        <div>
            <div className={styles.videos__rangeTitle}>Максимальное количество</div>
            <div className={styles.videos__rangeSlider}>
                <div>
                    <input
                        style={{
                            background: `-webkit-linear-gradient(left,#42a6ea 0%, #42a6ea ${sliderFullness}%,#fff ${sliderFullness}%, #fff 100%)`
                        }}
                        {...sliderProps}
                        type="range"
                        value={sliderValue}
                        className={styles.sliderInput}
                        id="myRange"
                        onChange={handleSliderChange}
                    />
                </div>
                <div className={styles.videos__rangeContainer}>
                    <div className={styles.videos__rangeValue}>{sliderValue}</div>
                </div>
            </div>
        </div>
    )
}
