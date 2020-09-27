import React, {Component, ReactNode, createRef} from 'react'
import style, {classes, StyleProps} from 'react-html-classes'
import {action, computed, observable} from 'mobx'
import {observer} from 'mobx-react'
import Modals from './Modals'

interface PopupProps {
  onShow: () => void
  onClose: (result: string) => void
  className: string
}

export type HTMLDivPopupComponent = HTMLDivElement & {component: Popup}

class Popup extends Component <PopupProps> {
  ref = createRef<HTMLDivPopupComponent>()
  componentDidMount () {
    this.props.onShow()
    this.ref.current.component = this
  }

  close (result: string) {
    this.props.onClose(result)
  }

  render () {
    return (
      <div ref={this.ref} onClick={e => e.stopPropagation()} className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}

export interface ModalStyles {
  root?: any
  header?: any
  title?: any
  subButtons?: any
  subButton?: any
  content?: any
  closing?: any
  opening?: any
  button?: any
  buttons?: any
}

const styles: ModalStyles = {
  root: '',
  header: '',
  title: '',
  subButtons: '',
  subButton: '',
  content: '',
  closing: '',
  opening: '',
  buttons: '',
  button: '',
}

let displayed = 0

export interface ModalProps extends StyleProps<ModalStyles> {
  onClose?: (result: string) => void
  onShow?: () => void
  close?: (close: (result?: string) => void) => void
  onWillClose?: (result: string, close: () => void) => void
  children?: ReactNode
  buttons?: string[]
  subButtons?: string[]
  title?: ReactNode
  delay?: number
  buttonsOverride?: {[key: string]: ReactNode}
  open?: boolean | (() => any)
}

@observer
@style(styles)
class Modal extends Component {
  props: ModalProps
  showTimer: NodeJS.Timeout

  @observable closing = false
  @observable opening = false
  @observable opened = false

  @computed get open (): boolean {
    const {open = true} = this.props
    return typeof open === 'function' ? open() : open
  }
  @computed get show (): boolean {
    if (!this.open && this.opened) {
      setTimeout(() => this.close('open'))
    }
    return this.open || this.opened
  }

  componentDidMount (): void {
    if (this.props.close) {
      this.props.close(e => this.close(e))
    }
  }

  close (button: string) {
    if (!this.closing && this.opened) {
      if (this.props.onWillClose) {
        this.props.onWillClose(button, () => this.onWillClose(button))
      } else {
        this.onWillClose(button)
      }
    }
  }
  @action onWillClose (button: string) {
    const {delay} = this.props
    if (delay) {
      this.closing = true
      setTimeout(() => this.onClose(button), delay)
    } else {
      this.onClose(button)
    }
  }
  @action onClose (button: string) {
    if (this.props.onClose) {
      this.props.onClose(button)
    }
    this.closing = false
    if (!this.open) {
      this.opened = false
      displayed--
      if (!displayed) {
        document.body.style.overflow = ''
      }
    }
  }
  @action onShow () {
    const {delay, onShow} = this.props
    this.opened = true
    if (delay) {
      clearTimeout(this.showTimer)
      this.opening = true
      this.showTimer = setTimeout(() => this.opening = false, delay)
    }
    if (onShow) {
      onShow()
    }
    if (!displayed) {
      document.body.style.overflow = 'hidden'
    }
    displayed++
  }
  get buttons () {
    const {buttons, buttonsOverride} = this.props
    if (!buttons?.length) return null
    return (
      <div className={styles.buttons}>
        {buttons.map(button => (
          <button
            data-button={button}
            className={styles.button}
            key={button}
            onClick={() => this.close(button)}>
            {(buttonsOverride && buttonsOverride[button]) || button}
          </button>
        ))}
      </div>
    )
  }
  get children () {
    const {children} = this.props
    return children ? (
      <div className={styles.content}>
        {children}
      </div>
    ) : null
  }
  get subButtons () {
    const {subButtons, buttonsOverride} = this.props
    return subButtons && subButtons.length ? (
      <div className={styles.subButtons}>
        {subButtons.map(button => (
          <button
            data-button={button}
            className={styles.subButton}
            key={button}
            onClick={() => this.close(button)}>
            {(buttonsOverride && buttonsOverride[button]) || button}
          </button>
        ))}
      </div>
    ) : null
  }
  get title () {
    let {title} = this.props
    if (title) {
      return (
        <div className={styles.title}>
          {title}
        </div>
      )
    }
    return null
  }
  get header () {
    const {title, subButtons} = this.props
    if (!title && !(subButtons && subButtons.length)) {
      return null
    }
    return (
      <div className={styles.header}>
        {this.title}
        {this.subButtons}
      </div>
    )
  }
  render () {
    return this.show ? (
      <Popup
        className={classes(styles.root, this.opening && styles.opening, this.closing && styles.closing)}
        onShow={() => this.onShow()}
        onClose={result => this.close(result)}>
        {this.header}
        {this.children}
        {this.buttons}
      </Popup>
    ) : null
  }
}

export default Modal

export {
  Modals
}
