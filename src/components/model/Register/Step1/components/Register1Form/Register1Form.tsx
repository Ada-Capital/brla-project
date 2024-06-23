import { Controller, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod";
import  { Field } from "../../../../Input/InputModel/InputModel";
import { faEnvelope, faPen, faPerson, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "../../../../Button/Button";
import { PersonTypeCheckBox } from "../PersonTypeCheckbox/PersonTypeCheckbox";
import { Register1State, useRegisterForStep1 } from "../../context/Register1Context";
import { zodResolver } from "@hookform/resolvers/zod";
import { PJFields } from "../PJFields/PJFields";
import { useCnpj } from "./hooks/useCnpj";
import { useTranslation } from "react-i18next";
import { PFFields } from "../PFFields/PFFields";
import { usePhone } from "./hooks/usePhone";
import { useCpf } from "./hooks/useCpf";
import { useSubmit } from "./hooks/useSubmit";
import { useNavigate } from "react-router-dom";
import { isRegnum } from "./functions/isRegnum";
import TextModel from "../../../../Text/Text";
import { TEXT_RED_600 } from "../../../../../../contants/classnames/classnames";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { REGISTER_2 } from "../../../../../../contants/Paths/paths";
import { countries } from "../../../../../../contants/Countries/countries";
import { TermAndServiceCheckBox } from "../TermAndService/TermAndService";




export const Register1Form = () => {
   
  
  const {state} = useRegisterForStep1();
    const {t, i18n} = useTranslation();
    const {handleCnpjValidation} = useCnpj();
    const {cpf, handleCpfChange, handleCpfValidation} = useCpf();
    // const {handlePhoneChange,phone, handlePhoneValidation} = usePhone();
    const {submitEvents,RegisterCases} = useSubmit();  
    const [regnumPhone, setRegnumPhone] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    const register1Schema = z.object({
     
      email: z.string().email(t("Email não pode ser vazio")),

      phone: z.string().min(1, t("O Telefone precisa ser preenchido")).min(1,t('O telefone não pode ficar vazio')),
      
      fullname: z.string().min(1,t('O nome não pode ficar vazio')),
     
      cpf: z.string().optional().refine(cpf => {
        if (!isRegnum(state.country)) {
            return handleCpfValidation(cpf || '');
        }
        return true;
    }, { message: "CPF inválido" }),
      
      birthDate: z.string().min(1,t('Insira sua data de aniversário')),

      ...(isRegnum(state.country) && {

        dataRegnum : z.object({

      
          regnum : z.string().min(1,t('Document number is required!')),
      
        }).optional(),
      
      }),
      
      country: z.string({required_error: t('País é necessário para o cadastro!')}),
      
      ...(state.isPJ &&{
      
        dataPJ: z.array(z.object({
      
          ...(!isRegnum(state.country) && {
            cnpj: z.string({required_error: t('CNPJ é necessário para o cadastro!')})
            .min(1,t('CNPJ não pode ficar vazio'))
            .refine(cnpj => handleCnpjValidation(cnpj),{message: t('CNPJ inválido')}),
          }),
          startDate: z.string().min(1, t('A data não pode ser vazia')),
          companyName: z.string().min(1, t('O nome não pode ser vazio')),

        })).optional(),

      })

    });

    const {handleSubmit, register, formState: {errors}, control, watch} = useForm<Register1State>({
      resolver: zodResolver(register1Schema),
      mode: 'all',
      criteriaMode: 'all',
    
    });


    const {fields, append, remove} = useFieldArray<Register1State>({

      name: 'dataPJ',
      control: control

    });

    const handlePersonTypeCLick = () => {
   
      append(

        {
        
          cnpj: '',
         startDate: '',
         companyName: '',
      
        }
      
      )

      if(fields.length===1){
        remove(fields.length-1)
      }
    
    }

    const pfFields: Field[] = [
  
      { type: "email", 
        placeholder: "Email", 
        name: "email", 
        icon: faEnvelope, 
        register: register
      
      },

      { 

        type: "text",
        placeholder: t("Nome completo"), 
        name: "fullname", icon: faPen, 
        register: register
      
      },

      ...(!isRegnum(state.country) ? [
        { 

        type: "text",
        placeholder: "CPF (111.111.111-11)", 
        name: "cpf", icon: faPerson, 
        value: cpf, 
        onChange: handleCpfChange,
        register: register
       
      },
      // { 

      //   type: "tel",
      //   placeholder: t("Celular (11 11111-1111)"), 
      //   name: "phone", icon: faPhone, 
      //   value: phone, 
      //   onChange: handlePhoneChange,
      //   register: register
       
      
      // },
    
    ] : []),
     
    ];

    
    const onSubmit = (data:Register1State) => {
    
      
      const cases = {
       
        actions: {
       
          submitForPj: state.isPJ && !isRegnum(state.country),
          submitForPf: !state.isPJ && !isRegnum(state.country),
          submitForRegnum: isRegnum(state.country)
        
        }

      }
      
      
      if(cases.actions.submitForPf) {
        data.phone = phone
        submitEvents(data, RegisterCases.submitForPf);

      } else if(cases.actions.submitForPj) {
        data.phone = phone
        submitEvents(data, RegisterCases.submitForPj)

      } else if(cases.actions.submitForRegnum) {

        console.log(data);
        
        submitEvents(data,RegisterCases.submitForRegnum)

      }
      
      navigate(REGISTER_2);

      
    }
  

    return (

<form onSubmit={handleSubmit(onSubmit)}>

            <PFFields

fields={pfFields}
              register={register} 
              control={control} 
              errors={errors}

/>

        {
          
            <div>
          
              <Controller
            
            control={control}
                  name={"phone"}
                  rules={{ required: true }}
                  render={({ field }) => (
            
                    <PhoneInput 
                          defaultCountry={state.countryValue as any}
                          Country={state.countryValue as any}
                          placeholder={t('phone')}
                          value={regnumPhone}
                          ref={field.ref}
                          onChange={value => {
            
                            if(value){
                                  setRegnumPhone(value);
                                  setPhone(value);
                              }                             
                             
                              field.onChange(value); 
                          }}
                     
                          />
               
                        )}
              
              />
              
              {errors.phone &&
                 <TextModel
                 addons={`text-sm`}
                 color={TEXT_RED_600}
                 content={errors.phone}
                />
              }

          
            </div>
            
            }
            <TermAndServiceCheckBox/>
            
            <PersonTypeCheckBox onClick={handlePersonTypeCLick} />
            
            {state.isPJ && 
            
            <PJFields
            
            fields={fields}
             register={register} 
             errors={errors}
             control={control}
           
           />}
           
           <Button
              
              text = {t('Próximo')}
            />


        </form>

);




  }