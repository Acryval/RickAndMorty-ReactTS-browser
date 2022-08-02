import {Button, Grid, Link} from "@mui/material";
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Image} from "@mantine/core";
import {Box} from "@mui/system";

export interface CharacterInfo{
    id: number;
    name: string;
    status: "Alive" | "Dead" | "unknown";
    species: string;
    type: string;
    gender: "Female" | "Male" | "Genderless" | "unknown";
    origin: {name: string, url: string};
    location: {name: string, url: string};
    image: string;
    episode: string[];
    url: string;
    created: string;
}

interface CharacterProps{
    char: CharacterInfo;
}

export const SimpleCharacter:React.FC<CharacterProps> = (props) => {
    return (
        <Box sx={{
            backgroundColor: '#87ff6b',
            minHeight: 200,
            border:1
        }}>
            <Link sx={{
                textDecoration: "none",
                color:'#222'
            }} href={"/character/?id=" + props.char.id}>
                <Box sx={{
                    border:10,
                    borderColor: '#87ff6b'
                }}>
                    <Image src={props.char.image}/>
                </Box>
                <Box>
                    Name: {props.char.name}
                    Status: {props.char.status}
                </Box>
            </Link>
        </Box>
    );
}

export const Character:React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    let idValue: number = Number.parseInt(searchParams.get("id") ?? "1");

    const [charInfo, setCharInfo] = useState({
        id: 0,
        name: "",
        status: "unknown",
        species: "",
        type: "",
        gender: "unknown",
        origin: {name: "", url: ""},
        location: {name: "", url: ""},
        image: "",
        episode: [],
        url: "",
        created: ""} as CharacterInfo);

    useEffect(() => {
        axios.get(`http://rickandmortyapi.com/api/character/${idValue}`)
            .then(res => {
                setCharInfo(res.data as CharacterInfo);
            });
    }, [idValue]);

    return (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Image src={charInfo.image}/>
        </Grid><Grid item xs={12}>
            Id: {charInfo.id}
        </Grid><Grid item xs={12}>
            Name: {charInfo.name}
        </Grid><Grid item xs={12}>
            Status: {charInfo.status}
        </Grid><Grid item xs={12}>
            Species: {charInfo.species}
        </Grid><Grid item xs={12}>
            Type: {charInfo.type}
        </Grid><Grid item xs={12}>
            Gender: {charInfo.gender}
        </Grid><Grid item xs={12}>
            Origin: <Link href={charInfo.origin.url}>{charInfo.origin.name}</Link>
        </Grid><Grid item xs={12}>
            Location: <Link href={charInfo.location.url}>{charInfo.location.name}</Link>;
        </Grid><Grid item xs={12}>
            Created: {charInfo.created};
        </Grid><Grid item xs={12}>
            Episodes:
            <Grid container spacing={1}>
                {charInfo.episode.map((e) => {
                    return (
                        <Grid item xs={8}>
                            <Link href={e}>{"Episode " + e.split("/").pop()}</Link>
                        </Grid>);
                })}
            </Grid>
        </Grid><Grid item xs={12}>
            <Button onClick={() => {
                navigate(-1);
            }}>Go Back</Button>
        </Grid>
    </Grid>);
}