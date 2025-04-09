import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import { RootStackParamList } from 'types';
import { getToken } from 'utils/secure_token';
import { getTelephone } from 'requests/login';

const Container = styled.View`
  flex: 1;
  padding: ${theme.spacing.large}px;
  background-color: ${theme.colors.background};
  align-items: center;
`;

const Label = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
`;

const CopyLabel = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.small}px;
`;

const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 24px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.large}px;
  text-align: center;
`;

const SuccessMessage = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.large}px;
`;

const NumbersCard = styled.View`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius}px;
  ${theme.shadow};
  width: 100%;
  max-width: 350px;
`;

const NumbersContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: ${theme.spacing.medium}px;
`;

const NumberBox = styled.View`
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius}px;
  padding: ${theme.spacing.small}px;
  margin: ${theme.spacing.small}px;
  width: auto;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const NumberText = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 18px;
  color: ${theme.colors.card};
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
  width: 100%;
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

const BetConfirmationScreen = () => {
  const route = useRoute();
  const { item } = route.params as { item: any };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [telephone, setTelephone] = useState<number>();
  const [fetchingNumber, setFetchingNumber] = useState(true);

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

  const openLink = () => {
    Linking.openURL(`https://api.whatsapp.com/send?phone=${telephone}&text=Quero%20enviar%20meu%20comprovante%20da%20sorte%21`);
  };

  useEffect(() => {
    getTelephoneNumber();
  }, [getTelephoneNumber]);

  return (
    <Container>
      {fetchingNumber ? <ActivityIndicator size="large" color={theme.colors.primary} /> : <ScrollContainer>
        <Title>Confirmação da Aposta</Title>
        <SuccessMessage>Aposta gerada com sucesso! Realize o pagamento no PIX abaixo e envie o comprovante para o contato.</SuccessMessage>

        <CardContainer>
          <TouchableOpacity>
            <CopyLabel>Chave PIX: {telephone}</CopyLabel>
          </TouchableOpacity>

          <TouchableOpacity onPress={openLink}>
            <CopyLabel>Enviar comprovante</CopyLabel>
          </TouchableOpacity>
        </CardContainer>

        <NumbersCard>
          <Label>Seus números:</Label>
          <NumbersContainer>
            {item.bet.numbers.split(',').map((n: string, index: number) => (
              <NumberBox key={index}>
                <NumberText>{`${index + 1}: ${n}`}</NumberText>
              </NumberBox>
            ))}
          </NumbersContainer>
        </NumbersCard>

        <SaveButton onPress={() => navigation.navigate('MyBets')}>
          <ButtonText>Ver minhas apostas</ButtonText>
        </SaveButton>
      </ScrollContainer>}
    </Container>
  );
};

export default BetConfirmationScreen;
