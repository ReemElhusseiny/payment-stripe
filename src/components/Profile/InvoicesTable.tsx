import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Chip,
//   Box,
// } from "@mui/material";
import { tableColumns } from "./TableColumns";
// import useInvoices from "../../CustomHooks/FetchInvoices";
import { useEffect } from "react";
import Table from '../../components/UI/Table'
import useInvoicesStore from '../../Store/InvoicesStore'

export default function InvoicesTable() {

const {invoicesData, loading , invoices} = useInvoicesStore()

useEffect(() => {
   const fetchInvoices = async () =>{
    await invoices ();
   }
   fetchInvoices()
}, [])
  return (
     <Table  loading={loading} tableColumns={tableColumns} data={invoicesData} />
  );
}