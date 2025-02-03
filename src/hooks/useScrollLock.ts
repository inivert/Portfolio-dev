import { useEffect, useCallback, useRef } from 'react'

function getScrollbarWidth() {
  // Create a temporary div to measure scrollbar width
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)

  const inner = document.createElement('div')
  outer.appendChild(inner)

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
  outer.parentNode?.removeChild(outer)

  return scrollbarWidth
}

export function useScrollLock(isLocked: boolean) {
  const scrollPosition = useRef(0)
  
  const lockScroll = useCallback(() => {
    const scrollbarWidth = getScrollbarWidth()
    const hasVerticalScrollbar = window.innerWidth > document.documentElement.clientWidth
    
    // Store the current scroll position
    scrollPosition.current = window.scrollY

    // Apply styles to body
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition.current}px`
    document.body.style.width = '100%'
    
    // Only add padding if there's a scrollbar
    if (hasVerticalScrollbar) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    // Set CSS variable for scrollbar width
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
  }, [])

  const unlockScroll = useCallback(() => {
    // Remove styles from body
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.body.style.paddingRight = ''
    
    // Remove CSS variable
    document.documentElement.style.removeProperty('--scrollbar-width')
    
    // Restore scroll position
    window.scrollTo(0, scrollPosition.current)
  }, [])

  useEffect(() => {
    if (isLocked) {
      lockScroll()
      document.documentElement.classList.add('dialog-open')
    } else {
      unlockScroll()
      document.documentElement.classList.remove('dialog-open')
    }

    return () => {
      unlockScroll()
      document.documentElement.classList.remove('dialog-open')
    }
  }, [isLocked, lockScroll, unlockScroll])
}
