import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const FeatureContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0, 6),
}));

const FeatureGrid = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  background: theme.palette.background.paper,
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}));

function Features() {
  const features = [
    { title: 'Personalized Travel Journals', description: 'Document your travel experiences and reflections at specific locations.' },
    { title: 'Enhanced Social Interaction', description: 'Follow other travelers and exchange insights.' },
    { title: 'Interactive Travel Guides', description: 'Discover hidden gems and unique insights about different locations.' },
    { title: 'Legacy and Heritage', description: 'Leave thoughtful messages for future generations.' },
    { title: 'Location-Based Notifications', description: 'Receive notifications when near a pinned location.' },
    { title: 'Future Reflections', description: 'Set notes to appear at a future time.' },
  ];

  return (
    <FeatureContent>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Application Features
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Explore the unique features of our application that enhance your travel experiences and social interactions.
        </Typography>
      </Container>
      <FeatureGrid maxWidth="md">
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <FeatureCard>
                <Typography variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </FeatureGrid>
    </FeatureContent>
  );
}

export default Features;
