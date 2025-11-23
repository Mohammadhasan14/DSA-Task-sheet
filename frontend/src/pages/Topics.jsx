import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, useTheme, Paper, alpha } from '@mui/material';
import TopicCreationForm from '../components/Topics/TopicCreationForm';
import TopicAccordion from '../components/Topics/TopicAccordion';
import { useAuth } from '../AuthContext';
import {
  MenuBook
} from '@mui/icons-material';
import { API_URL } from '../utils/url';
import Loader from '../components/Global/Loader';

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [subtopics, setSubtopics] = useState([
    { title: '', level: 'Easy', youtubeLink: '', leetcodeLink: '', codeforcesLink: '', articleLink: '' }
  ]);
  const { logout } = useAuth();
  const theme = useTheme();

  const authData = JSON.parse(localStorage.getItem('DSA-Sheet-auth'));
  const token = authData?.token;
  const email = authData?.user?.email;
  const isAdmin = email === 'admin@gmail.com';

  const fetchTopics = async () => {
    try {
      const res = await fetch(`${API_URL}/api/topics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("res", res);
      if (res.status === 401 || res.status === 404) {
        logout();
        return;
      }

      const json = await res.json();
      setTopics(json.data || []);
    } catch (err) {
      console.error('Failed to fetch topics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (topicId, subTopicId, currentStatus) => {
    try {
      await fetch(`${API_URL}/api/topics/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          topicId,
          subTopicId,
          status: currentStatus === 'done' ? 'pending' : 'done',
        }),
      });
      fetchTopics();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleSubtopicChange = (index, field, value) => {
    const updated = [...subtopics];
    updated[index][field] = value;
    setSubtopics(updated);
  };

  const addSubtopic = () => {
    setSubtopics([
      ...subtopics,
      { title: '', level: 'Easy', youtubeLink: '', leetcodeLink: '', codeforcesLink: '', articleLink: '' }
    ]);
  };

  const removeSubtopic = (index) => {
    const updated = [...subtopics];
    updated.splice(index, 1);
    setSubtopics(updated);
  };

  const handleCreateTopic = async () => {
    try {
      await fetch(`${API_URL}/api/topics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTopicTitle,
          subtopics,
        }),
      });
      setNewTopicTitle('');
      setSubtopics([{ title: '', level: 'Easy', youtubeLink: '', leetcodeLink: '', codeforcesLink: '', articleLink: '' }]);
      fetchTopics();
    } catch (error) {
      console.error('Failed to create topic:', error);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  if (loading) {
    return (
      <Loader loaderText="Loading topics..." theme={theme} />
    );
  }

  const completedTopics = topics.reduce((count, topic) => {
    const completedSubtopics = topic.subtopics.filter(sub => sub.status === 'done').length;
    return count + (completedSubtopics === topic.subtopics.length ? 1 : 0);
  }, 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          DSA Topics
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
          Master Data Structures and Algorithms through curated learning paths
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Paper
            sx={{
              p: 2,
              minWidth: 120,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              {topics.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Topics
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2,
              minWidth: 120,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`,
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="success.main">
              {completedTopics}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Completed
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 2,
              minWidth: 120,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.warning.main, 0.05)} 100%)`,
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="warning.main">
              {topics.length - completedTopics}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              In Progress
            </Typography>
          </Paper>
        </Box>
      </Box>


      {isAdmin && (
        <TopicCreationForm
          newTopicTitle={newTopicTitle}
          setNewTopicTitle={setNewTopicTitle}
          subtopics={subtopics}
          setSubtopics={setSubtopics}
          handleSubtopicChange={handleSubtopicChange}
          addSubtopic={addSubtopic}
          removeSubtopic={removeSubtopic}
          handleCreateTopic={handleCreateTopic}
        />
      )}
      {topics.length === 0 && (
        <Typography variant="body1" color="text.secondary">
          No topics available. Please check back later.
        </Typography>
      )}
      {topics.map((topic) => (
        <TopicAccordion key={topic._id} topic={topic} handleStatusChange={handleStatusChange} />
      ))}
    </Container>
  );
}
