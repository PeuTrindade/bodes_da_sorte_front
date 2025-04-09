import React, { useState } from 'react';
import styled from 'styled-components/native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types';
import { ActivityIndicator, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { getToken } from 'utils/secure_token';
import { createBet } from 'requests/bet';

const Container = styled.View`
  flex: 1;
  padding: ${theme.spacing.large}px;
  background-color: ${theme.colors.background};
  align-items: center;
`;

const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 24px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.large}px;
  text-align: center;
`;

const CardContainer = styled.View`
  background-color: white;
  padding: ${theme.spacing.medium}px;
  border-radius: ${theme.borderRadius}px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: ${theme.spacing.large}px;
  width: 100%;
`;

const Label = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
`;

const Input = styled.TextInput`
  padding: ${theme.spacing.small}px;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius}px;
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
`;

const SaveButton = styled.TouchableOpacity`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius}px;
  align-items: center;
  margin-top: ${theme.spacing.large}px;
`;

const ButtonText = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  color: ${theme.colors.card};
`;

const PaymentScreen = () => {
  const route = useRoute();
  const [contest, setContest] = useState<string>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const selectedDestination = useSelector((state: RootState) => state.bets.selectedDestino);
  const { item } = route.params as { item: any };

  const handleCreateBet = async () => {
    try {
      setLoading(true);

      const token = await getToken() as string;

      const requestBody = {
        destinationId: selectedDestination.id,
        betTypeId: item.id,
        contest
      };

      console.log(requestBody);

      const response = await createBet(requestBody, token) as Response;

      if (response.ok) {
        const data = await response.json();
        navigation.navigate('BetConfirmation', { item: data });
      } else {
        const errorMessage = (await response.json() as any).message;

        Alert.alert('Erro', errorMessage, [{ text: 'OK' }]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', error as string, [{ text: 'OK' }]);
    }
  };

  return (
    <Container>
      <Title>Informações da aposta</Title>

      <CardContainer>
        <Label>Concurso:</Label>

        <Input
          value={contest}
          onChangeText={setContest}
          keyboardType="numeric"
          placeholder="Concurso da aposta"
        />

        <SaveButton disabled={loading} onPress={handleCreateBet}>
          {loading ? <ActivityIndicator color="#fff" /> : <ButtonText>Apostar</ButtonText>}
        </SaveButton>
      </CardContainer>


    </Container>
  );
};

export default PaymentScreen;
