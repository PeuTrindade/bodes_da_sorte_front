/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types';
import { signUp } from 'requests/login';
import { ActivityIndicator, Alert } from 'react-native';

const Container = styled.View`
  flex: 1;
  padding: ${theme.spacing.large}px;
  background-color: ${theme.colors.background};
  justify-content: center;
`;

const Title = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 24px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.large}px;
  text-align: center;
`;

const Input = styled.TextInput`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius}px;
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
  ${theme.shadow};
`;

const LoginButton = styled.TouchableOpacity`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius}px;
  align-items: center;
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

const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState<string | undefined>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        try {
            setLoading(true);

            if (password === confirmPassword) {
                const data = {
                    name,
                    email,
                    password,
                };

                const response = await signUp(data) as Response;

                if (response.ok) {
                    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [{ text: 'OK' }]);
                    navigation.navigate('Login');

                    setError(undefined);
                } else {
                    setError('Ocorreu um erro ao realizar cadastro! Tente novamente.');
                }
            } else {
                setError('Senhas não coincidem! Tente novamente.');
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError('Ocorreu um erro inesperado! Tente novamente.');
        }
    };

    return (
        <Container>
            <Title>Cadastre-se agora!</Title>
            {error ? <ErrorText>{error}</ErrorText> : null}
            <Input
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
            />

            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <Input
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Input
                placeholder="Repita a senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                secureTextEntry
            />

            <LoginButton disabled={!email || !password || !name || !confirmPassword || loading} onPress={handleSignUp}>
                {loading ? <ActivityIndicator color="#fff" /> : <ButtonText>Cadastrar</ButtonText>}
            </LoginButton>
        </Container>
    );
};

export default SignUpScreen;
