import axios from "axios"
import { CharacterInfo } from "../interfaces/personagemInfosInterface"
import { CharacterList, Edge } from "../interfaces/personagemListInterface"

const url = 'https://graphql.anilist.co'


const listPersonagens = async(id: number, page: number) => {
  try {
    return await axios.post<CharacterList>(url, {
        query: `
        {Media(id: ${id}){
            title {
              romaji
            },
            characters(page: ${page}){
              pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
              }
              edges {
                node {
                  id
                  name {
                    userPreferred,
                  },
                  image {
                    large
                  }
                }
              }
            }
          }}`
        })
  } catch (error){
      console.error(error)
  }
}

// busca a lista de personagens da obra selecionada via query graphql selecionando só as informações necessarias
export const listarPersonagens = async(id: number) => {
    try {
        let page = 1
        const response = await listPersonagens(id, page)
        let data = response?.data
        // coleta os personagens de todas as paginas
        while(data?.data.Media.characters.pageInfo.hasNextPage) {
          page++
          const response = await listPersonagens(id, page)
          data.data.Media.characters.pageInfo.hasNextPage = response?.data.data.Media.characters.pageInfo.hasNextPage as boolean
          data.data.Media.characters.edges = data.data.Media.characters.edges.concat(response?.data.data.Media.characters.edges as Edge[]) as Edge[]
        }
        return data
    } catch (error){
        console.error(error)
    }
}

// busca as informações do personagem selecionado via query graphql selecionando só as informações necessarias
export const infoPersonagem =async (id: number) => {
    return await axios.post<CharacterInfo>(url, {
            query: `
            {
                Character(id: ${id}){
                  name {
                    first,
                  },
                  age,
                  gender,
                  bloodType,
                  dateOfBirth {
                    year,
                    month,
                    day
                  },
                  description,
                  image {
                    large
                  }
                }
              }`
            })
}