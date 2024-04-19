import React, {useState} from 'react'
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useTranslation} from "react-i18next";


const DropdownComponent = (props) => {
    const {t, i18n} = useTranslation();
    const [valueQ, setValueQ] = React.useState();

    const handleClose = event => {
        setValueQ(null)

        // grab the value of the "value" attribute here
        console.log(event.target.getAttribute("value"))
    }

    const handleClick = event => {
        setValueQ(event.currentTarget)
    }

    function chooseQuestion(event) {
        console.log(event.target.value);
        setValueQ(event.target.getAttribute("value"));
    }


    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
    };


    return (
        <FormControl sx={{width: 240, height: 100}}>
            <InputLabel id="demo-simple-select-label">Question</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="Question"
                height={100}
                // onChange={handleChange}>
                onChange={handleChange}>
                <MenuItem value="ddd">{t("q1")}</MenuItem>
                <MenuItem value={t("culture")}>{t("q2")}</MenuItem>
                <MenuItem value={t("memories")}>{t("q3")}</MenuItem>
            </Select>
            <p>{"You selected ${value}"}</p>
            {/*<h2>{valueQ}</h2>*/}
        </FormControl>
    )
}

export default DropdownComponent;