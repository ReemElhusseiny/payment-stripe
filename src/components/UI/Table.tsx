/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import get from 'lodash/get';
import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, TablePagination, Table } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadinginComp from '../../pages/LoadinginComp';
import { FaRegFilePdf } from "react-icons/fa6";

interface TableProbs {
tableColumns: {
    id: string;
    label: string;
  }[],
page?: number,
setPage?: (page: number) => void;
 loading: boolean,
  pageSize?: number,
   setPageSize?: (size: number) => void;
    totalCount?: number,
    setTotalCount?: React.Dispatch<React.SetStateAction<number>>;
    data: any,
    func?: (base64Data: string, fileName: string, fileType: string)=> void,
    urlPage? : string;
}
interface FileItems {
file_base64: string;
file_size: number;
file_type: string; 
uploaded_at: string; 
file_name: string,
}
interface TableDataType {
  id: number;
  [key: string]: any;
  files?: FileItems | FileItems[];
}

export default function TableFiles(props: TableProbs) {
    const {tableColumns,page, setPage, loading, pageSize, setPageSize, totalCount, data, func, urlPage } = props
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  if (loading) {
    return <LoadinginComp />
  }
const handleDownloadPDF = async (
  event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  url: string
) => {
  event.stopPropagation();
  event.preventDefault();

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `Invoice_${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
    window.location.href = url;
  }
};
  return (
    <div className="w-full h-full">
    <TableContainer component={Paper} sx={{ boxShadow: 'none', background: 'transparent' }}>
      <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '0 10px',
   }} aria-label="simple table">
        <TableHead style={{ 
  background: '#eef0ff'
}}>
          <TableRow>
            {tableColumns?.map((item)=> {
                return(
                     <TableCell sx={{ fontWeight: 'bold' }} align="left">{item.label}</TableCell>
                )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
      {data?.map((company: TableDataType) => (
          <TableRow
            key={company.id}
            sx={{
            cursor: 'pointer',
            backgroundColor: '#ffffff',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            },
          
    }}
            onClick= {() => {
               if(urlPage){
                navigate(`/${urlPage}/${company.id}`)
                }
              }}
        
          >
            {tableColumns.map((col) => {
              const cellValue = get(company, col.id, 'N/A');
              console.log("cellValue", cellValue)
              console.log("col", col)
              if (col.label === 'Actions') return (
                <TableCell
                 onClick={(event) => {
  event.stopPropagation();
  
  const firstFile = Array.isArray(company?.files) ? company?.files?.[0] : company?.files;

  func?.(
    firstFile?.file_base64 || '',
    firstFile?.file_name || 'download',
    firstFile?.file_type || 'application/octet-stream'
  );
}}
                      sx={{
                  borderBottom: 'none', 
                  padding: '16px', 
                }}
                  key={col.id}
                  align="left"
                >
                  Download
                </TableCell>
              )
             if (col.id === 'pdf_url' || col.label === 'PDF URL') {
  const pdfUrl = get(company, col.id, company?.pdf_url ?? '');

  return (
   <TableCell key={col.id}>
  {pdfUrl ? (
    <button
      type="button"
      onClick={(e) => handleDownloadPDF(e, pdfUrl)}
      className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-gray-900 bg-white border border-indigo-100 rounded-full hover:bg-[#3730a3] hover:text-white transition-colors cursor-pointer shadow-sm"
    >
  <FaRegFilePdf />
      Download PDF
    </button>
  ) : (
    <span className="text-gray-400 text-sm">N/A</span>
  )}
</TableCell>
  );
}
              else {
             return (
                <TableCell    sx={{
                  borderBottom: 'none', 
                  padding: '16px',
                }} key={col.id} align="left">
                  {cellValue}
                </TableCell>
              );
              }
            })}
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
    {(page &&  setPage && setPageSize) && (
  <TablePagination
  rowsPerPageOptions={[1, 5, 10, 25]}
  count={totalCount ?? 0}
  rowsPerPage={pageSize ?? 10} 
  page={page}
  onPageChange={(_event, newPage) => setPage(newPage)}
  onRowsPerPageChange={(event) => {
     const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    setSearchParams({ paginate: String(newSize) });
    setPage(0);
  }}
/>
    )}
  
</div>
  );
}