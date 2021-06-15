import { lineWidth, imageHeight, rem } from '../../styles/globalStyleVariables'
import { optionDivPadding, marginLogo, lineHeightLogo    } from './styleVariables'
import { Options } from './config'

//Can probably be simplified
export const getOptionsHeight = ():number => {
    let height = 0;
    for(let i = 0; i < Options.length; i++) {
        height = height + (imageHeight * rem + ((optionDivPadding * rem) * 2 + lineWidth))
    };
    return height;
}

export const getBottomNavHeight = ():number => (lineHeightLogo * 2) * rem + (marginLogo * 2) * rem