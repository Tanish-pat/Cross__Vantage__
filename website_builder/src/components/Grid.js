import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Papa from 'papaparse'; // A library for parsing CSV files

const Grid = ({ ROWS, COLS, CELL_DIMENSION, boxes, selectedRegion, handleCellClick, startCell }) => {
    const [csvData, setCsvData] = useState([]);

    // Function to handle file upload and update state with parsed CSV data
    const handleFileUpload = (e) => {
        const file = e.target.files ? e.target.files[0] : null;  // Ensure files is not undefined
        if (file) {
            handleCSVUpload(file, (parsedData) => {
                setCsvData(parsedData); // Store parsed CSV data in state
            });
        }
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${COLS}, ${CELL_DIMENSION}px)`,
                gridTemplateRows: `repeat(${ROWS}, ${CELL_DIMENSION}px)`,
                gap: 1,
                position: 'relative',
            }}
        >
            {Array.from({ length: ROWS * COLS }).map((_, i) => {
                const row = Math.floor(i / COLS);
                const col = i % COLS;

                // const boxIndex = boxes.findIndex(
                //     (box) =>
                //         row >= box.startRow &&
                //         row <= (box.type === 'table' ? box.startRow + (box.tableCells?.length || 0) - 1 : box.endRow) &&
                //         col >= box.startCol &&
                //         col <= (box.type === 'table' ? box.startCol + (box.tableCells?.[0]?.length || 0) - 1 : box.endCol)
                // );
                const boxIndex = boxes.findIndex(
                    (box) =>
                        row >= box.startRow &&
                        row <= box.endRow &&
                        col >= box.startCol &&
                        col <= box.endCol
                );

                const isSelected = selectedRegion.some(
                    (cell) => cell.row === row && cell.col === col
                );

                if (boxIndex !== -1) {
                    const box = boxes[boxIndex];

                    if (box.type === 'table') {
                        const tableCell = box.tableCells?.find(
                            (cell) => cell.row === row && cell.col === col
                        );

                        return (
                            <Box
                                key={`box-${boxIndex}-cell-${row}-${col}`}
                                sx={{
                                    width: CELL_DIMENSION,
                                    height: CELL_DIMENSION,
                                    backgroundColor: 'lightyellow',
                                    border: '1px solid black',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    color: '#333',
                                }}
                            >
                                {tableCell?.content || ''}
                            </Box>
                        );
                    }

                    if (row === box.startRow && col === box.startCol) {
                        const rowsToSpan = box.endRow - box.startRow + 1;
                        const colsToSpan = box.endCol - box.startCol + 1;

                        return (
                            <Box
                                key={`box-${boxIndex}`}
                                sx={{
                                    gridRow: `${box.startRow + 1} / span ${rowsToSpan}`,
                                    gridColumn: `${box.startCol + 1} / span ${colsToSpan}`,
                                    backgroundColor: 'lightgreen',
                                    border: '2px solid darkgreen',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    fontSize: '14px',
                                    color: '#333',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {box.content}
                            </Box>
                        );
                    }
                    return null;
                }

                // Check if there's CSV data for this grid cell
                const cellContent = csvData[row] && csvData[row][col] ? csvData[row][col] : '';

                return (
                    <Box
                        key={i}
                        onClick={() => handleCellClick(row, col)}
                        sx={{
                            width: CELL_DIMENSION,
                            height: CELL_DIMENSION,
                            backgroundColor: isSelected ? 'lightgreen' : 'white',
                            border: isSelected ? '2px dashed green' : '1px solid black',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                color: '#333',
                                wordBreak: 'break-word',
                            }}
                        >
                            {cellContent}
                        </Box>
                    </Box>
                );
            })}
            <input type="file" accept=".csv" onChange={handleFileUpload} style={{ marginTop: '10px' }} />
        </Box>
    );
};

// Function to handle CSV upload and parse
const handleCSVUpload = (file, callback) => {
    Papa.parse(file, {
        complete: (result) => {
            const parsedData = result.data; // CSV data
            console.log('Parsed Data:', parsedData);
            callback(parsedData); // Return parsed data to the callback
        },
        header: false, // If the CSV does not contain headers, set this to false
    });
};

export default Grid;




















// import Box from '@mui/material/Box';
// const Grid = ({ ROWS, COLS, CELL_DIMENSION, boxes, selectedRegion, handleCellClick }) => {
//     return (
//         <Box
//             sx={{
//                 display: 'grid',
//                 gridTemplateColumns: `repeat(${COLS}, ${CELL_DIMENSION}px)`,
//                 gridTemplateRows: `repeat(${ROWS}, ${CELL_DIMENSION}px)`,
//                 gap: 1,
//                 position: 'relative',
//             }}
//         >
//             {Array.from({ length: ROWS * COLS }).map((_, i) => {
//                 const row = Math.floor(i / COLS);
//                 const col = i % COLS;

//                 const boxIndex = boxes.findIndex(
//                     (box) =>
//                         row >= box.startRow &&
//                         row <= (box.type === 'table' ? box.startRow + (box.tableCells?.length || 0) - 1 : box.endRow) &&
//                         col >= box.startCol &&
//                         col <= (box.type === 'table' ? box.startCol + (box.tableCells?.[0]?.length || 0) - 1 : box.endCol)
//                 );

//                 const isSelected = selectedRegion.some(
//                     (cell) => cell.row === row && cell.col === col
//                 );

//                 if (boxIndex !== -1) {
//                     const box = boxes[boxIndex];

//                     if (box.type === 'table') {
//                         const tableCell = box.tableCells?.find(
//                             (rowCells) => rowCells.row === row && rowCells.col === col
//                         );
//                         return (
//                             <Box
//                                 key={`box-${boxIndex}-cell-${row}-${col}`} // Corrected key syntax
//                                 sx={{
//                                     width: CELL_DIMENSION,
//                                     height: CELL_DIMENSION,
//                                     backgroundColor: 'lightyellow',
//                                     border: '1px solid black',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     fontSize: '12px',
//                                     color: '#333',
//                                 }}
//                             >
//                                 {tableCell?.content || ''}
//                             </Box>
//                         );
//                     }

//                     if (row === box.startRow && col === box.startCol) {
//                         const rowsToSpan = box.endRow - box.startRow + 1;
//                         const colsToSpan = box.endCol - box.startCol + 1;

//                         return (
//                             <Box
//                                 key={`box-${boxIndex}`} // Corrected key syntax
//                                 sx={{
//                                     gridRow: `${box.startRow + 1} / span ${rowsToSpan}`, // Corrected template literal usage
//                                     gridColumn: `${box.startCol + 1} / span ${colsToSpan}`, // Corrected template literal usage
//                                     backgroundColor: 'lightgreen',
//                                     border: '2px solid darkgreen',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     textAlign: 'center',
//                                     fontSize: '14px',
//                                     color: '#333',
//                                     wordBreak: 'break-word',
//                                 }}
//                             >
//                                 {box.content}
//                             </Box>
//                         );
//                     }
//                     return null;
//                 }

//                 return (
//                     <Box
//                         key={i}
//                         onClick={() => handleCellClick(row, col)}
//                         sx={{
//                             width: CELL_DIMENSION,
//                             height: CELL_DIMENSION,
//                             backgroundColor: isSelected ? 'lightgreen' : 'white',
//                             border: isSelected ? '2px dashed green' : '1px solid black',
//                         }}
//                     />
//                 );
//             })}
//         </Box>
//     );
// };

// export default Grid;