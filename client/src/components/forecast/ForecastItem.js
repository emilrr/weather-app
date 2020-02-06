import React from 'react'
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import dayjs from 'dayjs'
import weatherIcons from '../../utils/icons.json'
import { forecastItemStyle } from '../../utils/materialStyles'

const useStyles = makeStyles(forecastItemStyle)

export default function ForecastItem(props) {
  const classes = useStyles()
  const result = props.forecast.map((item, index) => {
    const icon = `wi ${weatherIcons[item.icon_id]}`

    return (
      <ListItem key={index} className='forecastItem'>
        <ListItemText
          className='week-day'
          primary={dayjs(item.valid_date).format('dddd')}
          style={{ flex: '1 1 0%', textAlign: 'left' }}
        ></ListItemText>
        <IconButton disabled={true} aria-label='forecast icon'>
          <span
            className={`${classes.wi} ${icon}`}
            // className={`${props.icon} ${classes.wi}`}
            // src={item.icon}
            style={{ fontSize: '24px' }}
          ></span>
        </IconButton>
        <span className='temp' style={{ flex: '1 1 0%', textAlign: 'right' }}>
          <Typography variant='body2' component='span' color='textPrimary'>
            {Math.round(item.min)}&deg; /{' '}
          </Typography>
          <Typography variant='body2' component='span' color='textSecondary'>
            {Math.round(item.max)}&deg;
          </Typography>
        </span>
      </ListItem>
    )
  })

  return (
    <List component='nav' aria-label='forecast data'>
      {result}
    </List>
  )
}
