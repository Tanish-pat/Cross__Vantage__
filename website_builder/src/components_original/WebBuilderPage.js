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

    // State for user input
    const [rows, setRows] = useState(8);
    const [cols, setCols] = useState(20);
    const [cellDimension, setCellDimension] = useState(30);

    const handleCellClick = (row, col) => {
        if (!startCell) {
            setStartCell({ row, col });
            setSelectedRegion([{ row, col }]);
        } else {
            // Set the end cell and finalize the box
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
                type: '', // Set type if needed
                tableCells: [] // Default tableCells to empty
            };

            // Check for overlap
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
        console.log('Updated Boxes:', boxes);
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
                        handleCellClick={handleCellClick}
                        selectedRegion={selectedRegion}
                    />
                </Grid2>
                <Grid2 item xs={3}>
                    <Sidebar
                        boxes={boxes}
                        handleUpdateContent={handleUpdateContent}
                        handleDestroyBox={handleDestroyBox}
                        handleUpdateType={handleUpdateType}
                    />
                </Grid2>
            </Grid2>
        </Root>
    );
};

export default WebBuilderPage;
