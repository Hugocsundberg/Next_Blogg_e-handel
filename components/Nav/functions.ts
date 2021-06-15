import { lineWidth, imageHeight, optionDivPadding, rem, lineHeightLogo, marginLogo } from '../../styles/styleVariables'
import { Options } from './config'

//Can probably be simplified
export const getOptionsHeight = () => {
    let height = 0;
    for(let i = 0; i < Options.length; i++) {
        height = height + (imageHeight * rem + ((optionDivPadding * rem) * 2 + lineWidth))
    };
    return height;
}

export const getBottomNavHeight = () => (lineHeightLogo * 2) * rem + (marginLogo * 2) * rem