import styled from 'styled-components/native';
import { theme } from '../styles/theme';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { addTelephone, getTelephone } from 'requests/login';
import { getToken } from 'utils/secure_token';
import { MaskedTextInput } from 'react-native-mask-text';

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


const AddTelephoneScreen = () => {
  const [loading, setLoading] = useState(false);
  const [telephone, setTelephone] = useState<number>(55);
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

        <MaskedTextInput
          mask="+99 (99) 99999-9999"
          value={String(telephone)}
          onChangeText={(text, rawText) => {
            setTelephone(+rawText);
          }}
          keyboardType="phone-pad"
          placeholder="Telefone com DDD"
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

        <SaveButton disabled={loading} onPress={handleAddTelephone}>
          {loading ? <ActivityIndicator color="#fff" /> : <ButtonText>Adicionar</ButtonText>}
        </SaveButton>
      </CardContainer>}


    </Container>
  );
};

export default AddTelephoneScreen;