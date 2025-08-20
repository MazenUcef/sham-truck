import { db } from '@/api/config';
import { useState, useEffect } from 'react';
import { ID, Query } from 'react-native-appwrite';

// Define Offer type based on your schema
interface Offer {
  $id: string;
  status: string;
  pricing: number;
  orders: string;
  order_from: string;
  order_to: string;
  order_date: string;
  order_time: string;
  weight: number;
  vehicleTypes: string;
  [key: string]: any; // Allow additional fields
}

const useOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const DATABASE_ID = '68724035002cd5c6269d'; // From your config
  const COLLECTION_ID = '6896ff5d002de1a4ef1d'; // Offers collection ID

  // Create Offer
  const createOffer = async (offerData: Partial<Offer>) => {
    try {
      setLoading(true);
      const response = await db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), offerData);
      setOffers((prev) => [...prev, response as unknown as Offer]);
      return response;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Read Offers
  const getOffers = async () => {
    try {
      setLoading(true);
      const response = await db.listDocuments(COLLECTION_ID, [
        Query.orderDesc('order_date'),
      ]);
      setOffers(response.documents as unknown as Offer[]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Update Offer
  const updateOffer = async (offerId: string, offerData: Partial<Offer>) => {
    try {
      setLoading(true);
      const response = await db.updateDocument(DATABASE_ID, COLLECTION_ID, offerId, offerData);
      setOffers((prev) =>
        prev.map((offer) => (offer.$id === offerId ? response as unknown as Offer : offer))
      );
      return response;
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete Offer
  const deleteOffer = async (offerId: string) => {
    try {
      setLoading(true);
      await db.deleteDocument(DATABASE_ID, COLLECTION_ID, offerId);
      setOffers((prev) => prev.filter((offer) => offer.$id !== offerId));
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch offers on mount
  useEffect(() => {
    getOffers();
  }, []);

  return { offers, loading, error, createOffer, getOffers, updateOffer, deleteOffer };
};

export default useOffers;
