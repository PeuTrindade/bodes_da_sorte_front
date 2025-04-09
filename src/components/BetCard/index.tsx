import React, { useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../styles/theme';

const BetCard = styled(Animated.View)`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius}px;
  ${theme.shadow};
  margin-bottom: ${theme.spacing.medium}px;
`;

const BetHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.small}px;
`;

const DestinoText = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 18px;
  color: ${theme.colors.primary};
`;

const StatusText = styled.Text<{ status: 1 | 2 | 3 | 4 }>`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${(props: { status: 1 | 2 | 3 | 4 }) =>
        props.status === 3 ? theme.colors.secondary : props.status === 4 ? '#ff4444' : theme.colors.textLight};
`;

const NumbersText = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.small}px;
`;

const InfoText = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${theme.colors.textLight};
`;

const NumberBox = styled.View`
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius}px;
  padding: ${theme.spacing.small}px;
  margin: ${theme.spacing.small}px;
  width: 60px;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const NumbersContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const NumberText = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 12px;
  color: ${theme.colors.card};
`;

const BetCardComponent = ({ item }: { item: any; index: number }) => {
    const [showNumbers, setShowNumbers] = useState(false);

    return (
        <BetCard>
            <BetHeader>
                <DestinoText>{item.destination.name}</DestinoText>
                <StatusText status={item.status}>
                    {item.status == 1 ? 'Ativa' : item.status == 2 ? 'Pendente' : item.status == 3 ? 'Ganhou' : 'Perdeu'}
                </StatusText>
            </BetHeader>

            <TouchableOpacity onPress={() => setShowNumbers(!showNumbers)}>
                <NumbersText>{showNumbers ? 'Esconder números' : 'Exibir números'}</NumbersText>
            </TouchableOpacity>

            {showNumbers && <NumbersContainer>
                {item.numbers.split(',').map((n: string, index) => (
                    <NumberBox key={index}>
                        <NumberText>{n}</NumberText>
                    </NumberBox>
                ))}
            </NumbersContainer>}

            <InfoText>Valor: {`R$${item.betType.price}`}</InfoText>
            <InfoText>Data: {new Date(item.createdAt).toLocaleDateString('pt-BR')}</InfoText>
        </BetCard>
    );
};

export default BetCardComponent;