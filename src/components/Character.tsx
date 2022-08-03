
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useSearchParams} from "react-router-dom";

import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Link} from "@mui/material";
import {Image} from '@mantine/core'

import {emptyCharacter} from "../mockups/CharacterMockup";
import {getCharacter, getEpisodes} from "../util/apiInterface";
import {CharacterInfo} from "../types/CharacterInfo";
import {EpisodeInfo} from "../types/EpisodeInfo";

export const Character:React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    let idValue: number = Number.parseInt(searchParams.get("id") ?? "1");

    const [charInfo, setCharInfo] = useState(emptyCharacter);
    const [episodeList, setEpisodeList] = useState([] as {season:number, episodes:EpisodeInfo[]}[]);

    useEffect(() => {
        getCharacter(idValue)
            .then(res => {
                let tempCharInfo: CharacterInfo = res.data;
                if(tempCharInfo.type === ""){
                    tempCharInfo.type = tempCharInfo.species;
                }
                setCharInfo(tempCharInfo);
            });
    }, []);

    useEffect(() => {
        let tempEpList: typeof episodeList = [];
        let epIDs: number[] = [];

        charInfo.episode.forEach(e => {
            epIDs.push(Number.parseInt(e.split("/").pop() ?? ""));
        });

        getEpisodes(epIDs).then(res => {
            if(epIDs.length === 1){
                let ep: EpisodeInfo = res.data;
                tempEpList.push({season:Number.parseInt(ep.episode.substring(1, 4)), episodes:[ep]});
            }else{
                let eps: EpisodeInfo[] = res.data;

                eps.forEach(e => {
                    let season = Number.parseInt(e.episode.substring(1, 4));
                    let si: number = -1;

                    if(typeof tempEpList.find((v, i) => {
                        if(v.season === season){
                            si = i;
                            return true;
                        }
                        return false;
                    }) === "undefined"){
                        tempEpList.push({season:season, episodes:[e]});
                    }else{
                        tempEpList[si].episodes.push(e);
                    }
                });
            }

            setEpisodeList(tempEpList);
        });
    }, [charInfo])

    return (<Grid container sx={{
        backgroundColor:'#97BC62',
        color:'#fca',
    }}>
        <Grid item xs={12} sm={5} p={2}>
            <Image src={charInfo.image}/>
        </Grid>
        <Grid item xs={12} sm={6} p={2} sx={{
            backgroundColor:'#2C5F2D',
            border:16,
            borderColor:'#97BC62',
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
                Origin: <Link sx={{textDecoration: 'none', color:'#ceab95'}} href={charInfo.origin.url}><b>{charInfo.origin.name}</b></Link>
            </Grid><Grid key={"location-" + idValue} item xs={12}>
                Location: <Link sx={{textDecoration: 'none', color:'#ceab95'}} href={charInfo.location.url}><b>{charInfo.location.name}</b></Link>
            </Grid><Grid key={"created-" + idValue} item xs={12}>
                Created: <b>{charInfo.created}</b>
            </Grid>
        </Grid>
        <Grid item xs={12} p={2}>
            <Accordion sx={{
                backgroundColor:'#2C5F2D',
                color:'#fca',
            }}>
                <AccordionSummary>
                    Episodes
                </AccordionSummary>
                <AccordionDetails>
                    {episodeList.map(S => {
                        return (
                            <Accordion>
                                <AccordionSummary>Season {S.season}</AccordionSummary>
                                <AccordionDetails>
                                    {S.episodes.map(e => {
                                        return (
                                            <Grid key={"episode-link-" + e.id} item xs={3} md={2} lg={1}>
                                                <Link href={e.url}>Episode {e.id}</Link>
                                            </Grid>);
                                    })}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </AccordionDetails>
            </Accordion>
        </Grid>
        <Grid item xs={12} p={2}>
            <Box textAlign={"center"}>
                <Button sx={{
                    backgroundColor:'#2C5F2D',
                    color:'#fca',
                }} onClick={() => {
                    navigate(-1);
                }}>
                    <b>Go Back</b>
                </Button>
            </Box>
        </Grid>
    </Grid>);
}