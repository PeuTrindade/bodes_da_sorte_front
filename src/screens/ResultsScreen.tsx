/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { updateBetStatus } from '../store/betSlice';
import { theme } from '../styles/theme';
import { fetchLatestFederalResults, FederalResult } from '../services/caixaApi';

const Container = styled.View`
  flex: 1;
  padding: ${theme.spacing.large}px;
  background-color: ${theme.colors.background};
`;

const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 24px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.large}px;
  text-align: center;
`;

const ResultCard = styled.View`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius}px;
  ${theme.shadow};
  margin-bottom: ${theme.spacing.medium}px;
`;

const ResultText = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 18px;
  color: ${theme.colors.primary};
`;

const DateText = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${theme.colors.textLight};
  text-align: center;
  margin-bottom: ${theme.spacing.medium}px;
`;

const ResultsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const bets = useSelector((state: RootState) => state.bets.bets);
    const [results, setResults] = useState<FederalResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadResults = async () => {
            try {
                const data = await fetchLatestFederalResults();
                setResults(data);

                // Atualizar status das apostas
                bets.forEach(bet => {
                    const destinoIndex = parseInt(bet.destinoId.charAt(0)) - 1; // "1º Destino" -> 0, "2º Destino" -> 1, etc.
                    const winningNumber = data.dezenas[destinoIndex];
                    const isWinner = bet.numbers.includes(winningNumber);
                    dispatch(updateBetStatus({ betId: bet.id, status: isWinner ? 'won' : 'lost' }));
                });
            } catch (error) {
                console.error('Erro ao carregar resultados:', error);
            } finally {
                setLoading(false);
            }
        };
        loadResults();
    }, [bets, dispatch]);

    if (loading) {
        return (
            <Container>
                <Title>Carregando Resultados...</Title>
            </Container>
        );
    }

    return (
        <Container>
            <Title>Resultados da Federal</Title>
            <DateText>Sorteio de {results?.data || 'Data indisponível'}</DateText>
            <FlatList
                data={results?.dezenas.map((number, index) => ({
                    id: `${index + 1}º Destino`,
                    number,
                }))}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ResultCard>
                        <ResultText>{item.id}: {item.number}</ResultText>
                    </ResultCard>
                )}
            />
        </Container>
    );
};

export default ResultsScreen;
