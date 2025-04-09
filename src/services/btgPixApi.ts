import axios from 'axios';

export interface PixResponse {
    id: string;
    txId: string;
    status: string;
    pixKey: string;
    displayText: string;
    amount: { value: number; allowCustomerChangeValue: boolean };
    location: {
        id: string;
        integrationId: string;
        type: string;
        path: string;
        description: string;
        url: string;
        integrationUrl: string;
    };
    emv: string; // Código "copia e cola"
    qrCodeUrl: string; // URL do QR code
}

const BTG_API_BASE_URL = 'https://api.sandbox.empresas.btgpactual.com/v1';
const YOUR_COMPANY_ID = 'SEU_COMPANY_ID_AQUI'; // Substitua pelo seu companyId
const ACCESS_TOKEN = 'SEU_ACCESS_TOKEN_AQUI'; // Substitua pelo token gerado via BTG Id

export const createPixCharge = async (amount: number, description: string): Promise<PixResponse> => {
    try {
        const response = await axios.post(
            `${BTG_API_BASE_URL}/companies/${YOUR_COMPANY_ID}/pix-cash-in/instant-collections`,
            {
                amount: amount * 100, // Valor em centavos (ex.: 10.00 -> 1000)
                description: description || 'Aposta Bodes de Sorte',
                allowCustomerChangeValue: false,
            },
            {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                    'x-idempotency-key': `${Date.now()}`, // Garante idempotência
                },
            }
        );

        const data = response.data;
        return {
            id: data.id,
            txId: data.txId,
            status: data.status,
            pixKey: data.pixKey,
            displayText: data.displayText,
            amount: data.amount,
            location: data.location,
            emv: data.emv, // Código copia e cola
            qrCodeUrl: data.location.url, // URL do QR code
        };
    } catch (error) {

        throw new Error('Falha ao gerar o Pix. Verifique as credenciais ou tente novamente.');
    }
};
