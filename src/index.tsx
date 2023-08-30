import React from 'react'
import ReactDOM from 'react-dom/client'
import AppSearch from './AppSearch'
import { setupStore } from './scripts/store/store'
import { Provider } from 'react-redux'

const store = setupStore()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <AppSearch />
    </Provider>
)
