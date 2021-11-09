import { ScreenSizes } from "../generalTypes"

export const rem:number = 16
export const darkGray:string = 'rgba(51, 51, 51, 1)'
export const lightGray:string = '#5c5c5c'
export const blurPx:number = 10
export const blurColor:string = 'rgba(255, 255, 255, 0.78)'
export const margin:number = 1.5
export const lineWidth:number = 1
export const imageHeight:number = 1.7
export const darken:string = 'rgba(0, 0, 0, 0.07)';
export const lighten:string = 'rgba(255, 255, 255, 0.8)';
export const screenSizes:ScreenSizes = {
    S: 500,
    M: 700,
    L: 1000
}
export const navHeight:number = 5.375
export const buttonBorderRadius:number = 5
export const boxShadowBigElement:string = '6px 6px 12px -5px rgba(0, 0, 0, 0.25)';
export const animationTiming:string = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
export const desktopSize:number = 1020;
export const windowHeight:number = process.browser ? window.innerHeight : 300;