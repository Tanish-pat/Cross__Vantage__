import React, { useState } from 'react';
import Grid2 from '@mui/material/Grid';
import { Root } from './JointStyles.js';
import Grid from './Grid.js';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import TextField from '@mui/material/TextField';
import Papa from 'papaparse'; // A library for parsing CSV files

const WebBuilderPage = () => {
    const [boxes, setBoxes] = useState([]);
    const [firstClick, setFirstClick] = useState(null);
    const [startCell, setStartCell] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState([]);

    const [rows, setRows] = useState(8);
    const [cols, setCols] = useState(20);
    const [cellRowDimension, setCellRowDimension] = useState(30);
    const [cellColDimension, setCellColDimension] = useState(30);

    const uploadCSV = (file, callback) => {
        Papa.parse(file, {
            complete: (result) => {
                const parsedData = result.data;
                console.log('Parsed Data:', parsedData);
                callback(parsedData);
            },
            header: false,
        });
    };

    const handleUpdateContentForTable = (boxIndex, csvJson) => {
        try {
            const numRows = csvJson.length;
            const numCols = csvJson[0].length;

            const updatedBox = {
                ...boxes[boxIndex],
                startRow: boxes[boxIndex].startRow,
                endRow: boxes[boxIndex].startRow + numRows - 1,
                startCol: boxes[boxIndex].startCol,
                endCol: boxes[boxIndex].startCol + numCols - 1,
                type: 'table',
                tableCells: csvJson.map((row, rowIndex) =>
                    row.map((content, colIndex) => ({
                        rowId: boxes[boxIndex].startRow + rowIndex,
                        colId: boxes[boxIndex].startCol + colIndex,
                        content,
                    }))
                ).flat(),
            };

            console.log("Updated Box:", updatedBox);

            setBoxes((prevBoxes) => {
                const newBoxes = [...prevBoxes];
                newBoxes[boxIndex] = updatedBox;
                return newBoxes;
            });
            console.log("Boxes:", boxes);
        } catch (error) {
            console.error('Error updating table content:', error);
        }
    };


    const handleCellClick = (row, col) => {
        if (!startCell) {
            setStartCell({ row, col });
            setSelectedRegion([{ row, col }]);
        } else {
            const startRow = Math.min(startCell.row, row);
            const endRow = Math.max(startCell.row, row);
            const startCol = Math.min(startCell.col, col);
            const endCol = Math.max(startCell.col, col);

            const newBox = {
                startRow,
                endRow,
                startCol,
                endCol,
                content: '',
                type: 'text',
                tableCells: [],
            };

            const doesOverlap = boxes.some((box) => {
                return !(
                    newBox.endRow < box.startRow ||
                    newBox.startRow > box.endRow ||
                    newBox.endCol < box.startCol ||
                    newBox.startCol > box.endCol
                );
            });

            if (!doesOverlap) {
                setBoxes((prev) => [...prev, newBox]);
            } else {
                alert('Boxes cannot overlap. Please select a different region.');
            }

            setStartCell(null);
            setSelectedRegion([]);
            setFirstClick(null);
        }
    };

    const handleDestroyBox = (index) => {
        setBoxes((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpdateContentForText = (index, content) => {
        setBoxes((prev) =>
            prev.map((box, i) => (i === index ? { ...box, content } : box))
        );
        console.log("Content:", content);
    };

    const handleUpdateType = (index, type) => {
        setBoxes((prev) =>
            prev.map((box, i) => {
                if (i === index) {
                    if (type === 'table') {
                        const rows = box.endRow - box.startRow + 1;
                        const cols = box.endCol - box.startCol + 1;
                        const tableCells = [];
                        for (let r = 0; r < rows; r++) {
                            for (let c = 0; c < cols; c++) {
                                tableCells.push({
                                    row: box.startRow + r,
                                    col: box.startCol + c,
                                    content: '',
                                });
                            }
                        }
                        return { ...box, type, tableCells };
                    }
                    return { ...box, type };
                }
                return box;
            })
        );
    };

    return (
        <Root>
            <div style={{ marginTop: '20px', width: '12%', marginLeft: '20px', marginRight: '20px' }}>
                <TextField
                    label="Number of Rows"
                    type="number"
                    value={rows}
                    onChange={(e) => setRows(parseInt(e.target.value))}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Number of Columns"
                    type="number"
                    value={cols}
                    onChange={(e) => setCols(parseInt(e.target.value))}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Cell Row Dimension (px)"
                    type="number"
                    value={cellRowDimension}
                    onChange={(e) => setCellRowDimension(parseInt(e.target.value))}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Cell Col Dimension (px)"
                    type="number"
                    value={cellColDimension}
                    onChange={(e) => setCellColDimension(parseInt(e.target.value))}
                    fullWidth
                    margin="normal"
                />
            </div>
            <Grid2 container>
                <Grid2 item xs={9}>
                    <Header />
                    <Grid
                        boxes={boxes}
                        ROWS={rows}
                        COLS={cols}
                        CELL_ROW_DIMENSION={cellRowDimension}
                        CELL_COL_DIMENSION={cellColDimension}
                        firstClick={firstClick}
                        selectedRegion={selectedRegion}
                        handleCellClick={handleCellClick}
                        startCell={startCell}
                    />
                </Grid2>
                <Grid2 item xs={3}>
                    <Sidebar
                        boxes={boxes}
                        handleUpdateContentForText={handleUpdateContentForText}
                        handleUpdateContentForTable={handleUpdateContentForTable}
                        handleDestroyBox={handleDestroyBox}
                        handleUpdateType={handleUpdateType}
                        handleCSVUpload={uploadCSV}
                    />
                </Grid2>
            </Grid2>
        </Root>
    );
};

export default WebBuilderPage;



















// import React, { useState } from 'react';
// import Grid2 from '@mui/material/Grid';
// import { Root } from './JointStyles.js';
// import Grid from './Grid.js';
// import Header from './Header.js';
// import Sidebar from './Sidebar.js';
// import TextField from '@mui/material/TextField';

// const WebBuilderPage = () => {
//     const [boxes, setBoxes] = useState([]);
//     const [firstClick, setFirstClick] = useState(null);
//     const [startCell, setStartCell] = useState(null);
//     const [selectedRegion, setSelectedRegion] = useState([]);

//     const [rows, setRows] = useState(8);
//     const [cols, setCols] = useState(20);
//     const [cellDimension, setCellDimension] = useState(30);


//     const getJsonFromCSV = (csv) => {
//         const lines = csv.split('\n');
//         const result = [];
//         const headers = lines[0].split(',');
//         for (let i = 1; i < lines.length; i++) {
//             const obj = {};
//             const currentline = lines[i].split(',');
//             for (let j = 0; j < headers.length; j++) {
//                 obj[headers[j]] = currentline[j];
//             }
//             result.push(obj);
//         }
//         return result;
//     };

//     const uploadCSV = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();

//         // Read the file as text
//         reader.onload = (e) => {
//             const csv = e.target.result;
//             const json = getJsonFromCSV(csv);
//             console.log(json);
//             handleUpdateContentForTable(startCell, json);
//         };

//         reader.readAsText(file); // Asynchronous read
//     };


//     const handleUpdateContentForTable = (index, csvJson) => {
//         // index here will only refer to a box od dimension 1x1
//         // this will serve as the starting point for the table, which is the top left cell
//         // we will then calculate the endRow and endCol based on the csvJson
//         // we will then create the tableCells array and update the box

//         if (!index) return; // Prevent if there's no starting cell selected

//         const tableCells = [];
//         csvJson.forEach((row, rowIndex) => {
//             row.forEach((content, colIndex) => {
//                 tableCells.push({
//                     row: index.startRow + rowIndex,
//                     col: index.startCol + colIndex,
//                     content,
//                 });
//             });
//         });
//         setBoxes((prevBoxes) => {
//             const newBoxes = [...prevBoxes];
//             newBoxes[index.startRow] = { ...newBoxes[index.startRow], tableCells };
//             return newBoxes;
//         });
//         console.log(tableCells);
//     }


//     const handleCellClick = (row, col) => {
//         if (!startCell) {
//             setStartCell({ row, col });
//             setSelectedRegion([{ row, col }]);
//         } else {
//             const startRow = Math.min(startCell.row, row);
//             const endRow = Math.max(startCell.row, row);
//             const startCol = Math.min(startCell.col, col);
//             const endCol = Math.max(startCell.col, col);

//             const newBox = {
//                 startRow,
//                 endRow,
//                 startCol,
//                 endCol,
//                 content: '',
//                 type: '',
//                 tableCells: [],
//             };

//             const doesOverlap = boxes.some((box) => {
//                 return !(
//                     newBox.endRow < box.startRow ||
//                     newBox.startRow > box.endRow ||
//                     newBox.endCol < box.startCol ||
//                     newBox.startCol > box.endCol
//                 );
//             });

//             if (!doesOverlap) {
//                 setBoxes((prev) => [...prev, newBox]);
//             } else {
//                 alert('Boxes cannot overlap. Please select a different region.');
//             }

//             setStartCell(null);
//             setSelectedRegion([]);
//             setFirstClick(null);
//         }
//     };

//     const handleDestroyBox = (index) => {
//         setBoxes((prev) => prev.filter((_, i) => i !== index));
//     };

//     const handleUpdateContent = (index, content) => {
//         setBoxes((prev) =>
//             prev.map((box, i) => (i === index ? { ...box, content } : box))
//         );
//     };


//     const handleUpdateType = (index, type) => {
//         setBoxes((prev) =>
//             prev.map((box, i) => {
//                 if (i === index) {
//                     if (type === 'table') {
//                         const rows = box.endRow - box.startRow + 1;
//                         const cols = box.endCol - box.startCol + 1;
//                         const tableCells = [];
//                         for (let r = 0; r < rows; r++) {
//                             for (let c = 0; c < cols; c++) {
//                                 tableCells.push({
//                                     row: box.startRow + r,
//                                     col: box.startCol + c,
//                                     content: '',
//                                 });
//                             }
//                         }
//                         return { ...box, type, tableCells };
//                     }
//                     return { ...box, type };
//                 }
//                 return box;
//             })
//         );
//     };



//     return (
//         <Root>
//             <div style={{ marginTop: '20px', width: '12%', marginLeft: '20px', marginRight: '20px' }}>
//                 <TextField
//                     label="Number of Rows"
//                     type="number"
//                     value={rows}
//                     onChange={(e) => setRows(parseInt(e.target.value))}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Number of Columns"
//                     type="number"
//                     value={cols}
//                     onChange={(e) => setCols(parseInt(e.target.value))}
//                     fullWidth
//                     margin="normal"
//                 />
//                 <TextField
//                     label="Cell Dimension (px)"
//                     type="number"
//                     value={cellDimension}
//                     onChange={(e) => setCellDimension(parseInt(e.target.value))}
//                     fullWidth
//                     margin="normal"
//                 />
//             </div>
//             <Grid2 container>
//                 <Grid2 item xs={9}>
//                     <Header />
//                     <Grid
//                         ROWS={rows}
//                         COLS={cols}
//                         CELL_DIMENSION={cellDimension}
//                         boxes={boxes}
//                         firstClick={firstClick}
//                         handleCellClick={handleCellClick}
//                         selectedRegion={selectedRegion}
//                     />
//                 </Grid2>
//                 <Grid2 item xs={3}>
//                     <Sidebar
//                         boxes={boxes}
//                         handleUpdateContent={handleUpdateContent}
//                         handleDestroyBox={handleDestroyBox}
//                         handleUpdateType={handleUpdateType}
//                     />
//                 </Grid2>
//             </Grid2>
//         </Root>
//     );
// };

// export default WebBuilderPage;
