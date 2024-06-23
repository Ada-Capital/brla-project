import { useEffect, useState } from "react"
import { RegisterActions, useRegisterForStep1 } from "../../../context/Register1Context";



export const useCountry = () => {


    const [country, setCountry] = useState('');
    const [countryValue, setCountryValue] = useState('');
    const {dispatch} = useRegisterForStep1();


    useEffect(()=> {

        dispatch({
            type:RegisterActions.setCountry,
            payload: {country}
        })


            dispatch({
                type:RegisterActions.setCountryValue,
                payload: {countryValue}
            })

    },[country])

    return {

        country,
        setCountry,
        countryValue,
        setCountryValue,
    }
}