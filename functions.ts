import { breakPoints, cols, Product } from "./generalTypes"
import { screenSizes } from "./styles/globalStyleVariables"
import { Dispatch, SetStateAction } from "react"

export const handleScroll = () => {
    window.sessionStorage.setItem('scrollPosition', window.pageYOffset.toString())
  }

export const getCols = (screenWidth:number): cols => {
  const S:number = screenSizes.S
  const M:number = screenSizes.M

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

export const isReserved = (reserved:Product | number | null | undefined ) : (number | false) => {
  if(!reserved) return false;
  let lastReservedAt;
  if(typeof reserved === 'number') lastReservedAt = reserved;
  else lastReservedAt = reserved.lastReservedAt;
  
  if(lastReservedAt) {
    const reserveTime = 30
    const diff = Date.now() - lastReservedAt  
    const inMinutes = (diff / 1000 / 60)
    const minutesLeft = reserveTime - Math.round(inMinutes)

    if(inMinutes < reserveTime) return minutesLeft
    else return false

  } else return false
}

export const renderSnippet = (snippet:string) : void => {
  const checkoutContainer: (Element | null) = document.querySelector('.checkout-container')
  if(checkoutContainer) {
    checkoutContainer.innerHTML = snippet
    const scriptsTags:NodeListOf<HTMLScriptElement> = checkoutContainer.querySelectorAll('script')
    // This is necessary otherwise the scripts tags are not going to be evaluated
    for (let i = 0; i < scriptsTags.length; i++) {
        const parentNode:(Node | null) = scriptsTags[i].parentNode
        const newScriptTag:any = document.createElement('script')
        newScriptTag.type = 'text/javascript'
        newScriptTag.text = scriptsTags[i].text
        if(parentNode) {
          parentNode.removeChild(scriptsTags[i])
          parentNode.appendChild(newScriptTag)
        } else {
          throw new Error('no parent element found')
        }
    }
  } else {
    throw new Error('Checkout container not found')
  }
}

export const updateColCount = (setColCount: Dispatch<SetStateAction<number>>, breakPoints: breakPoints) => {
  const width = window.innerWidth
  if(width < breakPoints.S) setColCount(1)  
  else if(width < breakPoints.M) setColCount(2) 
  else if(width < breakPoints.L) setColCount(3)  
  else setColCount(4) 
}