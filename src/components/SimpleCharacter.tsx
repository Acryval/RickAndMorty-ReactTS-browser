
import React from 'react'

import {Box, Link} from "@mui/material";
import {Image} from "@mantine/core";

import {CharacterInfo} from "../types/CharacterInfo";

export const SimpleCharacter:React.FC<{char: CharacterInfo}> = (props) => {
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
