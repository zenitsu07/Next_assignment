"use client"
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Grid, Typography, Paper } from '@mui/material';
import connection from '../app/api/_middleware.js'
const batches = ['6-7AM', '7-8AM', '8-9AM', '5-6PM'];

  const YogaForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      age: '',
      selectedBatch: '',
    });

    const [errorMessage, setErrorMessage] = useState(''); 

    const handleInputChange = (e) => {

      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });

    };

  const handleSubmit = async () => {

    const { name, age } = formData;
    let updatedFormData = { ...formData };
    console.log(name,age)
    // Age validation
      const parsedAge = parseInt(age, 10);
      if (isNaN(parsedAge) || parsedAge < 18 || parsedAge > 65) {
        setErrorMessage('Age must be between 18 and 65 years old.');
        return;
      } else {
        setErrorMessage('');
      }
    // Perform other validations (if needed)
    const response = await fetch('/api/admission', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    // Handle response from the API
  
    // Perform API call or other actions
    console.log('Form data submitted:', formData);

  };

  return (

    <Container component="main" maxWidth="xs">
      < Paper elevation={3} style={{ padding: 20, marginTop: 20 }} >
        <Typography variant="h5" align="center" gutterBottom>
          Yoga Class Admission Form
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Age"
                fullWidth
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
              {errorMessage && <Typography variant="caption" color="error" gutterBottom>{errorMessage}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Batch</InputLabel>
                <Select
                  name="selectedBatch"
                  value={formData.selectedBatch}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select Batch</MenuItem>
                  {batches.map((batch) => (
                    <MenuItem key={batch} value={batch}>
                      {batch}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: 20 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default YogaForm;
