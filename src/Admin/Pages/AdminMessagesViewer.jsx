// src/admin/pages/AdminMessagesViewer.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../../components/ui/card";

import { Mail, User, Clock, Loader2 } from "lucide-react";

const API_URL = "http://localhost:5000/api/v1/messages";

const AdminMessagesViewer = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all messages
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(API_URL);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
        alert("❌ Failed to load messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">📨 Contact Messages</h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <Card key={msg._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <User className="w-5 h-5 text-blue-600" />
                  {msg.name}
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4" />
                  {msg.email}
                </div>
                <p className="text-gray-800 mt-2">{msg.message}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-3">
                  <Clock className="w-4 h-4" />
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessagesViewer;
