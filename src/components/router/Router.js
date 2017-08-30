// @flow
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
const getCurrentPath = () => {
  const path = document.location.pathname
  return path.substring(path.lastIndexOf('/'))
}
type State = {
  route: string
}

export class Router extends Component<any, State> {
  state = {
    route: getCurrentPath()
  }
  static childContextTypes = {
    route: PropTypes.string,
    linkHandler: PropTypes.func
  }

  getChildContext() {
    return {
      route: this.state.route,
      linkHandler: this.handleLinkClick
    }
  }
  handleLinkClick = (route: string) => {
    this.setState({ route })
    window.history.pushState(null, '', route)
  }
  componentDidMount() {
    window.onpopstate = () => {
      this.setState({ route: getCurrentPath() })
    }
  }
  render() {
    return <div>{this.props.children}</div>
  }
}
