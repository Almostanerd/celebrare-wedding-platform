import mongoose from 'mongoose';

const RsvpSchema = new mongoose.Schema({
  invitationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invitation',
    required: true,
    index: true
  },
  guestName: { 
    type: String, 
    required: [true, 'Guest name is required'], 
    trim: true 
  },
  phone: { 
    type: String, 
    required: [true, '10-digit mobile number is required'],
    validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit Indian mobile number!`
    }
  },
  adultsCount: { type: Number, default: 1, min: 1, max: 25 },
  kidsCount: { type: Number, default: 0, min: 0, max: 15 },
  dietaryPreference: { 
    type: String, 
    enum: ['Pure Veg', 'Jain Food', 'Swaminarayan', 'All Items / Standard'], 
    default: 'Pure Veg' 
  },
  attendingCeremonies: [{ type: String }],
  warmWishes: { type: String, maxLength: 500, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Enforces unique phone per invitation (atomic upserting)
RsvpSchema.index({ invitationId: 1, phone: 1 }, { unique: true });

export default mongoose.model('Rsvp', RsvpSchema);