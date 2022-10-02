import { useState, useEffect, useRef } from "react"
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Text } from "react-native"
import Back from "../components/back"
import Search from "../components/search"
import { CharacterList } from "../interfaces/personagemListInterface"
import themes from '../themes'
import Cover from '../components/cover'
import { listarPersonagens } from '../services/personagensService'
import None from "../components/none"
import LottieView from 'lottie-react-native'

// tipo de dados recebidos pela função de personagens
type PersonagensProps = {
    navigation: any
    route: any
}

// tamanho horizontal da tela
var width = Dimensions.get('window').width;

// tela de personagens
export default function Personagens({ navigation, route }: PersonagensProps) {
    // id enviado pela rota anterior
    const id = route.params?.id

    const animation = useRef(null);

    // estado de carregamento
    const [loading, setLoading] = useState(true)

    // lista de personagens
    const [personagens, setPersonagens] = useState({data: {Media: {title:{romaji: ''}, characters: {pageInfo:{total: 0, perPage: 0, currentPage: 0, lastPage: 0, hasNextPage: false}, edges: []}}}} as CharacterList)
    
    // valor da busca
    const [search, setSearch] = useState('')

    useEffect(() => {
      listarPersonagens(id).then((response) => {
        setPersonagens(response as CharacterList)
        setLoading(false)
      })
    }, [])

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Back />
                </TouchableOpacity>
                <Search onInputChange={(text) => {setSearch(text)}} placeholder="ex: Goku" width={width - 122} />
            </View>
            {loading ? 
            <LottieView
                style={{width: 200, marginLeft: 'auto', marginRight: 'auto'}}
                ref={animation}
                source={require('../../assets/927-triangle-loading.json')}
                autoPlay
            />
            :
            personagens.data.Media.characters.edges.filter((element) => element.node.name.userPreferred.toLowerCase().includes(search.toLowerCase())).length == 0 ? 
            <None text="Nenhum personagem encontrado!" /> : 
            <FlatList
                data={search == '' ? personagens.data.Media.characters.edges : personagens.data.Media.characters.edges.filter((element) => element.node.name.userPreferred.toLowerCase().includes(search.toLowerCase()))}
                numColumns={3}
                columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 10}}
                renderItem={({ item }) => <TouchableOpacity onPress={() => navigation.push('Infos', { id: item.node.id })}><Cover title={item.node.name.userPreferred} image={item.node.image.large} /></TouchableOpacity>}
            />}
        </View>
    )
}

// stilo da tela de personagens
const styles  = StyleSheet.create({
    container: {
        backgroundColor: themes.background,
        flex: 1,
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20
    }
})
