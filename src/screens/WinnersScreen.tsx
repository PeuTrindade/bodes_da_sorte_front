import styled from 'styled-components/native';
import { theme } from '../styles/theme';
import { useCallback, useEffect, useState } from 'react';
import { verifyAdminBets } from 'requests/bet';
import { getToken } from 'utils/secure_token';
import { ActivityIndicator } from 'react-native';

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

const EmptyMessage = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.textLight};
  text-align: center;
  margin-top: ${theme.spacing.large}px;
`;

const InfoText = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${theme.colors.textLight};
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

const WinnersScrenn = () => {
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getWinners = useCallback(async () => {
    try {
      const token = await getToken() as string;
      const response = await verifyAdminBets(token) as Response;

      if (response.ok) {
        const data = await response.json();

        setWinners(data.bets);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getWinners();
  }, [getWinners]);

  return (
    <Container>
      {loading ? <ActivityIndicator size="large" color={theme.colors.primary} /> : <ScrollContainer>
        <Title>Vencedores</Title>

        {winners.length > 0 ? winners.map((w, index) => (
          <ResultCard key={index} >
            <ResultText>{w.user.name}</ResultText>
            <InfoText>Valor: {`R$${w.betType.price}`}</InfoText>
            <InfoText>Data: {new Date(w.createdAt).toLocaleDateString('pt-BR')}</InfoText>
          </ResultCard>
        )) : <EmptyMessage>Não há vencedores</EmptyMessage>}
      </ScrollContainer>}

    </Container>
  );
};

export default WinnersScrenn;