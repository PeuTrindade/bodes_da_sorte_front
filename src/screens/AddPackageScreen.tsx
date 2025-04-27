import React, { useState } from 'react';
import styled from 'styled-components/native';
import { theme } from '../styles/theme';
import { createBet } from 'requests/betTypes';
import { getToken } from 'utils/secure_token';
import { ActivityIndicator, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'types';
import CurrencyInput from 'react-native-currency-input';

const Container = styled.View`
  flex: 1;
  padding: ${theme.spacing.large}px;
  background-color: ${theme.colors.background};
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

const CardContainer = styled.View`
  background-color: white;
  padding: ${theme.spacing.medium}px;
  border-radius: ${theme.borderRadius}px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: ${theme.spacing.large}px;
`;

const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 24px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.large}px;
  text-align: center;
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

const ErrorText = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: #ff4444;
  text-align: center;
  margin-bottom: ${theme.spacing.medium}px;
`;


const AddPackageScreen = () => {
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [amount, setAmount] = useState<number>();
  const [error, setError] = useState<string>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      if (name && price && amount) {
        const token = await getToken() as string;

        const response = await createBet({ name, price, amount }, token) as Response;

        if (response.ok) {
          setError(undefined);
          Alert.alert('Sucesso', 'Pacote criado com sucesso!', [{ text: 'OK' }]);
          navigation.navigate('AdminSettings');
        } else {
          setError('Ocorreu um erro ao cadastrar! Tente novamente.');
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Ocorreu um erro inesperado! Tente novamente.');
    }
  };

  return (
    <Container>
      <ScrollContainer>
        <Title>Adicionar pacote</Title>
        {error ? <ErrorText>{error}</ErrorText> : null}
        <CardContainer>
          <Label>Nome:</Label>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Nome do pacote"
          />

          <Label>Preço:</Label>

          <CurrencyInput
            value={price ?? null}
            onChangeValue={(value) => {
              setPrice(value ?? 0);
            }}
            prefix="R$ "
            delimiter="."
            separator=","
            precision={2}
            placeholder="Preço (R$)"
            keyboardType="numeric"
            style={{
              padding: theme.spacing.small,
              backgroundColor: theme.colors.background,
              borderRadius: theme.borderRadius,
              fontFamily: theme.fonts.regular,
              fontSize: 16,
              color: theme.colors.text,
              marginBottom: theme.spacing.medium,
            }}
          />

          <Label>Quantidade:</Label>
          <Input
            value={amount}
            onChangeText={setAmount}
            placeholder="Quantidade de números"
            keyboardType="numeric"
          />
        </CardContainer>

        <SaveButton disabled={loading || !name || !price || !amount} onPress={handleSave}>
          {loading ? <ActivityIndicator color="#fff" /> : <ButtonText>Adicionar</ButtonText>}
        </SaveButton>
      </ScrollContainer>
    </Container>
  );
};

export default AddPackageScreen;
