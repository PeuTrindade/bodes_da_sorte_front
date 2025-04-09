import styled from 'styled-components/native';
import { theme } from '../styles/theme';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { addTelephone, getTelephone } from 'requests/login';
import { getToken } from 'utils/secure_token';

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


const AddTelephoneScreen = () => {
  const [loading, setLoading] = useState(false);
  const [telephone, setTelephone] = useState<number>();
  const [fetchingNumber, setFetchingNumber] = useState(true);

  const handleAddTelephone = async () => {
    try {
      setLoading(true);

      const token = await getToken() as string;

      const data = {
        type: 1,
        content: telephone
      };

      const response = await addTelephone(data, token) as Response;

      if (response.ok) {
        Alert.alert('Sucesso', 'Telefone adicionado com sucesso!', [{ text: 'OK' }]);
      }

      setLoading(false);
    } catch (error) {
      console.info(error);
    }
  };

  const getTelephoneNumber = useCallback(async () => {
    try {
      setFetchingNumber(true);

      const token = await getToken() as string;

      const response = await getTelephone(token) as Response;

      if (response.ok) {
        const data = await response.json();
        const number = data.adminTool.content;

        setTelephone(number);
      }

      setFetchingNumber(false);
    } catch (error) {
      console.info(error);
    }
  }, []);

  useEffect(() => {
    getTelephoneNumber();
  }, [getTelephoneNumber]);

  return (
    <Container>
      <Title>Adicionar telefone</Title>

      {fetchingNumber ? <ActivityIndicator size="large" color={theme.colors.primary} /> : <CardContainer>
        <Label>Telefone:</Label>

        <Input
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="numeric"
          placeholder="Telefone com DDD"
        />

        <SaveButton disabled={loading} onPress={handleAddTelephone}>
          {loading ? <ActivityIndicator color="#fff" /> : <ButtonText>Adicionar</ButtonText>}
        </SaveButton>
      </CardContainer>}


    </Container>
  );
};

export default AddTelephoneScreen;