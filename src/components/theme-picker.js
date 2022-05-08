import React, { useState } from "react"
import { DarkModeSwitch } from "react-toggle-dark-mode"

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
    <DarkModeSwitch
      sunColor="yellow"
      checked={isDarkMode}
      onChange={onChange}
      size={30}
    />
  )
}

export default ThemePicker
