import React from 'react'
import dayjs from 'dayjs'

export default function WeatherCardSubHeader(props) {
  const date = dayjs().isValid(props.currentWeather.date)
    ? props.currentWeather.date
    : ''

  return (
    <>
      <span data-testid='subheaderContent'>
        {dayjs(date).format('dddd')}, {dayjs(date).format('h:mm')}{' '}
        {dayjs(date).format('A')},{' '}
      </span>
    </>
  )
}
