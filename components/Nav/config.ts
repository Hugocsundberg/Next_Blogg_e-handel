import { AboutMe, NavOption } from "../../generalTypes"

export const getOptions = (aboutMe:(Array<AboutMe>), slug:string | undefined, isAboutMe?:boolean) : Array<NavOption> => {
    const optionsArray:Array<NavOption> = [
        {isActive: slug === '' ? true : false, text: 'Blogg', image: '/postIcon.svg', link: '/'},
        {isActive: slug === 'tavlor' ? true : false, text: 'Tavlor', image: '/imageIcon.svg', link: '/tavlor'},
        {isActive: slug === 'kundvagn' ? true : false, text: 'Kundvagn', image: '/shop-cart.svg', link: '/kundvagn'}
    ]

    if(aboutMe[0]) optionsArray.splice(2, 0, {isActive: isAboutMe ? true : false, text: 'Om mig', image: '/personIcon.svg', link: `/${aboutMe[0].slug.current}`})  
    

    return optionsArray
}