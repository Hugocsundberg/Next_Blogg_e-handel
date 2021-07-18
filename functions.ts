import { cols } from "./generalTypes"
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