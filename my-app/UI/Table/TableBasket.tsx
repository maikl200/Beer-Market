import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ProductType} from "../../redux/beer/ProductType";
import {useEffect, useState} from "react";
import {useTypedSelector} from "../../hooks/useTypedSelector";

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
  },
  'input': {
    width: '100%',
    border: 'none',
    background: 'none',
    outline: 'none'
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

export default function CustomizedTablesBasket({dragOverHandler, dropHandler}: any) {
  const {basket} = useTypedSelector(state => state.products)
  const [products, setProducts] = useState<ProductType[]>()
  const [readOnly, setReadOnly] = useState<boolean>(true)

  useEffect(() => {
    const sellProducts = JSON.parse(localStorage.getItem('selectProduct')!)
    setProducts(sellProducts)
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
            {products?.map((products: ProductType) => (
              <StyledTableRow
                className={'beers'}
                key={products.id}>
                <StyledTableCell>
                  <img draggable={false} src={products.image} alt='beerImg'/>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <input readOnly={readOnly} defaultValue={products.title}/>
                </StyledTableCell>
                <StyledTableCell
                  align="right">
                  <input
                    readOnly={readOnly}
                    defaultValue={products.category}/>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <input
                    readOnly={readOnly}
                    defaultValue={products.price}/>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </>
    </TableContainer>
  );
}