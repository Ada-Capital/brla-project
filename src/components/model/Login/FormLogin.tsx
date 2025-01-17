import React, {  useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextModel from '../Text/Text';
import { Field } from '../../types/Field/Field';
import FormModel from '../Form/FormModel/FormModel';
import { z } from 'zod';
import { loginController } from '../../controller/LoginController/loginController';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { connectWebSocket } from '../../controller/WebSocketController/connectWebSocket';
import { WebSocketActions, useWebSocket } from '../../context/WebSocketContext';
import { BUTTON_PADDING, DEFAULT_ICON_SIZE, DEFAULT_TEXT_SIZE, FLEX, ROUNDED_DEFAULT, TEXT_GRAY_600, TEXT_SMALL, WIDTH_FULL } from '../../contants/classnames/classnames';
import { REGISTER_1, TO_HOME } from '../../contants/Paths/paths';
import { USER_LOGGED } from '../../contants/sessionStorageKeys/sessionStorageKeys';


type LoginData = {
    email: string;
    password: string;
}

const FormLogin: React.FC = () => {

    const [error, setError] = useState('');
    const {dispatch } = useWebSocket();
    
    const fields: Field[] = [
        { type: "email", placeholder: "Digite seu email", name: "email", icon: faEnvelope},
        { type: "password", placeholder: "Senha", name: "password", icon: faLock }
    ];

    const navigate = useNavigate();
    
    async function handleSubmit(data: LoginData) {

        if(error) {
            setError('');
        }

        const { email, password } = data;
                

            try {
    
                await loginController(email, password);

                try {
                   
                    const webSocket = await connectWebSocket();

                    dispatch({
                        type: WebSocketActions.setWebSocket,
                        payload: { webSocket },
                    });

                    sessionStorage.setItem(USER_LOGGED, email);
                    navigate(TO_HOME);

                } catch(e:any) {

                    setError('Falha ao conectar-se ao servidor');
                }

            }  catch(e:any) {

                setError('Dados inválidos!');
              

            }
 
    } 

    const schema = z.object({
        email: z.string().email('Email inválido'),
        password: z.string().min(1, 'Senha é obrigatória'),
    });

    const formFooter = (

        <div className={`${FLEX} flex-col gap-2`}>
            <TextModel 
                color={TEXT_GRAY_600}
                addons={TEXT_SMALL}
                content={
                    <>
                        Não tem conta ainda?{' '}
                        <Link className="hover:underline" to={REGISTER_1}>Cadastre-se</Link>
                    </>
                } 
            />
        </div>
    );

    return (

        <>
            <FormModel 

                schema={schema} 
                buttonText='Login' 
                fields={fields} 
                onSubmit={handleSubmit}
                submitError={error}

            />

            <hr className='my-5' />

            {formFooter}

        </>

    );
}
 

export default FormLogin;
