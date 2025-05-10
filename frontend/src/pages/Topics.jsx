import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Box, Typography } from '@mui/material';
import TopicCreationForm from '../components/Topics/TopicCreationForm';
import TopicAccordion from '../components/Topics/TopicAccordion'; 

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [subtopics, setSubtopics] = useState([
    { title: '', level: 'Easy', youtubeLink: '', leetcodeLink: '', codeforcesLink: '', articleLink: '' }
  ]);

  const authData = JSON.parse(localStorage.getItem('DSA-Sheet-auth'));
  const token = authData?.token;
  const email = authData?.user?.email;
  const isAdmin = email === 'admin@gmail.com';

  const fetchTopics = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/topics', {
        headers: { Authorization: `Bearer ${token}` }
      });
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
      await fetch('http://localhost:3000/api/topics/status', {
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
      await fetch('http://localhost:3000/api/topics', {
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
      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Topics</Typography>

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

      {topics.map((topic) => (
        <TopicAccordion key={topic._id} topic={topic} handleStatusChange={handleStatusChange} />
      ))}
    </Container>
  );
}
