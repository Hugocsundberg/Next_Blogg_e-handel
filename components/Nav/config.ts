import { AboutMe, NavOption } from "../../generalTypes"
import { desktopSize } from "../../styles/globalStyleVariables"

export const getOptions = (aboutMe:(Array<AboutMe>), slug:string | undefined, isAboutMe?:boolean) : Array<NavOption> => {
    let isDesktop = undefined
    if(process.browser) isDesktop = window.innerWidth > desktopSize;
    const optionsArray:Array<NavOption> = [
        {isActive: slug === '' ? true : false, text: 'Blogg', image: '/postIcon.svg', link: '/'},
        {isActive: slug === 'tavlor' ? true : false, text: 'Tavlor', image: '/imageIcon.svg', link: '/tavlor'},
    ]
    if(aboutMe[0].slug) optionsArray.splice(2, 0, {isActive: isAboutMe ? true : false, text: 'Om mig', image: '/personIcon.svg', link: `/${aboutMe[0].slug.current}`})  
    if(isDesktop) optionsArray.push({isActive: slug === 'kundvagn' ? true : false, text: 'Kundvagn', image: '/shop-cart.svg', link: '/kundvagn'})

    return optionsArray
}