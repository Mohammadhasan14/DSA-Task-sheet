import React, { useEffect } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    Table, TableHead, TableRow, TableCell, TableBody,
    Checkbox, Typography, Chip, Box, Link,
    TableContainer,
    useTheme, useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TopicAccordion = ({ topic, handleStatusChange }) => {
    const total = topic.subtopics.length;
    const done = topic.subtopics.filter(sub => sub.status === 'done').length;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

    useEffect(() => {
        // console.log("topic in useEffect", topic);
    }, [topic]);

    return (
        <Accordion sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <Typography 
                        variant={isMobile ? "subtitle1" : "h6"} 
                        fontWeight="bold"
                        sx={{ pr: 1 }} 
                    >
                        {topic.title}
                    </Typography>
                    <Chip
                        label={`${done}/${total} Done`}
                        color={done === total ? 'success' : 'warning'}
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                    />
                </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: isMobile ? 1 : 2 }}>
                <TableContainer 
                    component={Box} 
                    sx={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}
                >
                    <Table sx={{ minWidth: 700 }} size={isMobile ? "small" : "medium"}> 
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '50px' }}>Done</TableCell> 
                                <TableCell sx={{ minWidth: 150 }}>Title</TableCell>
                                <TableCell sx={{ width: '80px' }}>Level</TableCell>
                                <TableCell sx={{ width: '80px' }}>Status</TableCell>
                                <TableCell>YouTube</TableCell> 
                                <TableCell>LeetCode</TableCell>
                                <TableCell>Codeforces</TableCell>
                                <TableCell>Article</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {topic.subtopics.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <Typography variant="body2" color="textSecondary">
                                            No subtopics available.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                            {topic.subtopics.map((sub) => (
                                <TableRow key={sub._id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={sub.status === 'done'}
                                            onChange={() => handleStatusChange(topic._id, sub._id, sub.status)}
                                            color="primary"
                                            size={isMobile ? "small" : "medium"}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{sub.title}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">{sub.level}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={sub.status === 'done' ? 'Done' : 'Pending'}
                                            color={sub.status === 'done' ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Link href={sub.youtubeLink} target="_blank" rel="noopener" variant="body2">Watch</Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={sub.leetcodeLink} target="_blank" rel="noopener" variant="body2">Practice</Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={sub.codeforcesLink} target="_blank" rel="noopener" variant="body2">Practice</Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={sub.articleLink} target="_blank" rel="noopener" variant="body2">Read</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </AccordionDetails>
        </Accordion>
    );
};

export default TopicAccordion;