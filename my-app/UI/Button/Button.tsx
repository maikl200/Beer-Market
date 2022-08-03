import * as React from 'react';

import Button from '@mui/material/Button';

import {styled} from '@mui/material/styles';

interface ButtonMuiStyleProps {
  title?: string
  backcolor?: string
  backcolorhover?: string
}

interface ButtonMuiProps extends ButtonMuiStyleProps {
  onClick?: () => void,
  disabled?: boolean
}

const BootstrapButton = styled(Button)<ButtonMuiStyleProps>`
  transition: 0.5s;
  font-size: 16px;
  padding: 6px 12px;
  line-height: 1.5rem;
  background-color: ${({backcolor}) => backcolor};

  :hover {
    background-color: ${({backcolorhover}) => backcolorhover};
  }`

export default function CustomizedButtons(
  {
    onClick,
    disabled,
    title,
    backcolor,
    backcolorhover
  }: ButtonMuiProps) {
  return (
    <BootstrapButton
      disabled={disabled}
      backcolor={backcolor}
      backcolorhover={backcolorhover}
      variant="contained"
      onClick={onClick}
      disableRipple>
      {title}
    </BootstrapButton>
  );
}