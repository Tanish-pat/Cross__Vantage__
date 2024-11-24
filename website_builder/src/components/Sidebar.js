import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { SidebarRoot, SidebarTitle, SidebarList, SidebarListItem, SidebarTextField, SidebarButton, SidebarDivider } from './JointStyles';

const Sidebar = ({ boxes, handleUpdateContent, handleDestroyBox, handleUpdateType, handleCSVUpload }) => {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleCSVUpload(file); // Pass the file directly to the handler
        }
    };

    return (
        <SidebarRoot>
            <SidebarTitle variant="h5">Box Manager</SidebarTitle>
            <SidebarList>
                {boxes.map((box, index) => (
                    <React.Fragment key={index}>
                        <SidebarListItem>
                            <Typography variant="body1">
                                Box {index + 1}: Rows {box.startRow + 1}-{box.endRow + 1}, Cols{' '}
                                {box.startCol + 1}-{box.endCol + 1}
                            </Typography>
                            <Select
                                value={box.type || 'text'}
                                onChange={(e) => handleUpdateType(index, e.target.value)}
                                fullWidth
                                size="medium"
                            >
                                <MenuItem value="text">Text</MenuItem>
                                {box.endRow - box.startRow === 0 && box.endCol - box.startCol === 0 && (
                                    <MenuItem value="table">Table</MenuItem>
                                )}
                            </Select>
                            <SidebarTextField
                                label="Content"
                                value={box.content}
                                onChange={(e) => handleUpdateContent(index, e.target.value)}
                                fullWidth
                                size="medium"
                                disabled={box.type === 'table'}
                            />
                            <SidebarButton
                                variant="outlined"
                                color="error"
                                onClick={() => handleDestroyBox(index)}
                                size="medium"
                            >
                                Delete Box
                            </SidebarButton>
                            {box.type === 'table' && (
                                <div>
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileUpload}
                                        style={{ marginTop: '10px' }}
                                    />
                                </div>
                            )}
                        </SidebarListItem>
                        <SidebarDivider />
                    </React.Fragment>
                ))}
            </SidebarList>
        </SidebarRoot>
    );
};

export default Sidebar;













// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import React from 'react';
// import Typography from '@mui/material/Typography';
// import { SidebarRoot, SidebarTitle, SidebarList, SidebarListItem, SidebarTextField, SidebarButton, SidebarDivider } from './JointStyles';

// const Sidebar = ({ boxes, handleUpdateContent, handleDestroyBox, handleUpdateType }) => {
//     return (
//         <SidebarRoot>
//             <SidebarTitle variant="h5">Box Manager</SidebarTitle>
//             <SidebarList>
//                 {boxes.map((box, index) => (
//                     <React.Fragment key={index}>
//                         <SidebarListItem>
//                             <Typography variant="body1">
//                                 Box {index + 1}: Rows {box.startRow + 1}-{box.endRow + 1}, Cols{' '}
//                                 {box.startCol + 1}-{box.endCol + 1}
//                             </Typography>
//                             <Select
//                                 value={box.type || 'text'}
//                                 onChange={(e) => handleUpdateType(index, e.target.value)}
//                                 fullWidth
//                                 size="medium"
//                             >
//                                 <MenuItem value="text">Text</MenuItem>
//                                 <MenuItem value="table">Table</MenuItem>
//                             </Select>
//                             <SidebarTextField
//                                 label="Content"
//                                 value={box.content}
//                                 onChange={(e) => handleUpdateContent(index, e.target.value)}
//                                 fullWidth
//                                 size="medium"
//                                 disabled={box.type === 'table'}
//                             />
//                             <SidebarButton
//                                 variant="outlined"
//                                 color="error"
//                                 onClick={() => handleDestroyBox(index)}
//                                 size="medium"
//                             >
//                                 Delete Box
//                             </SidebarButton>
//                         </SidebarListItem>
//                         <SidebarDivider />
//                     </React.Fragment>
//                 ))}
//             </SidebarList>
//         </SidebarRoot>
//     );
// };
// export default Sidebar;

