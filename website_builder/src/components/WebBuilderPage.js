import React, { useState } from 'react';
import Grid2 from '@mui/material/Grid';
import { Root } from './JointStyles.js';
import Grid from './Grid.js';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import TextField from '@mui/material/TextField';

const WebBuilderPage = () => {
    const [boxes, setBoxes] = useState([]);
    const [firstClick, setFirstClick] = useState(null);
    const [startCell, setStartCell] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState([]);

    const [rows, setRows] = useState(8);
    const [cols, setCols] = useState(20);
    const [cellDimension, setCellDimension] = useState(30);

    const getJsonFromCSV = (csv) => {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(',');

        // Skip empty lines and validate the CSV
        for (let i = 1; i < lines.length; i++) {
            const currentLine = lines[i].trim();
            if (!currentLine) continue; // Skip empty lines
            const obj = {};
            const currentline = currentLine.split(',');

            if (currentline.length !== headers.length) {
                console.error('CSV row does not match header length.');
                return []; // Return empty array if there's an issue
            }

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    };

    const uploadCSV = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const csv = e.target.result;
            const json = getJsonFromCSV(csv);
            console.log(json);
            if (json.length) {
                handleUpdateContentForTable(startCell, json);
            }
        };

        reader.readAsText(file); // Asynchronous read
    };

    const handleUpdateContentForTable = (index, csvJson) => {
        if (!index) return; // Prevent if there's no starting cell selected

        const tableCells = [];
        csvJson.forEach((row, rowIndex) => {
            Object.values(row).forEach((content, colIndex) => {
                tableCells.push({
                    row: index.startRow + rowIndex,
                    col: index.startCol + colIndex,
                    content,
                });
            });
        });

        setBoxes((prevBoxes) => {
            const newBoxes = [...prevBoxes];
            newBoxes[index.startRow] = { ...newBoxes[index.startRow], tableCells };
            return newBoxes;
        });
        console.log(tableCells);
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
                type: '',
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

    const handleUpdateContent = (index, content) => {
        setBoxes((prev) =>
            prev.map((box, i) => (i === index ? { ...box, content } : box))
        );
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
                    label="Cell Dimension (px)"
                    type="number"
                    value={cellDimension}
                    onChange={(e) => setCellDimension(parseInt(e.target.value))}
                    fullWidth
                    margin="normal"
                />
            </div>
            <Grid2 container>
                <Grid2 item xs={9}>
                    <Header />
                    <Grid
                        ROWS={rows}
                        COLS={cols}
                        CELL_DIMENSION={cellDimension}
                        boxes={boxes}
                        firstClick={firstClick}
                        selectedRegion={selectedRegion}
                        handleCellClick={handleCellClick}
                        startCell={startCell}
                    />
                </Grid2>
                <Grid2 item xs={3}>
                    <Sidebar
                        boxes={boxes}
                        handleUpdateContent={handleUpdateContent}
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
