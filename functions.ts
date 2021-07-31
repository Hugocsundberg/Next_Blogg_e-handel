import { exception } from "console"
import { cols, Product } from "./generalTypes"
import { screenSizes } from "./styles/globalStyleVariables"

export const handleScroll = () => {
    window.sessionStorage.setItem('scrollPosition', window.pageYOffset.toString())
  }

export const getCols = (screenWidth:number): cols => {
  const S:number = screenSizes[0]
  const M:number = screenSizes[1]

  if(screenWidth < S) return 1
  if(screenWidth < M) return 2
  return 3
}

export function addObjectToStorage<T>(key:string, data: T) : void {
  if(process.browser) {
    const storageData:Array<Object> = JSON.parse(window.localStorage.getItem(key) || '[]')
    storageData.push(data)
    window.localStorage.setItem(key, JSON.stringify(storageData))
    const event = new Event(`update${key}`)
    window.dispatchEvent(event)
  }
}

export const getFromStorage = (key:string) : (Array<object>) => {
  if(process.browser) {
    const data:string | null = window.localStorage.getItem(key)
    if( data == null) return []
    return JSON.parse(data)
  } else return [] 
}

export const removeProductFromStorage = (key:string, removeProduct:Product): boolean => {
  if(process.browser) {
    const data:string | null = window.localStorage.getItem(key)
    if( data == null) return false
    const parsedData:Array<Product> = JSON.parse(data)
    const updatedArray:Array<Product> = parsedData.filter((product)=>{
      if(product.slug.current !== removeProduct.slug.current) return product
    })
    console.log(updatedArray)
    window.localStorage.setItem(key, JSON.stringify(updatedArray))
    const event = new Event(`update${key}`)
    window.dispatchEvent(event)
    return true
  } else return false 
}

export const getTopOverlayHeight = (): number => {
  if(process.browser) {
    const overlay = document.querySelector('.topOverlay')
    return overlay?.clientHeight ?? 0
  } else return 0
}

export const getBottomOverlayHeight = () :number => {
  if(process.browser) {
    const overlay = document.querySelector('.bottomOverlay')
    return overlay?.clientHeight ?? 0
  } else return 0
}