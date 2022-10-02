import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Text, Dimensions } from "react-native";
import Back from "../components/back";
import themes from "../themes";
import Markdown from 'react-native-markdown-renderer';
import React, { useEffect, useRef, useState } from "react";
import { CharacterInfo } from "../interfaces/personagemInfosInterface";
import { infoPersonagem } from "../services/personagensService"
import LottieView from 'lottie-react-native';
import None from "../components/none";

// tipo de dados recebidos pela função de infos
type InfosProps = {
    navigation: any
    route: any
}

// tamanho vertical da tela
var height = Dimensions.get('window').height;

// tela infos
export default function Infos({navigation, route}: InfosProps) {
    // id enviado pela rota anterior
    const id = route.params?.id

    const animation = useRef(null);

    // estado de carregamento
    const [loading, setLoading] = useState(true)

    // informações do personagem
    const [personagem, setPersonagem] = useState({"data":{"Character":{"name":{"first":""},"age":"","gender":"","bloodType":"","dateOfBirth":{"year":"","month":"","day":""},"description":"","image":{"large":"https://s4.anilist.co/file/anilistcdn/character/large/default.jpg"}}}} as CharacterInfo)

    useEffect(() => {
        // coleta as informações do personagem selecionado
        infoPersonagem(id).then((response) => {
            setPersonagem(response.data)
            setLoading(false)
        })
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{marginBottom: 20, marginLeft: 20}} onPress={() => navigation.goBack()}>
                <Back />
            </TouchableOpacity>
            {loading ? 
            <LottieView
                style={{width: 200, marginLeft: 'auto', marginRight: 'auto'}}
                ref={animation}
                source={require('../../assets/927-triangle-loading.json')}
                autoPlay
            /> :
            <ScrollView>
                <View style={styles.infosContainer}>
                    <Image style={styles.image} source={{uri: personagem.data.Character.image.large}} />
                    <Text style={{color: themes.white, textAlign: 'center', fontSize: 25, marginTop: 5}}>{personagem.data.Character.name.first}</Text>
                    {!personagem.data.Character.age && !personagem.data.Character.bloodType && !personagem.data.Character.gender && personagem.data.Character.dateOfBirth.day+personagem.data.Character.dateOfBirth.month + personagem.data.Character.dateOfBirth.year == "" && !personagem.data.Character.description &&
                        <None text="Personagem sem informações!" />
                    }
                    {personagem.data.Character.age && <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textValue}>Age: </Text>
                        <Text style={styles.text}>{personagem.data.Character.age}</Text>
                    </View>}
                    {personagem.data.Character.bloodType && <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textValue}>Blood type: </Text>
                        <Text style={styles.text}>{personagem.data.Character.bloodType}</Text>
                    </View>}
                    {personagem.data.Character.gender && <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textValue}>Gender: </Text>
                        <Text style={styles.text}>{personagem.data.Character.gender}</Text>
                    </View>}
                    {personagem.data.Character.dateOfBirth.day+personagem.data.Character.dateOfBirth.month + personagem.data.Character.dateOfBirth.year != "" && <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textValue}>Date of birth: </Text>
                        <Text style={styles.text}>{personagem.data.Character.dateOfBirth.day}/{personagem.data.Character.dateOfBirth.month}/{personagem.data.Character.dateOfBirth.year}</Text>
                    </View>}
                    {/* formata o markdown da descrição */}
                    {/* @ts-ignore*/}
                    {personagem.data.Character.description && <Markdown style={{text: {color: themes.gray}, strong: {color: themes.white}}}>{personagem.data.Character.description}</Markdown>}
                </View>
            </ScrollView>
            }
        </View>
    )
}

// stilo da pagina infos
const styles  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.background,
        paddingTop: 20,
    },
    image: {
        height: 200,
        width: 150, 
        resizeMode: 'contain',
        borderRadius: 5,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: -90
    },
    infosContainer:{
        backgroundColor: themes.contrast,
        paddingRight: 20,
        paddingLeft: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flex: 1,
        marginTop: 100,
        minHeight: height - 180
    },
    textValue: {
        color: themes.white
    },
    text: {
        color: themes.gray
    }
})