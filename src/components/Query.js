import { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'

function Query({ query, normalize = data => data, children }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { loaded: false, fetching: false, data: null, error: null }
  )
  useEffect(() => {
    setState({ fetching: true })
    fetch(query)
      .then(response => {
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .then(
        res =>
          setState({
            data: normalize(res),
            loaded: true,
            fetching: false,
            error: null,
          }),
        error =>
          setState({
            data: null,
            error,
            loaded: false,
            fetching: false,
          })
      )
  }, [])
  return children(state)
}

Query.propTypes = {
  query: PropTypes.string.isRequired,
  normalize: PropTypes.func,
  children: PropTypes.func.isRequired,
}

export default Query
