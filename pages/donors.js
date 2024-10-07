// pages/api/donors.js

import dbConnect from '../../../utils/dbConnect';
import Donor from '../../models/Donor';

export default async (req, res) => {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const donors = await Donor.find({});
        res.status(200).json({ success: true, data: donors });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const donor = await Donor.create(req.body);
        res.status(201).json({ success: true, data: donor });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Método não permitido' });
      break;
  }
};
