import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { formatWalletAddress } from "../../service/Formatters/FormatWalletAddress/formatWalletAddress";
import { http } from "../ConectAPI/conectApi";
import { ExpectedConversionData, getConversionData } from "../ValuesListingController/getConversionData";


type ExpectedOnChainInData = {

    fromAddress: string;
    toAddress: string;
    amount: string;
    createdAt: string;
    chain: string;
    tx:string;

}

export const getOnChainInData =  async () => {

    try {

        const request = await http.get('/on-chain/history/in', {
            withCredentials: true,
        });


        const conversionData = await getConversionData();
        
        
        const data = request.data.onchainLogs.map((item: ExpectedOnChainInData) => {

            const tx = conversionData.filter((data: ExpectedConversionData) => data.tx === item.tx);      
            
            const operationName = tx ? '' : 'MINT';
            const createdAt = tx ? '' : item.createdAt;
            
            return {

            operationName:  operationName,
            walletAddress: formatWalletAddress(item.fromAddress),
            amount: parseFloat(item.amount),
            createdAt: createdAt,
            title: item.chain,
            icon: faPlus,
            tx: item.tx
        

        }});

        return data;
        

    } catch(e:any) {

        throw new Error("Erro ao pegar dados de onChain in: ", e.message || e.data?.message);

    }

}