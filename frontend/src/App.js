import React from 'react';
import './App.css';
import {useTranslation} from "react-i18next";

function App() {
    const { t } = useTranslation();

    return <h1>{t('description.part2')}</h1>
}

export {
    App,
}