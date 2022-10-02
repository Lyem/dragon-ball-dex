import { StyleSheet, View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import themes from '../themes';

type NoneProps = {
    text: string
}

export default function None({text}: NoneProps) {
    return (
        <View style={styles.center}>
            <AntDesign name="inbox" size={55} color={themes.white} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles  = StyleSheet.create({
    center: {
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        color: themes.white,
        fontSize: 15
    }
})