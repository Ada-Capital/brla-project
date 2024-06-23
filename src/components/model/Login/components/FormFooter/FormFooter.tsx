import { Link } from "react-router-dom"
import { TEXT_GRAY_600 } from "../../../../../contants/classnames/classnames"
import TextModel from "../../../Text/Text"
import { REGISTER_1 } from "../../../../../contants/Paths/paths"



export const FormFooter = () => {


    return (
        <div className={`flex flex-col gap-2`}>

        <TextModel 
            color={TEXT_GRAY_600}
            addons={'text-sm'}
            content={
                <>
                    <Link className="hover:underline" to={REGISTER_1}>Não tem conta ainda? Cadastre-se</Link>
                </>
            } 
        />
        
    </div>
    );
    
}