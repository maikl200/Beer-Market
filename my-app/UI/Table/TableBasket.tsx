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
import {useAction} from "../../hooks/useAction";
import {loadWebpackHook} from "next/dist/server/config-utils";

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

const tableTitle = [
  {id: 1, title: 'Item'},
  {id: 2, title: 'Title'},
  {id: 3, title: 'Category'},
  {id: 4, title: 'Volume'},
]

export default function CustomizedTablesBasket({dragOverHandler, dropHandler}: any) {
  const {basket} = useTypedSelector(state => state.products)
  const {productBasket} = useAction()
  const [readOnly, setReadOnly] = useState<boolean>(true)



  // useEffect(() => {
  //   const localBasketProduct = JSON.parse(localStorage.getItem('selectProduct')!)
  //   productBasket(localBasketProduct)
  // }, [])

  return (
    <TableContainer component={Paper}>
      <>
        <Table onDragOver={dragOverHandler} onDrop={dropHandler}>
          <TableHead>
            <TableRow>
              {tableTitle?.map((title) => (
                <React.Fragment key={title.id}>
                  <StyledTableCell>{title.title}</StyledTableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.map((products: ProductType) => (
              <StyledTableRow
                className={'beers'}
                key={products.id}>
                <StyledTableCell>
                  <img draggable={false} src={products.image} alt='beerImg'/>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <input draggable={false} readOnly={readOnly} defaultValue={products.title}/>
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    draggable={false}
                    readOnly={readOnly}
                    defaultValue={products.category}/>
                </StyledTableCell>
                <StyledTableCell>
                  <input
                    draggable={false}
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