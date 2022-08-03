import * as React from 'react';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Image from "next/image";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';

import CustomizedButtons from "../Button/Button";

import nookies from "nookies";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";

import {ProductType} from "../../redux/product/ProductType";

import {styled} from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxHeight: 600,
  },
  maxWidth: 70,
  'input': {
    width: '100%',
    border: 'none',
    background: 'none',
    outline: 'none'
  },
  maxHeight: 600
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
  {id: 5, title: ''},
]

interface TableBasketProps {
  setIsShowBtn: Dispatch<SetStateAction<boolean>>
  dragOverHandler: (e: React.DragEvent<HTMLDivElement> | React.FormEvent<HTMLInputElement>) => void
  dropHandler: (e: React.DragEvent<HTMLDivElement> | React.FormEvent<HTMLInputElement>) => void
  setIsDisabled: Dispatch<SetStateAction<boolean>>
}


export default function CustomizedTablesBasket(
  {
    setIsShowBtn,
    dragOverHandler,
    dropHandler,
    setIsDisabled
  }: TableBasketProps) {
  const {basket} = useTypedSelector(state => state.products)
  const {setProductBasket} = useAction()
  const [editId, setEditId] = useState<number>(0)
  const [dataInput, setDataInput] = useState<string[]>([])

  useEffect(() => {
    if (basket?.length) setIsShowBtn(true)
  }, [basket])

  const editProduct = (id: number) => {

    if (id === editId) {
      setEditId(0)
      const findProduct = basket.find(item => item.id === id)
      const mapProduct = basket.map(item => {
        if (item.id === findProduct!.id) {
          return {
            ...findProduct,
            ...dataInput,
          }
        }
        return item
      })
      setDataInput([])
      setProductBasket(mapProduct)
      nookies.set(null, 'selectProduct', JSON.stringify(mapProduct))
      setIsDisabled(false)
    } else {
      setEditId(id)
      setIsDisabled(true)
    }
  }

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataInput(st => ({...st, [name]: e.target.value}))
  }
  return (
    <div
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e)}
      style={{height: 675, border: "1px solid black", borderRadius: '6px'}}>
      <TableContainer component={Paper}>
        <>
          <Table
          >
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
              {basket?.map((product: ProductType) => (
                <StyledTableRow
                  key={product.id}>
                  <StyledTableCell>
                    <Image
                      draggable={false}
                      width={30}
                      height={40}
                      src={product.image}
                      alt='itemImg'
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <input
                      draggable={false}
                      onChange={handleChange('title')}
                      readOnly={product.id !== editId}
                      defaultValue={product.title}/>
                  </StyledTableCell>
                  <StyledTableCell>
                    <input
                      onChange={handleChange('category')}
                      draggable={false}
                      readOnly={product.id !== editId}
                      defaultValue={product.category}/>
                  </StyledTableCell>
                  <StyledTableCell>
                    <input
                      onChange={handleChange('price')}
                      draggable={false}
                      readOnly={product.id !== editId}
                      defaultValue={product.price}/>
                  </StyledTableCell>
                  <StyledTableCell>
                    {product.id !== editId
                      ?
                      <CustomizedButtons onClick={() => editProduct(product.id)} title='Edit'/>
                      :
                      <CustomizedButtons onClick={() => editProduct(product.id)} title='OK'/>

                    }
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </>
      </TableContainer>
    </div>
  );
}