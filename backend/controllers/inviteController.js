import Invitation from '../models/Invitation.js';

export const getInviteBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let invite = await Invitation.findOneAndUpdate(
      { slug },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

    if (!invite) {
      return res.status(404).json({ success: false, message: 'Wedding invitation not found.' });
    }

    return res.status(200).json({ success: true, data: invite });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createOrUpdateInvite = async (req, res) => {
  try {
    const { brideName, groomName, parentsName, mainDate, mainTime, mainVenue, ceremonies, theme, slug } = req.body;

    if (!brideName || !groomName || !mainVenue) {
      return res.status(400).json({ success: false, message: 'Bride, Groom, and Venue are required.' });
    }

    let finalSlug = slug;

    if (!finalSlug || finalSlug === 'shreya-weds-arjun-test') {
      const cleanBride = brideName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanGroom = groomName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      const prefix = (cleanBride && cleanGroom) ? `${cleanBride}-weds-${cleanGroom}` : 'vivah';
      const uniqueSuffix = `${Date.now().toString().slice(-5)}${Math.floor(100 + Math.random() * 900)}`;
      finalSlug = `${prefix}-${uniqueSuffix}`;
    }

    const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mainVenue)}`;

    const invite = await Invitation.findOneAndUpdate(
      { slug: finalSlug },
      {
        slug: finalSlug,
        brideName,
        groomName,
        parentsName: parentsName || '',
        mainDate: mainDate || '2027-01-15',
        mainTime: mainTime || '19:30',
        mainVenue,
        googleMapsUrl: mapLink,
        ceremonies: ceremonies || [],
        theme: theme || 'royalSindoor'
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(201).json({ 
      success: true, 
      message: 'Card successfully published!',
      slug: finalSlug,
      data: invite 
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllInvites = async (req, res) => {
  try {
    const invites = await Invitation.find({}, 'slug brideName groomName mainDate createdAt')
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: invites });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};