import client from "./client";
import {AxiosResponse} from "axios";

export function getPage(page:number, name:string):Promise<AxiosResponse>{
    return client.get(`/character?page=${page}&name=${name}`);
}
export function getCharacter(id:number):Promise<AxiosResponse>{
    return client.get(`/character/${id}`);
}