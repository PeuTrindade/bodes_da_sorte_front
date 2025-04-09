export const getDestinations = async (token: string) => {
    try {
        const url = 'https://lojaodainformatica.com.br/destination';

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

export const updateDestination = async (id: string, data: any, token: string) => {
    try {
        const url = `https://lojaodainformatica.com.br/destination/${id}`;

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
