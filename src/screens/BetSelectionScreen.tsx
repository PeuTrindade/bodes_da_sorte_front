import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types/index'; // Importe o tipo
import { getToken } from 'utils/secure_token';
import { getBetTypes } from 'requests/betTypes';

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

const OptionCard = styled.TouchableOpacity`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius}px;
  margin-bottom: ${theme.spacing.medium}px;
  ${theme.shadow};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OptionLabel = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.primary};
`;

const PriceText = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  color: ${theme.colors.secondary};
`;

const BetSelectionScreen = () => {
  const selectedDestino = useSelector((state: RootState) => state.bets.selectedDestino);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [betTypes, setBetTypes] = useState<any[]>([]);

  const handleSelectOption = (item: any) => {
    navigation.navigate('Payment', { item });
  };

  const getData = useCallback(async () => {
    try {
      setLoading(true);

      const token = await getToken() as string;

      const response = await getBetTypes(token) as Response;

      if (response.ok) {
        const data = await response.json();

        setBetTypes(data);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.info(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container>
      <Title>Aposta no {selectedDestino.name}</Title>
      {loading ? <ActivityIndicator size="large" color="#3498db" /> : <FlatList
        data={betTypes.sort((a, b) => a.price - b.price)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OptionCard onPress={() => handleSelectOption(item)}>
            <OptionLabel>{item.name}</OptionLabel>
            <PriceText>R$ {item.price.toFixed(2)}</PriceText>
          </OptionCard>
        )}
      />}
    </Container>
  );
};

export default BetSelectionScreen;
