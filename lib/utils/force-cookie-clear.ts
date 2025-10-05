// Force clear problematic cookies on every page load
if (typeof window !== 'undefined') {
  // Run immediately when this module loads
  const clearProblematicCookies = () => {
    const cookies = document.cookie.split(';')
    let cleared = 0
    
    cookies.forEach(cookie => {
      const [name, value] = cookie.split('=')
      const trimmedName = name?.trim()
      const trimmedValue = value?.trim()
      
      // Clear any cookie with base64-eyJ value
      if (trimmedValue?.startsWith('base64-eyJ')) {
        console.log(`Force clearing problematic cookie: ${trimmedName}`)
        
        // Multiple attempts to clear the cookie
        document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
        document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost`
        document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.localhost`
        document.cookie = `${trimmedName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=127.0.0.1`
        
        cleared++
      }
    })
    
    if (cleared > 0) {
      console.log(`Force cleared ${cleared} problematic cookies`)
    }
  }
  
  // Run immediately
  clearProblematicCookies()
  
  // Also run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', clearProblematicCookies)
  } else {
    clearProblematicCookies()
  }
}
