import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Grid, Pagination} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {CharacterInfo, SimpleCharacter} from "./Character";

interface PageInfo{
    count: number;
    pages: number;
    next: string;
    prev: string;
}

interface Page{
    info: PageInfo;
    results: CharacterInfo[];
}

const emptyPage: Page = {info:{count: 0, pages: 0, next: "", prev: ""}, results:[]};

const PageBrowser: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let currPageNo: number = Number.parseInt(searchParams.get("page") ?? "1");

    const [q, setQ] = useState("");
    const [currPage, setCurrPage] = useState(emptyPage);

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/?page=${currPageNo}&name=${q}`)
            .then(res => {
                setCurrPage(res.data as Page);
            }).catch(() => {
            setCurrPage(emptyPage);
            });
    }, [currPageNo, searchParams, q])

    return (
        <div>
            <Grid container spacing={2} justifyContent={"center"} sx={{
                backgroundColor: "#87ff6b"
            }}>
                <Grid key={"search-box"} item xs={12}>
                    Search: <input placeholder={"Rick.. or Morty"} type={"search"} value={q} onChange={(e) => {
                        setQ(e.target.value);
                    }}/>
                </Grid>
                {currPage.results.map((c) => {
                    return (
                        <Grid key={"character-".concat(c.id.toString())} item xs={12} sm={6} md={6} lg={4} xl={3}>
                            <SimpleCharacter char={c}/>
                        </Grid>
                    );
                })}
                <Grid key={"paginator"} item xs={12} justifyContent={"center"}>
                </Grid>
                <Pagination count={currPage.info.pages} page={currPageNo} onChange={(e, v) => {
                    setSearchParams({page: v.toString()});
                }}/>
            </Grid>
        </div>
    );
}
export default PageBrowser;