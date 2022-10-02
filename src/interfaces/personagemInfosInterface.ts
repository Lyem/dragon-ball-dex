export interface Name {
    first: string;
}

export interface DateOfBirth {
    year?: any;
    month?: any;
    day?: any;
}

export interface Image {
    large: string;
}

export interface Character {
    name: Name;
    age: string;
    gender?: any;
    bloodType: string;
    dateOfBirth: DateOfBirth;
    description: string;
    image: Image;
}

export interface Data {
    Character: Character;
}

export interface CharacterInfo {
    data: Data;
}
