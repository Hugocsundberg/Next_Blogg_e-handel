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

export const addObjectToStorage = (key:string, data: object) : void => {
  if(process.browser) {
    const event = new Event(`add${key}`)
    const storageData:Array<Object> = JSON.parse(window.localStorage.getItem(key) || '[]')
    storageData.push(data)
    window.localStorage.setItem(key, JSON.stringify(storageData))
    window.dispatchEvent(event)
  }
}

export const getFromStorage = (key:string) : (Array<Product> | null | undefined) => {
  if(process.browser) {
    const data:string | null = window.localStorage.getItem(key)
    if( data == null) return data
    return JSON.parse(data)
  }
}