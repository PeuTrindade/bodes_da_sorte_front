
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BetSelectionScreen from '../screens/BetSelectionScreen';
import PaymentScreen from '../screens/PaymentScreen';
import BetConfirmationScreen from '../screens/BetConfirmationScreen';
import MyBetsScreen from '../screens/MyBetsScreen';
import ResultsScreen from '../screens/ResultsScreen';
import AdminSettingsScreen from '../screens/AdminSettingsScreen';
import LoginScreen from '../screens/LoginScreen';
import { RootStackParamList } from '../types/index';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from 'styles/theme';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from 'context/Auth.context';
import SignUpScreen from 'screens/SignUpScreen';
import AddPackageScreen from 'screens/AddPackageScreen';
import WinnersScrenn from 'screens/WinnersScreen';
import ApproveBetsScreen from 'screens/ApproveBetsScrenn';
import AddTelephoneScreen from 'screens/AddTelephoneScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { isAdmin } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Home" component={HomeScreen} options={{
        title: 'Bodes de Sorte', headerLeft: () => (
          <TouchableOpacity
            onPress={() => console.log()}
            style={{ marginLeft: 15 }}
          >
            <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        ), headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyBets')}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="confirmation-number" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Winners')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="emoji-events" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('AdminSettings')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="settings" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </>
        )
      }} />
      <Stack.Screen name="BetSelection" component={BetSelectionScreen} options={{
        title: 'Escolher Aposta', headerLeft: () => (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="home" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log()}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        ), headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyBets')}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="confirmation-number" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Winners')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="emoji-events" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('AdminSettings')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="settings" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </>
        )
      }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{
        title: 'Aposta', headerLeft: () => (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="home" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log()}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        ), headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyBets')}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="confirmation-number" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Winners')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="emoji-events" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('AdminSettings')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="settings" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </>
        )
      }} />
      <Stack.Screen name="BetConfirmation" component={BetConfirmationScreen} options={{
        title: 'Confirmação', headerLeft: () => (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="home" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log()}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        ), headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyBets')}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="confirmation-number" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Winners')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="emoji-events" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('AdminSettings')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="settings" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </>
        )
      }} />
      <Stack.Screen name="MyBets" component={MyBetsScreen} options={{
        title: 'Minhas Apostas', headerLeft: () => (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="home" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log()}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        ), headerRight: () => (
          <>
            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Winners')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="emoji-events" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('AdminSettings')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="settings" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </>
        )
      }} />
      <Stack.Screen name="Results" component={ResultsScreen} options={{
        title: 'Resultados', headerLeft: () => (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="home" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log()}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        ), headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyBets')}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="confirmation-number" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Winners')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="emoji-events" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('AdminSettings')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="settings" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </>
        )
      }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerBackTitle: 'Voltar' }} />
      <Stack.Screen name="AdminSettings" component={AdminSettingsScreen} options={{
        title: 'Configurações', headerLeft: () => (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="home" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log()}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        ), headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('ApproveBets')}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="check-box" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('AddPackage')}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="add-box" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('AddTelephone')}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="add-call" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        )
      }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Cadastro', headerBackTitle: 'Voltar' }} />
      <Stack.Screen name="AddPackage" component={AddPackageScreen} options={{
        title: 'Adicionar pacote', headerLeft: () => (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="home" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log()}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        )
      }} />
      <Stack.Screen name="ApproveBets" component={ApproveBetsScreen} options={{
        title: 'Aprovar apostas', headerLeft: () => (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="home" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log()}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        )
      }} />
      <Stack.Screen name="AddTelephone" component={AddTelephoneScreen} options={{
        title: 'Adicionar telefone', headerLeft: () => (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="home" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log()}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        )
      }} />
      <Stack.Screen name="Winners" component={WinnersScrenn} options={{
        title: 'Vencedores', headerLeft: () => (
          <>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 15 }}>
              <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="home" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log()}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="logout" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        ), headerRight: () => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyBets')}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons name="confirmation-number" size={24} color={theme.colors.primary} />
            </TouchableOpacity>

            {isAdmin && (
              <TouchableOpacity
                onPress={() => navigation.navigate('AdminSettings')}
                style={{ marginRight: 15 }}
              >
                <MaterialIcons name="settings" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </>
        )
      }} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
