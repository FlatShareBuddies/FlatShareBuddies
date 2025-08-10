# MERN Rentals (India) - Full Project Scaffold

This repo contains a ready-to-run MERN stack scaffold tailored for India, with:
- Authentication (signup/login) using JWT
- Property model with India-specific fields (state, city, pincode, tenantType, vegPreference)
- Local image upload placeholder (saved to backend/uploads). Will integrate Cloudinary later.
- Frontend: React + Vite + Tailwind minimal UI

## Quick start (local)

1. Clone or extract the zip.
2. Backend:
   - cd backend
   - npm install
   - copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`
   - npm run dev
3. Frontend:
   - cd frontend
   - npm install
   - npm run dev
4. Open the frontend URL shown by Vite (usually http://localhost:5173).

## Notes
- Image uploads are stored in `backend/uploads/` and served statically.
- Replace local uploads with Cloudinary later by modifying `routes/properties.js` upload logic.
- Use MongoDB Atlas in production and set CORS/origin accordingly.

