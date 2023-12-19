// src/pages/api/admission.js

import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'next-connect';
import Admission from '../../model/Admission.js';

const CompletePayment = async 

const handler = mongoose()
  .use( async (req, res, next) => {
    // Middleware to validate form data (age, class selection, etc.)
    const { name, age, selectedBatch } = req.body;

    const errors = [];

    if (!name || !age || !selectedBatch) {
      errors.push('Please provide all required information.');
    }

    if (!(age >= 18 && age <= 65)) {
      errors.push('Invalid age. Age must be between 18 and 65.');
    }

    const validBatches = ['6-7AM', '7-8AM', '8-9AM', '5-6PM'];
    if (!validBatches.includes(selectedBatch)) {
      errors.push('Invalid batch selection.');
    }

    if (errors.length) {
      return res.status(400).json({ message: errors.join(', ') });
    }

    try{
        const paymentResponse = await CompletePayment({name, age},selectedBatch);
    if(!paymentResponse.success){
        return res.status(402).json({message: paymentResponse.errorMessage});
    }
    }catch(error){
        console.log('error');
        return res.status(500).json({ message: 'Payment error. Please try again later.' });
   
    }
    next();
  })
  .post(async (req, res) => {
    const { name, age, selectedBatch } = req.body;

    // Connect to MongoDB with mongoose model
    const newAdmission = new Admission({ name, age, selectedBatch });
    const admissionResponse = await newAdmission.save();

    if(admissionResponse) res.status(201).json({ message: 'Successfully enrolled!' });
  });

export default handler;
