import styled from 'styled-components/native';
import { theme } from '../styles/theme';
import { useCallback, useEffect, useState } from 'react';
import { getToken } from 'utils/secure_token';
import { approveBet, getPendingBets } from 'requests/bet';
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

const ApproveBetsScreen = () => {
    const [bets, setBets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [approving, setApproving] = useState(false);

    const getBetsFn = useCallback(async () => {
        try {
            setLoading(true);

            const token = await getToken() as string;

            const response = await getPendingBets(token) as Response;

            if (response.ok) {
                const data = await response.json();

                setBets(data);
            }

            setLoading(false);
        } catch (error) {
            console.info(error);
        }
    }, []);

    const approveBetFn = async (betId: string) => {
        try {
            setApproving(true);

            const data = {
                status: 1,
                betId
            };

            const token = await getToken() as string;

            const response = await approveBet(data, token) as Response;

            if (response.ok) {
                await getBetsFn();
            }

            setApproving(false);
        } catch (error) {
            console.info(error);
        }
    };

    useEffect(() => {
        getBetsFn();
    }, [getBetsFn]);

    return (
        <Container>
            {loading ? <ActivityIndicator size="large" color={theme.colors.primary} /> : <ScrollContainer>
                <Title>Apostas pendentes</Title>

                {bets.length > 0 ? bets.map((b, key) => (
                    <ResultCard key={key}>
                        <ResultText>{b.user.name}</ResultText>
                        <InfoText>Valor: {`R$${b.betType.price}`}</InfoText>
                        <InfoText>Data: {new Date(b.createdAt).toLocaleDateString('pt-BR')}</InfoText>

                        <SaveButton disabled={approving} onPress={async () => await approveBetFn(b.id)}>
                            <ButtonText>Aprovar</ButtonText>
                        </SaveButton>
                    </ResultCard>
                )) : <EmptyMessage>Não há apostas pendentes</EmptyMessage>}
            </ScrollContainer>}
        </Container>
    );
};

export default ApproveBetsScreen;