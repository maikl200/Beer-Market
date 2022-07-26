import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useGetBeersQuery} from "../../redux/beersApi";
import {beersType} from "../../types/beersType";
import {ChangeEvent, DragEventHandler} from "react";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CellImage = styled(TableRow)(({theme}) => ({
  maxWidth: 70,
  display: 'block',
  'img': {
    width: '100%'
  }
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return {name, calories, fat, carbs, protein};
}

interface TableMarketProp {
  dragOverHandler: (e, beer: beersType) => void
  dragLeaveHandler: (e) => void
  dragStartHandler: (e) => void
  dragEndHandler: (e, beer: beersType) => void
}

export default function CustomizedTablesMarket(
  {
    dragOverHandler,
    dragLeaveHandler,
    dragStartHandler,
    dragEndHandler
  }: TableMarketProp) {
  const {data} = useGetBeersQuery('beers')
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align={'center'}>Beers</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Volume</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((beer: beersType) => (
            <StyledTableRow
              className={'beers'}
              onDragOver={(e) => dragOverHandler(e, beer)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e)}
              onDragEnd={(e) => dragEndHandler(e, beer)}
              draggable={true}
              key={beer.id}>
              <CellImage>
                <img src={beer.image_url} alt='beerImg'/>
              </CellImage>
              <StyledTableCell component="th" scope="row">
                {beer.name}
              </StyledTableCell>
              <StyledTableCell align="right">{beer.description}</StyledTableCell>
              <StyledTableCell align="right">{beer.volume.unit} {beer.volume.value}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}