import React, {Component } from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import Names  from './catnames'
import Desc from './descriptions'

export class KittenView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            viewNumber: 0
        }
        this.number= 0;
    }

    componentWillMount(){
        const maxNumber = 9;
        this.number = Math.floor(Math.random() * maxNumber + 1);
    }

    render(){
        const nameNumber = this.props.navigation.state.params.name;
        const picNumber = this.props.navigation.state.params.pic;
        return (
            <View  style={{flex: 1}}>
                <ScrollView>
                <Image  resizeMode="stretch"
                        style={styles.image}
                        source={{uri: `http://placekitten.com/200/300?image=${picNumber}`}}/>

                <View style={styles.border}><Text style={styles.name}>{Names[nameNumber]}</Text></View>
                <Text style={{margin: 2}}>{Desc[this.number]}</Text>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    name: {fontSize: 25, textAlign: "center", margin: 5},
    image: {height: 300, width: 310, margin: 5},
    border: {borderBottomWidth: 3, borderColor: "black"}
});
