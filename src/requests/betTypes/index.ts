export type TCreateBetType = {
    name: string
    price: number
    amount: number
}

export const getBetTypes = async (token: string) => {
    try {
        const url = 'https://lojaodainformatica.com.br/bet-type';

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

export const updateBetType = async (id: string, data: any, token: string) => {
    try {
        const url = `https://lojaodainformatica.com.br/bet-type/${id}`;

        const response = await fetch(url, {
            method: 'PUT',
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

export const createBet = async (data: TCreateBetType, token: string) => {
    try {
        const url = 'https://lojaodainformatica.com.br/bet-type';

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

export const deleteBetType = async (id: string, token: string) => {
    try {
        const url = `https://lojaodainformatica.com.br/bet-type/${id}`;

        const response = await fetch(url, {
            method: 'DELETE',
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
