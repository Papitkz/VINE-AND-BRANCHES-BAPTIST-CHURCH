<template>
  <div class="min-h-screen bg-white">
    <!-- Loader Component -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90">
        <div class="flex flex-col items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTKSJUbRJDljxITqJwaT99FQM4XKFRQCO5Q&s"
            alt="Loading..."
            class="w-12 h-12 sm:w-16 sm:h-16 animate-spin"
          />
          <p class="mt-4 text-green-700 font-medium text-base sm:text-lg">Loading...</p>
        </div>
      </div>
    </transition>

    <!-- Professional Transparent Appbar -->
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="{ 'scrolled': isScrolled }">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div class="flex justify-between items-center">
          <!-- Logo & Title -->
          <div class="flex items-center gap-2 sm:gap-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTKSJUbRJDljxITqJwaT99FQM4XKFRQCO5Q&s"
              alt="Vine & Branches Logo"
              class="h-8 sm:h-10 lg:h-12 w-auto"
            />
            <span class="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white hidden sm:inline">VINE AND BRANCHES BAPTIST CHURCH</span>
            <span class="text-base sm:text-lg md:text-xl font-bold text-white sm:hidden">VBBC</span>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
            <a 
              v-for="item in menuItems" 
              :key="item.title"
              :href="item.href" 
              class="text-white font-medium hover:text-green-200 transition-all duration-300 relative group text-sm sm:text-base nav-link py-2"
              @click="handleNavClick"
            >
              {{ item.title }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button class="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 text-sm sm:text-base">
              Get Connected
            </button>
          </nav>

          <!-- Tablet Navigation (Medium Screens) -->
          <nav class="hidden md:flex lg:hidden items-center space-x-2 sm:space-x-4">
            <a 
              v-for="item in menuItems.slice(0, 4)" 
              :key="item.title"
              :href="item.href" 
              class="text-white font-medium hover:text-green-200 transition-all duration-300 relative group text-xs sm:text-sm nav-link py-1"
              @click="handleNavClick"
            >
              {{ item.title }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-green-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <button class="px-2 sm:px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 text-xs sm:text-sm">
              Get Connected
            </button>
          </nav>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden flex flex-col justify-center items-center w-10 h-10 p-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg"
            aria-label="Open menu"
          >
            <!-- Hamburger icon (3 lines) -->
            <span
              class="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm -translate-y-1"
              :class="{ 'rotate-45 translate-y-0.5 w-5': mobileMenuOpen }"
            ></span>
            <span
              class="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1"
              :class="{ 'opacity-0 translate-x-1': mobileMenuOpen }"
            ></span>
            <span
              class="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm translate-y-1"
              :class="{ '-rotate-45 -translate-y-0.5 w-5': mobileMenuOpen }"
            ></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu with Fade Transition -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="md:hidden bg-green-800/95 backdrop-blur-md shadow-lg">
          <div class="container mx-auto px-4 sm:px-6 py-4">
            <a 
              v-for="item in menuItems" 
              :key="item.title"
              :href="item.href" 
              class="block py-3 text-white font-medium hover:text-green-200 transition-all duration-300"
              @click="handleMobileNavClick"
            >
              {{ item.title }}
            </a>
            <button class="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300">
              Get Connected
            </button>
          </div>
        </div>
      </transition>
    </header>

    <!-- Hero Section -->
    <section id="home" class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-700/90"></div>
        <img src="https://picsum.photos/seed/church-building/1920/1080.jpg" alt="Church Building" class="w-full h-full object-cover">
      </div>
      
      <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div class="mb-6 flex justify-center animate-fade-in-down">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTKSJUbRJDljxITqJwaT99FQM4XKFRQCO5Q&s" 
            alt="Vine & Branches Logo" 
            class="h-20 w-auto sm:h-24 md:h-28 lg:h-32 bg-white rounded-lg p-2 shadow-lg mt-15 sm:mt-0"
          >
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white mb-4 animate-fade-in-down">
          VINE AND BRANCHES BAPTIST CHURCH
        </h1>
        <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 animate-fade-in-up animation-delay-200">
          "The steadfast love of the LORD never ceases; His mercies never come to an end; they are new every morning; great is your faithfulness!." - Lamentations 3:22-23
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-600">
          <a href="#branches" class="px-4 sm:px-6 lg:px-8 py-3 bg-white text-green-700 rounded-full font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
            Our Branches
          </a>
          <a href="#services" class="px-4 sm:px-6 lg:px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
            Service Times
          </a>
        </div>
      </div>
      
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce mt">
        <a href="#about" class="text-white/80 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div class="order-2 md:order-1">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-6">Welcome to Our Church</h2>
            <p class="text-sm sm:text-base md:text-lg text-gray-700 mb-6">
              At Vine & Branches Baptist Church, we are a community of believers dedicated to growing in faith, serving our community, and sharing the love of Christ with all.
            </p>
            <p class="text-sm sm:text-base md:text-lg text-gray-700 mb-6">
              Our church has grown to include multiple branches across the region, each committed to creating a welcoming environment where individuals and families can connect with God and each other through meaningful worship, biblical teaching, and authentic fellowship.
            </p>
            <div class="grid grid-cols-3 gap-4 mb-8">
              <div class="text-center">
                <div class="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">1000+</div>
                <div class="text-gray-600 text-xs sm:text-sm md:text-base">Members</div>
              </div>
              <div class="text-center">
                <div class="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">3</div>
                <div class="text-gray-600 text-xs sm:text-sm md:text-base">Branches</div>
              </div>
              <div class="text-center">
                <div class="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">18+</div>
                <div class="text-gray-600 text-xs sm:text-sm md:text-base">Years</div>
              </div>
            </div>
            <a href="#branches" class="inline-flex items-center px-3 sm:px-4 md:px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
              Visit Our Branches
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
          <div class="order-1 md:order-2">
            <img src="https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyPtcnuVS8ntX2g73Qz_w6klWrBs2SXoPZrxv22Sf4vhKzq6lIriP1jxwNDew--xAfwN3QhFGejPCmV-TxOBLLvxmsLv0ztzys5ogS6Sqewca1rtUOCYiDFgKUBLNLjYZj3QXmKbw=s1360-w1360-h1020-rw" alt="Church Interior" class="rounded-lg shadow-xl w-full">
          </div>
        </div>
      </div>
    </section>

    <!-- Branches Section -->
    <section id="branches" class="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-green-800">Our Branches</h2>
        <p class="text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-12 text-gray-600">Find a Vine & Branches community near you</p>
        
        <!-- Branch Tabs - Always Visible with Sticky Position -->
        <div class="sticky top-16 z-40 bg-white py-4 mb-8 border-b border-gray-100">
          <div class="flex justify-center overflow-x-auto pb-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
              <button 
                v-for="branch in branches" 
                :key="branch.id"
                @click="activeBranch = branch.id"
                :class="[
                  'px-2 sm:px-3 md:px-4 lg:px-6 py-2 text-xs sm:text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap',
                  activeBranch === branch.id 
                    ? 'bg-green-600 text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                ]"
              >
                {{ branch.name }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Branch Content -->
        <div class="grid md:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <div class="bg-green-50 rounded-lg p-4 sm:p-6 md:p-8 h-full">
              <h3 class="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-green-800">{{ currentBranch.name }}</h3>
              
              <div class="mb-6">
                <h4 class="text-base sm:text-lg font-semibold mb-3 text-green-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Head Pastor
                </h4>
                <div class="flex items-center mb-4">
                  <img :src="currentBranch.pastor.image" :alt="currentBranch.pastor.name" class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full object-cover mr-4">
                  <div>
                    <p class="font-semibold text-gray-800 text-sm sm:text-base">{{ currentBranch.pastor.name }}</p>
                    <p class="text-gray-600 text-xs sm:text-sm md:text-base">{{ currentBranch.pastor.title }}</p>
                  </div>
                </div>
                <p class="text-gray-700 text-xs sm:text-sm md:text-base">{{ currentBranch.pastor.bio }}</p>
              </div>
              
              <div class="space-y-4">
                <div class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p class="font-semibold text-green-800 text-xs sm:text-sm md:text-base">Address</p>
                    <p class="text-gray-700 text-xs sm:text-sm md:text-base">{{ currentBranch.address }}</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p class="font-semibold text-green-800 text-xs sm:text-sm md:text-base">Service Times</p>
                    <p class="text-gray-700 text-xs sm:text-sm md:text-base">{{ currentBranch.serviceTimes }}</p>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-600 mr-3 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p class="font-semibold text-green-800 text-xs sm:text-sm md:text-base">Contact</p>
                    <p class="text-gray-700 text-xs sm:text-sm md:text-base">{{ currentBranch.contact.phone }}</p>
                    <p class="text-gray-700 text-xs sm:text-sm md:text-base">{{ currentBranch.contact.email }}</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 sm:mt-8 flex flex-wrap gap-3">
                <a :href="currentBranch.directions" target="_blank" class="inline-flex items-center px-3 sm:px-4 md:px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base">
                  Get Directions
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a :href="`tel:${currentBranch.contact.phone.replace(/\D/g, '')}`" class="inline-flex items-center px-3 sm:px-4 md:px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base">
                  Call Us
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <div class="rounded-lg overflow-hidden h-full min-h-[250px] sm:min-h-[350px] md:min-h-[400px] shadow-lg">
              <iframe 
                :src="currentBranch.mapUrl" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy"
                class="w-full h-full min-h-[250px] sm:min-h-[350px] md:min-h-[400px]">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-green-700 text-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">Service Times</h2>
        <p class="text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-12 text-green-100">Join us for worship and fellowship</p>
        
        <!-- Desktop View - Grid -->
        <div class="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl sm:text-2xl font-semibold mb-2 text-center">Sunday School</h3>
            <p class="text-base sm:text-lg text-center mb-4">08:00 AM - 09:00 AM</p>
            <p class="text-green-100 text-sm sm:text-base">Bible study classes for all ages, from children to adults.</p>
          </div>
          
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl sm:text-2xl font-semibold mb-2 text-center">Sunday Service</h3>
            <p class="text-base sm:text-lg text-center mb-4">9:00 AM - 11:30 AM</p>
            <p class="text-green-100 text-sm sm:text-base">Join us for our main worship service with contemporary music and biblical teaching.</p>
          </div>
          
          <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 class="text-xl sm:text-2xl font-semibold mb-2 text-center">Midweek Service</h3>
            <p class="text-base sm:text-lg text-center mb-4">Wednesday 7:00 PM - 8:30 PM</p>
            <p class="text-green-100 text-sm sm:text-base">Join us for prayer, worship, and in-depth Bible study.</p>
          </div>
        </div>
        
        <!-- Mobile View - Carousel -->
        <div class="md:hidden relative">
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${serviceSlideIndex * 100}%)` }"
            >
              <!-- Service 1 -->
              <div class="w-full flex-shrink-0 px-4">
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div class="text-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-semibold mb-2 text-center">Sunday School</h3>
                  <p class="text-lg text-center mb-4">08:00 AM - 09:00 AM</p>
                  <p class="text-green-100">Bible study classes for all ages, from children to adults.</p>
                </div>
              </div>
              
              <!-- Service 2 -->
              <div class="w-full flex-shrink-0 px-4">
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div class="text-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-semibold mb-2 text-center">Sunday Service</h3>
                  <p class="text-lg text-center mb-4">9:00 AM - 11:30 AM</p>
                  <p class="text-green-100">Join us for our main worship service with contemporary music and biblical teaching.</p>
                </div>
              </div>
              
              <!-- Service 3 -->
              <div class="w-full flex-shrink-0 px-4">
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div class="text-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-semibold mb-2 text-center">Midweek Service</h3>
                  <p class="text-lg text-center mb-4">Wednesday 7:00 PM - 8:30 PM</p>
                  <p class="text-green-100">Join us for prayer, worship, and in-depth Bible study.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Carousel Controls -->
          <div class="flex justify-center mt-6 space-x-2">
            <button 
              v-for="(_, index) in 3" 
              :key="index"
              @click="serviceSlideIndex = index"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300',
                serviceSlideIndex === index ? 'bg-white' : 'bg-white/50'
              ]"
              :aria-label="`Go to service ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-green-800">Our Gallery</h2>
        <p class="text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-12 text-gray-600">A glimpse into our church life and activities</p>
        
        <!-- Branch Selector -->
        <div class="mb-6">
          <!-- Mobile Custom Dropdown -->
          <div class="md:hidden">
            <div class="relative">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Select Branch</label>
              <div 
                @click="toggleBranchDropdown"
                class="w-full px-4 py-3 bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md"
                :class="{ 'ring-2 ring-green-500 border-green-500': branchDropdownOpen }"
              >
                <span class="font-medium flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  {{ branches.find(b => b.id === activeGalleryBranch)?.name }}
                </span>
                <svg 
                  class="w-5 h-5 text-green-600 transition-transform duration-200" 
                  :class="{ 'rotate-180': branchDropdownOpen }" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              
              <!-- Dropdown Menu -->
              <transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="transform opacity-0 scale-95 -translate-y-2"
                enter-to-class="transform opacity-100 scale-100 translate-y-0"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="transform opacity-100 scale-100 translate-y-0"
                leave-to-class="transform opacity-0 scale-95 -translate-y-2"
              >
                <div 
                  v-if="branchDropdownOpen" 
                  class="absolute z-50 mt-2 w-full bg-white border-2 border-green-200 rounded-xl shadow-2xl"
                  @click.stop
                >
                  <div class="py-2 max-h-60 overflow-auto">
                    <button 
                      v-for="branch in branches" 
                      :key="branch.id"
                      @click="selectBranch(branch.id)"
                      class="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-700 focus:outline-none focus:bg-gradient-to-r focus:from-green-50 focus:to-green-100 focus:text-green-700 transition-all duration-150 border-l-4"
                      :class="{ 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-500': activeGalleryBranch === branch.id, 'border-transparent': activeGalleryBranch !== branch.id }"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <svg v-if="activeGalleryBranch === branch.id" class="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                          <span class="font-medium">{{ branch.name }}</span>
                        </div>
                        <svg v-if="activeGalleryBranch === branch.id" class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          
          <!-- Desktop Button View -->
          <div class="hidden md:flex justify-center">
            <div class="inline-flex rounded-lg shadow-md" role="group">
              <button 
                v-for="branch in branches" 
                :key="branch.id"
                @click="activeGalleryBranch = branch.id"
                :class="[
                  'px-4 sm:px-6 py-2.5 text-sm font-semibold transition-all duration-300',
                  activeGalleryBranch === branch.id 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                ]"
              >
                {{ branch.name }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Category Selector for Tanza Branch -->
        <div v-if="activeGalleryBranch === 'tanza'" class="mb-6">
          <!-- Mobile Custom Dropdown -->
          <div class="md:hidden">
            <div class="relative">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Select Category</label>
              <div 
                @click="toggleTanzaCategoryDropdown"
                class="w-full px-4 py-3 bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md"
                :class="{ 'ring-2 ring-green-500 border-green-500': tanzaCategoryDropdownOpen }"
              >
                <span class="font-medium flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  {{ tanzaCategories.find(c => c.id === activeTanzaCategory)?.name }}
                </span>
                <svg 
                  class="w-5 h-5 text-green-600 transition-transform duration-200" 
                  :class="{ 'rotate-180': tanzaCategoryDropdownOpen }" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              
              <!-- Dropdown Menu -->
              <transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="transform opacity-0 scale-95 -translate-y-2"
                enter-to-class="transform opacity-100 scale-100 translate-y-0"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="transform opacity-100 scale-100 translate-y-0"
                leave-to-class="transform opacity-0 scale-95 -translate-y-2"
              >
                <div 
                  v-if="tanzaCategoryDropdownOpen" 
                  class="absolute z-50 mt-2 w-full bg-white border-2 border-green-200 rounded-xl shadow-2xl"
                  @click.stop
                >
                  <div class="py-2 max-h-60 overflow-auto">
                    <button 
                      v-for="category in tanzaCategories" 
                      :key="category.id"
                      @click="selectTanzaCategory(category.id)"
                      class="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-700 focus:outline-none focus:bg-gradient-to-r focus:from-green-50 focus:to-green-100 focus:text-green-700 transition-all duration-150 border-l-4"
                      :class="{ 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-500': activeTanzaCategory === category.id, 'border-transparent': activeTanzaCategory !== category.id }"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <svg v-if="activeTanzaCategory === category.id" class="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                          <span class="font-medium">{{ category.name }}</span>
                        </div>
                        <svg v-if="activeTanzaCategory === category.id" class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          
          <!-- Desktop Button View -->
          <div class="hidden md:flex justify-center">
            <div class="inline-flex rounded-lg shadow-md" role="group">
              <button 
                v-for="category in tanzaCategories" 
                :key="category.id"
                @click="activeTanzaCategory = category.id"
                :class="[
                  'px-3 sm:px-4 md:px-6 py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all duration-300',
                  activeTanzaCategory === category.id 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                ]"
              >
                {{ category.name }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Category Selector for Other Branches -->
        <div v-else class="mb-6">
          <!-- Mobile Custom Dropdown -->
          <div class="md:hidden">
            <div class="relative">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Select Category</label>
              <div 
                @click="toggleCategoryDropdown"
                class="w-full px-4 py-3 bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md"
                :class="{ 'ring-2 ring-green-500 border-green-500': categoryDropdownOpen }"
              >
                <span class="font-medium flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                  {{ activeGalleryCategory }}
                </span>
                <svg 
                  class="w-5 h-5 text-green-600 transition-transform duration-200" 
                  :class="{ 'rotate-180': categoryDropdownOpen }" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              
              <!-- Dropdown Menu -->
              <transition
                enter-active-class="transition ease-out duration-300"
                enter-from-class="transform opacity-0 scale-95 -translate-y-2"
                enter-to-class="transform opacity-100 scale-100 translate-y-0"
                leave-active-class="transition ease-in duration-200"
                leave-from-class="transform opacity-100 scale-100 translate-y-0"
                leave-to-class="transform opacity-0 scale-95 -translate-y-2"
              >
                <div 
                  v-if="categoryDropdownOpen" 
                  class="absolute z-50 mt-2 w-full bg-white border-2 border-green-200 rounded-xl shadow-2xl"
                  @click.stop
                >
                  <div class="py-2 max-h-60 overflow-auto">
                    <button 
                      v-for="category in galleryCategories" 
                      :key="category"
                      @click="selectGalleryCategory(category)"
                      class="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:text-green-700 focus:outline-none focus:bg-gradient-to-r focus:from-green-50 focus:to-green-100 focus:text-green-700 transition-all duration-150 border-l-4"
                      :class="{ 'bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-500': activeGalleryCategory === category, 'border-transparent': activeGalleryCategory !== category }"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <svg v-if="activeGalleryCategory === category" class="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                          <span class="font-medium">{{ category }}</span>
                        </div>
                        <svg v-if="activeGalleryCategory === category" class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          
          <!-- Desktop Button View -->
          <div class="hidden md:flex justify-center">
            <div class="inline-flex rounded-lg shadow-md" role="group">
              <button 
                v-for="category in galleryCategories" 
                :key="category"
                @click="activeGalleryCategory = category"
                :class="[
                  'px-3 sm:px-4 md:px-6 py-2.5 text-xs sm:text-sm md:text-base font-semibold transition-all duration-300',
                  activeGalleryCategory === category 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                ]"
              >
                {{ category }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Gallery Container -->
        <div class="gallery-container">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            <div 
              v-for="(image, index) in displayedGalleryImages" 
              :key="index"
              class="relative overflow-hidden rounded-lg cursor-pointer group"
              @click="openImageModal(image, index)"
            >
              <img :src="image.src" :alt="image.alt" class="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-4">
                <div>
                  <p class="text-white font-semibold text-xs sm:text-sm">{{ image.title }}</p>
                  <p class="text-white/80 text-xs">{{ image.category }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-6 sm:mt-8">
          <button 
            v-if="hasMoreImages" 
            @click="loadMoreImages" 
            class="px-3 sm:px-4 md:px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm md:text-base"
          >
            <span v-if="!isLoadingMore">View More Photos ({{ remainingImagesCount }} remaining)</span>
            <span v-else class="flex items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcTKSJUbRJDljxITqJwaT99FQM4XKFRQCO5Q&s"
                alt="Loading..."
                class="w-4 h-4 mr-2 animate-spin"
              />
              Loading...
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Ministries Section -->
    <section id="ministries" class="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-green-800">Our Ministries</h2>
        <p class="text-base sm:text-lg md:text-xl text-center mb-8 sm:mb-12 text-gray-600">Find a place to grow and serve</p>
        
        <!-- Desktop View - Grid -->
        <div class="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div class="bg-green-50 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex flex-col items-center mb-4">
              <div class="bg-green-600 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:bg-green-700 transition-colors duration-300 group-hover:scale-110 transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-lg sm:text-xl font-semibold text-green-800">Children's Ministry</h3>
            </div>
            <p class="text-gray-600 text-center text-sm sm:text-base">Nurturing faith in our youngest members through age-appropriate teaching and activities.</p>
          </div>
          
          <div class="bg-green-50 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex flex-col items-center mb-4">
              <div class="bg-green-600 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:bg-green-700 transition-colors duration-300 group-hover:scale-110 transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-lg sm:text-xl font-semibold text-green-800">Youth Ministry</h3>
            </div>
            <p class="text-gray-600 text-center text-sm sm:text-base">Helping teens grow in their faith and navigate challenges of adolescence.</p>
          </div>
          
          <div class="bg-green-50 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex flex-col items-center mb-4">
              <div class="bg-green-600 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:bg-green-700 transition-colors duration-300 group-hover:scale-110 transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="text-lg sm:text-xl font-semibold text-green-800">Women's Ministry</h3>
            </div>
            <p class="text-gray-600 text-center text-sm sm:text-base">Building community and spiritual growth among women of all ages.</p>
          </div>
          
          <div class="bg-green-50 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex flex-col items-center mb-4">
              <div class="bg-green-600 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 shadow-lg group-hover:bg-green-700 transition-colors duration-300 group-hover:scale-110 transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 class="text-lg sm:text-xl font-semibold text-green-800">Men's Ministry</h3>
            </div>
            <p class="text-gray-600 text-center text-sm sm:text-base">Equipping men to be spiritual leaders in their homes, church, and community.</p>
          </div>
        </div>
        
        <!-- Tablet View - 2 Columns Grid -->
        <div class="hidden sm:hidden md:hidden grid grid-cols-2 gap-4">
          <div class="bg-green-50 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex flex-col items-center mb-4">
              <div class="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-green-800">Children's Ministry</h3>
            </div>
            <p class="text-gray-600 text-center text-sm">Nurturing faith in our youngest members through age-appropriate teaching and activities.</p>
          </div>
          
          <div class="bg-green-50 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex flex-col items-center mb-4">
              <div class="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-green-800">Youth Ministry</h3>
            </div>
            <p class="text-gray-600 text-center text-sm">Helping teens grow in their faith and navigate challenges of adolescence.</p>
          </div>
          
          <div class="bg-green-50 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex flex-col items-center mb-4">
              <div class="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-green-800">Women's Ministry</h3>
            </div>
            <p class="text-gray-600 text-center text-sm">Building community and spiritual growth among women of all ages.</p>
          </div>
          
          <div class="bg-green-50 rounded-lg p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
            <div class="flex flex-col items-center mb-4">
              <div class="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-green-800">Men's Ministry</h3>
            </div>
            <p class="text-gray-600 text-center text-sm">Equipping men to be spiritual leaders in their homes, church, and community.</p>
          </div>
        </div>
        
        <!-- Mobile View - Carousel -->
        <div class="sm:hidden relative">
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${ministrySlideIndex * 100}%)` }"
            >
              <!-- Ministry 1 -->
              <div class="w-full flex-shrink-0 px-4">
                <div class="bg-green-50 rounded-lg p-6">
                  <div class="flex flex-col items-center mb-4">
                    <div class="bg-green-600 text-white w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2 text-green-800">Children's Ministry</h3>
                  </div>
                  <p class="text-gray-600 text-center">Nurturing faith in our youngest members through age-appropriate teaching and activities.</p>
                </div>
              </div>
              
              <!-- Ministry 2 -->
              <div class="w-full flex-shrink-0 px-4">
                <div class="bg-green-50 rounded-lg p-6">
                  <div class="flex flex-col items-center mb-4">
                    <div class="bg-green-600 text-white w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2 text-green-800">Youth Ministry</h3>
                  </div>
                  <p class="text-gray-600 text-center">Helping teens grow in their faith and navigate challenges of adolescence.</p>
                </div>
              </div>
              
              <!-- Ministry 3 -->
              <div class="w-full flex-shrink-0 px-4">
                <div class="bg-green-50 rounded-lg p-6">
                  <div class="flex flex-col items-center mb-4">
                    <div class="bg-green-600 text-white w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2 text-green-800">Women's Ministry</h3>
                  </div>
                  <p class="text-gray-600 text-center">Building community and spiritual growth among women of all ages.</p>
                </div>
              </div>
              
              <!-- Ministry 4 -->
              <div class="w-full flex-shrink-0 px-4">
                <div class="bg-green-50 rounded-lg p-6">
                  <div class="flex flex-col items-center mb-4">
                    <div class="bg-green-600 text-white w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 class="text-xl font-semibold mb-2 text-green-800">Men's Ministry</h3>
                  </div>
                  <p class="text-gray-600 text-center">Equipping men to be spiritual leaders in their homes, church, and community.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Carousel Controls -->
          <div class="flex justify-center mt-6 space-x-2">
            <button 
              v-for="(_, index) in 4" 
              :key="index"
              @click="ministrySlideIndex = index"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300',
                ministrySlideIndex === index ? 'bg-green-600' : 'bg-green-300'
              ]"
              :aria-label="`Go to ministry ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
        <p class="text-base sm:text-lg md:text-xl mb-8 text-green-100">Subscribe to our newsletter for updates, events, and inspirational content</p>
        
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-green-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div>
            <h3 class="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-green-300">Vine & Branches</h3>
            <p class="text-green-100 mb-4">Baptist Church</p>
            <p class="text-green-200 text-sm sm:text-base">"The steadfast love of LORD never ceases; His mercies never come to an end; they are new every morning; great is your faithfulness!." - Lamentations 3:22-23</p>
          </div>
          
          <div>
            <h4 class="text-base sm:text-lg font-semibold mb-4 text-green-300">Quick Links</h4>
            <ul class="space-y-2">
              <li><a href="#about" class="text-green-100 hover:text-white transition-colors text-sm sm:text-base">About Us</a></li>
              <li><a href="#branches" class="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Our Branches</a></li>
              <li><a href="#ministries" class="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Ministries</a></li>
              <li><a href="#gallery" class="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Gallery</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-base sm:text-lg font-semibold mb-4 text-green-300">Resources</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Sermons</a></li>
              <li><a href="#" class="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Blog</a></li>
              <li><a href="#" class="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Prayer Requests</a></li>
              <li><a href="#" class="text-green-100 hover:text-white transition-colors text-sm sm:text-base">Give Online</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-base sm:text-lg font-semibold mb-4 text-green-300">Connect With Us</h4>
            <div class="flex space-x-3 sm:space-x-4 mb-6">
              <a href="#" class="bg-green-700 hover:bg-green-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="bg-green-700 hover:bg-green-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="bg-green-700 hover:bg-green-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                </svg>
              </a>
              <a href="#" class="bg-green-700 hover:bg-green-600 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
            <p class="text-green-100 text-sm sm:text-base">Multiple Locations</p>
            <p class="text-green-100 text-sm sm:text-base">Metro Manila, Tanza, Lingayen</p>
            <p class="text-green-100 text-sm sm:text-base">contact@vineandbranches.org</p>
          </div>
        </div>
        
        <div class="border-t border-green-800 pt-6 sm:pt-8 text-center text-green-200">
          <p class="text-sm sm:text-base">&copy; {{ new Date().getFullYear() }} Vine & Branches Baptist Church. All rights reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Go to Top Button -->
    <button 
      v-if="showGoToTop" 
      @click="scrollToTop" 
      class="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      :class="{ 'animate-pulse': showGoToTop }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>

    <!-- Image Modal -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isImageModalOpen" 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-4"
        @click.self="closeImageModal"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <!-- Close Button -->
        <button 
          @click="closeImageModal"
          class="close-button absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Previous Button -->
        <button 
          @click="navigateImage(-1)"
          class="modal-nav-button absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-200 z-10 p-2 sm:p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 hover:scale-110"
          :class="{ 'opacity-50 cursor-not-allowed': filteredGalleryImages.length <= 1 }"
          :disabled="filteredGalleryImages.length <= 1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Next Button -->
        <button 
          @click="navigateImage(1)"
          class="modal-nav-button absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-200 z-10 p-2 sm:p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 hover:scale-110"
          :class="{ 'opacity-50 cursor-not-allowed': filteredGalleryImages.length <= 1 }"
          :disabled="filteredGalleryImages.length <= 1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div class="relative max-w-7xl mx-auto w-full h-full flex items-center justify-center">
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 transform scale-95"
            enter-to-class="opacity-100 transform scale-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-95"
            mode="out-in"
          >
            <div 
              v-if="selectedImage.src" 
              class="relative"
              :key="currentImageIndex"
              @click="closeImageModal"
            >
              <img 
                :src="selectedImage.src" 
                :alt="selectedImage.alt" 
                class="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-105"
              >
              
              <!-- Image Info Overlay (completely transparent when clicking) -->
              <div 
                v-if="isImageModalOpen"
                class="absolute inset-0 bg-transparent"
                @click="closeImageModal"
              ></div>
            </div>
          </transition>
        </div>

        <!-- Image Counter -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm">
          {{ currentImageIndex + 1 }} / {{ filteredGalleryImages.length }}
        </div>

        <!-- Thumbnail Strip -->
        <div class="thumbnail-strip absolute bottom-16 sm:bottom-20 left-0 right-0 overflow-x-auto px-4">
          <div class="flex space-x-2 justify-center pb-2">
            <div 
              v-for="(image, index) in filteredGalleryImages.slice(Math.max(0, currentImageIndex - 3), currentImageIndex + 4)" 
              :key="index"
              @click="goToImage(Math.max(0, currentImageIndex - 3) + index)"
              class="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border-2"
              :class="{ 
                'border-white scale-110': Math.max(0, currentImageIndex - 3) + index === currentImageIndex,
                'border-transparent opacity-60 hover:opacity-100': Math.max(0, currentImageIndex - 3) + index !== currentImageIndex
              }"
            >
              <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Navigation Indicator -->
    <div v-if="isNavigating" class="fixed top-0 left-0 w-full h-1 bg-green-600 z-50 transition-all duration-1000" :style="{ width: `${navigationProgress}%` }"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

// Appbar state
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

// Loading state
const isLoading = ref(true);
const isLoadingMore = ref(false);

// Navigation state
const isNavigating = ref(false);
const navigationProgress = ref(0);

// Menu items
const menuItems = [
  { title: 'Home', href: '#home' },
  { title: 'About', href: '#about' },
  { title: 'Branches', href: '#branches' },
  { title: 'Services', href: '#services' },
  { title: 'Gallery', href: '#gallery' },
  { title: 'Ministries', href: '#ministries' },
  { title: 'Contact', href: '#contact' }
];

// Branch data
const activeBranch = ref('tanza');
const activeGalleryBranch = ref('tanza');

const branches = ref([
  {
    id: 'manila',
    name: 'Manila Branch',
    address: '2332 Granate, San Andres Bukid, Manila, Metro Manila',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.509560281616!2d120.98321931484556!3d14.599512489777773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90b8e0b5b5b%3A0x7a7b6b6b7a7b6b6b!2sManila%2C%20Metro%20Manila%2C%20Philippines!5e0!3m2!1sen!2s!4v1628767264245!5m2!1sen!2s',
    directions: 'https://maps.app.goo.gl/kZwP1W4xPiDV6NENA',
    serviceTimes: 'Wednesday: 7:00 PM - 8:30 PM,  Sunday School: 08:00 AM - 09:00 AM, Sunday: 9:00 AM - 11:30 AM',
    pastor: {
      name: ' - ',
      title: 'Senior Pastor',
      image: 'https://picsum.photos/seed/pastor-manila/300/300.jpg',
      bio: '-'
    },
    contact: {
      phone: '(02) 123-4567',
      email: 'manila@vineandbranches.org'
    }
  },
  {
    id: 'tanza',
    name: 'Tanza Branch',
    address: '222 Antero Soriano Hwy, Tanza, Cavite',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.8890883820385!2d120.86092531484097!3d14.39771188993426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8e1b0b5b5b%3A0x7a7b6b6b7a7b6b6b!2sTanza%2C%20Cavite%2C%20Philippines!5e0!3m2!1sen!2s!4v1628767264245!5m2!1sen!2s',
    directions: 'https://www.google.com/maps/dir/?api=1&destination=Tanza%2C%20Cavite%2C%20Philippines',
    serviceTimes: 'Wednesday: 7:00 PM - 8:30 PM,  Sunday School: 08:00 AM - 09:00 AM, Sunday: 9:00 AM - 11:30 AM',
    pastor: {
      name: ' - ',
      title: 'Branch Pastor',
      image: 'https://picsum.photos/seed/pastor-tanza/300/300.jpg',
      bio: ' - '
    },
    contact: {
      phone: '(046) 123-4567',
      email: 'tanza@vineandbranches.org'
    }
  },
  {
    id: 'lingayen',
    name: 'Lingayen Branch',
    address: 'Libsong East, 012 Tomelden Street, Libsong Rd, East, Lingayen, 2401 Pangasinan',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.509560281616!2d120.98321931484556!3d14.599512489777773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c90b8e0b5b5b%3A0x7a7b6b6b7a7b6b6b!2sLingayen%2C%20Pangasinan%2C%20Philippines!5e0!3m2!1sen!2s!4v1628767264245!5m2!1sen!2s',
    directions: 'https://maps.app.goo.gl/PcknS3o221VyQ8Yz5',
    serviceTimes: 'Wednesday: 7:00 PM - 8:30 PM,  Sunday School: 08:00 AM - 09:00 AM, Sunday: 9:00 AM - 11:30 AM',
    pastor: {
      name: ' - ',
      title: 'Branch Pastor',
      image: 'https://picsum.photos/seed/pastor-lingayen/300/300.jpg',
      bio: ' - '
    },
    contact: {
      phone: '(075) 123-4567',
      email: 'lingayen@vineandbranches.org'
    }
  }
]);

const currentBranch = computed(() => {
  return branches.value.find(branch => branch.id === activeBranch.value);
});

// Gallery data
const galleryCategories = ['All', 'Worship', 'Events', 'Community', 'Outreach'];
const activeGalleryCategory = ref('All');

// Tanza specific categories
const tanzaCategories = [
  { id: 'all', name: 'All' },
  { id: 'anniversary', name: '18th Anniversary' },
  { id: 'gift-giving', name: '9th Gift Giving' },
  { id: 'medical-mission', name: 'Medical Mission' },
  { id: 'summer-camp', name: 'Summer Camp' },
  { id: 'youth-fellowship', name: 'Youth Fellowship' },
  { id: 'sunday-school', name: 'Sunday School' }
];
const activeTanzaCategory = ref('all');

// Gallery pagination
const imagesPerPage = 8;
const currentPage = ref(0);

// Store all gallery images
const galleryImages = ref([]);

// Load images for Tanza branch
const loadTanzaImages = () => {
  const tanzaImages = [];
  
  // Try to load images from assets folder using import.meta.glob
  try {
    // This will work in Vite-based Vue projects
    const imageModules = import.meta.glob('@/assets/gallery/tanza/**/*.jpg', { eager: true });
    
    // Process each image and categorize them
    Object.entries(imageModules).forEach(([path, module]) => {
      // Extract category from path
      const pathParts = path.split('/');
      const category = pathParts[pathParts.length - 2]; // Get the folder name (category)
      const filename = pathParts[pathParts.length - 1]; // Get the filename
      
      // Create a title from the filename (remove extension and replace dashes/hyphens with spaces)
      const title = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      
      // Map folder names to category names
      let categoryName = category;
      if (category === 'anniversary') categoryName = '18th Anniversary';
      else if (category === 'gift-giving') categoryName = '18th Gift Giving';
      else if (category === 'medical-mission') categoryName = 'Medical Mission';
      else if (category === 'summer-camp') categoryName = 'Summer Camp';
      else if (category === 'youth-fellowship') categoryName = 'Youth Fellowship';
      else if (category === 'sunday-school') categoryName = 'Sunday School';

      
      tanzaImages.push({
        src: module.default,
        alt: title,
        title: title,
        category: categoryName,
        branch: 'Tanza Branch',
        categoryId: category
      });
    });
  } catch (error) {
    console.error('Error loading Tanza images:', error);
    
    // Fallback to placeholder images if dynamic loading fails
    tanzaImages.push(
      { 
        src: 'https://picsum.photos/seed/tanza-anniversary1/400/300.jpg', 
        alt: '18th Anniversary', 
        title: '18th Anniversary Celebration', 
        category: '18th Anniversary', 
        branch: 'Tanza Branch',
        categoryId: 'anniversary'
      },
      { 
        src: 'https://picsum.photos/seed/tanza-anniversary2/400/300.jpg', 
        alt: '18th Anniversary', 
        title: 'Anniversary Worship Service', 
        category: '18th Anniversary', 
        branch: 'Tanza Branch',
        categoryId: 'anniversary'
      },
      { 
        src: 'https://picsum.photos/seed/tanza-gift1/400/300.jpg', 
        alt: '18th Gift Giving', 
        title: 'Gift Giving Ceremony', 
        category: '18th Gift Giving', 
        branch: 'Tanza Branch',
        categoryId: 'gift-giving'
      },
      { 
        src: 'https://picsum.photos/seed/tanza-medical1/400/300.jpg', 
        alt: 'Medical Mission', 
        title: 'Medical Mission Outreach', 
        category: 'Medical Mission', 
        branch: 'Tanza Branch',
        categoryId: 'medical-mission'
      },
      { 
        src: 'https://picsum.photos/seed/tanza-summer1/400/300.jpg', 
        alt: 'Summer Camp', 
        title: 'Summer Camp Activities', 
        category: 'Summer Camp', 
        branch: 'Tanza Branch',
        categoryId: 'summer-camp'
      },
      { 
        src: 'https://picsum.photos/seed/tanza-youth1/400/300.jpg', 
        alt: 'Youth Fellowship', 
        title: 'Youth Fellowship Gathering', 
        category: 'Youth Fellowship', 
        branch: 'Tanza Branch',
        categoryId: 'youth-fellowship'
      },
        { 
        src: 'https://picsum.photos/seed/tanza-medical1/400/300.jpg', 
        alt: 'Sunday School', 
        title: 'Sunday School Activities', 
        category: 'Sunday School', 
        branch: 'Tanza Branch',
        categoryId: 'sunday-school'
      },
    );
  }
  
  return tanzaImages;
};

// Load images for other branches
const loadOtherBranchImages = () => {
  const otherImages = [];
  
  try {
    // Try to load Manila branch images
    const manilaModules = import.meta.glob('@/assets/gallery/manila/**/*.jpg', { eager: true });
    Object.entries(manilaModules).forEach(([path, module]) => {
      const pathParts = path.split('/');
      const category = pathParts[pathParts.length - 2];
      const filename = pathParts[pathParts.length - 1];
      const title = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      
      let categoryName = category;
      if (category === 'worship') categoryName = 'Worship';
      else if (category === 'events') categoryName = 'Events';
      else if (category === 'outreach') categoryName = 'Outreach';
      
      otherImages.push({
        src: module.default,
        alt: title,
        title: title,
        category: categoryName,
        branch: 'Manila Branch'
      });
    });
    
    // Try to load Lingayen branch images
    const lingayenModules = import.meta.glob('@/assets/gallery/lingayen/**/*.jpg', { eager: true });
    Object.entries(lingayenModules).forEach(([path, module]) => {
      const pathParts = path.split('/');
      const category = pathParts[pathParts.length - 2];
      const filename = pathParts[pathParts.length - 1];
      const title = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      
      let categoryName = category;
      if (category === 'worship') categoryName = 'Worship';
      else if (category === 'community') categoryName = 'Community';
      else if (category === 'outreach') categoryName = 'Outreach';
      
      otherImages.push({
        src: module.default,
        alt: title,
        title: title,
        category: categoryName,
        branch: 'Lingayen Branch'
      });
    });
  } catch (error) {
    console.error('Error loading other branch images:', error);
    
    // Fallback to placeholder images
    otherImages.push(
      // Manila Branch Images
      { src: 'https://picsum.photos/seed/manila-worship1/400/300.jpg', alt: 'Worship Service', title: 'Sunday Worship', category: 'Worship', branch: 'Manila Branch' },
      { src: 'https://picsum.photos/seed/manila-baptism/400/300.jpg', alt: 'Baptism', title: 'Baptism Ceremony', category: 'Events', branch: 'Manila Branch' },
      { src: 'https://picsum.photos/seed/manila-outreach/400/300.jpg', alt: 'Outreach', title: 'Community Outreach', category: 'Outreach', branch: 'Manila Branch' },
      
      // Lingayen Branch Images
      { src: 'https://picsum.photos/seed/lingayen-worship1/400/300.jpg', alt: 'Worship Service', title: 'Sunday Worship', category: 'Worship', branch: 'Lingayen Branch' },
      { src: 'https://picsum.photos/seed/lingayen-youth/400/300.jpg', alt: 'Youth Camp', title: 'Youth Camp', category: 'Community', branch: 'Lingayen Branch' },
      { src: 'https://picsum.photos/seed/lingayen-food/400/300.jpg', alt: 'Food Outreach', title: 'Food Outreach Program', category: 'Outreach', branch: 'Lingayen Branch' }
    );
  }
  
  return otherImages;
};

// Load images when component is mounted
onMounted(() => {
  // Simulate initial loading
  setTimeout(() => {
    // Load Tanza images
    const tanzaImages = loadTanzaImages();
    
    // Load images for other branches
    const otherBranchImages = loadOtherBranchImages();
    
    // Combine all images
    galleryImages.value = [...tanzaImages, ...otherBranchImages];
    
    // Hide the loader
    isLoading.value = false;
  }, 1500);
});

// Filter gallery images based on selected branch and category
const filteredGalleryImages = computed(() => {
  let filtered = galleryImages.value;
  
  // Filter by branch
  if (activeGalleryBranch.value === 'tanza') {
    filtered = filtered.filter(image => image.branch === 'Tanza Branch');
    
    // Filter by category for Tanza
    if (activeTanzaCategory.value !== 'all') {
      filtered = filtered.filter(image => image.categoryId === activeTanzaCategory.value);
    }
  } else {
    // Filter by branch for other branches
    const branchName = branches.value.find(b => b.id === activeGalleryBranch.value)?.name;
    filtered = filtered.filter(image => image.branch === branchName);
    
    // Filter by category for other branches
    if (activeGalleryCategory.value !== 'All') {
      filtered = filtered.filter(image => image.category === activeGalleryCategory.value);
    }
  }
  
  return filtered;
});

// Computed properties for gallery pagination
const displayedGalleryImages = computed(() => {
  const start = 0;
  const end = (currentPage.value + 1) * imagesPerPage;
  return filteredGalleryImages.value.slice(start, end);
});

const hasMoreImages = computed(() => {
  return displayedGalleryImages.value.length < filteredGalleryImages.value.length;
});

const remainingImagesCount = computed(() => {
  return filteredGalleryImages.value.length - displayedGalleryImages.value.length;
});

// Function to load more images
const loadMoreImages = () => {
  if (isLoadingMore.value) return;
  
  isLoadingMore.value = true;
  
  // Simulate loading delay
  setTimeout(() => {
    currentPage.value++;
    isLoadingMore.value = false;
  }, 1000);
}

// Reset pagination when filters change
const resetPagination = () => {
  currentPage.value = 0;
};

// Watch for changes in filters and reset pagination
watch([activeGalleryBranch, activeTanzaCategory, activeGalleryCategory], () => {
  resetPagination();
});

// Image modal
const isImageModalOpen = ref(false);
const selectedImage = ref({});
const currentImageIndex = ref(0);
const isImageChanging = ref(false);

// Touch gesture variables
const touchStartX = ref(0);
const touchEndX = ref(0);
const minSwipeDistance = 50;

// Image modal functions
const openImageModal = (image, index) => {
  selectedImage.value = image;
  currentImageIndex.value = index;
  isImageModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeImageModal = () => {
  isImageModalOpen.value = false;
  document.body.style.overflow = 'auto';
};

const navigateImage = (direction) => {
  if (filteredGalleryImages.value.length <= 1 || isImageChanging.value) return;
  
  isImageChanging.value = true;
  
  // Add a small delay to ensure the previous transition completes
  setTimeout(() => {
    currentImageIndex.value = (currentImageIndex.value + direction + filteredGalleryImages.value.length) % filteredGalleryImages.value.length;
    selectedImage.value = filteredGalleryImages.value[currentImageIndex.value];
    
    // Reset the changing flag after the transition completes
    setTimeout(() => {
      isImageChanging.value = false;
    }, 300);
  }, 50);
};

const goToImage = (index) => {
  if (index === currentImageIndex.value || isImageChanging.value) return;
  
  isImageChanging.value = true;
  
  // Add a small delay to ensure the previous transition completes
  setTimeout(() => {
    currentImageIndex.value = index;
    selectedImage.value = filteredGalleryImages.value[currentImageIndex.value];
    
    // Reset the changing flag after the transition completes
    setTimeout(() => {
      isImageChanging.value = false;
    }, 300);
  }, 50);
};

// Touch gesture handlers
const handleTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX;
};

const handleTouchMove = (e) => {
  touchEndX.value = e.changedTouches[0].screenX;
};

const handleTouchEnd = () => {
  if (!touchStartX.value || !touchEndX.value) return;
  
  const distance = touchStartX.value - touchEndX.value;
  
  if (Math.abs(distance) > minSwipeDistance) {
    if (distance > 0) {
      // Swipe left - next image
      navigateImage(1);
    } else {
      // Swipe right - previous image
      navigateImage(-1);
    }
  }
  
  // Reset values
  touchStartX.value = 0;
  touchEndX.value = 0;
};

// Go to top button
const showGoToTop = ref(false);

const handleScroll = () => {
  showGoToTop.value = window.scrollY > 300;
  isScrolled.value = window.scrollY > 50;
};

const scrollToTop = () => {
  // Add a smooth animation to scroll to top
  const startPosition = window.pageYOffset;
  const startTime = performance.now();
  const duration = 800; // Animation duration in ms
  
  const easeInOutQuad = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };
  
  const animateScroll = (currentTime) => {
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, -startPosition, duration);
    
    window.scrollTo(0, run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  
  requestAnimationFrame(animateScroll);
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Carousel controls for mobile
const serviceSlideIndex = ref(0);
const ministrySlideIndex = ref(0);

// Dropdown state
const branchDropdownOpen = ref(false);
const categoryDropdownOpen = ref(false);
const tanzaCategoryDropdownOpen = ref(false);

// Add these functions to handle dropdown toggles
const toggleBranchDropdown = () => {
  branchDropdownOpen.value = !branchDropdownOpen.value;
  // Close other dropdowns when opening this one
  categoryDropdownOpen.value = false;
  tanzaCategoryDropdownOpen.value = false;
};

const toggleCategoryDropdown = () => {
  categoryDropdownOpen.value = !categoryDropdownOpen.value;
  // Close other dropdowns when opening this one
  branchDropdownOpen.value = false;
  tanzaCategoryDropdownOpen.value = false;
};

const toggleTanzaCategoryDropdown = () => {
  tanzaCategoryDropdownOpen.value = !tanzaCategoryDropdownOpen.value;
  // Close other dropdowns when opening this one
  branchDropdownOpen.value = false;
  categoryDropdownOpen.value = false;
};

// Add these functions to handle selection
const selectBranch = (branchId) => {
  activeGalleryBranch.value = branchId;
  branchDropdownOpen.value = false;
  resetPagination();
};

const selectGalleryCategory = (category) => {
  activeGalleryCategory.value = category;
  categoryDropdownOpen.value = false;
  resetPagination();
};

const selectTanzaCategory = (categoryId) => {
  activeTanzaCategory.value = categoryId;
  tanzaCategoryDropdownOpen.value = false;
  resetPagination();
};

// Close dropdowns when clicking outside
const closeAllDropdowns = (event) => {
  const target = event.target;
  if (!target.closest('.relative')) {
    branchDropdownOpen.value = false;
    categoryDropdownOpen.value = false;
    tanzaCategoryDropdownOpen.value = false;
  }
};

// Enhanced smooth scroll function
const smoothScrollTo = (elementId, duration = 1000) => {
  // Show navigation indicator
  isNavigating.value = true;
  navigationProgress.value = 0;
  
  // Animate progress bar
  const progressInterval = setInterval(() => {
    navigationProgress.value += 10;
    if (navigationProgress.value >= 100) {
      clearInterval(progressInterval);
    }
  }, duration / 10);
  
  // Find the target element
  const target = document.querySelector(elementId);
  if (!target) return;
  
  // Calculate the target position with offset for the header
  const headerHeight = document.querySelector('header').offsetHeight;
  const targetPosition = target.offsetTop - headerHeight - 20; // 20px extra padding
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  // Easing function for smooth animation
  const easeInOutCubic = (t, b, c, d) => {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
  };
  
  // Animation function
  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    
    window.scrollTo(0, run);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      // Ensure we land exactly at the target position
      window.scrollTo(0, targetPosition);
      
      // Hide navigation indicator after a short delay
      setTimeout(() => {
        isNavigating.value = false;
        navigationProgress.value = 0;
      }, 300);
    }
  };
  
  // Start the animation
  requestAnimationFrame(animation);
};

// Handle navigation clicks
const handleNavClick = (event) => {
  event.preventDefault();
  const href = event.currentTarget.getAttribute('href');
  if (href && href.startsWith('#')) {
    smoothScrollTo(href);
  }
};

// Handle mobile navigation clicks
const handleMobileNavClick = (event) => {
  event.preventDefault();
  const href = event.currentTarget.getAttribute('href');
  if (href && href.startsWith('#')) {
    smoothScrollTo(href);
    closeMobileMenu();
  }
};

// Auto-advance carousels on mobile
const startAutoSlide = () => {
  // Only auto-advance on mobile
  if (window.innerWidth < 768) {
    setInterval(() => {
      serviceSlideIndex.value = (serviceSlideIndex.value + 1) % 3;
      ministrySlideIndex.value = (ministrySlideIndex.value + 1) % 4;
    }, 5000);
  }
};

onMounted(() => {
  // Handle scroll for appbar and go to top button
  window.addEventListener('scroll', handleScroll);
  
  // Add keyboard navigation for image modal
  const handleKeyDown = (e) => {
    if (!isImageModalOpen.value) return;
    
    if (e.key === 'ArrowLeft') {
      navigateImage(-1);
    } else if (e.key === 'ArrowRight') {
      navigateImage(1);
    } else if (e.key === 'Escape') {
      closeImageModal();
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  
  // Add click outside listener for dropdowns
  document.addEventListener('click', closeAllDropdowns);
  
  // Add touch support for mobile
  document.addEventListener('touchstart', closeAllDropdowns);
  
  // Start auto-advance for mobile carousels
  startAutoSlide();
  
  // Clean up event listeners when component is unmounted
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('click', closeAllDropdowns);
    document.removeEventListener('touchstart', closeAllDropdowns);
    document.body.style.overflow = 'auto';
  });
});
</script>

<style scoped>
/* Appbar styles */
header {
  background-color: transparent;
  transition: all 0.3s ease;
}

header.scrolled {
  background-color: rgba(65, 67, 67, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Navigation link styles */
.nav-link {
  position: relative;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #86efac;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Custom animations */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-down {
  animation: fade-in-down 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}

/* Initial state for animations */
.animate-fade-in-down,
.animate-fade-in-up,
.animate-fade-in {
  opacity: 0;
}

/* Gallery container */
.gallery-container {
  max-height: 600px;
  overflow-y: auto;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* Custom scrollbar for webkit browsers */
.gallery-container::-webkit-scrollbar {
  width: 8px;
}

.gallery-container::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 4px;
}

.gallery-container::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 4px;
}

.gallery-container::-webkit-scrollbar-thumb:hover {
  background: #059669;
}

/* Touch-friendly carousel controls */
@media (max-width: 768px) {
  .carousel-dot {
    width: 12px;
    height: 12px;
  }
}

/* Mobile-specific improvements */
@media (max-width: 768px) {
  .dropdown-trigger {
    min-height: 52px;
    font-size: 16px;
    padding: 14px 16px;
  }
  
  .dropdown-menu {
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.98);
  }
  
  .dropdown-item {
    min-height: 48px;
    display: flex;
    align-items: center;
  }
}

/* Smooth transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Active state indicators */
.dropdown-item-active {
  background: linear-gradient(90deg, #dcfce7 0%, #bbf7d0 100%);
  border-left: 4px solid #16a34a;
}

/* Image Modal Styles */
.image-modal-enter-active,
.image-modal-leave-active {
  transition: opacity 0.3s ease;
}

.image-modal-enter-from,
.image-modal-leave-to {
  opacity: 0;
}

.image-transition-enter-active {
  transition: all 0.3s ease-out;
}

.image-transition-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.image-transition-enter-to {
  opacity: 1;
  transform: scale(1);
}

.image-transition-leave-active {
  transition: all 0.2s ease-in;
}

.image-transition-leave-from {
  opacity: 1;
  transform: scale(1);
}

.image-transition-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Thumbnail strip scrollbar */
.thumbnail-strip::-webkit-scrollbar {
  height: 4px;
}

.thumbnail-strip::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.thumbnail-strip::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.thumbnail-strip::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .modal-nav-button {
    padding: 8px;
  }
   
  .modal-nav-button svg {
    width: 24px;
    height: 24px;
  }
  
  .close-button {
    padding: 8px;
  }
  
  .close-button svg {
    width: 24px;
    height: 24px;
  }
}

/* Tablet-specific styles */
@media (min-width: 768px) and (max-width: 1023px) {
  .gallery-container {
    max-height: 500px;
  }
  
  .modal-nav-button {
    padding: 10px;
  }
   
  .modal-nav-button svg {
    width: 28px;
    height: 28px;
  }
  
  .close-button {
    padding: 10px;
  }
  
  .close-button svg {
    width: 28px;
    height: 28px;
  }
}

/* Large desktop styles */
@media (min-width: 1440px) {
  .max-w-6xl {
    max-width: 1400px;
  }
}

/* Extra large desktop styles */
@media (min-width: 1920px) {
  .max-w-6xl {
    max-width: 1600px;
  }
  
  h1 {
    font-size: 4rem;
  }
  
  h2 {
    font-size: 3rem;
  }
  
  h3 {
    font-size: 2rem;
  }
}

/* Loader Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Smooth scrolling for all elements */
html {
  scroll-behavior: smooth;
}

/* Navigation indicator animation */
.nav-indicator {
  transition: width 0.1s linear;
}
</style>