'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var style = require('react-html-classes');
var mobx = require('mobx');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var style__default = /*#__PURE__*/_interopDefaultLegacy(style);

var Modals = /** @class */ (function (_super) {
    tslib.__extends(Modals, _super);
    function Modals() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        return _this;
    }
    Modals.prototype.onClose = function (e) {
        var _a;
        var element = this.ref.current.lastChild;
        (_a = element.component) === null || _a === void 0 ? void 0 : _a.close('background');
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    };
    Modals.prototype.render = function () {
        var _this = this;
        return (React__default['default'].createElement("div", tslib.__assign({ ref: this.ref }, this.props, { onClick: function (e) { return _this.onClose(e); } }), this.props.children));
    };
    return Modals;
}(React.Component));

var Popup = /** @class */ (function (_super) {
    tslib.__extends(Popup, _super);
    function Popup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = React.createRef();
        return _this;
    }
    Popup.prototype.componentDidMount = function () {
        this.props.onShow();
        this.ref.current.component = this;
    };
    Popup.prototype.close = function (result) {
        this.props.onClose(result);
    };
    Popup.prototype.render = function () {
        return (React__default['default'].createElement("div", { ref: this.ref, onClick: function (e) { return e.stopPropagation(); }, className: this.props.className }, this.props.children));
    };
    return Popup;
}(React.Component));
var styles = {
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
};
var displayed = 0;
var Modal = /** @class */ (function (_super) {
    tslib.__extends(Modal, _super);
    function Modal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.closing = false;
        _this.opening = false;
        _this.opened = false;
        return _this;
    }
    Object.defineProperty(Modal.prototype, "open", {
        get: function () {
            var _a = this.props.open, open = _a === void 0 ? true : _a;
            return typeof open === 'function' ? open() : open;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Modal.prototype, "show", {
        get: function () {
            var _this = this;
            if (!this.open && this.opened) {
                setTimeout(function () { return _this.close('open'); });
            }
            return this.open || this.opened;
        },
        enumerable: false,
        configurable: true
    });
    Modal.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.close) {
            this.props.close(function (e) { return _this.close(e); });
        }
    };
    Modal.prototype.close = function (button) {
        var _this = this;
        if (!this.closing && this.opened) {
            if (this.props.onWillClose) {
                this.props.onWillClose(button, function () { return _this.onWillClose(button); });
            }
            else {
                this.onWillClose(button);
            }
        }
    };
    Modal.prototype.onWillClose = function (button) {
        var _this = this;
        var delay = this.props.delay;
        if (delay) {
            this.closing = true;
            setTimeout(function () { return _this.onClose(button); }, delay);
        }
        else {
            this.onClose(button);
        }
    };
    Modal.prototype.onClose = function (button) {
        if (this.props.onClose) {
            this.props.onClose(button);
        }
        this.closing = false;
        if (!this.open) {
            this.opened = false;
            displayed--;
            if (!displayed) {
                document.body.style.overflow = '';
            }
        }
    };
    Modal.prototype.onShow = function () {
        var _this = this;
        var _a = this.props, delay = _a.delay, onShow = _a.onShow;
        this.opened = true;
        if (delay) {
            clearTimeout(this.showTimer);
            this.opening = true;
            this.showTimer = setTimeout(function () { return _this.opening = false; }, delay);
        }
        if (onShow) {
            onShow();
        }
        if (!displayed) {
            document.body.style.overflow = 'hidden';
        }
        displayed++;
    };
    Object.defineProperty(Modal.prototype, "buttons", {
        get: function () {
            var _this = this;
            var _a = this.props, buttons = _a.buttons, buttonsOverride = _a.buttonsOverride;
            if (!(buttons === null || buttons === void 0 ? void 0 : buttons.length))
                return null;
            return (React__default['default'].createElement("div", { className: styles.buttons }, buttons.map(function (button) { return (React__default['default'].createElement("button", { "data-button": button, className: styles.button, key: button, onClick: function () { return _this.close(button); } }, (buttonsOverride && buttonsOverride[button]) || button)); })));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Modal.prototype, "children", {
        get: function () {
            var children = this.props.children;
            return children ? (React__default['default'].createElement("div", { className: styles.content }, children)) : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Modal.prototype, "subButtons", {
        get: function () {
            var _this = this;
            var _a = this.props, subButtons = _a.subButtons, buttonsOverride = _a.buttonsOverride;
            return subButtons && subButtons.length ? (React__default['default'].createElement("div", { className: styles.subButtons }, subButtons.map(function (button) { return (React__default['default'].createElement("button", { "data-button": button, className: styles.subButton, key: button, onClick: function () { return _this.close(button); } }, (buttonsOverride && buttonsOverride[button]) || button)); }))) : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Modal.prototype, "title", {
        get: function () {
            var title = this.props.title;
            if (title) {
                return (React__default['default'].createElement("div", { className: styles.title }, title));
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Modal.prototype, "header", {
        get: function () {
            var _a = this.props, title = _a.title, subButtons = _a.subButtons;
            if (!title && !(subButtons && subButtons.length)) {
                return null;
            }
            return (React__default['default'].createElement("div", { className: styles.header },
                this.title,
                this.subButtons));
        },
        enumerable: false,
        configurable: true
    });
    Modal.prototype.render = function () {
        var _this = this;
        return this.show ? (React__default['default'].createElement(Popup, { className: style.classes(styles.root, this.opening && styles.opening, this.closing && styles.closing), onShow: function () { return _this.onShow(); }, onClose: function (result) { return _this.close(result); } },
            this.header,
            this.children,
            this.buttons)) : null;
    };
    tslib.__decorate([
        mobx.observable
    ], Modal.prototype, "closing", void 0);
    tslib.__decorate([
        mobx.observable
    ], Modal.prototype, "opening", void 0);
    tslib.__decorate([
        mobx.observable
    ], Modal.prototype, "opened", void 0);
    tslib.__decorate([
        mobx.computed
    ], Modal.prototype, "open", null);
    tslib.__decorate([
        mobx.computed
    ], Modal.prototype, "show", null);
    tslib.__decorate([
        mobx.action
    ], Modal.prototype, "onWillClose", null);
    tslib.__decorate([
        mobx.action
    ], Modal.prototype, "onClose", null);
    tslib.__decorate([
        mobx.action
    ], Modal.prototype, "onShow", null);
    Modal = tslib.__decorate([
        mobxReact.observer,
        style__default['default'](styles)
    ], Modal);
    return Modal;
}(React.Component));

exports.Modals = Modals;
exports.default = Modal;
