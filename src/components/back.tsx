import { View, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import theme from '../themes'

export default function Back() {
    return (
        <View style={styles.container}>
            <AntDesign style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto'}} name="arrowleft" size={24} color={theme.primary} />
        </View>
    )
}

const styles  = StyleSheet.create({
    container: {
        backgroundColor: theme.contrast,
        borderRadius: 5,
        marginRight: 10,
        width: 40,
        height: 40,
    }
})