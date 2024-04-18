import React from 'react'
import {MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";


const DropdownComponent = (props) => {
    const {t, i18n} = useTranslation();
    const [valueQ, setValueQ] = React.useState();

    function chooseQuestion(event) {
        console.log(event.target.value);
        setValueQ(event.target.value);
    }

    return (
        <div className="menu-container">
            <Select name="selectedOption" onChange={chooseQuestion}>
                <MenuItem value={t("taste")}>{t("q1")}</MenuItem>
                <MenuItem value={t("culture")}>{t("q2")}</MenuItem>
                <MenuItem value={t("memories")}>{t("q3")}</MenuItem>
            </Select>
            {/*<h2>{valueQ}</h2>*/}
        </div>
    )
}

export default DropdownComponent;