
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";

import {Button, Grid, Link} from "@mui/material";
import {Image} from '@mantine/core'

import {CharacterInfo} from "../types/CharacterInfo";
import {emptyCharacter} from "../mockups/CharacterMockup";
import {getCharacter} from "../util/apiInterface";

export const Character:React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    let idValue: number = Number.parseInt(searchParams.get("id") ?? "1");

    const [charInfo, setCharInfo] = useState(emptyCharacter);

    useEffect(() => {
        getCharacter(idValue)
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