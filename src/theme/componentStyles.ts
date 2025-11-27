import { ThemeOptions } from '@mui/material/styles';
import { buttonStyles } from './buttonStyles';
import { cardStyles } from './cardStyles';
import { paperStyles } from './paperStyles';
import { formControlStyles } from './formControlStyles';
import { textFieldStyles } from './textFieldStyles';
import { inputStyles } from './inputStyles';

export const componentStyles: ThemeOptions['components'] = {
    ...inputStyles,
    ...textFieldStyles,
    ...formControlStyles,
    ...buttonStyles,
    ...cardStyles,
    ...paperStyles
};