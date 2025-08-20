import { db } from '@/api/config';
import { useState, useEffect } from 'react';
import { ID, Query } from 'react-native-appwrite';

const useOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const COLLECTION_ID = '6896ff68001f1ddeb47b'; // Orders collection ID

    // Create Order
    const createOrder = async (orderData: Partial<any>) => {
        try {
            setLoading(true);
            const response = await db.createDocument(COLLECTION_ID, ID.unique(), orderData);
            setOrders((prev) => [...prev, response as unknown as any]);
            return response;
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Read Orders
    const getOrders = async () => {
        try {
            setLoading(true);
            const response = await db.listDocuments(COLLECTION_ID, [
                Query.orderDesc('order_date'),
            ]);
            setOrders(response.documents as unknown as any[]);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    // Update Order
    const updateOrder = async (orderId: string, orderData: Partial<any>) => {
        try {
            setLoading(true);
            const response = await db.updateDocument(COLLECTION_ID, orderId, orderData);
            setOrders((prev) =>
                prev.map((order) => (order.$id === orderId ? response as unknown as any : order))
            );
            return response;
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete Order
    const deleteOrder = async (orderId: string) => {
        try {
            setLoading(true);
            await db.deleteDocument(COLLECTION_ID, orderId);
            setOrders((prev) => prev.filter((order) => order.$id !== orderId));
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Fetch orders on mount
    useEffect(() => {
        getOrders();
    }, []);

    return { orders, loading, error, createOrder, getOrders, updateOrder, deleteOrder };
};

export default useOrders;