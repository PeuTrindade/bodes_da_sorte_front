import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { setSelectedDestino } from '../store/betSlice';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { theme } from '../styles/theme';
import { Destino } from '../types';
import { getDestinations } from 'requests/destinations';
import { getToken } from 'utils/secure_token';

const Container = styled.View`
  flex: 1;
  padding: ${theme.spacing.large}px;
  background-color: ${theme.colors.background};
`;

const Header = styled.View`
  margin-bottom: ${theme.spacing.large}px;
`;

const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 28px;
  color: ${theme.colors.text};
  text-align: center;
`;

const Subtitle = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.textLight};
  text-align: center;
  margin-top: 5px;
`;

const DestinoCard = styled.TouchableOpacity`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius}px;
  margin-bottom: ${theme.spacing.medium}px;
  ${theme.shadow};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DestinoText = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 18px;
  color: ${theme.colors.primary};
`;

const AvailableText = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${theme.colors.textLight};
`;

const HomeScreen = () => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const sortedDestinations = destinations.sort((a, b) => a.award - b.award);
  const [loading, setLoading] = useState(false);

  const handleSelectDestino = (destino: Destino) => {
    dispatch(setSelectedDestino(destino));
    navigation.navigate('BetSelection');
  };

  const getData = useCallback(async () => {
    try {
      setLoading(true);

      const token = await getToken() as string;

      const response = await getDestinations(token) as Response;

      if (response.ok) {
        const data = await response.json();

        setDestinations(data);
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
      <Header>
        <Title>Bodes de Sorte</Title>
        <Subtitle>Escolha seu destino e faça sua aposta!</Subtitle>
      </Header>
      {loading ? <ActivityIndicator size="large" color={theme.colors.primary} /> : <FlatList
        data={sortedDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DestinoCard onPress={() => handleSelectDestino(item)}>
            <DestinoText>{item.name}: {`R$${item.award}`}</DestinoText>
            <AvailableText>{100000 * (item.limit / 100)} disponíveis</AvailableText>
          </DestinoCard>
        )}
      />}
    </Container>
  );
};

export default HomeScreen;
