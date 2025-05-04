
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { theme } from '../styles/theme';
import { getToken } from 'utils/secure_token';
import { getBets, verifyBets } from 'requests/bet';
import BetCardComponent from 'components/BetCard';
import { ActivityIndicator } from 'react-native';
import { getDestinations } from 'requests/destinations';

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

const FilterContainer = styled.View`
  margin-bottom: ${theme.spacing.large}px;
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius}px;
  ${theme.shadow};
`;

const EmptyMessage = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.textLight};
  text-align: center;
  margin-top: ${theme.spacing.large}px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

const MyBetsScreen = () => {
    const [bets, setBets] = useState<any[]>([]);
    const [filter, setFilter] = useState<string>('all');
    const [loading, setLoading] = useState(true);
    const [filterOptions, setFilterOptions] = useState<any[]>([]);

    const getDestinationsIds = useCallback(async () => {
        try {
            setLoading(true);

            const token = await getToken() as string;

            const response = await getDestinations(token) as Response;

            if (response.ok) {
                const data = await response.json();
                const info = data.map((d: any) => ({ value: d.id, label: d.name }));

                return info;
            }

            setLoading(false);

            return [];
        } catch (error) {
            setLoading(false);
            console.info(error);
        }
    }, []);

    const getBetsFn = useCallback(async (status?: string, destinationId?: string) => {
        try {
            const token = await getToken() as string;

            const verifyResponse = await verifyBets(token) as Response;

            if (verifyResponse.ok) {
                let response: any;

                if (!status && !destinationId) {
                    response = await getBets(token) as Response;
                } else {
                    const data = {
                        status,
                        destinationId
                    };

                    response = await getBets(token, data) as Response;
                }

                if (response.ok) {
                    const data = await response.json();

                    setBets(data);
                }
            }
        } catch (error) {
            console.info(error);
        }
    }, []);

    useEffect(() => {
        const getInfo = async () => {
            setLoading(true);

            await getBetsFn();
            const destinationsValue = await getDestinationsIds();

            const filters = [
                { label: 'Todas', value: undefined },
                ...destinationsValue.sort((a: any, b: any) => a.label.localeCompare(b.label, 'pt', { sensitivity: 'base' })),
                { label: 'Ganhou', value: 3 },
                { label: 'Perdeu', value: 4 }
            ];


            setFilterOptions(filters);

            setLoading(false);
        };

        getInfo();
    }, [getBetsFn, getDestinationsIds]);

    console.log(bets);

    return (
        <Container>
            <Title>Minhas Apostas</Title>
            {loading ? <ActivityIndicator size="large" color={theme.colors.primary} /> : <>
                <FilterContainer>
                    <Picker
                        selectedValue={filter}
                        onValueChange={async (itemValue) => {
                            setLoading(true);

                            setFilter(itemValue);

                            if (itemValue == '3' || itemValue == '4') {
                                await getBetsFn(itemValue);
                            } else if (itemValue == undefined) {
                                await getBetsFn();
                            } else {
                                await getBetsFn(undefined, itemValue);
                            }

                            setLoading(false);
                        }}
                        style={{ color: theme.colors.text }}
                    >
                        {filterOptions.map((option, index) => (
                            <Picker.Item key={index} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                </FilterContainer>

                <ScrollContainer>
                    {bets.length > 0 ? bets.map((b, index) => (
                        <BetCardComponent index={index} item={b} key={index} />
                    )) : <EmptyMessage>Nenhuma aposta encontrada para esse filtro.</EmptyMessage>}
                </ScrollContainer>
            </>
            }
        </Container>
    );
};

export default MyBetsScreen;