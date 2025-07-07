"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiPlus, FiUpload, FiX, FiImage, FiUser, FiTrash } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { Auth } from "@/lib/auth";

interface GalleryImage {
  src: string;
  id: string;
}

function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load initial images and user
  useEffect(() => {
    loadImages();
    checkUser();
  }, []);

  // Handle keyboard events for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  const checkUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        // Handle both old and new response formats
        const userData = data.user || data; // Support both formats
        setUser(userData);
        setIsAdmin(userData.role === 'admin');
      } else {
        console.log('Gallery - Auth failed:', response.status);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  const loadImages = async () => {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        const galleryImages = data.images.map((src: string, index: number) => ({
          src,
          id: `img-${index}`
        }));
        setImages(galleryImages);
      }
    } catch (error) {
      console.error('Error loading images:', error);
      // Fallback to static images
      const allowedIndices = [1, 2, 3, 4, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 32, 40, 45, 47, 49];
      const fallbackImages = allowedIndices.map((index, i) => ({
        src: `/gallery/img${index}.webp`,
        id: `static-${i}`
      }));
      setImages(fallbackImages);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    if (!user) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.ok) {
        const result = await response.json();
        
        // Add new image to the gallery
        const newImage: GalleryImage = {
          src: result.path,
          id: `uploaded-${Date.now()}`
        };
        setImages(prev => [newImage, ...prev]);
        
        // Show success message
        setTimeout(() => {
          setIsUploadModalOpen(false);
          setIsUploading(false);
          setUploadProgress(0);
          alert('Image uploaded successfully! 🎉');
        }, 1000);
      } else {
        const error = await response.json();
        alert(error.error || 'Upload failed');
        setIsUploading(false);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteImage = async (imageSrc: string) => {
    if (!isAdmin) return;
    
    const filename = imageSrc.split('/').pop();
    if (!filename) return;

    if (confirm('Are you sure you want to delete this image?')) {
      try {
        const response = await fetch('/api/gallery', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filename }),
        });

        if (response.ok) {
          setImages(prev => prev.filter(img => img.src !== imageSrc));
          setSelectedImage(null);
          alert('Image deleted successfully! 🗑️');
        } else {
          const error = await response.json();
          alert(error.error || 'Failed to delete image');
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete image');
      }
    }
  };

  const ImageCard = ({ image, index }: { image: GalleryImage; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
      whileHover={{ y: -12, scale: 1.03 }}
      className="relative group cursor-pointer"
      onClick={() => setSelectedImage(image.src)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 group-hover:border-green-500/50 transition-all duration-500 shadow-xl group-hover:shadow-green-500/25 h-80">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <div className="absolute inset-0 bg-[url('/Elements/grid.png')] bg-[length:30px_30px] bg-center" />
        </div>
        
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-3xl border-2 border-green-400/0 group-hover:border-green-400/20 transition-all duration-500" />
        
        {/* Admin Delete Button */}
        {isAdmin && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              deleteImage(image.src);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-3 right-3 z-20 p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-full opacity-70 group-hover:opacity-100 transition-all duration-300 border border-red-500/50 shadow-lg"
            title="Delete image (Admin only)"
          >
            <FiTrash className="w-4 h-4" />
          </motion.button>
        )}
        
        {/* Image Container */}
        <div className="relative p-4 h-full flex flex-col">
          <div className="relative overflow-hidden rounded-2xl flex-1">
            <Image
              src={image.src}
              alt={`Gallery image ${index + 1}`}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              loading="lazy"
            />
            
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating Particles Effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-60"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scale: [0, 1, 0],
                    x: [0, Math.random() * 80 - 40],
                    y: [0, Math.random() * 80 - 40]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${20 + i * 20}%`
                  }}
                />
              ))}
            </div>

            {/* Hero Section Stickers/Effects */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.div
                className="absolute top-4 left-4 text-green-400 text-2xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🌱
              </motion.div>
              <motion.div
                className="absolute bottom-6 right-6 text-emerald-400 text-lg"
                animate={{ 
                  y: [0, -5, 0],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.div>
            </div>
          </div>
          
          {/* Card Footer */}
          <motion.div 
            className="relative mt-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-2 text-gray-400 group-hover:text-green-300 transition-colors duration-300">
              <FiImage className="w-4 h-4" />
              <span className="text-sm font-medium">View Image</span>
            </div>
          </motion.div>
        </div>

        {/* Corner Decorative Elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-6 left-4 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center text-gray-300 hover:text-white transition-all duration-300 bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700/50 hover:border-gray-600/50"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <FiImage className="text-4xl text-white mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Green Club Gallery
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Explore our collection of environmental initiatives, events, and memories.
          </p>

          {/* Upload Button - Only for logged in users */}
          {user && (
            <motion.button
              onClick={() => setIsUploadModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/25"
            >
              <FiPlus className="mr-2" />
              Add New Image
            </motion.button>
          )}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {images.map((image, index) => (
            <ImageCard key={image.id} image={image} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {images.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FiImage className="text-6xl text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">No images yet</h3>
            <p className="text-gray-500">Be the first to add an image to our gallery!</p>
          </motion.div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isUploading && setIsUploadModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Upload Image</h3>
                {!isUploading && (
                  <button
                    onClick={() => setIsUploadModalOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Close upload modal"
                    aria-label="Close upload modal"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                )}
              </div>

              {!isUploading ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-2">Drag & drop an image here</p>
                  <p className="text-gray-500 text-sm mb-4">or</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Choose File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    title="Select image file"
                    aria-label="Select image file to upload"
                  />
                  <p className="text-gray-500 text-xs mt-4">
                    Supports: JPEG, PNG, WebP (Max 5MB)
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-gray-700 rounded-full"></div>
                      <div className="absolute inset-0 w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-green-400 text-xs font-bold">{uploadProgress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-white text-lg font-semibold">Uploading Image...</p>
                    <p className="text-gray-400 text-sm">Please wait while we process your image</p>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Background overlay with subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/40 to-black/80" />
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[url('/Elements/grid.png')] bg-[length:100px_100px] bg-center" />
            </div>

            {/* Close button */}
            <motion.button
              onClick={() => setSelectedImage(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 z-20 p-3 bg-gray-900/80 backdrop-blur-sm text-white rounded-full hover:bg-gray-800/90 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"
              title="Close image view"
              aria-label="Close image view"
            >
              <FiX className="w-6 h-6" />
            </motion.button>

            {/* Admin Delete Button in Lightbox */}
            {isAdmin && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteImage(selectedImage);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-20 z-20 p-3 bg-red-600/80 backdrop-blur-sm text-white rounded-full hover:bg-red-600/90 transition-all duration-300 border border-red-500/50 hover:border-red-400/50"
                title="Delete image (Admin only)"
                aria-label="Delete image (Admin only)"
              >
                <FiTrash className="w-6 h-6" />
              </motion.button>
            )}

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full h-full max-w-7xl max-h-full p-8 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image wrapper with glassmorphism effect */}
              <div className="relative bg-gray-900/20 backdrop-blur-xl rounded-2xl border border-gray-700/30 overflow-hidden shadow-2xl">
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-green-400/20 opacity-0 animate-pulse" />
                
                {/* Main image */}
                <div className="relative">
                  <Image
                    src={selectedImage}
                    alt="Gallery image - Full view"
                    width={1920}
                    height={1080}
                    className="max-w-full max-h-[90vh] object-contain"
                    priority
                  />
                  
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Image info bar */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6"
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-600/20 rounded-lg">
                        <FiImage className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Gallery Image</h3>
                        <p className="text-gray-300 text-sm">
                          {selectedImage.includes('uploaded') ? 'User uploaded' : 'Gallery collection'}
                        </p>
                      </div>
                    </div>
                    
                    {isAdmin && (
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <FiUser className="w-4 h-4" />
                        <span>Admin View</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0],
                        x: [0, Math.random() * 200 - 100],
                        y: [0, Math.random() * 200 - 100]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${10 + i * 20}%`,
                        top: `${10 + i * 15}%`
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Keyboard hint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50"
            >
              Press <span className="text-white font-medium">ESC</span> or click outside to close
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;
