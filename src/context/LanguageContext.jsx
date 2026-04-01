import { createContext, useState } from "react"
import { id } from "../lang/id"
import { en } from "../lang/en"

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(id)

  const changeLang = (language) => {
    setLang(language === "id" ? id : en)
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLang }}>
      {children}
    </LanguageContext.Provider>
  )
}