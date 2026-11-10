import mongoose from 'mongoose';

const CeremonySchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true, trim: true },
  color: { type: String, default: '#E11D48' }
});

const InvitationSchema = new mongoose.Schema({
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    index: true 
  },
  brideName: { type: String, required: true, trim: true },
  groomName: { type: String, required: true, trim: true },
  parentsName: { type: String, trim: true, default: '' },
  mainDate: { type: String, required: true },
  mainTime: { type: String, default: '19:30' },
  mainVenue: { type: String, required: true, trim: true },
  googleMapsUrl: { type: String, default: '' },
  theme: { 
    type: String, 
    enum: ['royalSindoor', 'marigoldZari', 'emeraldMughal', 'midnightVelvet'], 
    default: 'royalSindoor' 
  },
  ceremonies: [CeremonySchema],
  viewsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Invitation', InvitationSchema);