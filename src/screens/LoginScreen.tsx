/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types';
import { login } from 'requests/login';
import { storeToken } from 'utils/secure_token';
import { ActivityIndicator } from 'react-native';
import { useAuth } from 'context/Auth.context';

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

const SignUpText = styled.Text`
  margin-top: 20px;

  font-family: ${theme.fonts.bold};
  font-size: 16px;
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: ${theme.spacing.medium}px;
`;

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | undefined>();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(false);
    const { setIsAdmin } = useAuth();

    const handleLogin = async () => {
      try {
        setLoading(true);

        const response = await login({email: username, password}) as Response;

        if (response.ok) {
          const data = await response.json();
          const token = data.access_token;

          setIsAdmin(data.user.isAdmin);
          await storeToken(token);

          navigation.navigate('Home');

          setError(undefined);
        } else {
          setError('Credenciais inválidas!');
        }

        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      }
    };

    return (
        <Container>
            <Title>Login</Title>
            {error ? <ErrorText>{error}</ErrorText> : null}
            <Input
                placeholder="Email"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <Input
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <LoginButton disabled={!username || !password || loading} onPress={handleLogin}>
                {loading ? <ActivityIndicator color="#fff" /> : <ButtonText>Entrar</ButtonText>}
            </LoginButton>

            <SignUpText onPress={() => navigation.navigate('SignUp')}>Não possui conta? Realize seu cadastro.</SignUpText>
        </Container>
    );
};

export default LoginScreen;
