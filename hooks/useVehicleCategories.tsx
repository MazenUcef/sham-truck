import { useState, useEffect } from 'react';
import { db } from '@/api/config';
import { Query } from 'react-native-appwrite';

const useVehicleCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const COLLECTION_ID = '687431bd000216433910';

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.listDocuments(
                "68724035002cd5c6269d",
                COLLECTION_ID,
                [Query.orderAsc('name')]
            );
            setCategories(response.documents);
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching vehicle categories:', err);
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (categoryData: {
        name: string;
        description?: string;
        icon?: string;
        isActive: boolean;
    }) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.createDocument(
                "68724035002cd5c6269d",
                COLLECTION_ID,
                'unique()',
                categoryData
            );
            setCategories(prev => [...prev, response]);
            return response;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error creating vehicle category:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (categoryId: string, categoryData: Partial<{
        name: string;
        description: string;
        icon: string;
        isActive: boolean;
    }>) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.updateDocument(
                "68724035002cd5c6269d",
                COLLECTION_ID,
                categoryId,
                categoryData
            );
            setCategories(prev => 
                prev.map(category => 
                    category.$id === categoryId ? response : category
                )
            );
            return response;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error updating vehicle category:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (categoryId: string) => {
        try {
            setLoading(true);
            setError(null);
            await db.deleteDocument(
                "68724035002cd5c6269d",
                COLLECTION_ID,
                categoryId
            );
            setCategories(prev => prev.filter(category => category.$id !== categoryId));
        } catch (err) {
            setError((err as Error).message);
            console.error('Error deleting vehicle category:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getCategoryById = async (categoryId: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await db.getDocument(
                "68724035002cd5c6269d",
                COLLECTION_ID,
                categoryId
            );
            return response;
        } catch (err) {
            setError((err as Error).message);
            console.error('Error fetching vehicle category:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        getCategoryById
    };
};

export default useVehicleCategories;