import React, { useState } from "react"
import  { DarkModeToggle } from "react-dark-mode-toggle-2"

const myThemes = [
  {
    id: "theme-light",
    name: "Midnight Green",
  },
  {
    id: "theme-dark",
    name: "Twitter Dark",
  },
]

const ThemePicker = ({ theme, setTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(theme === myThemes[1].id)

  function onChange() {
    setIsDarkMode(state => !state)
    setTheme(isDarkMode ? myThemes[0].id : myThemes[1].id)
  }

  return (
    <DarkModeToggle
      onChange={onChange}
      isDarkMode={isDarkMode}
      size={80}
      speed={100}
    />
  )
}

export default ThemePicker
