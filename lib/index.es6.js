import { __decorate } from 'tslib';
import React, { Component, createRef } from 'react';
import style, { classes } from 'react-html-classes';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

class Modals extends Component {
    constructor() {
        super(...arguments);
        this.ref = createRef();
    }
    onClose(e) {
        var _a;
        const element = this.ref.current.lastChild;
        (_a = element.component) === null || _a === void 0 ? void 0 : _a.close('background');
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }
    render() {
        return (React.createElement("div", Object.assign({ ref: this.ref }, this.props, { onClick: e => this.onClose(e) }), this.props.children));
    }
}

class Popup extends Component {
    constructor() {
        super(...arguments);
        this.ref = createRef();
    }
    componentDidMount() {
        this.props.onShow();
        this.ref.current.component = this;
    }
    close(result) {
        this.props.onClose(result);
    }
    render() {
        return (React.createElement("div", { ref: this.ref, onClick: e => e.stopPropagation(), className: this.props.className }, this.props.children));
    }
}
const styles = {
    root: '',
    header: '',
    title: '',
    subButtons: '',
    subButton: '',
    content: '',
    closing: '',
    buttons: '',
    button: '',
};
let displayed = 0;
let Modal = class Modal extends Component {
    constructor() {
        super(...arguments);
        this.closing = false;
        this.opened = false;
    }
    get open() {
        const { open = true } = this.props;
        return typeof open === 'function' ? open() : open;
    }
    get show() {
        return this.open || this.opened;
    }
    componentDidMount() {
        if (this.props.close) {
            this.props.close(e => this.close(e));
        }
    }
    componentDidUpdate() {
        if (!this.open && !this.closing && this.opened) {
            this.close('open');
        }
    }
    close(button) {
        if (!this.closing && this.opened) {
            if (this.props.onWillClose) {
                this.props.onWillClose(button, () => this.onWillClose(button));
            }
            else {
                this.onWillClose(button);
            }
        }
    }
    onWillClose(button) {
        const { delay } = this.props;
        if (delay) {
            this.closing = true;
            setTimeout(() => this.onClose(button), delay);
        }
        else {
            this.onClose(button);
        }
    }
    onClose(button) {
        if (this.props.onClose) {
            this.props.onClose(button);
        }
        this.opened = false;
        this.closing = false;
        displayed--;
        if (!displayed) {
            document.body.style.overflow = '';
        }
    }
    onShow() {
        this.opened = true;
        if (this.props.onShow) {
            this.props.onShow();
        }
        if (!displayed) {
            document.body.style.overflow = 'hidden';
        }
        displayed++;
    }
    get buttons() {
        const { buttons, buttonsOverride } = this.props;
        if (!(buttons === null || buttons === void 0 ? void 0 : buttons.length))
            return null;
        return (React.createElement("div", { className: styles.buttons }, buttons.map(button => (React.createElement("button", { className: classes(styles.button, styles[`button_${button}`]), key: button, onClick: () => this.close(button) }, (buttonsOverride && buttonsOverride[button]) || button)))));
    }
    get children() {
        const { children } = this.props;
        return children ? (React.createElement("div", { className: styles.content }, children)) : null;
    }
    get subButtons() {
        const { subButtons, buttonsOverride } = this.props;
        return subButtons && subButtons.length ? (React.createElement("div", { className: styles.subButtons }, subButtons.map(button => (React.createElement("button", { className: classes(styles.subButton, styles[`subButton_${button}`]), key: button, onClick: () => this.close(button) }, (buttonsOverride && buttonsOverride[button]) || button))))) : null;
    }
    get title() {
        let { title } = this.props;
        if (title) {
            return (React.createElement("div", { className: styles.title }, title));
        }
        return null;
    }
    get header() {
        const { title, subButtons } = this.props;
        if (!title && !(subButtons && subButtons.length)) {
            return null;
        }
        return (React.createElement("div", { className: styles.header },
            this.title,
            this.subButtons));
    }
    render() {
        return this.show ? (React.createElement(Popup, { className: classes(styles.root, this.closing && styles.closing), onShow: () => this.onShow(), onClose: result => this.close(result) },
            this.header,
            this.children,
            this.buttons)) : null;
    }
};
__decorate([
    observable
], Modal.prototype, "closing", void 0);
__decorate([
    observable
], Modal.prototype, "opened", void 0);
__decorate([
    computed
], Modal.prototype, "open", null);
__decorate([
    computed
], Modal.prototype, "show", null);
Modal = __decorate([
    observer,
    style(styles)
], Modal);
var Modal$1 = Modal;

export default Modal$1;
export { Modals };
