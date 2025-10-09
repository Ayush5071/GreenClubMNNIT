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
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  // Simple Masonry/Flex Image Card
  const ImageCard = ({ image, index }: { image: GalleryImage; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group cursor-pointer"
      onClick={() => setSelectedImage(image.src)}
      style={{ breakInside: 'avoid', marginBottom: '1rem' }}
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/30 group-hover:border-green-400/50 transition-all duration-300 shadow-lg group-hover:shadow-green-500/20">
        {/* Image */}
        <img
          src={image.src}
          alt={`Gallery image ${index + 1}`}
          loading="lazy"
          onLoad={e => e.currentTarget.classList.add('loaded')}
          style={{
            width: '100%',
            display: 'block',
            borderRadius: '0.75rem',
            transition: 'all 0.3s ease',
          }}
          className="gallery-img group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
        
        {/* View indicator */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center space-x-2 text-white">
            <div className="p-2 bg-green-500/80 rounded-lg backdrop-blur-sm">
              <FiImage className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">View Image</span>
          </div>
        </div>
        
        {/* Decorative corner */}
        <div className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-green-950">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center text-green-300 hover:text-green-200 transition-all duration-300 bg-gray-900/80 backdrop-blur-lg px-4 py-2 rounded-xl border border-green-400/30 hover:border-green-400/50 shadow-lg hover:shadow-green-500/20"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30 mr-4">
              <FiImage className="text-3xl text-green-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Gallery
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover our journey towards a <span className="text-green-400 font-semibold">greener tomorrow</span> through 
            environmental initiatives, campus events, and community impact moments.
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full"></div>


        </motion.div>

        {/* Gallery Masonry Layout */}
        <div
          className="gallery-masonry"
          style={{
            columnCount: 4,
            columnGap: '1.5rem',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 1rem',
          }}
        >
          <style>{`
            @media (min-width: 640px) { .gallery-masonry { column-count: 4; column-gap: 1.5rem; } }
            @media (min-width: 1024px) { .gallery-masonry { column-count: 4; column-gap: 2rem; } }
            @media (min-width: 1400px) { .gallery-masonry { column-count: 4; column-gap: 2rem; } }
            .gallery-masonry img {
              width: 100%;
              border-radius: 0.75rem;
              transition: all 0.3s ease;
              max-height: 220px;
              object-fit: cover;
            }
            .gallery-masonry img.loaded {
              opacity: 1;
            }
          `}</style>
          <AnimatePresence>
            {images.map((image, index) => (
              <ImageCard key={image.id} image={image} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {images.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl border border-green-400/20 max-w-md mx-auto">
              <div className="p-4 bg-green-500/20 rounded-2xl w-fit mx-auto mb-4">
                <FiImage className="text-4xl text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Gallery Coming Soon</h3>
              <p className="text-gray-300">Our environmental journey photos will be showcased here.</p>
            </div>
          </motion.div>
        )}
      </div>



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
