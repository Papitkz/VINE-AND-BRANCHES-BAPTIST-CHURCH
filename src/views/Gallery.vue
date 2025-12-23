<!-- Gallery.vue -->
<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6 text-center">Gallery</h1>
      <p class="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">Explore our collection of projects and see how we've helped businesses transform their operations.</p>
      
      <div class="mb-8 flex flex-wrap justify-center gap-2">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="filterGallery(category)"
          :class="['px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200', 
            activeCategory === category ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300']">
          {{ category }}
        </button>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div 
          v-for="(item, index) in filteredGallery" 
          :key="index"
          class="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105">
          <img :src="item.image" :alt="item.title" class="w-full h-64 object-cover">
          <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
            <div class="text-white text-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
              <h3 class="text-lg font-semibold mb-2">{{ item.title }}</h3>
              <p class="text-sm">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-12 text-center">
        <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">Load More</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const categories = ['All', 'Web Design', 'Mobile Apps', 'Branding', 'Marketing'];
const activeCategory = ref('All');

const galleryItems = [
  { image: 'https://picsum.photos/seed/gallery1/400/400.jpg', title: 'Project Alpha', description: 'Web Design', category: 'Web Design' },
  { image: 'https://picsum.photos/seed/gallery2/400/400.jpg', title: 'Project Beta', description: 'Mobile Application', category: 'Mobile Apps' },
  { image: 'https://picsum.photos/seed/gallery3/400/400.jpg', title: 'Project Gamma', description: 'Brand Identity', category: 'Branding' },
  { image: 'https://picsum.photos/seed/gallery4/400/400.jpg', title: 'Project Delta', description: 'Marketing Campaign', category: 'Marketing' },
  { image: 'https://picsum.photos/seed/gallery5/400/400.jpg', title: 'Project Epsilon', description: 'E-commerce Platform', category: 'Web Design' },
  { image: 'https://picsum.photos/seed/gallery6/400/400.jpg', title: 'Project Zeta', description: 'iOS App', category: 'Mobile Apps' },
  { image: 'https://picsum.photos/seed/gallery7/400/400.jpg', title: 'Project Eta', description: 'Logo Design', category: 'Branding' },
  { image: 'https://picsum.photos/seed/gallery8/400/400.jpg', title: 'Project Theta', description: 'Social Media', category: 'Marketing' },
  { image: 'https://picsum.photos/seed/gallery9/400/400.jpg', title: 'Project Iota', description: 'Corporate Website', category: 'Web Design' },
  { image: 'https://picsum.photos/seed/gallery10/400/400.jpg', title: 'Project Kappa', description: 'Android App', category: 'Mobile Apps' },
  { image: 'https://picsum.photos/seed/gallery11/400/400.jpg', title: 'Project Lambda', description: 'Brand Guidelines', category: 'Branding' },
  { image: 'https://picsum.photos/seed/gallery12/400/400.jpg', title: 'Project Mu', description: 'Digital Campaign', category: 'Marketing' },
];

const filteredGallery = computed(() => {
  if (activeCategory.value === 'All') {
    return galleryItems;
  }
  return galleryItems.filter(item => item.category === activeCategory.value);
});

const filterGallery = (category) => {
  activeCategory.value = category;
};
</script>