import Rsvp from '../models/Rsvp.js';
import Invitation from '../models/Invitation.js';

export const submitRsvp = async (req, res) => {
  try {
    const { slug } = req.params;
    const { guestName, phone, adultsCount, kidsCount, dietaryPreference, attendingCeremonies, warmWishes } = req.body;

    let invite = await Invitation.findOne({ slug });

    if (!invite) {
      return res.status(404).json({ success: false, message: 'Wedding invitation not found.' });
    }

    const cleanPhone = phone ? phone.toString().replace(/\D/g, '').slice(-10) : '';

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid 10-digit Indian mobile number. Must start with 6, 7, 8, or 9.'
      });
    }

    const rsvp = await Rsvp.findOneAndUpdate(
      { invitationId: invite._id, phone: cleanPhone },
      {
        invitationId: invite._id,
        guestName: guestName.trim(),
        phone: cleanPhone,
        adultsCount: Number(adultsCount) || 1,
        kidsCount: Number(kidsCount) || 0,
        dietaryPreference: dietaryPreference || 'Pure Veg',
        attendingCeremonies: attendingCeremonies || [],
        warmWishes: (warmWishes || '').trim()
      },
      { upsert: true, new: true, runValidators: true }
    );

    return res.status(201).json({
      success: true,
      message: 'RSVP confirmed! Shubh Aagman 🙏',
      data: rsvp
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getRsvpStats = async (req, res) => {
  try {
    const { slug } = req.params;
    const invite = await Invitation.findOne({ slug });
    if (!invite) {
      return res.status(404).json({ success: false, message: 'Card not found' });
    }

    // Return guest entries strictly belonging to this invitation
    const guestList = await Rsvp.find({ invitationId: invite._id }).sort({ createdAt: -1 });

    const stats = await Rsvp.aggregate([
      { $match: { invitationId: invite._id } },
      {
        $group: {
          _id: null,
          totalSubmissions: { $sum: 1 },
          totalAdults: { $sum: '$adultsCount' },
          totalKids: { $sum: '$kidsCount' },
          jainMeals: {
            $sum: { $cond: [{$eq: ['$dietaryPreference', 'Jain Food'] }, '$adultsCount', 0] }
          },
          pureVegMeals: {
            $sum: { $cond: [{$eq: ['$dietaryPreference', 'Pure Veg'] }, '$adultsCount', 0] }
          },
          swaminarayanMeals: {
            $sum: { $cond: [{$eq: ['$dietaryPreference', 'Swaminarayan'] }, '$adultsCount', 0] }
          }
        }
      }
    ]);

    const metrics = stats[0] || {
      totalSubmissions: 0,
      totalAdults: 0,
      totalKids: 0,
      jainMeals: 0,
      pureVegMeals: 0,
      swaminarayanMeals: 0
    };

    return res.status(200).json({
      success: true,
      data: {
        metrics,
        guests: guestList,
        invite
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};