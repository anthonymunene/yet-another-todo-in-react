// @flow
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

type Props = {
  to: string,
  children: any
}

export class Link extends Component<Props> {
  static contextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }
  handleClick = (evt: SyntheticEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    this.context.linkHandler(this.props.to)
  }
  render() {
    const activeClass = this.context.route === this.props.to ? 'active' : ''
    return (
      <a
        className={activeClass}
        href={this.props.to}
        onClick={this.handleClick}
      >
        {this.props.children}
      </a>
    )
  }
}
