import React, { useEffect, useState } from "react";
import FormModel from "../../Form/FormModel/FormModel";
import { z } from "zod";
import { FormActions, useRegister } from "../../../../context/Register/FormContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { usePasswordValidation } from "../../../../hooks/Password/usePasswordValidation";
import InputModel, { Field } from "../../Input/InputModel/InputModel";
import { REGISTER_4 } from "../../../../contants/Paths/paths";
import { TEXT_GRAY_500, TEXT_RED_600 } from "../../../../contants/classnames/classnames";
import { Form } from "../../Form/FormWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../Button/Button";
import TextModel from "../../Text/Text";
import { useNavigate } from "react-router-dom";
import { ErrorsPassword } from "./components/ErrorsPassword/ErrorsPassword";
import { PasswordProps } from "./@types/PasswordProps";
import { Register3Fields } from "./components/Register3Form/Register3Fields";



const FormStep3: React.FC = () => {
    
    const {state} = useRegister();

    const {customErrors, handlePasswordChange, handleConfirmPasswordChange } = usePasswordValidation();

    const [passwordChanged, setPasswordChanged] = useState(false);

    const [confirmPasswordChanged, setConfirmPasswordChanged] = useState(false);

    const navigate = useNavigate();

    const schema = z.object({ 
        password: z.string().min(1,"Password can't be empty!").refine(pass => customErrors.length === 0, {message: " "}), 
        confirmPassword: z.string().min(1,"Confirm Password can't be empty!").refine(pass => customErrors.length === 0,{message: " "})
     });


    const {register,handleSubmit,formState:{errors}} = useForm<PasswordProps>({
        resolver: zodResolver(schema),
        mode: 'all',
        criteriaMode: 'all',
    });

    const { dispatch } = useRegister();

    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handlePasswordChange(e);
        setPasswordChanged(true);
    };

    const handleConfirmPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleConfirmPasswordChange(e);
        setConfirmPasswordChanged(true);
    };

    const onSubmit = (data: PasswordProps) => {
        
        const { password, confirmPassword } = data;

        dispatch({
            type: FormActions.setStep3,
            payload: { password, confirmPassword },
        });

        navigate(REGISTER_4);

    };

    useEffect(()=> {

        console.log(state);
        
    },[state]);


    const fields: Field[] = [
        { label: "Password", type: "password", placeholder: "*********", name: "password", onChange: handlePasswordInputChange, register: register },
        { label: "Confirm Password", type: "password", placeholder: "*********", name: "confirmPassword", onChange: handleConfirmPasswordInputChange, register: register  },
    ];


    return (
        


        <Form.Container>

                <Form.Wrapper>

                    <Form.Heading content="Create your password using our check list" />


                    <form onSubmit={handleSubmit(onSubmit)}>

                    <Register3Fields errors={errors} fields={fields} />
                    
                    {(passwordChanged || confirmPasswordChanged) && 
                     <ErrorsPassword  errors={customErrors}/>
                    }

                    <Button text = {'Próximo'} />

                    </form>
                    


                </Form.Wrapper>

        </Form.Container>

    );
};

export default FormStep3;