const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// local upload setup (placeholder). Uploaded files are saved to backend/uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random()*1E9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// create property (landlord)
router.post('/', auth, upload.array('images', 8), async (req, res) => {
  try {
    const files = req.files || [];
    const uploaded = files.map(f => '/uploads/' + path.basename(f.path));
    const payload = { ...req.body, images: uploaded, owner: req.user._id };
    payload.bhk = parseInt(payload.bhk || '1');
    payload.rent = parseInt(payload.rent || '0');
    payload.maintenance = parseInt(payload.maintenance || '0');
    const property = new Property(payload);
    await property.save();
    res.json(property);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// list & search
router.get('/', async (req, res) => {
  try {
    const { state, city, minRent, maxRent, bhk, occupancy, tenantType, vegPreference } = req.query;
    const q = {};
    if (state) q.state = new RegExp(state, 'i');
    if (city) q.city = new RegExp(city, 'i');
    if (bhk) q.bhk = parseInt(bhk);
    if (occupancy) q.occupancy = occupancy;
    if (tenantType) q.tenantType = tenantType;
    if (vegPreference) q.vegPreference = vegPreference;
    if (minRent || maxRent) q.rent = {};
    if (minRent) q.rent.$gte = parseInt(minRent);
    if (maxRent) q.rent.$lte = parseInt(maxRent);
    const properties = await Property.find(q).populate('owner','name phone email');
    res.json(properties);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// get single
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner','name phone email');
    if(!property) return res.status(404).json({ msg: 'Not found' });
    res.json(property);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// edit/delete (owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if(!prop) return res.status(404).json({ msg: 'Not found' });
    if(String(prop.owner) !== String(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });
    Object.assign(prop, req.body);
    await prop.save();
    res.json(prop);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id);
    if(!prop) return res.status(404).json({ msg: 'Not found' });
    if(String(prop.owner) !== String(req.user._id)) return res.status(403).json({ msg: 'Forbidden' });
    await prop.deleteOne();
    res.json({ msg: 'Deleted' });
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
