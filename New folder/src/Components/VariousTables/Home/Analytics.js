import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export const AnalyticsDashboard = () => {
  const theme = useTheme();
  const uData = [73, 120, 50, 95, 65, 85, 45];
  const tData = [34, 12, 60, 20, 45, 15, 25];

  const xLabels = [
    'MH34BG5552',
    'MH12DE7890',
    'MH01AB1234',
    'MH04CD5678',
    'MH20EF9012',
    'MH15GH3456',
    'MH05IJ7890',
  ];

  const sumDistances = uData.reduce((a, b) => a + b, 0);
  const sumTime = tData.reduce((a, b) => a + b, 0);

  const sortedDistanceData = uData
    .map((distance, index) => ({ label: xLabels[index], distance }))
    .sort((a, b) => b.distance - a.distance);

  const sortedTimeData = tData
    .map((time, index) => ({ label: xLabels[index], time }))
    .sort((a, b) => b.time - a.time);

  return (


    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', margin: 5 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Distance Analytics
          </Typography>
          <BarChart
            width={800}
            height={400}
            series={[{ data: uData, label: 'Distance (km)', id: 'distanceId' }]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
            sx={{
              '& .MuiBar-root': {
                width: '30px',
              },
              '& .MuiXAxis-root .MuiAxisLabel-root': {
                fill: theme.palette.text.primary,
              },
            }}
          />
          <Box sx={{ marginTop: 3 }}>
            <Card sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">Distance Travelled</Typography>
                <Typography variant="body1" color="primary">
                  Total Distance: {sumDistances} km
                </Typography>
              </CardContent>
            </Card>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Card sx={{ width: '48%' }}>
                <CardContent>
                  <Typography variant="h6">Longest Distance</Typography>
                  {sortedDistanceData.map((data, index) => (
                    <Typography key={index} color="secondary">
                      {data.label}: {data.distance} km
                    </Typography>
                  ))}
                </CardContent>
              </Card>
              <Card sx={{ width: '48%' }}>
                <CardContent>
                  <Typography variant="h6">Shortest Distance</Typography>
                  {[...sortedDistanceData].reverse().map((data, index) => (
                    <Typography key={index} color="secondary">
                      {data.label}: {data.distance} km
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Box>
          </Box>
        </CardContent>
        
      </Card>
      <Card sx={{ width: '100%', margin: 5 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Time Analytics
          </Typography>
          <BarChart
            width={800}
            height={400}
            series={[{ data: tData, label: 'Time (min)', id: 'timeId' }]}
            xAxis={[{ data: xLabels, scaleType: 'band' }]}
            sx={{
              '& .MuiBar-root': {
                width: '30px',
              },
              '& .MuiXAxis-root .MuiAxisLabel-root': {
                fill: theme.palette.text.primary,
              },
            }}
          />
          <Box sx={{ marginTop: 3 }}>
            <Card sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">Time Travelled</Typography>
                <Typography variant="body1" color="primary">
                  Total Time: {sumTime} min
                </Typography>
              </CardContent>
            </Card>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Card sx={{ width: '48%' }}>
                <CardContent>
                  <Typography variant="h6">Longest Time</Typography>
                  {sortedTimeData.map((data, index) => (
                    <Typography key={index} color="secondary">
                      {data.label}: {data.time} min
                    </Typography>
                  ))}
                </CardContent>
              </Card>
              <Card sx={{ width: '48%' }}>
                <CardContent>
                  <Typography variant="h6">Shortest Time</Typography>
                  {[...sortedTimeData].reverse().map((data, index) => (
                    <Typography key={index} color="secondary">
                      {data.label}: {data.time} min
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Box>
          </Box>
        </CardContent>
       
      </Card>
    </Box>
  );
};
