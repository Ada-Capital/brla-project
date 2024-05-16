import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { InputHTMLAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import 'dayjs/locale/pt'; // Importe a localidade que deseja, neste caso, português do Brasil
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat); // Habilita o processamento de formato customizado

interface InputDateProps extends InputHTMLAttributes<HTMLInputElement> {
    control: Control<any, any, any>;
    name: string;
    label: string;
    
}

export const InputDate = ({ control, name, label }: InputDateProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
            <Controller
                control={control}
                name={name}
                rules={{ required: true }}
                render={({ field }) => {
                    return (
                        <DatePicker
                            label={label}
                            value={field.value ? dayjs(field.value, "DD/MM/YYYY") : null}
                            onChange={(date) => {
                                field.onChange(date ? date.format("DD/MM/YYYY") : null);
                            }}
                            
                            
                        />
                    );
                }}
            />
        </LocalizationProvider>
    );
};
