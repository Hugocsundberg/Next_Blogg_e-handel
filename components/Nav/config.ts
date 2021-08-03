import { AboutMe, NavOption } from "../../generalTypes"

export interface Option {
    text: string,
    image: string,
    link: string
}

export const getOptions = (aboutMe:(Array<AboutMe>), slug:string | undefined, isDesktop:boolean) : Array<NavOption> => {
    const optionsArray:Array<NavOption> = []
    if(aboutMe[0]) optionsArray.push({text: 'Om mig', image: '/personIcon.svg', link: `/post/${aboutMe[0].slug.current}`})  
    if(slug !== 'products') optionsArray.push({text: 'Tavlor', image: '/imageicon.svg', link: '/products'})  
    if(isDesktop) optionsArray.push({text: 'Kundvagn', image: '/shop-cart.svg', link: '/cart'})

    return optionsArray
}