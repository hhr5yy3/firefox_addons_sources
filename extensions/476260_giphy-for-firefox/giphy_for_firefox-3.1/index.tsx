import { IGif } from '@giphy/js-types'
import React, { SyntheticEvent } from 'react'
import ReactDOM from 'react-dom'
import { App } from '../app'
import { Large } from '../constants'

const target = document.getElementById('react-target')!

ReactDOM.render(
    <App
        config={Large}
        onGifClick={(_: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
            e.preventDefault()
        }}
        apiKey="3o6Zt3aFzBDQsyQCg8"
    />,
    target,
)
declare const module: any
// Hot Module Replacement
if (module.hot) {
    module.hot.accept()
}
