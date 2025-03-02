import React, { useState } from "react";
import { format } from "date-fns";
import { Search, Send, ArrowLeft } from "lucide-react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showConversations, setShowConversations] = useState(true);

  // Dummy data - replace with real data from your backend
  const conversations = [
    {
      id: 1,
      company: {
        name: "Google",
        logo: "https://logo.clearbit.com/techcorp.com",
      },
      jobTitle: "Senior Frontend Developer",
      lastMessage:
        "Thanks for your application! When are you available for an interview?",
      timestamp: new Date(2024, 2, 15),
      unread: true,
      messages: [
        {
          id: 1,
          sender: "company",
          text: "Hi! Thanks for applying to the Senior Frontend Developer position.",
          timestamp: new Date(2024, 2, 15, 10, 30),
        },
        {
          id: 2,
          sender: "company",
          text: "We were impressed with your profile and would like to schedule an interview.",
          timestamp: new Date(2024, 2, 15, 10, 31),
        },
        {
          id: 3,
          sender: "company",
          text: "When are you available for an interview?",
          timestamp: new Date(2024, 2, 15, 10, 31),
        },
      ],
    },
    {
      id: 2,
      company: {
        name: "Microsoft",
        logo: "https://logo.clearbit.com/techcorp.com",
      },
      jobTitle: "Full Stack Engineer",
      lastMessage: "Your technical assessment results are ready.",
      timestamp: new Date(2024, 2, 14),
      unread: false,
      messages: [
        {
          id: 1,
          sender: "company",
          text: "Hello! Thank you for completing the technical assessment.",
          timestamp: new Date(2024, 2, 14, 15, 0),
        },
        {
          id: 2,
          sender: "user",
          text: "Thank you for the opportunity! I enjoyed working on the assessment.",
          timestamp: new Date(2024, 2, 14, 15, 5),
        },
        {
          id: 3,
          sender: "company",
          text: "Your technical assessment results are ready.",
          timestamp: new Date(2024, 2, 14, 15, 10),
        },
      ],
    },
  ];

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (chat) =>
      chat.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    // Add new message to the selected chat
    const newMessageObj = {
      id: selectedChat.messages.length + 1,
      sender: "user",
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

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // On mobile, hide the conversation list when a chat is selected
    if (window.innerWidth < 768) {
      setShowConversations(false);
    }
  };

  const handleBackToList = () => {
    setShowConversations(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
      <div className="bg-white rounded-xl border border-gray-200 h-[calc(100vh-6rem)] sm:h-[calc(100vh-8rem)] flex flex-col md:flex-row">
        {/* Conversations List - Hidden on mobile when chat is selected */}
        <div
          className={`${
            !showConversations && selectedChat ? "hidden md:block" : "block"
          } w-full md:w-1/3 border-r border-gray-200`}
        >
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
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
                onClick={() => handleChatSelect(chat)}
                className={`w-full p-4 text-left hover:bg-gray-50 flex items-start space-x-3 ${
                  selectedChat?.id === chat.id ? "bg-blue-50" : ""
                }`}
              >
                <img
                  src={chat.company.logo}
                  alt={chat.company.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 truncate">
                      {chat.company.name}
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

        {/* Chat Area - Hidden on mobile when conversation list is shown */}
        <div
          className={`${
            showConversations && selectedChat ? "hidden md:flex" : "flex"
          } flex-1 flex-col`}
        >
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center">
                {/* Back button - Only visible on mobile */}
                <button
                  onClick={handleBackToList}
                  className="md:hidden mr-2 p-1 rounded-full hover:bg-gray-100"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex items-center space-x-3">
                  <img
                    src={selectedChat.company.logo}
                    alt={selectedChat.company.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-medium text-gray-900">
                      {selectedChat.company.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {selectedChat.jobTitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-2 sm:p-3 ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
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
                className="p-3 sm:p-4 border-t border-gray-200"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 p-4 text-center">
              <div>
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
