import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'

import Weather from '../weather/Weather'
import { getDailyForecast, getWeather } from '../../actions/forecast'

const Forecast = ({
  getWeather,
  getDailyForecast,
  forecast: { forecast, weather, loading, error }
}) => {
  const [city, setCity] = useState('Sofia')

  useEffect(() => {
    getWeather({ city })
  }, [getWeather, city])

  useEffect(() => {
    getDailyForecast({ city })
  }, [getDailyForecast, city])

  return loading ? (
    <Spinner />
  ) :
    (
      <Container maxWidth='sm'>
        <Weather
          city={city}
          currentWeather={weather}
          forecast={forecast}
          setCity={setCity}
          error={error}
        />
      </Container>
    )
}

Forecast.propTypes = {
  getDailyForecast: PropTypes.func.isRequired,
  getWeather: PropTypes.func.isRequired,
  forecast: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  forecast: state.forecast
})

export default connect(
  mapStateToProps,
  { getDailyForecast, getWeather }
)(Forecast)