// import { ID } from 'react-native-appwrite';
// import { db as database } from './config';
// import Constants from 'expo-constants';

// const db: Record<string, any> = {};

// const collections = [
//     {
//         dbId: "68724035002cd5c6269d",
//         id: "687366a70018db5a155a",
//         name: "drivers",
//     },
//     {
//         dbId: "68724035002cd5c6269d",
//         id: "6873676000023e919fe5",
//         name: "routers",
//     },
//     {
//         dbId: "68724035002cd5c6269d",
//         id: "687431bd000216433910",
//         name: "vehicleCategories",
//     },
//     {
//         dbId: "68724035002cd5c6269d",
//         id: "6874331700005f817a20",
//         name: "vehicleTypes",
//     },
//     {
//         dbId: "68724035002cd5c6269d",
//         id: "6896ff68001f1ddeb47b",
//         name: "orders",
//     },
// ];

// collections.forEach((col) => {
//     if (!col.dbId || !col.id) {
//         console.error(`Missing configuration for collection ${col.name}`);
//         return;
//     }

//     db[col.name] = {
//         create: (payload: any, permissions?: string[], id: string = ID.unique()) =>
//             database.createDocument(
//                 col.dbId,
//                 col.id,
//                 id,
//                 payload,
//                 permissions
//             ),
//         update: (id: string, payload: any, permissions?: string[]) =>
//             database.updateDocument(
//                 col.dbId,
//                 col.id,
//                 id,
//                 payload,
//                 permissions
//             ),
//         delete: (id: string) =>
//             database.deleteDocument(
//                 col.dbId,
//                 col.id,
//                 id,
//             ),
//         list: (queries: string[] = []) =>
//             database.listDocuments(
//                 col.dbId,
//                 col.id,
//                 queries
//             ),
//         get: (id: string) =>
//             database.getDocument(
//                 col.dbId,
//                 col.id,
//                 id
//             )
//     };
// });

// export default db;