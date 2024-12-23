import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { User, Mail, Phone, MapPin, Calendar, Camera, Edit2, Save, X } from 'lucide-react';
import api from '../services/api/axiosconfig';

// Define interfaces for type safety
interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role: string;
  created_at: string;
}

interface EditFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

const UserProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditFormData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: ''
  });

  const userId = parseInt(localStorage.getItem('userId') || '0');

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await api.get<Profile>(`/users/profile/${userId}`);
      setProfile(response.data);
      setEditForm({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNumber: response.data.phoneNumber || '',
        address: response.data.address || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put<Profile>(`/users/${userId}`, editForm);
      setProfile(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <User className="w-8 h-8 text-green-500" />
        </motion.div>
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center">Failed to load profile</div>;
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative h-32 bg-gradient-to-r from-green-500 to-blue-500">
          <motion.div 
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
          </motion.div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 px-6 pb-6">
          {isEditing ? (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="p-2 border rounded-md"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                  placeholder="First Name"
                />
                <input
                  className="p-2 border rounded-md"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                  placeholder="Last Name"
                />
                <input
                  className="p-2 border rounded-md"
                  value={editForm.phoneNumber}
                  onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})}
                  placeholder="Phone Number"
                />
                <input
                  className="p-2 border rounded-md"
                  value={editForm.address}
                  onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                  placeholder="Address"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleUpdate}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div className="space-y-6" variants={containerVariants}>
              <div className="text-center">
                <motion.h2 
                  className="text-2xl font-bold"
                  variants={itemVariants}
                >
                  {profile.firstName} {profile.lastName}
                </motion.h2>
                <motion.span 
                  className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mt-2"
                  variants={itemVariants}
                >
                  {profile.role}
                </motion.span>
              </div>

              <motion.div className="space-y-4" variants={containerVariants}>
                <motion.div 
                  className="flex items-center space-x-3"
                  variants={itemVariants}
                >
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span>{profile.email}</span>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-3"
                  variants={itemVariants}
                >
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span>{profile.phoneNumber || 'Not provided'}</span>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-3"
                  variants={itemVariants}
                >
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{profile.address || 'Not provided'}</span>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-3"
                  variants={itemVariants}
                >
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                </motion.div>
              </motion.div>

              <motion.button
                className="flex items-center space-x-2 mx-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Profile</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;