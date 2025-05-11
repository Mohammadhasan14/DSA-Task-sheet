import React from 'react';
import {
  TextField, Button, Box, Grid, IconButton, Divider, MenuItem, Paper,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const TopicCreationForm = ({ newTopicTitle, setNewTopicTitle, subtopics, setSubtopics, handleSubtopicChange, addSubtopic, removeSubtopic, handleCreateTopic }) => {
  return (
    <Paper sx={{ p: 3, mb: 4, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>Create New Topic</Typography>
      <TextField
        fullWidth
        label="Topic Title"
        value={newTopicTitle}
        onChange={(e) => setNewTopicTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      {subtopics.map((sub, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Title" value={sub.title} onChange={(e) => handleSubtopicChange(index, 'title', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Level"
                value={sub.level}
                onChange={(e) => handleSubtopicChange(index, 'level', e.target.value)}
                fullWidth
              >
                {['Easy', 'Medium', 'Hard'].map((lvl) => (
                  <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="YouTube" value={sub.youtubeLink} onChange={(e) => handleSubtopicChange(index, 'youtubeLink', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="LeetCode" value={sub.leetcodeLink} onChange={(e) => handleSubtopicChange(index, 'leetcodeLink', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Codeforces" value={sub.codeforcesLink} onChange={(e) => handleSubtopicChange(index, 'codeforcesLink', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Article" value={sub.articleLink} onChange={(e) => handleSubtopicChange(index, 'articleLink', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <IconButton onClick={() => removeSubtopic(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
      <Button onClick={addSubtopic} startIcon={<AddIcon />} sx={{ mb: 2 }}>Add Subtopic</Button>
      <Button variant="contained" color="primary" onClick={handleCreateTopic}>Create Topic</Button>
    </Paper>
  );
};

export default TopicCreationForm;
