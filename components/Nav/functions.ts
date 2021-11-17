import { lineWidth, imageHeight, rem } from '../../styles/globalStyleVariables'
import { optionDivPadding, marginLogo, lineHeightLogo    } from './styleVariables'
import { getOptions } from './config'
import { AboutMe } from '../../generalTypes';
import { useRouter } from 'next/router';

//Can probably be simplified
export const getOptionsHeight = (aboutMe:(AboutMe | undefined)):number => {
    const router = useRouter()
    const _route = router.route.replace('/', '')
    let height = 0;
    for(let i = 0; i < getOptions(aboutMe, _route).length; i++) {
        height = height + (imageHeight * rem + ((optionDivPadding * rem) * 2 + lineWidth))
    };
    return height;
}

export const getBottomNavHeight = ():number => (imageHeight) * rem + rem * 2