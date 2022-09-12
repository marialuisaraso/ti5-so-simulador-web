import { ButtonComponent, CanvasButtonComponent } from './styles'


export interface ButtonProps {
  text?: string;
  fullWidth?: boolean;
}

function Button({ text, fullWidth }: ButtonProps) {
  return (
    <>
      <ButtonComponent
        fullWidth={fullWidth}>


        {text}
      </ButtonComponent>
    </>
  );
}

function CanvasButton({ text, fullWidth }: ButtonProps) {
  return (
    <>
      <CanvasButtonComponent
        fullWidth={fullWidth}>


        {text}
      </CanvasButtonComponent>
    </>
  );
}

export { Button, CanvasButton} ;
