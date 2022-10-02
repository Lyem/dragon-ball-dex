import { View, ImageBackground, StyleSheet, Text } from "react-native";
import theme from '../themes'

type CoverProps = {
    image: string
    title: string
}

export default function Cover({image, title}: CoverProps) {
    return (
        <View>
            <ImageBackground style={styles.image} imageStyle={{ borderRadius: 3}} source={{uri: image}}>
                <View style={styles.titleContainer}>
                    <Text style={{color: theme.white}}>{title}</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles  = StyleSheet.create({
    image: {
        height: 150,
        width: 100, 
        resizeMode: 'contain'
    },
    titleContainer: {
        backgroundColor: 'rgba(17, 18, 19, 0.85)',
        position: 'absolute',
        minHeight: 30,
        width: '100%',
        bottom: 0,
        textAlign: 'center',
        padding: 5,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3
    }
})