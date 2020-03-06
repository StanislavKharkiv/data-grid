import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import TableWrapper from './Tablewrapper'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TableWrapper />
      </div>
    </Provider>
  )
}

export default App
