import * as React from 'react';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import Image from "next/image";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {useTypedSelector} from "../../hooks/useTypedSelector";

import {styled} from '@mui/material/styles';

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

const tableTitle = [
  {id: 1, title: 'Item'},
  {id: 2, title: 'Title'},
  {id: 3, title: 'Category'},
  {id: 4, title: 'Volume'},
]

export default function CustomizedTablesSalesHistory() {
  const {saleProduct} = useTypedSelector(state => state.products)

  return (
    <div
      style={{height: 526, border: "1px solid black", borderRadius: '6px'}}
    >
      <TableContainer component={Paper}>
        <Table>
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
            {!saleProduct?.length
              ?
              <StyledTableRow>
                <StyledTableCell>
                  Товаров нет
                </StyledTableCell>
              </StyledTableRow>
              :
              <>
                {saleProduct?.map((product) => (
                  <StyledTableRow key={product.id}>
                    <StyledTableCell>
                      <Image
                        draggable={false}
                        width={30}
                        height={40}
                        src={product.image}
                        alt='itemImg'
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      {product.title}
                    </StyledTableCell>
                    <StyledTableCell>{product.category}</StyledTableCell>
                    <StyledTableCell>{product.price}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}