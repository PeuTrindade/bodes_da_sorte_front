import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bet, Destino, BetOption } from '../types';

interface BetState {
    destinos: any;
    bets: Bet[];
    selectedDestino: any;
    betOptions: BetOption[];
}

const initialState: BetState = {
    destinos: [
        { id: '1º Destino', prize: 'Prêmio A', availableNumbers: 10000 },
        { id: '2º Destino', prize: 'Prêmio B', availableNumbers: 10000 },
        { id: '3º Destino', prize: 'Prêmio C', availableNumbers: 10000 },
        { id: '4º Destino', prize: 'Prêmio D', availableNumbers: 10000 },
        { id: '5º Destino', prize: 'Prêmio E', availableNumbers: 10000 },
    ],
    bets: [],
    selectedDestino: null,
    betOptions: [
        { id: '1', label: '1 número', price: 10, quantity: 1 },
        { id: '2', label: 'Pacote com 100 Números', price: 150, quantity: 100 },
        { id: '3', label: 'Pacote com 300 Números', price: 250, quantity: 300 },
        { id: '4', label: 'Pacote com 500 Números', price: 350, quantity: 500 },
        { id: '5', label: 'Pacote com 2500 Números', price: 1500, quantity: 2500 },
    ],
};

const betSlice = createSlice({
    name: 'bets',
    initialState,
    reducers: {
        setSelectedDestino(state, action: PayloadAction<Destino>) {
            state.selectedDestino = action.payload;
        },
        addBet(state, action: PayloadAction<Bet>) {
            state.bets.push(action.payload);
        },
        updateBetStatus(state, action: PayloadAction<{ betId: string; status: Bet['status'] }>) {
            const { betId, status } = action.payload;
            const bet = state.bets.find(b => b.id === betId);
            if (bet) {
                bet.status = status;
            }
        },
        updateBetOption(state, action: PayloadAction<BetOption>) {
            const index = state.betOptions.findIndex(opt => opt.id === action.payload.id);
            if (index !== -1) {
                state.betOptions[index] = action.payload;
            }
        },
        updateDestinoLimit(state, action: PayloadAction<{ destinoId: string; availableNumbers: number }>) {
            const { destinoId, availableNumbers } = action.payload;
            const destino = state.destinos.find(d => d.id === destinoId);
            if (destino) {
                destino.availableNumbers = availableNumbers;
            }
        },
    },
});

export const { setSelectedDestino, addBet, updateBetStatus, updateBetOption, updateDestinoLimit } = betSlice.actions;
export default betSlice.reducer;
