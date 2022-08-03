
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";

import {Button, Grid, Link} from "@mui/material";
import {Image} from '@mantine/core'

import {CharacterInfo} from "../types/CharacterInfo";
import {emptyCharacter} from "../mockups/CharacterMockup";
import {getCharacter} from "../util/apiInterface";
import {Box} from "@mui/system";

export const Character:React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    let idValue: number = Number.parseInt(searchParams.get("id") ?? "1");

    const [charInfo, setCharInfo] = useState(emptyCharacter);

    useEffect(() => {
        getCharacter(idValue)
            .then(res => {
                let tempCharInfo: CharacterInfo = res.data;
                if(tempCharInfo.type === ""){
                    tempCharInfo.type = tempCharInfo.species;
                }
                setCharInfo(tempCharInfo);
            });
    }, [idValue]);

    return (
        <Box sx={{
            marginLeft:2,
        }}>
            <Grid container spacing={2} sx={{
                backgroundColor: '#97BC62',
                justifyContent: 'center',
            }}>
                <Grid key={"image-" + idValue} item xs={12} sx={{
                    ml:1,
                    mr:3,
                    mt:3,
                }}>
                    <Image src={charInfo.image}/>
                </Grid>
                <Grid item xs={12} sx={{
                    padding:2,
                    border:16,
                    borderColor:'#97BC62',
                    backgroundColor:'#2C5F2D',
                }}>
                    <Grid key={"id-" + idValue} item xs={12}>
                        Character Id: <b>{charInfo.id}</b>
                    </Grid><Grid key={"name-" + idValue} item xs={12}>
                        Name: <b>{charInfo.name}</b>
                    </Grid><Grid key={"status-" + idValue} item xs={12}>
                        Status: <b>{charInfo.status}</b>
                    </Grid><Grid key={"species-" + idValue} item xs={12}>
                        Species: <b>{charInfo.species}</b>
                    </Grid><Grid key={"type-" + idValue} item xs={12}>
                        Type: <b>{charInfo.type}</b>
                    </Grid><Grid key={"gender-" + idValue} item xs={12}>
                        Gender: <b>{charInfo.gender}</b>
                    </Grid><Grid key={"origin-" + idValue} item xs={12}>
                        Origin: <Link sx={{textDecoration: 'none', color:'#fca'}} href={charInfo.origin.url}><b>{charInfo.origin.name}</b></Link>
                    </Grid><Grid key={"location-" + idValue} item xs={12}>
                        Location: <Link sx={{textDecoration: 'none', color:'#fca'}} href={charInfo.location.url}><b>{charInfo.location.name}</b></Link>;
                    </Grid><Grid key={"created-" + idValue} item xs={12}>
                        Created: <b>{charInfo.created}</b>
                    </Grid>
                    <Grid key={"episodes-" + idValue} item xs={12}>
                        Episodes:
                        <Grid container spacing={1}>
                            {charInfo.episode.map((e) => {
                                let epno = e.split("/").pop();
                                return (
                                    <Grid key={"episode-" + epno} item xs={3} md={2} lg={1}>
                                        <Link sx={{textDecoration: 'none', color:'#fca', pl:2}} href={e}><b>{"Episode " + epno}</b></Link>
                                    </Grid>);
                            })}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid key={"navigator"} item>
                    <Button sx={{
                        backgroundColor:'#2C5F2D',
                        textAlign:"center",
                        mr:2,
                    }} onClick={() => {
                        navigate(-1);
                    }}><b>Go Back</b></Button>
                </Grid>
            </Grid>
        </Box>);
}