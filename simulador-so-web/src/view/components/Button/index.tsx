import { ButtonComponent, CanvasButtonComponent1, CanvasButtonComponent2 } from './styles';

export interface ButtonProps {
    text?: string;
    fullWidth?: boolean;
}

function Button({ text, fullWidth }: ButtonProps) {
    return (
        <>
            <ButtonComponent fullWidth={fullWidth}>{text}</ButtonComponent>
        </>
    );
}

function CanvasButton1({ text, fullWidth }: ButtonProps) {
    return (
        <>
            <CanvasButtonComponent1 fullWidth={fullWidth}>{text}</CanvasButtonComponent1>
        </>
    );
}

function CanvasButton2({ text, fullWidth }: ButtonProps) {
    return (
        <>
            <CanvasButtonComponent2 fullWidth={fullWidth}>{text}</CanvasButtonComponent2>
        </>
    );
}

export { Button, CanvasButton1, CanvasButton2 };
