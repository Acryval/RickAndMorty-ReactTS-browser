import React, {useEffect, useRef, useState} from 'react'
import {useSearchParams} from "react-router-dom";

import {Box, Grid, Pagination} from "@mui/material";

import {SimpleCharacter} from "./SimpleCharacter";
import {getPage} from "../util/apiInterface";
import {emptyPage} from "../mockups/pageMockup";
import {Page} from "../types/Page";
import {CharacterInfo} from "../types/CharacterInfo";

export const PageBrowser:React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currPageNo, setCurrPageNo] = useState(Number.parseInt(searchParams.get("page") ?? "1"));
    const [q, setQ] = useState(searchParams.get("search") ?? "");
    const [currPage, setCurrPage] = useState(emptyPage);
    const [loading, setLoading] = useState(false);
    const timeout = useRef<any>();

    const fetchPage = (currPageNo:number, q:string) => {
        setLoading(false);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(async () => {
            setLoading(true);
            await getPage(currPageNo, q).then(res => {setCurrPage(res.data as Page);}).catch(() => {setCurrPage(emptyPage);});
            setLoading(false);
        }, 300);
    }

    useEffect(() => {
        if(q !== ""){
            setSearchParams({"page": currPageNo.toString(), "search":q});
        }else{
            setSearchParams({"page":currPageNo.toString()});
        }
        if(!loading) fetchPage(currPageNo, q);
    }, [currPageNo, q])

    return (
        <Box sx={{
            marginLeft:2,
        }}>
            <Grid container spacing={2} justifyContent={"center"} sx={{
                backgroundColor: '#97BC62',
                color: '#fff',
            }}>
                <Grid key={"search-box"} item xs={12}>
                    <Box sx={{
                        textAlign:"right",
                        pr:1,
                        color:"#222",
                    }}>
                        Search: <input placeholder={"Rick.. or Morty"} type={"search"} value={q} onChange={(e) => {
                            if(q !== e.target.value){
                                setCurrPageNo(1);
                            }
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
                <Grid key={"paginator"} item xs={12} sx={{py:3}}>
                    <Pagination sx={{
                        "& > *": {
                            justifyContent:"center",
                        }
                    }} count={currPage.info.pages} page={currPageNo} onChange={(e, v) => {
                        setCurrPageNo(v);
                    }}/>
                </Grid>
            </Grid>
        </Box>
    );
}