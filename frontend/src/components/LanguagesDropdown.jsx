import Select from "react-select"
import { languageOptions } from "../constants/langDropdown"
import { useContext } from "react"
import { YjsContext } from "../context/YjsContext"

const LanguagesDropdown = () => {
  const { setLanguage, language } = useContext(YjsContext)
  const changeHandler = (selectedOpton) => {
    setLanguage(selectedOpton)
  }
  return (
    <Select
        options={languageOptions}
        defaultValue={language}
        onChange={changeHandler}
        placeholder={`Choose a language`}
    />
  )
}

export default LanguagesDropdown
