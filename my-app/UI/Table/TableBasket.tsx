import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useGetBeersQuery} from "../../redux/beer/beersApi";
import {ProductType} from "../../redux/beer/ProductType";
import {FC, useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {log} from "util";
import {useAction} from "../../hooks/useAction";

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  maxWidth: 70,
  'img': {
    width: '30%'
  }
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
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

export default function CustomizedTablesBasket({dragOverHandler, dropHandler}: any) {
  const {basket} = useTypedSelector(state => state.products)

  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('selectProduct')!) ?? [])
  }, [basket])

  return (
    <TableContainer component={Paper}>
      <>
        <Table onDragOver={dragOverHandler} onDrop={dropHandler}>
          <TableHead>
            <TableRow>
              <StyledTableCell align='left'>Item</StyledTableCell>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="right">Volume</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((products: ProductType) => (
              <StyledTableRow
                className={'beers'}
                draggable={true}
                key={products.id}>
                <StyledTableCell>
                  <img src={products.image} alt='beerImg'/>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {products.title}
                </StyledTableCell>
                <StyledTableCell align="right">{products.category}</StyledTableCell>
                <StyledTableCell align="right">{products.price}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </>
    </TableContainer>
  );
}