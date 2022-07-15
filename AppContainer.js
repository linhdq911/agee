import React from 'react'
import App  from './App'
import store from './components/storeData'
import { Provider } from 'react-redux';
import Man1  from './components/Man1'


const AppContainer = () => {
  return (
    <Provider store={store}>
         <App />
    </Provider>
  )
}

export default AppContainer
