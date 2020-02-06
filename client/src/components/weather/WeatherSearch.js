import React, { useEffect, useState } from 'react'
import {
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  Tooltip,
  Typography
} from '@material-ui/core'
import { connect } from 'react-redux'
import Search from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'
import useDebounce from '../../actions/useDebounce'
import { weatherSearchStyle } from '../../utils/materialStyles'

const useStyles = makeStyles(weatherSearchStyle)

const WeatherSearch = (
  { error, setCity }
) => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)
  const hasError = error ? true : false

  useEffect(() => {
    if (debouncedSearchTerm) {
      setCity(debouncedSearchTerm)
      setSearching(false)
    }
  }, [setCity, debouncedSearchTerm, isSearching])

  return (
    <div className={classes.search}>
      <Grid container alignItems='flex-end'>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <FormControl>
            <Input
              id='search-city'
              error={hasError}
              placeholder='Enter city name'
              onChange={e => {
                setSearching(true)
                setSearchTerm(e.target.value)
              }}
              startAdornment={
                <InputAdornment position='start'>
                  <Tooltip >
                    <Search />
                  </Tooltip>
                </InputAdornment>
              }
              endAdornment={
                isSearching && (
                  <InputAdornment position='end'>
                    <CircularProgress size={20} />
                  </InputAdornment>
                )
              }
            />
            {hasError && (
              <Typography className={classes.error}>{error}</Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}

export default connect(
  null,
  { }
)(WeatherSearch)

