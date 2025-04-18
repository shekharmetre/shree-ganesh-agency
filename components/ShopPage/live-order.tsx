'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, CheckCircle2, AlertCircle, Timer, TrendingUp } from 'lucide-react';

// Mock data for demonstration
const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customer: "John Doe",
    items: 3,
    status: "incoming",
    time: "Just now",
    total: 2499.00
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customer: "Sarah Smith",
    items: 5,
    status: "pending",
    time: "2 mins ago",
    total: 3299.50
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customer: "Mike Johnson",
    items: 2,
    status: "completed",
    time: "5 mins ago",
    total: 1899.00
  }
];

const statusConfig = {
  incoming: {
    icon: AlertCircle,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
    label: "New Order"
  },
  pending: {
    icon: Timer,
    color: "text-amber-500",
    bgColor: "bg-amber-100",
    label: "Processing"
  },
  completed: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    bgColor: "bg-emerald-100",
    label: "Completed"
  }
};

const LiveOrderSummary = () => {
  return (
    <div className="w-[550px] rounded-md h-screen bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Live Orders</h2>
          </div>
          <motion.div
            className="flex items-center gap-1 text-sm bg-indigo-500 px-3 py-1 rounded-full"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </motion.div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: "Incoming", value: "12", icon: AlertCircle, color: "bg-blue-500" },
            { label: "Pending", value: "25", icon: Clock, color: "bg-amber-500" },
            { label: "Completed", value: "156", icon: TrendingUp, color: "bg-emerald-500" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-indigo-500 bg-opacity-25 rounded-lg p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4" />
                <span className="text-sm">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence>
          {mockOrders.map((order, index) => {
           const status = statusConfig[order.status as keyof typeof statusConfig];
           const StatusIcon = status.icon;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{order.orderNumber}</h3>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                    <div className="flex items-center gap-1">
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-500">
                    <span>{order.items} items</span>
                    <span>•</span>
                    <span>{order.time}</span>
                  </div>
                  <div className="font-medium text-gray-900">
                    ₹{order.total.toFixed(2)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LiveOrderSummary;