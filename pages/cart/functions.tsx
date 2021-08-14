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