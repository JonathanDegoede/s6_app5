import { useCallback, useEffect, useState } from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "../node_modules/@mui/material/index";
import { useQuery } from "../node_modules/react-query/es/react/useQuery";

const History = () => {

    const { data } = useQuery('fetchArchive', async () => {
        const response = await fetch('http://localhost:3002/archive');
        const json = await response.json();
        const content = json.content;
        const length = json.length;
        var result = content;
        if(length >= 10) {
            result = content.slice(length-10, length);
        }
        return result.reverse();

    }, {refetchInterval: 1000});

    const [emptyRows, setEmptyRows] = useState([]);

    const fillEmptyRows = useCallback (() => {
        const rows = [];
        const length = data?.length ? 10 - data?.length : 10;
        for(let i = 0; i < length; i++) {
            rows.push({
                local : "",
                action : "",
                address : "",
            });
        }
        setEmptyRows(rows);
    }, [data]);

    useEffect(()=>{
        fillEmptyRows();
    }, [data, fillEmptyRows])

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>Local</TableCell>
                            <TableCell align={"center"}>Event</TableCell>
                            <TableCell align={"center"}>Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data && data.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell sx={{padding: "14px"}} align={"center"}>{item.local}</TableCell>
                                        <TableCell sx={{padding: "14px"}} align={"center"}>{item.action}</TableCell>
                                        <TableCell sx={{padding: "14px"}} align={"center"}>{item.address}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {
                            emptyRows.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell align={"center"} sx={{ padding: "14px", height: "20px"}}>
                                            <Box />
                                        </TableCell>
                                        <TableCell align={"center"} sx={{ padding: "14px", height: "20px"}}>
                                            <Box />
                                        </TableCell>
                                        <TableCell align={"center"} sx={{padding: "14px", height: "20px"}}>
                                            <Box />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default History;