// components/debug/cookie-monitor.tsx - TEMPORARY
'use client'

import { useEffect } from 'react'

export function CookieMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Monitor all cookie changes
    let lastCookies = document.cookie
    
    const checkCookies = () => {
      const currentCookies = document.cookie
      if (currentCookies !== lastCookies) {
        console.log('🔍 COOKIE CHANGE DETECTED!')
        console.log('Previous:', lastCookies)
        console.log('Current:', currentCookies)
        
        // Check for the malformed cookie
        const cookies = currentCookies.split(';')
        cookies.forEach(cookie => {
          if (cookie.includes('sb-') && cookie.includes('base64-')) {
            console.error('🚨 MALFORMED COOKIE FOUND:', cookie)
            // Get stack trace to see where it came from
            console.trace('Creation stack trace:')
          }
        })
        
        lastCookies = currentCookies
      }
    }
    
    const interval = setInterval(checkCookies, 500)
    return () => clearInterval(interval)
  }, [])

  return null
}