/// <reference types="node" />
import React, { Component, ReactNode } from 'react';
import { StyleProps } from 'react-html-classes';
import Modals from './Modals';
interface PopupProps {
    onShow: () => void;
    onClose: (result: string) => void;
    className: string;
}
export declare type HTMLDivPopupComponent = HTMLDivElement & {
    component: Popup;
};
declare class Popup extends Component<PopupProps> {
    ref: React.RefObject<HTMLDivPopupComponent>;
    componentDidMount(): void;
    close(result: string): void;
    render(): JSX.Element;
}
export interface ModalStyles {
    root?: any;
    header?: any;
    title?: any;
    subButtons?: any;
    subButton?: any;
    content?: any;
    closing?: any;
    opening?: any;
    button?: any;
    buttons?: any;
}
export interface ModalProps extends StyleProps<ModalStyles> {
    onClose?: (result: string) => void;
    onShow?: () => void;
    close?: (close: (result?: string) => void) => void;
    onWillClose?: (result: string, close: () => void) => void;
    children?: ReactNode;
    buttons?: string[];
    subButtons?: string[];
    title?: ReactNode;
    delay?: number;
    buttonsOverride?: {
        [key: string]: ReactNode;
    };
    open?: boolean | (() => any);
}
declare class Modal extends Component {
    props: ModalProps;
    showTimer: NodeJS.Timeout;
    closing: boolean;
    opening: boolean;
    opened: boolean;
    get open(): boolean;
    get show(): boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    close(button: string): void;
    onWillClose(button: string): void;
    onClose(button: string): void;
    onShow(): void;
    get buttons(): JSX.Element;
    get children(): JSX.Element;
    get subButtons(): JSX.Element;
    get title(): JSX.Element;
    get header(): JSX.Element;
    render(): JSX.Element;
}
export default Modal;
export { Modals };
