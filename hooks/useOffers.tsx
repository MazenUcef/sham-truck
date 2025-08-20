import { useState, useEffect } from 'react';
import { db } from '@/api/config';
import { Query, ID } from 'react-native-appwrite';

export interface Offer {
  $id?: string;
  orderId: string;
  driverId: string;
  price: number;
  estimatedDeliveryTime: string;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

const useOffers = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const COLLECTION_ID = '6896ff5d002de1a4ef1d';
    const DATABASE_ID = '68724035002cd5c6269d';

    const fetchOffers = async (filters?: {
        orderId?: string;
        driverId?: string;
        status?: string;
    }) => {
        try {
            setLoading(true);
            setError(null);
            
            const queries = [Query.orderDesc('$createdAt')];

            if (filters?.orderId) {
                queries.push(Query.equal('orderId', filters.orderId));
            }
            if (filters?.driverId) {
                queries.push(Query.equal('driverId', filters.driverId));
            }
            if (filters?.status) {
                queries.push(Query.equal('status', filters.status));
            }
            
            const response = await db.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                queries
            );
            setOffers(response.documents as unknown as Offer[]);
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching offers:', err);
        } finally {
            setLoading(false);
        }
    };

    const createOffer = async (offerData: Omit<Offer, '$id' | 'createdAt' | 'updatedAt'>) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {
                    ...offerData,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            );
            setOffers(prev => [...prev, response as unknown as Offer]);
            return response;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error creating offer:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateOffer = async (offerId: string, offerData: Partial<Offer>) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                offerId,
                {
                    ...offerData,
                    updatedAt: new Date().toISOString()
                }
            );
            setOffers(prev => 
                prev.map(offer => 
                    offer.$id === offerId ? { ...offer, ...offerData } : offer
                )
            );
            return response;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error updating offer:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteOffer = async (offerId: string) => {
        try {
            setLoading(true);
            setError(null);
            await db.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                offerId
            );
            setOffers(prev => prev.filter(offer => offer.$id !== offerId));
        } catch (err) {
            setError((err as Error).message);
            console.error('Error deleting offer:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getOfferById = async (offerId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.getDocument(
                DATABASE_ID,
                COLLECTION_ID,
                offerId
            );
            return response as unknown as Offer;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching offer:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getOffersByOrderId = async (orderId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [Query.equal('orderId', orderId), Query.orderDesc('$createdAt')]
            );
            return response.documents as unknown as Offer[];
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching offers by order:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getOffersByDriverId = async (driverId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [Query.equal('driverId', driverId), Query.orderDesc('$createdAt')]
            );
            return response.documents as unknown as Offer[];
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching offers by driver:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const acceptOffer = async (offerId: string) => {
        return updateOffer(offerId, { status: 'accepted' });
    };

    const rejectOffer = async (offerId: string) => {
        return updateOffer(offerId, { status: 'rejected' });
    };

    const cancelOffer = async (offerId: string) => {
        return updateOffer(offerId, { status: 'cancelled' });
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    return {
        offers,
        loading,
        error,
        fetchOffers,
        createOffer,
        updateOffer,
        deleteOffer,
        getOfferById,
        getOffersByOrderId,
        getOffersByDriverId,
        acceptOffer,
        rejectOffer,
        cancelOffer
    };
};

export default useOffers;