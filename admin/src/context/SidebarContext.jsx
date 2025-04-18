import { createContext, useState, useContext, useEffect } from "react"

const SidebarContext = createContext(null)
export function SidebarProvider({ children }) {
  const [isLargeOpen, setIsLargeOpen] = useState(true)
  const [isSmallOpen, setIsSmallOpen] = useState(false)
  const [selectedPageURL, setSelectedPageURL] = useState(
    window.location.pathname
  )
  const isSmallScreen = () => {
    return window.innerWidth < 1024
  }

  const toggle = () => {
    if (isSmallScreen()) {
      setIsSmallOpen(s => !s)
    } else {
      setIsLargeOpen(l => !l)
    }
  }
  const close = () => {
    if (isSmallScreen()) {
      setIsSmallOpen(false)
    } else {
      setIsLargeOpen(false)
    }
  }
  useEffect(() => {
    const handler = () => {
      if (!isSmallScreen()) {
        setIsSmallOpen(false)
      }
    }
    window.addEventListener("resize", handler)
    return () => window.removeEventListener("resize", handler)
  }, [])
  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
        selectedPageURL,
        setSelectedPageURL
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export default function useSidebarContext() {
  const value = useContext(SidebarContext)
  if (value === null) {
    throw new Error("SidebarContext must be used within SidebarProvider")
  }
  return value
}


