import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useSocket } from "../SocketContext";
import { 
  receiveNewOffer, 
  receiveOfferAccepted, 
  receiveOfferRejected,
  fetchDriverOffers
} from "@/redux/slices/OfferSlice";

export const useOfferSocket = () => {
    const { socket, isConnected } = useSocket();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!socket || !isConnected || !user) return;


        socket.on("offer-created", (data: { message: string; offer: any }) => {
            if (user.role === "driver") {

                dispatch(fetchDriverOffers());
            }
        });

        socket.on("new-offer", (data: { message: string; offer: any }) => {
            if (user.role === "router") {
                dispatch(receiveNewOffer(data.offer));
            }
        });


        socket.on("offer-accepted", (data: { message: string; offer: any }) => {
            if (user.role === "driver" || user.role === "router") {
                dispatch(receiveOfferAccepted(data.offer));

                if (user.role === "driver") {
                    dispatch(fetchDriverOffers());
                }
            }
        });


        socket.on("offer-rejected", (data: { message: string; offer: any }) => {
            if (user.role === "driver" || user.role === "router") {
                dispatch(receiveOfferRejected(data.offer));

                if (user.role === "driver") {
                    dispatch(fetchDriverOffers());
                }
            }
        });


        return () => {
            socket.off("offer-created");
            socket.off("new-offer");
            socket.off("offer-accepted");
            socket.off("offer-rejected");
        };
    }, [socket, isConnected, user, dispatch]);
};