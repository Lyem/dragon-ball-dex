import { TextInput, StyleSheet, View, NativeSyntheticEvent, TextInputChangeEventData} from "react-native"
import themes from '../themes'
import { AntDesign } from '@expo/vector-icons'
import { useState } from "react"

type SearchProps = {
    placeholder?: string
    initialValue?: string
    width?: number
    onInputChange?: (value: string) => void
}

export default function Search({placeholder, width, onInputChange, initialValue = ''}: SearchProps) {

    const [value, setValue] = useState(initialValue)

    const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const newValue = e.nativeEvent.text
        setValue(newValue)
    
        !!onInputChange && onInputChange(newValue)
    }

    return (
        <View style={{flexDirection: 'row', marginBottom: 20}}>
            <TextInput onChange={onChange} value={value} placeholderTextColor={themes.gray} placeholder={placeholder} style={[styles.search, {width: width}]} />
            <View style={styles.iconContainer}>
                <AntDesign style={{marginTop: 'auto', marginBottom: 'auto'}} name="search1" size={20} color={themes.primary} />
            </View>
        </View>
    )
}

const styles  = StyleSheet.create({
    iconContainer: {
        backgroundColor: themes.contrast, 
        height: '100%',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 5,
        maxHeight: 40
    },
    search: {
        backgroundColor: themes.contrast,
        height: 40,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        color: themes.white,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        border: 'none',
        outlineStyle: 'none',
    }
})
