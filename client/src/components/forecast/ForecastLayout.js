import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
  Grid
} from '@material-ui/core'

import ForecastItem from './ForecastItem'
import WeatherCardSubheader from '../weather/WeatherCardSubheader'
import { forecastLayoutStyle } from '../../utils/materialStyles'

const useStyles = makeStyles(forecastLayoutStyle)

export default function ForecastLayout(props) {
  const classes = useStyles()

  return (
    <div className={classes.layout} >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WeatherCard
            currentWeather={props.currentWeather}
            forecast={props.forecast}
            icon={props.icon}
          />
        </Grid>
      </Grid>
    </div>
  )
}

const WeatherCard = props => {
  const classes = useStyles()
  const humidity = 'wi wi-humidity'
  const strongWind = 'wi wi-strong-wind'

  return (
    <Card className={classes.card}>
      <CardHeader
        title={props.currentWeather.city + ', ' + props.currentWeather.country}
        subheader={
          <WeatherCardSubheader currentWeather={props.currentWeather} />
        }
      />
      <CardContent>
        <CardMedia
          className={`${props.icon} ${classes.wi}`}
          src={props.icon}
          style={{ fontSize: '128px', float: 'right' }}
        />
        <Typography
          variant='h2'
          className='big-temp'
          color='textPrimary'
          component='h2'
          style={{ fontFamily: 'Montserrat', paddingTop: '30px' }}
        >
          {Math.round(props.currentWeather.temperature)}&deg;C
        </Typography>
        <Typography
          variant='subtitle2'
          className='atmospheric-conditions'
          color='textSecondary'
          gutterBottom
          style={{ paddingTop: '40px' }}
        >
          <span
            className={`${strongWind} ${classes.wi} ${classes.atmospheric}`}
          ></span>
          {props.currentWeather.wind_speed} km/h Winds{' '}
          <span
            className={`${humidity} ${classes.wi} ${classes.atmospheric}`}
          ></span>
          {props.currentWeather.humidity}% Humidity
        </Typography>
        <Divider variant='middle' />
        <ForecastItem currentWeather={props.currentWeather} forecast={props.forecast} />
      </CardContent>
    </Card>
  )
}
