import { useState, useEffect } from 'react';
import { db } from '@/api/config';
import { Query, ID } from 'react-native-appwrite';

export interface Order {
  $id?: string;
  customerId: string;
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  deliveryLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  items: {
    name: string;
    quantity: number;
    weight: number;
    dimensions?: string;
    fragile?: boolean;
  }[];
  vehicleTypeId: string;
  totalWeight: number;
  totalDistance: number;
  estimatedPrice: number;
  status: 'pending' | 'searching' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  notes?: string;
  preferredPickupTime?: string;
  preferredDeliveryTime?: string;
  acceptedOfferId?: string;
  driverId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const COLLECTION_ID = '6896ff68001f1ddeb47b';
    const DATABASE_ID = '68724035002cd5c6269d';

    const fetchOrders = async (filters?: {
        customerId?: string;
        driverId?: string;
        status?: string;
        vehicleTypeId?: string;
    }) => {
        try {
            setLoading(true);
            setError(null);
            
            const queries = [Query.orderDesc('$createdAt')];
            
            if (filters?.customerId) {
                queries.push(Query.equal('customerId', filters.customerId));
            }
            if (filters?.driverId) {
                queries.push(Query.equal('driverId', filters.driverId));
            }
            if (filters?.status) {
                queries.push(Query.equal('status', filters.status));
            }
            if (filters?.vehicleTypeId) {
                queries.push(Query.equal('vehicleTypeId', filters.vehicleTypeId));
            }
            
            const response = await db.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                queries
            );
            setOrders(response.documents as unknown as Order[]);
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (orderData: Omit<Order, '$id' | 'createdAt' | 'updatedAt'>) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.createDocument(
                "68724035002cd5c6269d",
                COLLECTION_ID,
                ID.unique(),
                {
                    ...orderData,
                }
            );
            setOrders(prev => [...prev, response as unknown as Order]);
            return response;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error creating order:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateOrder = async (orderId: string, orderData: Partial<Order>) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                orderId,
                {
                    ...orderData,
                    updatedAt: new Date().toISOString()
                }
            );
            setOrders(prev => 
                prev.map(order => 
                    order.$id === orderId ? { ...order, ...orderData } : order
                )
            );
            return response;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error updating order:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (orderId: string) => {
        try {
            setLoading(true);
            setError(null);
            await db.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                orderId
            );
            setOrders(prev => prev.filter(order => order.$id !== orderId));
        } catch (err) {
            setError((err as Error).message);
            console.error('Error deleting order:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getOrderById = async (orderId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.getDocument(
                DATABASE_ID,
                COLLECTION_ID,
                orderId
            );
            return response as unknown as Order;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching order:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getOrdersByCustomerId = async (customerId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [Query.equal('customerId', customerId), Query.orderDesc('$createdAt')]
            );
            return response.documents as unknown as Order[];
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching orders by customer:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getOrdersByDriverId = async (driverId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [Query.equal('driverId', driverId), Query.orderDesc('$createdAt')]
            );
            return response.documents as unknown as Order[];
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching orders by driver:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, status: Order['status']) => {
        return updateOrder(orderId, { status });
    };

    const assignDriverToOrder = async (orderId: string, driverId: string, offerId: string) => {
        return updateOrder(orderId, { 
            driverId, 
            acceptedOfferId: offerId, 
            status: 'accepted' 
        });
    };

    const markOrderAsPickedUp = async (orderId: string) => {
        return updateOrderStatus(orderId, 'picked_up');
    };


    const markOrderAsInTransit = async (orderId: string) => {
        return updateOrderStatus(orderId, 'in_transit');
    };


    const markOrderAsDelivered = async (orderId: string) => {
        return updateOrderStatus(orderId, 'delivered');
    };


    const cancelOrder = async (orderId: string) => {
        return updateOrderStatus(orderId, 'cancelled');
    };


    useEffect(() => {
        fetchOrders();
    }, []);

    return {
        orders,
        loading,
        error,
        fetchOrders,
        createOrder,
        updateOrder,
        deleteOrder,
        getOrderById,
        getOrdersByCustomerId,
        getOrdersByDriverId,
        updateOrderStatus,
        assignDriverToOrder,
        markOrderAsPickedUp,
        markOrderAsInTransit,
        markOrderAsDelivered,
        cancelOrder
    };
};

export default useOrders;