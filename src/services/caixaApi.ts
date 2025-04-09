import axios from 'axios';

export interface FederalResult {
    dezenas: string[]; // Array com os 5 números sorteados (1º a 5º destino)
    data: string; // Data do sorteio
}

export const fetchLatestFederalResults = async (): Promise<FederalResult> => {
    try {
        const response = await axios.get('https://loteriascaixa-api.herokuapp.com/api/federal/latest');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar resultados da Federal:', error);
        throw error;
    }
};
