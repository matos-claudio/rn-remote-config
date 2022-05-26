import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import {RootStackParamList} from '../';

const Img1 = require('../../assets/capp1.jpg');
const Img2 = require('../../assets/capp2.jpg');
const Img3 = require('../../assets/capp3.jpg');
const Img4 = require('../../assets/capp4.jpg');
const Img5 = require('../../assets/capp5.jpg');
const Img6 = require('../../assets/capp6.jpg');

type ScreenProps = StackNavigationProp<RootStackParamList>;

const drinks = [
  {
    id: 1,
    name: 'Cappuccino cremoso',
    price: 'R$12,50',
    description: 'Cappuccino cremoso feito com café nobre de Minas Gerais',
    image: Img1,
  },
  {
    id: 2,
    name: 'Cappuccino canela',
    price: 'R$9,50',
    description: 'Cappuccino cremoso feito com café nobre de Minas Gerais',
    image: Img2,
  },
  {
    id: 3,
    name: 'Cappuccino 3',
    price: 'R$12,50',
    description: 'Cappuccino cremoso feito com café nobre de Minas Gerais',
    image: Img3,
  },
  {
    id: 4,
    name: 'Cappuccino 4',
    price: 'R$12,50',
    description: 'Cappuccino cremoso feito com café nobre de Minas Gerais',
    image: Img4,
  },
  {
    id: 5,
    name: 'Cappuccino 3',
    price: 'R$12,50',
    description: 'Cappuccino cremoso feito com café nobre de Minas Gerais',
    image: Img5,
  },
  {
    id: 6,
    name: 'Cappuccino 4',
    price: 'R$12,50',
    description: 'Cappuccino cremoso feito com café nobre de Minas Gerais',
    image: Img6,
  },
];

const Container = styled.View`
  background-color: #eeeeee;
`;

// const ScrollView = styled.ScrollView.attrs({
//   contentContainerStyle: {
//     flexGrow: 1,
//   },
//   showVerticalScrollIndicator: false,
// })`
//   background-color: #eeeeee;
// `;

const CustomHeader = styled.View`
  flex-direction: row;
  padding: 24px;
  justify-content: space-between;
  align-items: center;
`;

const Greeting = styled.Text`
  font-size: 16px;
  color: #000;
  opacity: 0.5;
`;

const Avatar = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #000;
`;

const Title = styled.Text`
  font-size: 28px;
  color: #000;
  margin: 0px 24px 8px;
  font-weight: 800;
  opacity: 0.7;
`;

const ContainerFlatlist = styled.View`
  margin: 0 20px 24px 20px;
`;

const ContainerList = styled.View`
  flex: 1;
  padding: 4px;
`;

const Card = styled.TouchableOpacity`
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
`;

const Image = styled.Image`
  height: 130px;
  width: 100%;
  border-radius: 10px;
`;

const LabelName = styled.Text`
  color: #000;
  margin: 8px 0px 0 8px;
  opacity: 0.7;
`;

const LabelPrice = styled.Text`
  color: #000;
  margin: 8px 8px 8px 8px;
  font-weight: 800;
  font-size: 18px;
`;

const Home = () => {
  const navigation = useNavigation<ScreenProps>();
  return (
    <Container>
      <SafeAreaView />
      <CustomHeader>
        <Greeting>Hello, Cláudio</Greeting>
        <Avatar />
      </CustomHeader>
      <Title>Popular Drinks</Title>
      <ContainerFlatlist>
        <FlatList
          data={drinks}
          numColumns={2}
          renderItem={({item}) => (
            <ContainerList>
              <Card
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Detail', {item})}>
                <Image source={item.image} resizeMode={'stretch'} />
                <LabelName>{item.name}</LabelName>
                <LabelPrice>{item.price}</LabelPrice>
              </Card>
            </ContainerList>
          )}
        />
      </ContainerFlatlist>
    </Container>
  );
};

export default Home;
