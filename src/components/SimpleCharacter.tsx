
import React from 'react'

import {Box, Link} from "@mui/material";
import {Image} from "@mantine/core";

import {CharacterInfo} from "../types/CharacterInfo";

export const SimpleCharacter:React.FC<{char: CharacterInfo}> = (props) => {
    return (
        <Box sx={{
        }}>
            <Link sx={{
                textDecoration: "none",
                textAlign:"left",
                color:'#fff'
            }} href={"/character/?id=" + props.char.id}>
                <Box sx={{
                    border:10,
                    borderColor:'#2C5F2D'
                }}>
                    <Image src={props.char.image}/>
                </Box>
                <Box>
                    Name: {props.char.name}<br/>
                    Status: {props.char.status}
                </Box>
            </Link>
        </Box>
    );
}
