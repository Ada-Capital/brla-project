import { State } from "../../types/State/State";
import { http } from "../ConectAPI/conectApi";



export async function registerController  (data:State) {


    const body = { ...data };

  
    try {

      const response = await http.post('/create', body);

      return response;


    } catch (error: any) {

      console.error('Error during register:', error.response?.data || error.message);
      
    }

}
