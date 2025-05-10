import React from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    Table, TableHead, TableRow, TableCell, TableBody,
    Checkbox, Typography, Chip, Box, Link
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TopicAccordion = ({ topic, handleStatusChange }) => {
    const total = topic.subtopics.length;
    const done = topic.subtopics.filter(sub => sub.status === 'done').length;
    console.log("topic", topic);
    return (
        <Accordion sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="h6">{topic.title}</Typography>
                    <Chip
                        label={`${done}/${total} Done`}
                        color={done === total ? 'success' : 'warning'}
                        variant="outlined"
                        size="small"
                    />
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Done</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>YouTube</TableCell>
                            <TableCell>LeetCode</TableCell>
                            <TableCell>Codeforces</TableCell>
                            <TableCell>Article</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {topic.subtopics.map((sub) => (
                            <TableRow key={sub._id}>
                                <TableCell>
                                    <Checkbox
                                        checked={sub.status === 'done'}
                                        onChange={() => handleStatusChange(topic._id, sub._id, sub.status)}
                                        color="primary"
                                    />
                                </TableCell>
                                <TableCell>{sub.title}</TableCell>
                                <TableCell>{sub.level}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={sub.status === 'done' ? 'Done' : 'Pending'}
                                        color={sub.status === 'done' ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Link href={sub.youtubeLink} target="_blank" rel="noopener">Watch</Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={sub.leetcodeLink} target="_blank" rel="noopener">Practice</Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={sub.codeforcesLink} target="_blank" rel="noopener">Practice</Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={sub.articleLink} target="_blank" rel="noopener">Read</Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
    );
};

export default TopicAccordion;
