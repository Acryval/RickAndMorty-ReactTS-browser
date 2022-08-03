import client from "./client";
import {AxiosResponse} from "axios";

export async function getPage(page:number, name:string):Promise<AxiosResponse>{
    if(name === "") return await client.get(`/character?page=${page}`);
    return await client.get(`/character?page=${page}&name=${name}`);
}
export function getCharacter(id:number):Promise<AxiosResponse>{
    return client.get(`/character/${id}`);
}

export function getEpisodes(ids: number[]){
    return client.get(`/episode/${ids.join(',')}`);
}