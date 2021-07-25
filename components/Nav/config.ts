import { AboutMe } from "../../generalTypes"

export interface Option {
    text: string,
    image: string,
    link: string
}

export const getOptions = (aboutMe:(Array<AboutMe>), slug:string | undefined) => {
    const optionsArray:Array<any> = []
    if(aboutMe[0]) optionsArray.push({text: 'Om mig', image: '/personIcon.svg', link: `/post/${aboutMe[0].Slug.current}`})  
    if(slug !== 'products') optionsArray.push({text: 'Tavlor', image: '/imageicon.svg', link: '/products'},)  

    return optionsArray
}