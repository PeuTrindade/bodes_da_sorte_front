type TLogin = {
    email: string
    password: string
}

type TSignUp = {
    name: string
    email: string
    password: string
}

export const login = async (data: TLogin) => {
    try {
        const url = 'https://lojaodainformatica.com.br/users/login';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        return error;
    }

};

export const signUp = async (data: TSignUp) => {
    try {
        const url = 'https://lojaodainformatica.com.br/users/register';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
        });

        return response;
    } catch (error) {
        return error;
    }

};

export const addTelephone = async (data: any, token: string) => {
    try {
        const url = 'https://lojaodainformatica.com.br/admin-tool';

        const response = await fetch(url, {
            method: 'PATCH',
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

export const getTelephone = async (token: string) => {
    try {
        const url = 'https://lojaodainformatica.com.br/admin-tool/1';

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