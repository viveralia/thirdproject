import React, { Component } from 'react'
import Typed from 'typed.js'

export default class Typing extends Component {
  componentDidMount() {
    const { strings } = this.props
    const options = {
      strings: strings,
      typeSpeed: 100,
      backSpeed: 110,
      backDelay: 2000
    }
    this.typed = new Typed(this.el, options)
  }

  componentWillUnmount() {
    this.typed.destroy()
  }

  render() {
    return (
      <span className='type-wrap'>
        <span
          style={{ whiteSpace: 'pre' }}
          ref={el => {
            this.el = el
          }}
        />
      </span>
    )
  }
}
