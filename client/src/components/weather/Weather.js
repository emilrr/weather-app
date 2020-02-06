import React from 'react'
import ForecastLayout from '../forecast/ForecastLayout'
import WeatherSearch from './WeatherSearch'
import Spinner from '../layout/Spinner'
import weatherIcons from '../../utils/icons.json'

export default function Weather(props) {
  if (props.currentWeather && props.forecast) {
    const { currentWeather, forecast } = props
    const icon = `wi ${weatherIcons[props.currentWeather.icon_id]}`

    return (
      <div>
        <WeatherSearch setCity={props.setCity} error={props.error}/>
        <ForecastLayout
          currentWeather={currentWeather}
          forecast={forecast}
          icon={icon}
        />
      </div>
    )
  } else {
    return <Spinner />
  }
}
