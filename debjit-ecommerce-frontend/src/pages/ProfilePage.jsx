import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Package,
  Heart,
  CreditCard,
  Star,
  Bell,
  HelpCircle,
  LogOut,
  User as UserIcon,
  Check,
  ChevronDown,
  ChevronUp,
  Gift,
  Smartphone,
  CreditCard as CardIcon,
  Trash2,
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';

const ProfilePage = () => {
  const { user, logout } = useAuthStore();
  const { success } = useToast();
  const navigate = useNavigate();
  const { orders, cancelOrder } = useOrder();
  const { wishlistItems, toggleWishlist } = useWishlist();

  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentSubSection, setPaymentSubSection] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    contact: '',
    email: '',
    location: '',
  });

  useEffect(() => {
    if (user) {
      const nameParts = (user.fullName || '').split(' ');
      const fName = nameParts[0] || '';
      const lName = nameParts.slice(1).join(' ') || '';

      setFormData({
        firstName: fName,
        lastName: lName,
        gender: user.gender || '',
        contact: user.contactNumber || '',
        email: user.email || '',
        location: user.location || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      success('Profile Saved', 'Your profile details have been updated.');
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const handleSidebarClick = (key) => {
    if (key === 'payment') {
      setPaymentOpen(!paymentOpen);
      if (!paymentOpen) {
        setActiveSection('payment');
        setPaymentSubSection('gift_card');
      }
      return;
    }
    setPaymentOpen(false);
    setPaymentSubSection(null);
    setActiveSection(key);
    setIsEditing(false);
  };

  const sidebarLinks = [
    { key: 'profile', icon: <UserIcon size={20} />, label: 'Profile' },
    { key: 'manage_address', icon: <MapPin size={20} />, label: 'Manage Address' },
    { key: 'orders', icon: <Package size={20} />, label: 'My orders' },
    { key: 'wishlist', icon: <Heart size={20} />, label: 'My wishlist' },
    { key: 'payment', icon: <CreditCard size={20} />, label: 'Payment' },
    { key: 'reviews', icon: <Star size={20} />, label: 'Reviews and ratings' },
    { key: 'notifications', icon: <Bell size={20} />, label: 'All notifications' },
    { key: 'faqs', icon: <HelpCircle size={20} />, label: 'FAQs' },
  ];

  const inputBaseClass =
    'w-full px-4 py-2.5 rounded-xl border outline-none transition-all text-sm';
  const disabledClass = 'bg-gray-100 border-transparent text-gray-500 cursor-not-allowed';
  const enabledClass =
    'bg-white border-primary-blue focus:ring-1 focus:ring-primary-blue text-text-dark';

  // ==================== SECTION RENDERERS ====================

  const renderProfile = () => (
    <>
      <h1 className="text-2xl font-bold text-text-dark mb-10 text-center md:text-left pt-2">
        Your personal profile info
      </h1>

      <div className="flex items-center gap-2 mb-8">
        <div className="w-6 h-6 rounded-full bg-[#0A88FF] text-white flex items-center justify-center text-xs font-bold">
          1
        </div>
        <h2 className="text-lg font-bold text-gray-700 tracking-wide">PROFILE</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">First name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`${inputBaseClass} ${!isEditing ? disabledClass : enabledClass}`}
            placeholder="First Name"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Contact</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`${inputBaseClass} ${!isEditing ? disabledClass : enabledClass}`}
            placeholder="Phone Number"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Last name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`${inputBaseClass} ${!isEditing ? disabledClass : enabledClass}`}
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Your e-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`${inputBaseClass} ${!isEditing ? disabledClass : enabledClass}`}
            placeholder="Email Address"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`${inputBaseClass} ${!isEditing ? disabledClass : enabledClass}`}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-gray-700">Country, City</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`${inputBaseClass} ${!isEditing ? disabledClass : enabledClass}`}
            placeholder="Country, City"
          />
        </div>
      </div>

      <div className="mt-12 flex justify-end max-w-2xl">
        <button
          onClick={handleEditToggle}
          className="px-8 py-3 bg-[#0A88FF] hover:bg-[#339DFF] text-white font-semibold rounded-xl transition-colors shadow-md flex items-center gap-2 text-sm"
        >
          {isEditing ? (
            <>
              <Check size={18} />
              Save Info
            </>
          ) : (
            <>Edit Profile</>
          )}
        </button>
      </div>
    </>
  );

  const renderManageAddress = () => (
    <>
      <h1 className="text-2xl font-bold text-text-dark mb-6">Manage Addresses</h1>
      <div className="border-2 border-dashed border-[#0A88FF] rounded-xl p-5 flex items-center gap-3 cursor-pointer hover:bg-blue-50/40 transition-colors mb-6">
        <span className="text-[#0A88FF] text-2xl font-light">+</span>
        <span className="text-[#0A88FF] font-semibold text-sm">ADD A NEW ADDRESS</span>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-xl p-5 bg-white">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded">HOME</span>
            <span className="font-semibold text-sm text-gray-800">{user?.fullName || 'User'}</span>
            <span className="text-sm text-gray-500">{formData.contact}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {formData.location || 'No address saved yet. Click "Add a new address" to get started.'}
          </p>
        </div>
      </div>
    </>
  );

  const renderOrders = () => {
    const statusColors = {
      Pending: 'bg-orange-50 text-orange-600',
      Processing: 'bg-green-50 text-green-600',
      Shipped: 'bg-blue-50 text-blue-600',
      Canceled: 'bg-red-50 text-red-500',
    };

    return (
      <>
        <h1 className="text-2xl font-bold text-text-dark mb-6">My Orders</h1>
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-2">No orders yet</p>
            <p className="text-gray-400 text-sm mb-6">When you place orders, they will appear here.</p>
            <Link to="/" className="px-6 py-2.5 bg-[#0A88FF] text-white rounded-xl hover:bg-[#339DFF] transition-colors text-sm font-semibold">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                <div className="px-5 py-3 bg-gray-50 flex justify-between items-center text-xs">
                  <div className="flex gap-6">
                    <span><span className="text-gray-400">Order ID:</span> <strong>{order.id}</strong></span>
                    <span><span className="text-gray-400">Date:</span> {order.date}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </div>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 px-5 py-4 border-t border-gray-100">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image || `https://via.placeholder.com/56?text=${item.name?.charAt(0)}`} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-800">₹{(item.price || 0).toLocaleString()}</p>
                  </div>
                ))}
                {order.status !== 'Canceled' && (
                  <div className="px-5 py-3 border-t border-gray-100 flex justify-end">
                    <button onClick={() => cancelOrder(order.id)} className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const renderWishlist = () => (
    <>
      <h1 className="text-2xl font-bold text-text-dark mb-6">My Wishlist ({wishlistItems.length})</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg mb-2">Your wishlist is empty</p>
          <p className="text-gray-400 text-sm mb-6">Save items you love here to buy them later.</p>
          <Link to="/" className="px-6 py-2.5 bg-[#0A88FF] text-white rounded-xl hover:bg-[#339DFF] transition-colors text-sm font-semibold">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="space-y-0 divide-y divide-gray-200">
          {wishlistItems.map((item) => {
            const originalPrice = item.originalPrice || item.price * 1.5;
            const currentPrice = item.price || item.originalPrice;
            const discountPercent = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

            return (
              <div key={item.id} className="flex items-center gap-5 py-5">
                <Link to={`/product/${item.id}`} className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image || `https://via.placeholder.com/80?text=${item.name?.charAt(0)}`} alt={item.name} className="w-full h-full object-contain" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-800 hover:text-[#0A88FF] transition-colors line-clamp-2">
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-base font-bold text-gray-900">₹{currentPrice.toLocaleString()}</span>
                    {originalPrice > currentPrice && (
                      <>
                        <span className="text-xs text-gray-400 line-through">₹{originalPrice.toLocaleString()}</span>
                        <span className="text-xs font-semibold text-green-600">{discountPercent}% off</span>
                      </>
                    )}
                  </div>
                </div>
                <button onClick={() => toggleWishlist(item)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Remove">
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  const renderPayment = () => {
    const paymentTabs = [
      { key: 'gift_card', icon: <Gift size={18} />, label: 'Saved Gift Cards' },
      { key: 'upi', icon: <Smartphone size={18} />, label: 'Saved UPI' },
      { key: 'card', icon: <CardIcon size={18} />, label: 'Saved Cards' },
    ];

    return (
      <>
        <h1 className="text-2xl font-bold text-text-dark mb-6">Payment Methods</h1>
        <div className="flex gap-3 mb-8">
          {paymentTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setPaymentSubSection(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                paymentSubSection === tab.key
                  ? 'bg-[#0A88FF] text-white border-[#0A88FF] shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#0A88FF] hover:text-[#0A88FF]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {paymentSubSection === 'gift_card' && (
          <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
            <Gift size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium mb-1">No Gift Cards saved</p>
            <p className="text-gray-400 text-sm">Your saved gift cards will appear here.</p>
          </div>
        )}
        {paymentSubSection === 'upi' && (
          <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
            <Smartphone size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium mb-1">No UPI IDs saved</p>
            <p className="text-gray-400 text-sm">Your saved UPI IDs will appear here.</p>
          </div>
        )}
        {paymentSubSection === 'card' && (
          <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
            <CardIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium mb-1">No Cards saved</p>
            <p className="text-gray-400 text-sm">Your saved debit/credit cards will appear here.</p>
          </div>
        )}
      </>
    );
  };

  const renderReviews = () => {
    // Placeholder reviews data
    const reviews = [
      { id: 1, product: 'Wireless Bluetooth Headphones', rating: 5, comment: 'Excellent sound quality and battery life. Very comfortable to wear!', date: '2026-05-20', user: user?.fullName || 'You' },
      { id: 2, product: 'Smart Watch Pro', rating: 4, comment: 'Great features but the strap could be more comfortable.', date: '2026-05-15', user: user?.fullName || 'You' },
      { id: 3, product: 'Running Shoes - Ultra Boost', rating: 5, comment: 'Perfect fit and super comfortable for long runs.', date: '2026-05-10', user: user?.fullName || 'You' },
    ];

    const renderStars = (rating) => (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={14} className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
        ))}
      </div>
    );

    return (
      <>
        <h1 className="text-2xl font-bold text-text-dark mb-6">Reviews & Ratings</h1>
        {reviews.length === 0 ? (
          <div className="text-center py-16">
            <Star size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-2">No reviews yet</p>
            <p className="text-gray-400 text-sm">Your product reviews will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-xl p-5 bg-white">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">{review.product}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Reviewed on {review.date}</p>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 rounded-full bg-[#0A88FF] text-white flex items-center justify-center text-[10px] font-bold">
                    {review.user.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{review.user}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const renderNotifications = () => {
    const notifications = [
      { id: 1, title: 'Order Shipped!', message: 'Your order #NX-29841 has been shipped and is on its way.', time: '2 hours ago', read: false },
      { id: 2, title: 'Price Drop Alert', message: 'An item in your wishlist just dropped in price! Check it out now.', time: '5 hours ago', read: false },
      { id: 3, title: 'Welcome to NexKart!', message: 'Your account has been created successfully. Start exploring amazing deals!', time: '1 day ago', read: true },
      { id: 4, title: 'Payment Successful', message: 'Your payment of ₹1,299 has been processed successfully.', time: '3 days ago', read: true },
    ];

    return (
      <>
        <h1 className="text-2xl font-bold text-text-dark mb-6">All Notifications</h1>
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg mb-2">No notifications</p>
            <p className="text-gray-400 text-sm">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className={`border rounded-xl p-5 transition-colors ${notif.read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50/30'}`}>
                <div className="flex items-start gap-3">
                  {!notif.read && <div className="w-2 h-2 rounded-full bg-[#0A88FF] mt-1.5 flex-shrink-0"></div>}
                  <div className={!notif.read ? '' : 'ml-5'}>
                    <h3 className="font-semibold text-sm text-gray-800">{notif.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{notif.message}</p>
                    <span className="text-xs text-gray-400 mt-2 block">{notif.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const renderFAQs = () => {
    const faqs = [
      { id: 1, question: 'How do I track my order?', answer: 'You can track your order from the "My Orders" section in your profile. Click on any order to see its real-time tracking details.' },
      { id: 2, question: 'What is the return policy?', answer: 'We offer a 7-day easy return policy on most products. Items must be in their original packaging and unused condition.' },
      { id: 3, question: 'How can I cancel my order?', answer: 'You can cancel your order from the "My Orders" section before it is shipped. Once shipped, you can initiate a return after delivery.' },
      { id: 4, question: 'What payment methods are accepted?', answer: 'We accept Credit/Debit cards, UPI, Net Banking, Wallets, and Cash on Delivery (COD) on eligible products.' },
      { id: 5, question: 'How do I change my delivery address?', answer: 'Go to "Manage Address" in your profile to add, edit, or delete delivery addresses. You can also change the address during checkout.' },
      { id: 6, question: 'Is my payment information secure?', answer: 'Yes, all transactions are secured with 256-bit SSL encryption. We never store your complete card details on our servers.' },
    ];

    const [openFaq, setOpenFaq] = useState(null);

    return (
      <>
        <h1 className="text-2xl font-bold text-text-dark mb-6">Frequently Asked Questions</h1>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-800 pr-4">{faq.question}</span>
                {openFaq === faq.id ? <ChevronUp size={18} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
              </button>
              {openFaq === faq.id && (
                <div className="px-5 pb-4 pt-0">
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  };

  // ==================== MAIN RENDER ====================

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfile();
      case 'manage_address':
        return renderManageAddress();
      case 'orders':
        return renderOrders();
      case 'wishlist':
        return renderWishlist();
      case 'payment':
        return renderPayment();
      case 'reviews':
        return renderReviews();
      case 'notifications':
        return renderNotifications();
      case 'faqs':
        return renderFAQs();
      default:
        return renderProfile();
    }
  };

  return (
    <div className="min-h-screen bg-bg-light py-10 px-4 md:px-10 lg:px-16 xl:px-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 min-h-[700px]">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 lg:w-[320px] bg-[#0A88FF] text-white p-8 flex flex-col flex-shrink-0">
          <div className="flex flex-col items-center mb-10 mt-4">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 border-2 border-white/40">
              <UserIcon size={40} className="text-white" />
            </div>
            <h2 className="text-lg font-medium">
              Welcome, {user?.fullName?.split(' ')[0] || 'User'}
            </h2>
          </div>

          <nav className="flex-1 space-y-1">
            {sidebarLinks.map((link) => (
              <React.Fragment key={link.key}>
                <button
                  onClick={() => handleSidebarClick(link.key)}
                  className={`w-full flex items-center justify-between px-6 py-3 rounded-full transition-all text-sm font-medium ${
                    activeSection === link.key
                      ? 'bg-white/20 shadow-inner'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="opacity-80">{link.icon}</span>
                    <span>{link.label}</span>
                  </div>
                  {link.key === 'payment' && (
                    <span className={`opacity-70 transition-transform duration-300 ${paymentOpen ? 'rotate-180' : 'rotate-0'}`}>
                      <ChevronDown size={16} />
                    </span>
                  )}
                </button>

                {/* Payment sub-items with slide animation */}
                {link.key === 'payment' && (
                  <div
                    className="ml-10 overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: paymentOpen ? '150px' : '0px',
                      opacity: paymentOpen ? 1 : 0,
                    }}
                  >
                    <div className="space-y-1 pt-1 pb-1">
                      {[
                        { key: 'gift_card', label: 'Gift Cards' },
                        { key: 'upi', label: 'Saved UPI' },
                        { key: 'card', label: 'Saved Cards' },
                      ].map((sub) => (
                        <button
                          key={sub.key}
                          onClick={() => {
                            setActiveSection('payment');
                            setPaymentSubSection(sub.key);
                          }}
                          className={`w-full text-left px-4 py-2 rounded-full text-xs font-medium transition-all ${
                            paymentSubSection === sub.key
                              ? 'bg-white/15 text-white'
                              : 'text-white/70 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-3 mt-10 rounded-full transition-all text-sm font-medium hover:bg-white/10 text-white/90"
          >
            <LogOut size={20} className="opacity-80" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
