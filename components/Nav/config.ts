import { AboutMe, NavOption } from "../../generalTypes"

export const getOptions = (aboutMe:(Array<AboutMe>), slug:string | undefined, isDesktop:boolean, isAboutMe?:boolean) : Array<NavOption> => {
    const optionsArray:Array<NavOption> = [
        {isActive: slug === 'products' ? true : false, text: 'Tavlor', image: '/imageicon.svg', link: '/products'},
        {isActive: slug === '' ? true : false, text: 'Blogg', image: '/postIcon.svg', link: '/'},
        {isActive: slug === 'cart' ? true : false, text: 'Kundvagn', image: '/shop-cart.svg', link: '/cart'}
    ]
    
    if(aboutMe[0]) optionsArray.push({isActive: isAboutMe ? true : false, text: 'Om mig', image: '/personIcon.svg', link: `/post/${aboutMe[0].slug.current}`})  
    

    return optionsArray
}