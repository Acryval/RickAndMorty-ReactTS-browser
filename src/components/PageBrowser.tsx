import React, {useEffect, useState} from 'react'
import {useSearchParams} from "react-router-dom";

import {Grid, Pagination} from "@mui/material";

import {getPage} from "../util/apiInterface";
import {SimpleCharacter} from "./SimpleCharacter";
import {CharacterInfo} from "../types/CharacterInfo";
import {emptyPage} from "../mockups/pageMockup";
import {Page} from "../types/Page";
import {Box} from "@mui/system";

export const PageBrowser:React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let currPageNo: number = Number.parseInt(searchParams.get("page") ?? "1");

    const [q, setQ] = useState("");
    const [currPage, setCurrPage] = useState(emptyPage);

    useEffect(() => {
        getPage(currPageNo, q).then(res => {setCurrPage(res.data as Page);}).catch(() => {setCurrPage(emptyPage);});
    }, [currPageNo, searchParams, q])

    return (
        <Box sx={{
            marginLeft:2,
        }}>
            <Grid container spacing={2} justifyContent={"center"} sx={{
                backgroundColor: '#97BC62',
                color: '#fff',
            }}>
                <Grid key={"search-box"} xs={12}sx={{
                    mt:3,
                }}>
                    <Box sx={{
                        textAlign:"right",
                        pr:1,
                        color:"#222",
                    }}>
                        Search: <input placeholder={"Rick.. or Morty"} type={"search"} value={q} onChange={(e) => {
                            setQ(e.target.value);
                        }}/>
                    </Box>
                </Grid>
                {currPage.results.map((c: CharacterInfo) => {
                    return (
                        <Grid key={"character-".concat(c.id.toString())} item xs={12} sm={6} md={6} lg={4} xl={3} sx={{
                            padding:2,
                            border:8,
                            borderColor:'#97BC62',
                            backgroundColor:'#2C5F2D',
                        }}>
                            <SimpleCharacter char={c}/>
                        </Grid>
                    );
                })}
                <Grid key={"paginator"} sx={{py:3}}>
                    <Pagination count={currPage.info.pages} page={currPageNo} onChange={(e, v) => {
                        setSearchParams({page: v.toString()});
                    }}/>
                </Grid>
            </Grid>
        </Box>
    );
}