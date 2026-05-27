import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';

export default function OrdersPage() {
  const { orders, cancelOrder } = useOrder();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { id: 'All', label: 'All order', count: orders.length },
    { id: 'Processing', label: 'Processing', count: orders.filter(o => o.status === 'Processing').length },
    { id: 'Shipped', label: 'Shipped', count: orders.filter(o => o.status === 'Shipped').length },
    { id: 'Canceled', label: 'Canceled', count: orders.filter(o => o.status === 'Canceled').length }
  ];

  const filteredOrders = activeTab === 'All' ? orders : orders.filter(o => o.status === activeTab);

  return (
    <div className="flex-grow w-full bg-[#f4f7fe] min-h-screen py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">All Order</h1>
            <p className="text-gray-500 text-sm">Check all orders at single place. It's easy to mange.</p>
          </div>
          <button className="bg-[#4361ee] hover:bg-[#3a56d4] text-white px-4 py-2 rounded flex items-center space-x-2 text-sm font-medium shadow-sm transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            <span>Export Order List</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-gray-200 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-semibold flex items-center space-x-1 ${
                activeTab === tab.id
                  ? 'text-[#4361ee] border-b-2 border-[#4361ee]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.id === 'All' ? <svg className="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> : ''} {tab.label}</span>
              <span>({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-80">
            <input 
              type="text" 
              placeholder="Search by ID, name, status" 
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4361ee] focus:border-[#4361ee] text-sm"
            />
            <svg className="w-4 h-4 text-gray-400 absolute right-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          
          <div className="flex space-x-3 w-full sm:w-auto">
            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer text-gray-700">
              <span className="text-gray-500 mr-2">Sort By:</span> New Order
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            <button className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Filter <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            </button>
          </div>
        </div>

        {/* Table Headers */}
        <div className="bg-white border-t border-b border-gray-200 py-3 px-4 grid grid-cols-12 gap-4 text-xs font-bold text-gray-800 tracking-wide uppercase">
          <div className="col-span-4 flex items-center">
            <input type="checkbox" className="mr-3 rounded border-gray-300 text-[#4361ee] focus:ring-[#4361ee]" />
            Product
          </div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Payment</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Action</div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-8 text-center text-gray-500 border-b border-gray-200">
            No orders found.
          </div>
        ) : (
          <div className="bg-white border-b border-gray-200">
            {filteredOrders.map((order, orderIndex) => (
              <div key={order.id} className={`${orderIndex !== 0 ? 'border-t-[8px] border-[#f4f7fe]' : ''}`}>
                
                {/* Order Header */}
                <div className="px-4 py-3 flex justify-between items-center text-xs font-semibold text-gray-600 border-b border-dashed border-gray-200 bg-gray-50/50">
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center text-gray-800">
                      <input type="checkbox" className="mr-3 rounded border-gray-300 text-[#4361ee] focus:ring-[#4361ee]" />
                      <span className="text-gray-500 mr-1">Customer:</span> {order.customer.name}
                    </div>
                    <div>
                      <span className="text-gray-500 mr-1">Date of Order</span> {order.date}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 mr-1">Order ID:</span> <span className="text-gray-800 font-bold">{order.id}</span>
                  </div>
                </div>

                {/* Order Items */}
                {order.items.map((item, index) => (
                  <div key={`${order.id}-${item.id}-${index}`} className={`grid grid-cols-12 gap-4 px-4 py-5 items-center ${index !== order.items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    
                    {/* Product */}
                    <div className="col-span-4 flex items-start space-x-4 pl-7">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
                        <img 
                          src={item.image || `https://via.placeholder.com/64x64?text=${item.name.charAt(0)}`} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-sm mb-1">{item.name}</span>
                        <div className="text-xs text-gray-500 flex space-x-3 mb-1">
                          <span>Color: <strong className="text-gray-700 font-semibold">{item.color || 'Black'}</strong></span>
                          <span>Size: <strong className="text-gray-700 font-semibold">{item.size || '23'}</strong></span>
                        </div>
                        <span className="text-xs text-gray-500">Quantity: {item.quantity || 1}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center text-sm font-bold text-gray-800">
                      €{(item.price || 26.35).toFixed(2)}
                    </div>

                    {/* Payment */}
                    <div className="col-span-2 text-center text-sm font-medium text-gray-600">
                      {order.paymentMethod}
                    </div>

                    {/* Status */}
                    <div className="col-span-2 flex flex-col items-center justify-center">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-md mb-1 ${
                        order.status === 'Pending' ? 'bg-orange-50 text-orange-500' :
                        order.status === 'Processing' ? 'bg-green-50 text-green-500' :
                        order.status === 'Canceled' ? 'bg-red-50 text-red-500' :
                        'bg-blue-50 text-blue-500'
                      }`}>
                        {order.status}
                      </span>
                      {order.status !== 'Canceled' && (
                        <span className="text-[10px] text-gray-500 text-center">
                          Please {order.status === 'Processing' ? 'Ship' : 'process'} before 22 Mar, 24
                        </span>
                      )}
                    </div>

                    {/* Action */}
                    <div className="col-span-2 flex flex-col items-center space-y-2">
                      <button className="w-[110px] py-1.5 bg-[#4361ee] hover:bg-[#3a56d4] text-white text-xs font-semibold rounded shadow-sm flex justify-center items-center">
                        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Print Label
                      </button>
                      <button 
                        onClick={() => order.status !== 'Canceled' && cancelOrder(order.id)}
                        disabled={order.status === 'Canceled'}
                        className={`w-[110px] py-1.5 text-xs font-semibold rounded border ${
                          order.status === 'Canceled' 
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-white text-red-500 border-red-500 hover:bg-red-50'
                        }`}
                      >
                        Cancel Order
                      </button>
                    </div>

                  </div>
                ))}
                
                {/* Footer of Order card - "Show more" placeholder if there are multiple items */}
                {order.items.length > 1 && (
                  <div className="px-4 py-3 bg-white text-xs font-semibold text-gray-800 border-t border-gray-50 flex items-center cursor-pointer hover:bg-gray-50 transition-colors">
                    Show more <svg className="w-3 h-3 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                )}
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
