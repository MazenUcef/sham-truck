// hooks/useVehicleTypes.ts
import { useState, useEffect } from 'react';
import { db } from '@/api/config';
import { Query } from 'react-native-appwrite';

const useVehicleTypes = () => {
    const [types, setTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const COLLECTION_ID = '6874331700005f817a20';

    const fetchTypes = async (categoryId?: string) => {
        try {
            setLoading(true);
            setError(null);
            
            const queries = [Query.orderAsc('name')];
            
            if (categoryId) {
                queries.push(Query.equal('categoryId', categoryId));
            }
            
            const response = await db.listDocuments(
                "68724035002cd5c6269d",
                COLLECTION_ID,
                queries
            );
            setTypes(response.documents);
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching vehicle types:', err);
        } finally {
            setLoading(false);
        }
    };

    const createType = async (typeData: {
        name: string;
        categoryId: string;
        description?: string;
        capacity: number;
        dimensions?: string;
        isActive: boolean;
        icon?: string;
    }) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.createDocument(
                "68724035002cd5c6269d",
                COLLECTION_ID,
                'unique()',
                typeData
            );
            setTypes(prev => [...prev, response]);
            return response;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error creating vehicle type:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateType = async (typeId: string, typeData: Partial<{
        name: string;
        categoryId: string;
        description: string;
        capacity: number;
        dimensions: string;
        isActive: boolean;
        icon: string;
    }>) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.updateDocument(
                "68724035002cd5c6269d",
                COLLECTION_ID,
                typeId,
                typeData
            );
            setTypes(prev => 
                prev.map(type => 
                    type.$id === typeId ? response : type
                )
            );
            return response;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error updating vehicle type:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteType = async (typeId: string) => {
        try {
            setLoading(true);
            setError(null);
            await db.deleteDocument(
                "68724035002cd5c6269d",
                COLLECTION_ID,
                typeId
            );
            setTypes(prev => prev.filter(type => type.$id !== typeId));
        } catch (err) {
            setError((err as Error).message);
            console.error('Error deleting vehicle type:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getTypeById = async (typeId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.getDocument(
                "68724035002cd5c6269d", 
                COLLECTION_ID,
                typeId
            );
            return response;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching vehicle type:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getTypesByCategory = async (categoryId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.listDocuments(
                "68724035002cd5c6269d",
                COLLECTION_ID,
                [Query.equal('categoryId', categoryId), Query.orderAsc('name')]
            );
            return response.documents;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching vehicle types by category:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    return {
        types,
        loading,
        error,
        fetchTypes,
        createType,
        updateType,
        deleteType,
        getTypeById,
        getTypesByCategory
    };
};

export default useVehicleTypes;