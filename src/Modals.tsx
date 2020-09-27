import React, {Component, createRef, HTMLAttributes} from 'react'
import {HTMLDivPopupComponent} from '.'

export default class Modals extends Component <HTMLAttributes<HTMLDivElement>> {
  ref = createRef<HTMLDivElement>()
  onClose (e) {
    const element = this.ref.current.lastChild as HTMLDivPopupComponent
    element.component?.close('background')
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }
  render () {
    return (
      <div ref={this.ref} {...this.props} onClick={e => this.onClose(e)}>
        {this.props.children}
      </div>
    )
  }
}
