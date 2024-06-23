import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { http } from "../ConectAPI/conectApi";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Feedback } from "../../@types/Feedback/Feedback";

import { formatInTaxId } from "../../functions/Formatters/FormatInTaxId/formatInTaxId";
import { TO_WEBSOCKET } from "../../contants/divisionValues/divisionValues";
import { PAY_IN_DATA } from "../../contants/sessionStorageKeys/sessionStorageKeys";

export type PayinData = {

    createdAt: string;
    payerName: string;
    chain: string;
    taxId: string;
    operationName: string;
    amount: number;
    id: string;
    icon: IconProp;
    coin: string;

}

export type ExpectedPayInData = {

    createdAt: string;
    payerName: string;
    title: string;
    taxId: string;
    operationName: string | null;
    amount: number;
    id: string;
    icon: IconProp;
    feedback: Feedback | null;
    walletAddress: string;
    transfers: any;
    tx: string | null;
    coin: string;

}



export async function getPayInData(): Promise<ExpectedPayInData[]> {

    try {

        const request = await http.get('/pay-in/pix/history', {
            withCredentials: true
        });


        const data = request.data.depositsLogs.map((item: any) => {
        
            
            
            const { createdAt, payerName,coin, chain } = item;
            const smartContractOps = item.mintOps[0]?.smartContractOps || [];
            const operationName = item.mintOps.reduce((acc: string, op: any) => {
                if (!op.smartContractOps) return acc;
                op.smartContractOps.forEach((sm: any) => acc = sm.operationName);
                return acc;
            }, '');

            const title = payerName;
            const icon = faPlus;
            let { id,amount } = item.mintOps[0];

            const tx = smartContractOps.length > 0 ? smartContractOps.flatMap((item: any) => item.tx)[0] : null;
            const feedback = smartContractOps.length > 0 ? smartContractOps[0].feedback : null;

            return {
                
                walletAddress: formatInTaxId(item.taxId),
                createdAt,
                title,
                chain,
                operationName,
                amount: (amount / TO_WEBSOCKET),
                id,
                icon,
                feedback,
                coin,
                tx: tx,
            
            };
        
        });

        sessionStorage.setItem(PAY_IN_DATA, JSON.stringify(data));

        return data;

    } catch (e: any) {

        throw new Error("Erro ao pegar dados de recebimento: " + (e.data?.message || e.message));


    }
}
