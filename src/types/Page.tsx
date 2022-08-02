
import {CharacterInfo} from "./CharacterInfo";
import {PageInfo} from "./PageInfo";

export interface Page {
    info: PageInfo;
    results: CharacterInfo[];
}