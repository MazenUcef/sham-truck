import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSocket } from "../SocketContext";
import { receiveNewOrder, receiveOrderCreated, receiveOrderUpdated } from "@/redux/slices/OrderSlice";

export const useOrderSocket = () => {
  const { socket, isConnected } = useSocket();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!socket || !isConnected || !user) return;


    socket.on("new-order-available", (data: { order: any }) => {
      if (user.role === "driver") {
        dispatch(receiveNewOrder(data.order));
      }
    });


    socket.on("order-created", (data: { message: string; order: any }) => {
      if (user.role === "router") {
        dispatch(receiveOrderCreated(data.order));
      }
    });


    socket.on("order-updated", (data: { message: string; order: any }) => {
      if (user.role === "driver" || user.role === "router") {
        dispatch(receiveOrderUpdated(data.order));
      }
    });

    return () => {
      socket.off("new-order-available");
      socket.off("order-created");
      socket.off("order-updated");
    };
  }, [socket, isConnected, user, dispatch]);
};