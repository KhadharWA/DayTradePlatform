import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { useAuth } from "./useAuth";

const useNotificationHub = (onReceive) => {
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      console.warn("Token saknas för SignalR-anslutning");
      return;
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7055/notificationHub", {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveNotification", (notification) => {
      console.log("📩 Mottog SignalR-notis:", notification);
      onReceive(notification);
    });

    connection
      .start()
      .then(() => console.log("SignalR-anslutning aktiv"))
      .catch((err) => console.error("SignalR-fel:", err));

    return () => {
      connection.stop();
    };
  }, [token, onReceive]);
};

export default useNotificationHub;