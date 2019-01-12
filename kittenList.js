import React, {Component} from 'react';
import { FlatList , Text, Image, View, StatusBar, TouchableHighlight, Button, NetInfo, StyleSheet} from 'react-native';
import Names  from './catnames'


export class KittenList extends Component {
    constructor(props) {
        super(props);
        this.state = {
                cat: [],
            newCat: [],
            loading: true,
            number: 0,
            button: false
        };
    }


        makeSome() {
            const maxNumber = 16;
            const maxNameNumber = 95;
            let picture = [];
                for (let i=0;i<this.state.number;i++) {
                    const randomNumber = Math.floor(Math.random() * maxNumber + 1);
                    const randomNameNumber = Math.floor(Math.random() * maxNameNumber + 1);
                    picture.push(`http://placekitten.com/300/300?image=${randomNumber}` );
                    this.state.newCat.push({
                        picture: picture[i],
                        name: Names[randomNameNumber],
                        keyPic: randomNumber,
                        keyName: randomNameNumber
                    })
                }
        }
        async list30(){
            await this.setState({number: 30, cat: [],newCat: [], button: false});
            await this.makeSome();
            await this.setState({cat: this.state.newCat});
        }
        async list50(){
            await this.setState({number: 50, cat: [], newCat: [],button: false});
            await this.makeSome();
            await this.setState({cat: this.state.newCat});
        }
        async list100(){
            await this.setState({number: 100, cat: [], newCat: [],button: false});
            await this.makeSome();
            await this.setState({cat: this.state.newCat});
        }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1000);
        NetInfo.getConnectionInfo((res)=> res.json).then((some)=> this.handleNoInternet(some.type));
    }

    handleNoInternet(check){
        if(check === "none") {
            alert('No internet')
        }
        this.list30().catch()
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
                            onPress={() => this.list30()}
                            title="30"
                        />
                        <Button
                            onPress={()=> this.list50()}
                            title="50"
                        />
                        <Button
                            onPress={()=> this.list100()}
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


export default KittenList;