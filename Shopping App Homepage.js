import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { Button, Card} from 'react-native-paper';
import database from '@react-native-firebase/database';
import QRCode from 'react-native-qrcode-svg';

export default class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ItemData: '',
    };
  }
  componentDidMount = () => {
    this.LoadData();
  };

  //First data is loaded from database and saved to state
  LoadData = async () => {
    await database()
      .ref('/database/')
      .on('value', snapshot => {
        
        let dataValues = Object.values(snapshot.val())

        Object.keys(snapshot.val()).forEach((key, index) => {
          dataValues[index] ["Key"] = key
        });

        this.setState({ItemData:dataValues});

        // console.log(this.state.ItemData)
      });
  };
  //first data is loaded from database and saved to state

  render() {
    const renderdata = Object.values(this.state.ItemData);
    //console.log(renderdata)
    return (
      <View style={{flex: 1}}>
        {/* firstFlex */}
        <View style={{flex: 2, flexDirection: 'row'}}>
        <QRCode
      value= "7477544262@ybl"
    />
          <View
            style={{
              flex: 2.5,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Image
              style={{height: 50, width: 50, borderRadius: 20, margin: 10}}
              source={{
                uri: 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Emblem.png',
              }}
            />
          </View>
          <View style={{flex: 8, justifyContent: 'center'}}>
            <Text style={{fontSize: 30, color: '#07f', fontWeight: 'bold'}}>
              FirstShoppingApp
            </Text>
          </View>
        </View>
        {/* firstflex */}

        {/* secondFlex */}
        <View style={{flex: 1.5, borderWidth: 1, borderColor: '#999'}}>
          <ScrollView horizontal>
            {renderdata.map((item, index) => {
              return (
                <View key={item.id}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Image
                        style={{
                          height: 70,
                          width: 70,
                          borderRadius: 10,
                          margin: 20,
                          borderWidth: 2,
                          borderColor: 'black',
                        }}
                        source={{uri: item.picLink}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        {/* secondFlex */}

        {/* thirdFlex */}
        <View style={{flex: 8}}>
          <ScrollView>
            {renderdata.map((item, index) => {
              return (
                <View key={item.id}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                    }}>
                    <TouchableOpacity
                      style={{justifyContent: 'center', alignItems: 'center'}}
                      onPress={() => {
                        this.props.navigation.navigate('SecondPage', {
                          ItemData: item,
                        });
                      }}>
                      <Image
                        style={{
                          height: 200,
                          width: 300,
                          borderRadius: 10,
                          margin: 20,
                        }}
                        source={{uri: item.picLink}}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          color: 'black',
                          marginBottom: 40,
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        {/* thirdFlex */}

        {/* forthFlex */}
        <View style={{flex: 1, backgroundColor: 'green'}}></View>
        {/* forthFlex */}
      </View>
    );
  }
}
