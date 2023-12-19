// src/app/model/admission.js
import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  selectedBatch: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['success', 'failed'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admission = mongoose.model('Admission', admissionSchema);

export default Admission;
