import React, { useState } from "react";
import { format } from "date-fns";
import { Search, Send } from "lucide-react";
import photo from "../../assets/photo.jpg";

const BusinessMessages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data - replace with real data from your backend
  // This shows applicants that the business is messaging
  const conversations = [
    {
      id: 1,
      applicant: {
        name: "John Smith",
        avatar: photo,
      },
      jobTitle: "Senior Frontend Developer",
      lastMessage:
        "Thank you for considering my application. I'm available for an interview next week.",
      timestamp: new Date(2024, 2, 15),
      unread: true,
      messages: [
        {
          id: 1,
          sender: "business",
          text: "Hi John! Thanks for applying to the Senior Frontend Developer position.",
          timestamp: new Date(2024, 2, 15, 10, 30),
        },
        {
          id: 2,
          sender: "business",
          text: "We were impressed with your profile and would like to schedule an interview.",
          timestamp: new Date(2024, 2, 15, 10, 31),
        },
        {
          id: 3,
          sender: "applicant",
          text: "Thank you for considering my application. I'm available for an interview next week.",
          timestamp: new Date(2024, 2, 15, 10, 45),
        },
      ],
    },
    {
      id: 2,
      applicant: {
        name: "Sarah Johnson",
        avatar: photo,
      },
      jobTitle: "Full Stack Engineer",
      lastMessage: "I've completed the technical assessment and submitted it.",
      timestamp: new Date(2024, 2, 14),
      unread: false,
      messages: [
        {
          id: 1,
          sender: "business",
          text: "Hello Sarah! We're excited about your application for the Full Stack Engineer role.",
          timestamp: new Date(2024, 2, 14, 15, 0),
        },
        {
          id: 2,
          sender: "business",
          text: "Please complete this technical assessment by Friday.",
          timestamp: new Date(2024, 2, 14, 15, 5),
        },
        {
          id: 3,
          sender: "applicant",
          text: "I've completed the technical assessment and submitted it.",
          timestamp: new Date(2024, 2, 14, 15, 10),
        },
      ],
    },
    {
      id: 3,
      applicant: {
        name: "Michael Chen",
        avatar: photo,
      },
      jobTitle: "UX/UI Designer",
      lastMessage:
        "Here's my portfolio with additional design samples as requested.",
      timestamp: new Date(2024, 2, 13),
      unread: true,
      messages: [
        {
          id: 1,
          sender: "business",
          text: "Hi Michael, thank you for your application to the UX/UI Designer position.",
          timestamp: new Date(2024, 2, 13, 9, 15),
        },
        {
          id: 2,
          sender: "business",
          text: "Could you share some additional design samples from your recent work?",
          timestamp: new Date(2024, 2, 13, 9, 16),
        },
        {
          id: 3,
          sender: "applicant",
          text: "Here's my portfolio with additional design samples as requested.",
          timestamp: new Date(2024, 2, 13, 11, 30),
        },
      ],
    },
  ];

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (chat) =>
      chat.applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    // Add new message to the selected chat
    const newMessageObj = {
      id: selectedChat.messages.length + 1,
      sender: "business", // Business is sending the message
      text: newMessage,
      timestamp: new Date(),
    };

    // Update the selected chat with the new message
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessageObj],
      lastMessage: newMessage,
      timestamp: new Date(),
    };

    // Update the conversations array
    const updatedConversations = conversations.map((chat) =>
      chat.id === selectedChat.id ? updatedChat : chat
    );

    // Update the selected chat
    setSelectedChat(updatedChat);
    setNewMessage("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-gray-200 h-[calc(100vh-8rem)] flex">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search applicants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(100%-73px)]">
            {filteredConversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full p-4 text-left hover:bg-gray-50 flex items-start space-x-3 ${
                  selectedChat?.id === chat.id ? "bg-blue-50" : ""
                }`}
              >
                <img
                  src={chat.applicant.avatar}
                  alt={chat.applicant.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 truncate">
                      {chat.applicant.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {format(chat.timestamp, "MMM d")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.jobTitle}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedChat.applicant.avatar}
                  alt={selectedChat.applicant.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-medium text-gray-900">
                    {selectedChat.applicant.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selectedChat.jobTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "business"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender === "business"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "business"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {format(message.timestamp, "h:mm a")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message to applicant..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select an applicant to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessMessages;
