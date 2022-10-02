import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native"
import Cover from "../components/cover";
import Search from "../components/search";
import themes from '../themes';
import db from '../db/titles.json'
import { useState } from "react";
import None from "../components/none";

// tipo de dados recebidos pela função de inicio
type InicioProps = {
    navigation: any
}

// tamanho horizontal da tela
var width = Dimensions.get('window').width;

// Tela de inicio listando as obras de dragon ball
export default function Inicio({ navigation }: InicioProps) {
    // valor da busca
    const [search, setSearch] = useState('')
    return (
      <View style={styles.container}>
        <Search onInputChange={(text) => {setSearch(text)}} placeholder="ex: Dragon ball" width={width - 72} />
        {db.filter((element) => element.title.toLowerCase().includes(search.toLowerCase())).length == 0 ?
        <None text="Nenhuma obra encontrada!" /> :
        <FlatList
            data={search == '' ? db : db.filter((element) => element.title.toLowerCase().includes(search.toLowerCase()))}
            numColumns={3}
            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 10}}
            renderItem={({ item }) => <TouchableOpacity onPress={() => navigation.push('Characters', { id: item.id })}><Cover title={item.title} image={item.image} /></TouchableOpacity>}
        />
        }
      </View>
    );
}

// stilo da tela de inicio
const styles  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.background,
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20
    }
})