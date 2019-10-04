import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<Router />, document.querySelector('#root'))

serviceWorker.unregister()
