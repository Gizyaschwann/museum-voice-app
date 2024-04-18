import React from 'react'
import {useTranslation} from "react-i18next";
import {MenuItem, Select, Button, InputLabel, FormControl} from "@mui/material";


const languages = [
    {code: 'en', lang: 'English'},
    {code: 'es', lang: 'Español'},
]

const LanguageSelector = () => {
    const {i18n} = useTranslation()

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    return (
        <div className="button-flex">
            {languages.map((lng) => {
                return (
                    <Button variant="contained"  aria-label="Basic button group" className={lng.code === i18n.language ? "selected" : ""}
                            key={lng.code} onClick={() => changeLanguage(lng.code)}>
                        {lng.lang}
                    </Button>
                )
            })}
        </div>
    )
}

export default LanguageSelector;