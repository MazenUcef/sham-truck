import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSocket } from "../SocketContext";
import { receiveNewOffer, receiveOfferAccepted, receiveOfferRejected } from "@/redux/slices/OfferSlice";

export const useOfferSocket = () => {
    const { socket, isConnected } = useSocket();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!socket || !isConnected || !user) return;

        // Handle new offer for customers (routers)
        socket.on("new-offer", (data: { message: string; offer: any }) => {
            if (user.role === "router") {
                dispatch(receiveNewOffer(data.offer));
            }
        });

        // Handle offer accepted for drivers and customers
        socket.on("offer-accepted", (data: { message: string; offer: any }) => {
            if (user.role === "driver" || user.role === "router") {
                dispatch(receiveOfferAccepted(data.offer));
            }
        });

        // Cleanup on unmount
        return () => {
            socket.off("new-offer");
            socket.off("offer-created");
            socket.off("offer-accepted");
            socket.off("offer-rejected");
        };
    }, [socket, isConnected, user, dispatch]);
};