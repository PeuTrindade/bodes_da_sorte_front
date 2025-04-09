export interface Destino {
    id: string; // e.g., "1º Destino"
    prize: string; // e.g., "Prêmio A"
    availableNumbers: number; // e.g., 10000 (10% of 100K)
}

export interface BetOption {
    id: string;
    label: string; // e.g., "1 número"
    price: number; // e.g., 10
    quantity: number; // e.g., 1, 100, 300, etc.
}

export interface Bet {
    id: string;
    destinoId: string;
    numbers: string[]; // e.g., ["012345"]
    price: number;
    date: string;
    status: 'pending' | 'won' | 'lost';
}

export interface User {
    id: string;
    isAdmin: boolean;
}
export type RootStackParamList = {
    Home: undefined;
    BetSelection: undefined;
    Payment: { item: any };
    BetConfirmation: { item: any };
    MyBets: undefined;
    Results: undefined;
    Login: undefined;
    AdminSettings: undefined;
    SignUp: undefined
    AddPackage: undefined
    Winners: undefined
    ApproveBets: undefined
    AddTelephone: undefined
};
