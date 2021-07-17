import { AboutMe } from "../../generalTypes"

export interface Option {
    text: string,
    image: string,
    link: string
}

export const getOptions = (aboutMe:(Array<AboutMe>)) => {
    if(aboutMe[0]) {
        return [
            {text: 'Tavlor', image: '/imageicon.svg', link: '/'},
            {text: 'Om mig', image: '/personIcon.svg', link: `/post/${aboutMe[0].Slug.current}`}
        ]
    }
    else {
        return [
            {text: 'Tavlor', image: '/imageicon.svg', link: '/'}
        ]
    }
}