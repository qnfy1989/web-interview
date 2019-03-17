import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'

import { API_ENDPOINT } from './config'
import './App.scss'
import NewAppointment from './components/NewAppointment'
import Header from './components/Header'
import Query from './components/Query'

function Loading() {
  return <Icon name={'spinner'} loading />
}

function App() {
  const [prevFetchedData, setData] = useState(null)
  return (
    <div className="app">
      <Header />
      <Query query={`${API_ENDPOINT}/users/1`}>
        {({ fetching, data, error, loaded }) =>
          error ? (
            <>
              <div>There was an error when loading the data</div>
              <p>{`${error}`}</p>
            </>
          ) : fetching ? (
            <Loading />
          ) : data ? (
            <>
              <div />
              {setData(data)}
            </>
          ) : (
            <Loading />
          )
        }
      </Query>
      <Query query={`${API_ENDPOINT}/availableSlots`}>
        {({ fetching, data, error, loaded }) =>
          error ? (
            <>
              <div>There was an error when loading the data</div>
              <p>{`${error}`}</p>
            </>
          ) : fetching ? (
            <Loading />
          ) : data ? (
            <NewAppointment {...prevFetchedData} slots={data} />
          ) : (
            <Loading />
          )
        }
      </Query>
    </div>
  )
}

export default App
