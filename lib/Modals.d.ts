import React, { Component, HTMLAttributes } from 'react';
export default class Modals extends Component<HTMLAttributes<HTMLDivElement>> {
    ref: React.RefObject<HTMLDivElement>;
    onClose(e: any): void;
    render(): JSX.Element;
}
