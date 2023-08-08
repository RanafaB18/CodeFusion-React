import Select from "react-select"
import { languageOptions } from "../constants/langDropdown"

const LanguagesDropdown = ({ setLanguage }) => {
  return (
    <Select
        options={languageOptions}
        defaultValue={languageOptions[0]}
        onChange={(selectedOption) => setLanguage(selectedOption)}
        placeholder={`Choose a language`}
    />
  )
}

export default LanguagesDropdown
