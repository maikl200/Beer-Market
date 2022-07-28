import * as React from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';

interface ButtonMuiStyleProps {
  title?: string
  backColor?: string
  backColorHover?: string
}

interface ButtonMuiProps extends ButtonMuiStyleProps {
  onClick?: () => void
}

const BootstrapButton = styled(Button)<ButtonMuiStyleProps>`
  transition: 0.5s;
  font-size: 16px;
  padding: 6px 12px;
  line-height: 1.5rem;
  background-color: ${({backColor}) => backColor};

  :hover {
    background-color: ${({backColorHover}) => backColorHover};
  }`

export default function CustomizedButtons(
  {
    onClick,
    title,
    backColor,
    backColorHover
  }: ButtonMuiProps) {
  return (
    <BootstrapButton
      backColor={backColor}
      backColorHover={backColorHover}
      variant="contained"
      onClick={onClick}
      disableRipple>
      {title}
    </BootstrapButton>
  );
}