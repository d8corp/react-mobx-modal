# react-mobx-modal
[![NPM](https://img.shields.io/npm/v/react-mobx-modal.svg)](https://github.com/d8corp/react-mobx-modal/blob/master/CHANGELOG.md)
[![downloads](https://img.shields.io/npm/dm/react-mobx-modal.svg)](https://www.npmjs.com/package/react-mobx-modal)
[![license](https://img.shields.io/npm/l/react-mobx-modal)](https://github.com/d8corp/react-mobx-modal/blob/master/LICENSE)  
Cool popups with [React 16.3](https://reactjs.org) and [Mobx 3](https://mobx.js.org) and more.
### Installation
npm
```bash
npm i react-mobx-modal
```
yarn
```bash
yarn add react-mobx-modal
```
### Using
All modals should be placed into `Modals`.
```typescript jsx
import Modal, {Modals} from 'react-mobx-modal'
import theme from 'react-mobx-modal/theme/default.module.scss'

export default () => (
  <Modals className={theme.modals}>
    <Modal classNames={theme}>
      Test modal
    </Modal>
  </Modals>
)
```
## Issues
If you find a bug, please file an issue on [GitHub](https://github.com/d8corp/react-mobx-modal/issues)  
[![issues](https://img.shields.io/github/issues-raw/d8corp/react-mobx-modal)](https://github.com/d8corp/react-mobx-modal/issues)  
> ---
[![stars](https://img.shields.io/github/stars/d8corp/react-mobx-modal?style=social)](https://github.com/d8corp/react-mobx-modal/stargazers)
[![watchers](https://img.shields.io/github/watchers/d8corp/react-mobx-modal?style=social)](https://github.com/d8corp/react-mobx-modal/watchers)

