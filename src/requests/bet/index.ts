export const createBet = async (data: any, token: string) => {
    try {
        const url = 'https://lojaodainformatica.com.br/bet';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        return error;
    }
};

export const getBets = async (token: string, data?: any) => {
    try {
        const baseUrl = 'https://lojaodainformatica.com.br/bet/all';

        const params = new URLSearchParams();
    
        if (data?.status && data.status !== 'undefined' && data.status !== '') {
          params.append('status', data.status);
        }
    
        if (data?.destinationId && data.destinationId !== 'undefined' && data.destinationId !== '') {
          params.append('destinationId', data.destinationId);
        }
    
        const queryString = params.toString();
        const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        return response;
    } catch (error) {
        return error;
    }

};

export const verifyBets = async (token: string) => {
    try {
        const url = 'https://lojaodainformatica.com.br/bet/verify';

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        return error;
    }

};

export const approveBet = async (data: any, token: string) => {
    try {
        const url = 'https://lojaodainformatica.com.br/bet/status';

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        return response;
    } catch (error) {
        return error;
    }

};

export const verifyAdminBets = async (token: string) => {
    try {
        const url = 'https://lojaodainformatica.com.br/bet/adminVerify';

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        return error;
    }

};

export const getPendingBets = async (token: string) => {
    try {
        const url = 'https://lojaodainformatica.com.br/bet/pending';

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        return error;
    }

};