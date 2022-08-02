import React, {useEffect, useState} from 'react'
import {useSearchParams} from "react-router-dom";

import {Grid, Pagination} from "@mui/material";

import {getPage} from "../util/apiInterface";
import {SimpleCharacter} from "./SimpleCharacter";
import {CharacterInfo} from "../types/CharacterInfo";
import {emptyPage} from "../mockups/pageMockup";
import {Page} from "../types/Page";

export const PageBrowser:React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    let currPageNo: number = Number.parseInt(searchParams.get("page") ?? "1");

    const [q, setQ] = useState("");
    const [currPage, setCurrPage] = useState(emptyPage);

    useEffect(() => {
        getPage(currPageNo, q).then(res => {setCurrPage(res.data as Page);}).catch(() => {setCurrPage(emptyPage);});
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
                {currPage.results.map((c: CharacterInfo) => {
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