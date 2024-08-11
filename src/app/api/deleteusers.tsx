import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      // Replace these with your Firebase Admin SDK credentials
      projectId: 'gsez-a2384',
      clientEmail: "firebase-adminsdk-7sj4n@gsez-a2384.iam.gserviceaccount.com",
      privateKey: "c205dacd3c03600bd9efd685fae9b08cac9a2556",
    }),
  });
}

const auth = admin.auth();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { uid } = req.query;

    try {
      await auth.deleteUser(uid as string);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
