import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';

import remoteConfig from '@react-native-firebase/remote-config';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../';

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
  showVerticalScrollIndicator: false,
})`
  background-color: #fff;
`;

const Title = styled.Text`
  font-size: 28px;
  color: #000;
  margin: 24px 24px 8px;
  font-weight: 800;
  opacity: 0.7;
  width: 240px;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #707070;
  margin: 0px 24px 0px;
  font-weight: 500;
  opacity: 0.7;
  width: 240px;
`;

const ContainerImage = styled.View`
  padding: 24px;
`;

const Image = styled.Image`
  height: 310px;
  width: 100%;
  border-radius: 20px;
`;

const LabelInfo = styled.Text`
  color: #000;
  font-size: 14px;
  margin: 0 0 0 24px;
  font-weight: 600;
`;

const ContainerSizes = styled.View`
  width: 180px;
  /* background-color: red; */
  flex-direction: row;
  margin: 8px 24px 24px;
  justify-content: space-between;
`;

const ButtonSize = styled.TouchableOpacity`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
`;

const Size = styled.Text`
  font-size: 18px;
  color: #4e342e;
  font-weight: 600;
  opacity: 0.7;
`;

const ContainerQuantity = styled.View`
  width: 110px;
  /* background-color: red; */
  flex-direction: row;
  margin: 8px 24px 24px;
  justify-content: space-between;
  align-items: center;
`;

const Quantity = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: 800;
  opacity: 0.7;
`;

const ButtonMinus = styled.TouchableOpacity`
  height: 32px;
  width: 32px;
  border-radius: 24px;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
`;

const ButtonPlus = styled.TouchableOpacity`
  height: 32px;
  width: 32px;
  border-radius: 24px;
  background-color: #f9a825;
  justify-content: center;
  align-items: center;
`;

const Minus = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: 800;
  opacity: 0.7;
`;

const Plus = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: 800;
  opacity: 0.7;
`;

const ButtonCheckout = styled.TouchableOpacity`
  height: 50px;
  border-radius: 25px;
  background-color: #f9a825;
  justify-content: center;
  margin: 8px 24px;
  align-items: center;
`;

const CheckoutLabel = styled.Text`
  font-size: 18px;
  color: #fff;
  font-weight: 800;
  opacity: 0.7;
`;

const Detail = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const name = route.params.item.name;
  const description = route.params.item.description;
  const image = route.params.item.image;

  const [showCheckoutButton, setShowCheckoutButton] = useState<boolean>(false);

  useEffect(() => {
    remoteConfig()
      .setDefaults({
        has_module_1: false,
        checkout_is_avaliable: true,
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(async fetchedRemotely => {
        await remoteConfig().fetch(0);
        if (fetchedRemotely) {
          const awesomeNewFeature = remoteConfig().getValue('has_module_1');
          const checkouteAvaliable = remoteConfig().getValue(
            'checkout_is_avaliable',
          );
          if (awesomeNewFeature.getSource() === 'remote') {
            console.log('Parameter value was from the Firebase servers.');
            if (checkouteAvaliable.asBoolean() === true) {
              console.log('Vou mostrar o checkout.');
              setShowCheckoutButton(true);
            } else {
              console.log('Nao Vou mostrar o checkout.');
            }
            if (awesomeNewFeature.asBoolean() === true) {
              console.log('Vou mostrar o modulo.');
              //   setHasModule(true);
            } else {
              console.log('Nao Vou mostrar o modulo.');
            }
          } else if (awesomeNewFeature.getSource() === 'default') {
            console.log('Parameter value was from a default value.');
          } else {
            console.log('Parameter value was from a locally cached value.');
          }

          // console.log('Configs were retrieved from the backend and activated.');
          // const hasModule = remoteConfig().getValue('has_module_1');
          // if (hasModule.getSource() === 'remote') {
          //   console.log(
          //     'Vou mostrar o modulo::: ' +
          //       JSON.stringify(hasModule.asBoolean()),
          //   );
          // }
          // if (hasModule.asBoolean() === true) {
          //   console.log('Vou mostrar o modulo');
          // }
        } else {
          console.log(
            'No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      });
  }, []);

  return (
    <ScrollView>
      <SafeAreaView />
      <Title>{name}</Title>
      <Description>{description}</Description>
      <ContainerImage>
        <Image source={image} resizeMode={'stretch'} />
      </ContainerImage>
      {showCheckoutButton && (
        <>
          <LabelInfo>Size:</LabelInfo>
          <ContainerSizes>
            <ButtonSize activeOpacity={0.7}>
              <Size>S</Size>
            </ButtonSize>
            <ButtonSize activeOpacity={0.7}>
              <Size>M</Size>
            </ButtonSize>
            <ButtonSize activeOpacity={0.7}>
              <Size>L</Size>
            </ButtonSize>
          </ContainerSizes>
          <LabelInfo>Quantity:</LabelInfo>
          <ContainerQuantity>
            <ButtonMinus activeOpacity={0.7}>
              <Minus>{'-'}</Minus>
            </ButtonMinus>
            <Quantity>2</Quantity>
            <ButtonPlus activeOpacity={0.7}>
              <Plus>{'+'}</Plus>
            </ButtonPlus>
          </ContainerQuantity>
          <ButtonCheckout activeOpacity={0.7}>
            <CheckoutLabel>CHECKOUT</CheckoutLabel>
          </ButtonCheckout>
        </>
      )}
    </ScrollView>
  );
};

export default Detail;
