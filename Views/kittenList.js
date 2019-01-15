import React, {Component} from 'react';
import { FlatList , Text, Image, View, StatusBar, TouchableHighlight, Button, NetInfo, StyleSheet, AsyncStorage} from 'react-native';
import Names  from '../data/catnames';
import store from '../store/';

export class KittenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
                cat: [],
            newList: [],
            loading: true,
            number: 0,
            button: false,
            first: true,
        };
    }


        componentDidMount() {
            setTimeout(() => this.setState({ loading: false }), 1000);
            NetInfo.getConnectionInfo((res)=> res.json).then((some)=> {
                if(some.type === "none"){
                    alert('No internet')
                }});
            let number = 10;
            this.list(number).catch(err=>console.log(err))
    }


        makeNewKittenList() {
            const maxNumber = 16;
            const maxNameNumber = 95;
            let picture = [];
                for (let i=0;i<this.state.number;i++) {
                    const randomNumber = Math.floor(Math.random() * maxNumber + 1);
                    const randomNameNumber = Math.floor(Math.random() * maxNameNumber + 1);
                    picture.push(`http://placekitten.com/300/300?image=${randomNumber}` );
                    this.state.newList.push({
                        picture: picture[i],
                        name: Names[randomNameNumber],
                        keyPic: randomNumber,
                        keyName: randomNameNumber
                    })
                }
                if(this.state.first){
                    this.setState({first: false});
                    AsyncStorage.setItem('catStorage', JSON.stringify(this.state.newList))
                }
        }

        checkNoInternet(){
            NetInfo.getConnectionInfo((res)=> res.json).then((some)=> {
                if(some.type === "none"){
                    AsyncStorage.getItem('catStorage').then((value) =>
                    this.setState({cat: value}))
                } else {
                    this.finishList().catch()
                }
            })
        }

        async finishList(){
            await store.dispatch({type: 'NEW_CAT_LIST' , data: this.state.newList});
            await this.makeNewKittenList();
            await this.setState({cat: this.state.newList})
        }

        async list(number){
            await store.dispatch({type: 'DELETE_LIST'});
            await this.setState({number: number, cat: [], newList: [], button: false});
            await this.checkNoInternet();
        }

    cancel(){
        this.setState({button: false})
    }

    showButtons(){
        if(this.state.button === true){
            return <View>
                        <Button
                            onPress={() => this.cancel()}
                            title="Cancel"
                        />
                        <Button
                            onPress={() => {
                                let number = 30;
                                this.list(number).catch()
                            }}
                            title="30"
                        />
                        <Button
                            onPress={() => {
                                let number = 50;
                                this.list(number).catch()
                            }}
                            title="50"
                        />
                        <Button
                            onPress={() => {
                                let number = 100;
                                this.list(number).catch()
                            }}
                            title="100"
                        />
            </View>
        }
        if(this.state.button === false){
            return <View style={styles.button}>
                <Button title={"Filter"}  onPress={()=> this.setState({button: true})}/>
            </View>
                }
    }

    render(){
        const { loading } = this.state;

        if(loading) {
            return <Text>LOADING</Text>
        }
        return(
            <View style={{flex: 1}}>
                <StatusBar backgroundColor="black" />
                {this.showButtons()}
                <FlatList
                    data={this.state.cat}
                    extraData={this.state}
                    renderItem={({item}) =>
                        <View style={styles.view}>
                            <TouchableHighlight onPress={() =>
                                this.props.navigation.navigate('view',
                                    {pic: item.keyPic, name: item.keyName},
                                )}>
                                <Image resizeMode="stretch" style={styles.image} source={{uri: `${item.picture}`}}/>
                            </TouchableHighlight>
                            <Text style={styles.list}> {item.name}</Text>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    list: {color: "#000080", textAlign: 'center',padding: 15,fontSize: 20},
    view: {borderWidth: 10,borderRadius: 15 , borderColor: "#00BFFF", margin: 10},
    image: {alignItems:'center', height: 300, width: 280},
    button: { marginRight: 250}
});


store.subscribe(()=> {
   // console.log(store.getState())
});


export default KittenList;