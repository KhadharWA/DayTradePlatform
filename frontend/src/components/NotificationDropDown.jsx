import { useEffect, useState } from "react";
import api from "../api"; 
import "../Styles/NotificationDropdown.css";
import useNotificationHub from "../hooks/NotificationListener";

const NotificationDropdown = ({ token }) => {
const [notifications, setNotifications] = useState([]);
const [notifOpen, setNotifOpen] = useState(false);

useNotificationHub((newNotif) => {
  setNotifications((prev) => [newNotif, ...prev]);
});


useEffect(() => {
  const fetchNotifs = async () => {
    try {
      const res = await api.get("/Notification"); // ✅ Inget headers här!
      setNotifications(res.data);
      console.log("Notiser:", res.data);
    } catch (err) {
      console.error("Kunde inte hämta notiser:", err);
    }
  };

  fetchNotifs();
}, []);

const markAllAsRead = async () => {
  try {
    await api.put("/Notification/mark-all-as-read");
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  } catch (err) {
    console.error("Kunde inte markera alla som lästa:", err);
  }
};

const handleDeleteOne = async (id) => {
  try {
    const res = await api.delete(`/Notification/${id}`);
    if (res.status === 200) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } else {
      console.warn("Något gick fel trots att anropet gjordes:", res);
    }
  } catch (err) {
    console.error("Misslyckades radera notis:", err);
    alert("Ett fel uppstod vid borttagning av notisen.");
  }
};

const handleDeleteAll = async () => {
  const confirm = window.confirm("Vill du ta bort alla notiser?");
  if (!confirm) return;

  try {
    const res = await api.delete("/Notification");
    if (res.status === 200) {
      setNotifications([]);
    } else {
      console.warn("Servern svarade inte med 200 OK:", res);
    }
  } catch (err) {
    console.error("Misslyckades rensa notiser:", err);
    alert("Ett fel uppstod vid rensning av alla notiser.");
  }
};

const handleToggleDropdown = () => {
  const willOpen = !notifOpen;
  setNotifOpen(willOpen);

  if (willOpen) {
    markAllAsRead();
  }
};


return (
    <div className="notification-section">
      <button className="notif-icon" onClick={handleToggleDropdown}>
        <i className="fa-solid fa-bell"></i>
        {notifications.some(n => !n.isRead) && (
          <span className="notif-count">{notifications.filter(n => !n.isRead).length}</span>
        )}
      </button>

      {notifOpen && (
        <div className="notif-dropdown">
          {notifications.length === 0 ? (
            <p className="notif-empty">Inga notiser.</p>
          ) : (
            <>
              {notifications.map((n) => (
                <div key={n.id} className={`notif-item ${!n.isRead ? "unread" : ""}`}>
                  <div className="notif-message">{n.message}</div>
                  <div className="notif-time">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                  <button className="notif-delete-btn" onClick={() => handleDeleteOne(n.id)}><i className="fa-solid fa-xmark"></i></button>
                </div>
              ))}
              <button className="notif-clear-btn" onClick={handleDeleteAll}>
                <i className="fa-solid fa-xmark"></i> Rensa alla
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;