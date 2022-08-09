import { useEffect, useMemo, useState } from 'react'
import styles from './Symbol.module.css'
import { arrayOfSymbols } from '../../constants'

export function Symbol({index, currentIndex, loop, arr, randomIndex, randomDelay}) {
  const [firstLetter, setFirstLetter] = useState(false)
  const [hide, setHide] = useState(true)
  const [randomSymbol, setRandomSymbol] = useState(arrayOfSymbols[Math.floor(Math.random() * arrayOfSymbols.length)])

  useEffect(() => {
    if (currentIndex - 1 === index) {
      setFirstLetter(true)
      setHide(false)
    } else {
      setFirstLetter(false)
    }
  }, [currentIndex, index])

  useEffect(() => {
    if (!firstLetter) {
      setTimeout(() => {
        setHide(true)
      }, 1000)
    }
  }, [firstLetter])

  useEffect(() => {
    if (index === randomIndex && loop) {
      const time = Math.floor(Math.random() * 7000 + 3000)

      const interval = setInterval(() => {
        setRandomSymbol(arrayOfSymbols[Math.floor(Math.random() * arr.length)])
        const timeout = setTimeout(() => {
          clearInterval(interval)
        }, time)
      },  randomDelay)
    }
  }, [loop])

  useEffect(() => {
    if (loop) {
      setRandomSymbol(arrayOfSymbols[Math.floor(Math.random() * arr.length)])
    }
  }, [loop])

  return (
    <span className={ firstLetter ? styles.symbolActive : !hide ? styles.symbol : styles.simbolHidden }>{randomSymbol}</span>
  )
}