import React, { useState } from "react";
import { DEFAULT_TEXT_SIZE, GAP_DEFAULT, ROUNDED_DEFAULT, TEXT_GRAY_400 } from "../../../../../../contants/classnames/classnames";
import { useTranslation } from "react-i18next";

export const TermAndServiceCheckBox = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className={`flex ${GAP_DEFAULT} my-3 md:items-center items-start`}>
            <input
                style={{ width: '1em', height: '1em' }}
                className={`checkbox h-3/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm ${ROUNDED_DEFAULT} focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                type="checkbox"
                required
                id="checkboxInput"
            />
            <label htmlFor="checkboxInput"
                className={`flex md:items-center flex-wrap ${GAP_DEFAULT} ${TEXT_GRAY_400} text-sm md:${DEFAULT_TEXT_SIZE}`}>
                {t('I agree with')}
                <a href="https://brla.digital/20231122_-_BRLA_Digital_-_Termos_de_Uso.pdf" target="_blank"  className="flex items-center text-gray-800 hover:underline">
                    {t('terms of service & privacy')}
                </a>
                <img className="w-5 h-5" src="/external-link.svg" alt="Image of a link anchor" />
            </label>
        </div>
    );
}