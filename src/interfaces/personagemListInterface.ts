export interface Title {
    romaji: string;
}

export interface PageInfo {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    hasNextPage: boolean;
}

export interface Name {
    userPreferred: string;
}

export interface Image {
    large: string;
}

export interface Node {
    id: number;
    name: Name;
    image: Image;
}

export interface Edge {
    node: Node;
}

export interface Characters {
    pageInfo: PageInfo;
    edges: Edge[];
}

export interface Media {
    title: Title;
    characters: Characters;
}

export interface Data {
    Media: Media;
}

export interface CharacterList {
    data: Data;
}