import React, { useCallback, useEffect, useState } from 'react';
import { Text, ActivityIndicator, Alert, TouchableOpacity, Platform, ToastAndroid } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../styles/theme';
import { getToken } from 'utils/secure_token';
import { getDestinations, updateDestination } from 'requests/destinations';
import { deleteBetType, getBetTypes, updateBetType } from 'requests/betTypes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'types';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

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

const SectionTitle = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 20px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.medium}px;
`;

const Label = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 16px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
`;

const SubLabel = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 10px;
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

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;


const AdminSettingsScreen = () => {
  const [submiting, setSubmiting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      betTypes: [],
      destinations: [],
    },
  });

  const { fields: betTypesFields, replace: replaceBetTypes } = useFieldArray<any>({
    control,
    name: 'betTypes',
  });

  const { fields: destinationFields, replace: replaceDestinations } = useFieldArray<any>({
    control,
    name: 'destinations',
  });

  const handleSaveBetTypes = async (id: string, data: any) => {
    try {
      const token = await getToken() as string;
      const response = await updateBetType(id, data, token) as Response;

      if (response.ok) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  const handleSaveBets = async (betTypes: any) => {
    try {
      let isAllOk = false;

      for (const betType of betTypes) {
        const data = { price: betType.price, amount: betType.amount };

        const isOk = await handleSaveBetTypes(betType.id, data);

        isAllOk = isOk;
      }

      return isAllOk;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSaveDestination = async (id: string, data: any) => {
    try {
      const token = await getToken() as string;
      const response = await updateDestination(id, data, token) as Response;

      if (response.ok) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  };

  const handleSaveDestinations = async (destinations: any) => {
    try {
      let isAllOk = false;

      for (const destination of destinations) {
        const data = { limit: destination.limit, award: destination.award };

        const isOk = await handleSaveDestination(destination.id, data);

        isAllOk = isOk;
      }

      return isAllOk;
    } catch (error) {
      return false;
    }
  };

  const handleSave = async (data: any) => {
    const { betTypes, destinations } = data;

    setSubmiting(true);

    const isBetsOk = await handleSaveBets(betTypes);
    const isDestinationsOk = await handleSaveDestinations(destinations);

    if (isBetsOk && isDestinationsOk) {
      Alert.alert('Sucesso', 'Configurações salvas com sucesso!', [{ text: 'OK' }]);
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar alterações. Tente novamente!', [{ text: 'OK' }]);
    }

    setSubmiting(false);
  };

  const getDestinationsData = useCallback(async () => {
    try {
      const token = await getToken() as string;

      const response = await getDestinations(token) as Response;

      if (response.ok) {
        const data = await response.json();
        const info = data.map((d: any) => ({
          backendId: d.id,
          ...d,
        }));

        replaceDestinations(info);
      }
    } catch (error) {
      console.info(error);
    }
  }, []);

  const getBetTypesData = useCallback(async () => {
    try {
      const token = await getToken() as string;

      const response = await getBetTypes(token) as Response;

      if (response.ok) {
        const data = await response.json();
        const info = data.map((d: any) => ({
          backendId: d.id,
          ...d,
        }));

        replaceBetTypes(info);
      }
    } catch (error) {
      console.info(error);
    }
  }, []);

  const handleDeleteBetType = async (id: string) => {
    try {
      const token = await getToken() as string;
      const response = await deleteBetType(id, token) as Response;

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'Confirmar Remoção',
      'Tem certeza que deseja remover este pacote?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            const isOk = await handleDeleteBetType(itemId);

            if (isOk) {
              navigation.navigate('Home');

              if (Platform.OS === 'android') {
                ToastAndroid.show('Item removido com sucesso!', ToastAndroid.SHORT);
              } else {
                Alert.alert('Sucesso', 'Item removido com sucesso!');
              }
            } else {
              if (Platform.OS === 'android') {
                ToastAndroid.show('Ocorreu um erro ao remover pacote!', ToastAndroid.SHORT);
              } else {
                Alert.alert('Erro', 'Ocorreu um erro ao remover pacote!');
              }
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const getData = async () => {
      await getDestinationsData();
      await getBetTypesData();

      setLoading(false);
    };

    getData();
  }, [getBetTypesData, getDestinationsData]);

  return (
    <Container>
      <ScrollContainer>
        <Title>Configurações</Title>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <>
            <SectionTitle>Pacotes de Apostas</SectionTitle>

            {betTypesFields.map((item: any, index) => (
              <CardContainer key={item.id}>
                <CardHeader>
                  <Label>{item.name}</Label>

                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.backendId)}
                    style={{ marginRight: 15 }}
                  >
                    <MaterialIcons name="delete" size={24} color={theme.colors.textLight} />
                  </TouchableOpacity>
                </CardHeader>

                <SubLabel>Preço (R$):</SubLabel>
                <Controller
                  control={control}
                  name={`betTypes.${index}.price` as any}
                  render={({ field }) => (
                    <Input
                      value={String(field.value)}
                      onChangeText={field.onChange}
                      keyboardType="decimal-pad"
                      placeholder="Preço (R$)"
                    />
                  )}
                />

                <SubLabel>Quantidade:</SubLabel>
                <Controller
                  control={control}
                  name={`betTypes.${index}.amount` as any}
                  render={({ field }) => (
                    <Input
                      value={String(field.value)}
                      onChangeText={field.onChange}
                      keyboardType="decimal-pad"
                      placeholder="Quantidade"
                    />
                  )}
                />
              </CardContainer>
            ))}

            <SectionTitle style={{ marginTop: 40 }}>Limites por Destino</SectionTitle>

            {destinationFields.map((item: any, index: number) => (
              <CardContainer key={item.id}>
                <Label>{item.name}</Label>

                <SubLabel>Quantidade de números (%):</SubLabel>
                <Controller
                  control={control}
                  name={`destinations.${index}.limit` as any}
                  render={({ field }) => (
                    <Input
                      value={String(field.value)}
                      onChangeText={field.onChange}
                      keyboardType="decimal-pad"
                      placeholder="Quantidade de números (%)"
                    />
                  )}
                />

                <SubLabel>Premiação (R$):</SubLabel>
                <Controller
                  control={control}
                  name={`destinations.${index}.award` as any}
                  render={({ field }) => (
                    <Input
                      value={String(field.value)}
                      onChangeText={field.onChange}
                      keyboardType="decimal-pad"
                      placeholder="Premiação (R$)"
                    />
                  )}
                />

                <Text style={{ color: theme.colors.textLight }}>
                  Números disponíveis: {((item.limit / 100) * 100000).toString()}
                </Text>
              </CardContainer>
            ))}

            <SaveButton disabled={submiting} onPress={handleSubmit(handleSave)}>
              {submiting ? <ActivityIndicator color="#fff" /> : <ButtonText>Salvar Alterações</ButtonText>}
            </SaveButton>
          </>
        )}
      </ScrollContainer>
    </Container>
  );
};

export default AdminSettingsScreen;
