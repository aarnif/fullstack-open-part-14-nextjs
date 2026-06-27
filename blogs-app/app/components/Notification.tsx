"use client";

import { useNotification } from "./NotificationContext";

const Notification = () => {
  const { message, type } = useNotification();

  if (!message) {
    return null;
  }

  return (
    <div
      className={`rounded-lg border-2 px-4 py-2.5 my-2.5 font-medium
    ${
      type === "success"
        ? "bg-green-100 text-green-800 border-green-600"
        : "bg-red-100 text-red-800 border-red-600"
    }`}
    >
      {message}
    </div>
  );
};

export default Notification;
