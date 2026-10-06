/**
 * Choice Beauty Salon — Single Source of Truth (Configuration File)
 * All business details, services, reviews, and hours are managed here.
 * Changes made in this file automatically propagate across the site!
 */

const SALON_CONFIG = {
  // Business Core Details
  name: "Choice Beauty Salon",
  legalName: "Choice Beauty Salon Ahmedabad",
  category: "Beauty Parlour / Hair Salon",
  tagline: "Where Every Visit Feels Like a Treat",
  subTagline: "Ahmedabad's trusted women-owned sanctuary for signature hair treatments, radiant skincare, bridal glam & wellness in Ghatlodiya & KK Nagar.",
  brandMessage: "Try our signature hair treatments, makeup applications, and other services at our hair salon near me in Ahmedabad.",
  
  // Attributes
  isWomenOwned: true,
  womenOwnedBadgeText: "Proudly Women-Owned & Operated",
  
  // Contact & Locations
  phone: "+91 97235 12890",
  phoneRaw: "+919723512890",
  phoneDisplay: "097235 12890",
  whatsappNumber: "919723512890",
  whatsappDefaultMsg: "Hello! I would like to book an appointment / enquire about services at Choice Beauty Salon.",
  
  address: {
    complex: "Marutinandan Complex, 11",
    street: "KK Nagar Rd, near Hocco Entry, Sector 4",
    locality: "Ghatlodiya, Nirnay Nagar",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380061",
    country: "India",
    fullAddress: "Marutinandan Complex, 11, KK Nagar Rd, near Hocco Entry, Sector 4, Ghatlodiya, Nirnay Nagar, Ahmedabad, Gujarat 380061",
    plusCode: "3HC2+VJ Ahmedabad, Gujarat",
    landmarks: "Near Hocco Entry, Sector 4 Ghatlodiya"
  },

  // Online Links
  bookingUrl: "https://r.postserver.simplybook.me",
  googleMapsUrl: "https://maps.app.goo.gl/6WDFSV6VFLX1EU9y9",
  googleReviewsUrl: "https://maps.app.goo.gl/6WDFSV6VFLX1EU9y9",
  
  // Social & Ratings
  rating: {
    score: 4.8,
    totalReviews: 184,
    source: "Google Reviews",
    starsHtml: "★★★★★"
  },

  // Opening Hours
  // NOTE: Opens daily at 10:00 AM. 
  // [PLACEHOLDER]: Closing time and weekly off-days can be updated below without altering any HTML code.
  hours: {
    note: "Opens daily from 10:00 AM onwards",
    defaultOpenTime: "10:00",
    defaultCloseTime: "20:00", // Standard evening closing placeholder (8:00 PM)
    schedule: {
      0: { day: "Sunday", open: "10:00", close: "20:00", isOpen: true, placeholder: true },
      1: { day: "Monday", open: "10:00", close: "20:00", isOpen: true, placeholder: true },
      2: { day: "Tuesday", open: "10:00", close: "20:00", isOpen: true, placeholder: true },
      3: { day: "Wednesday", open: "10:00", close: "20:00", isOpen: true, placeholder: true },
      4: { day: "Thursday", open: "10:00", close: "20:00", isOpen: true, placeholder: true },
      5: { day: "Friday", open: "10:00", close: "20:00", isOpen: true, placeholder: true },
      6: { day: "Saturday", open: "10:00", close: "20:00", isOpen: true, placeholder: true }
    }
  },

  // Services Directory
  // Prices are optional and toggled with showPrice. Do not invent fake prices.
  services: [
    {
      id: "nanoplastia-treatment",
      name: "Signature Nanoplastia Treatment",
      category: "hair",
      badge: "Signature Treatment",
      isFeatured: true,
      image: "images/services/hair-treatments.jpg",
      description: "Revolutionary nano-technology hair therapy that transforms dry, damaged, and frizzy hair into mirror-like, silky, manageable hair with long-lasting nourishment.",
      benefits: ["Eliminates severe frizz", "Deep moisture & mirror shine", "Formaldehyde-free formula", "Results last up to 4-6 months"],
      showPrice: false,
      price: "Enquire for hair length"
    },
    {
      id: "haircuts-styling",
      name: "Precision Haircut & Blowout Styling",
      category: "hair",
      badge: "Client Favourite",
      isFeatured: true,
      image: "images/gallery/precision-cut.jpg",
      description: "Personalised consultation and precision haircuts tailored to your facial symmetry and hair texture, finished with a salon-grade blowout and styling.",
      benefits: ["Tailored face-framing layers", "Split-end revival", "Expert volume blowout", "Custom styling advice"],
      showPrice: false,
      price: ""
    },
    {
      id: "hair-spa-smoothening",
      name: "Luxury Hair Spa & Smoothening",
      category: "hair",
      badge: "Deep Repair",
      isFeatured: false,
      image: "images/services/hair-treatments.jpg",
      description: "Intensive deep-conditioning hair spa treatment paired with professional smoothening rituals to restore softness, scalp wellness, and strength.",
      benefits: ["Scalp stimulation & detox", "Intense hydration bath", "Smoothens coarse texture", "Relaxing head massage"],
      showPrice: false,
      price: ""
    },
    {
      id: "herbal-cleanups-facials",
      name: "Radiance Facials & Skin Cleanups",
      category: "skin",
      badge: "Glow Ritual",
      isFeatured: true,
      image: "images/services/skin-facials.jpg",
      description: "Customised skin rituals addressing dullness, congestion, and pigmentation using premium derm-tested botanical solutions for an instantly luminous complexion.",
      benefits: ["Pore extraction & deep cleanse", "Targeted fruit/herbal exfoliation", "Hydrating sheet & clay masks", "Firming facial reflexology"],
      showPrice: false,
      price: ""
    },
    {
      id: "advanced-skin-care",
      name: "Advanced Skin Care & De-Tan Therapy",
      category: "skin",
      badge: "Even Tone",
      isFeatured: false,
      image: "images/gallery/facial-glow.jpg",
      description: "Specialised de-tan rituals and brightening therapies designed specifically to neutralise Ahmedabad heat, sun damage, and urban pollutants.",
      benefits: ["Gentle sun-tan reversal", "Melanin-calming extracts", "Antioxidant vitamin infusion", "Restores soft natural radiance"],
      showPrice: false,
      price: ""
    },
    {
      id: "hygienic-waxing",
      name: "Hygienic Waxing & Silk Smooth Care",
      category: "waxing",
      badge: "Hygiene First",
      isFeatured: true,
      image: "images/services/waxing-spa.jpg",
      description: "Strict single-use cartridge/strip waxing rituals performed with skin-gentle liposoluble formulations, ensuring minimal discomfort and velvety skin.",
      benefits: ["Single-use sanitised strips", "Minimal redness formula", "Post-wax soothing aloe mist", "Body & facial waxing options"],
      showPrice: false,
      price: ""
    },
    {
      id: "bridal-makeup",
      name: "Bridal Makeup & Trousseau Artistry",
      category: "makeup",
      badge: "Bridal Signature",
      isFeatured: true,
      image: "images/services/bridal-makeup.jpg",
      description: "Exquisite bridal transformations tailored for traditional Gujarati, contemporary, and fusion weddings, including hair styling, draping, and HD makeup.",
      benefits: ["High-definition waterproof finish", "Custom eye & jewellery matching", "Dupatta/Saree expert draping", "Pre-wedding trial consultation"],
      showPrice: false,
      price: ""
    },
    {
      id: "party-glam-makeup",
      name: "Party, Engagement & Festive Makeup",
      category: "makeup",
      badge: "Celebration Glam",
      isFeatured: false,
      image: "images/gallery/bridal-glam.jpg",
      description: "Subtle soft glam or vibrant festive looks crafted to turn heads at sangeet ceremonies, receptions, anniversaries, and family celebrations.",
      benefits: ["Dewy or matte camera-ready base", "Lash enhancement application", "Long-lasting 12hr wear", "Touch-up kit guidance"],
      showPrice: false,
      price: ""
    }
  ],

  // Real Social Proof (Verified Google Reviews)
  testimonials: [
    {
      name: "Anjali S.",
      location: "Ahmedabad",
      rating: 5,
      date: "Regular Client",
      quote: "I visit this salon every month for waxing, cleanup, hair treatments... staff is very kind, professional and welcoming... excellent hygiene.",
      serviceTag: "Waxing, Cleanup & Hair Treatments",
      verified: true
    },
    {
      name: "Bhanu P.",
      location: "Ghatlodiya, Ahmedabad",
      rating: 5,
      date: "Verified Review",
      quote: "Nanoplastia treatment transformed my dry, tangled hair into soft, shiny, manageable hair. Truly remarkable results and wonderful care from the team!",
      serviceTag: "Signature Nanoplastia Treatment",
      verified: true
    },
    {
      name: "Aayushi P.",
      location: "KK Nagar, Ahmedabad",
      rating: 5,
      date: "Verified Review",
      quote: "Incredible haircut... the stylist took the time to understand exactly what I wanted. So polite, attentive, and knowledgeable. Highly recommended!",
      serviceTag: "Precision Haircut & Styling",
      verified: true
    },
    {
      name: "Pooja M.",
      location: "Nirnay Nagar, Ahmedabad",
      rating: 5,
      date: "Local Resident",
      quote: "Extremely clean and hygienic parlour with warm hospitality. The owner and staff give honest beauty advice instead of upselling. My go-to salon!",
      serviceTag: "Facial & Skin Therapy",
      verified: true
    }
  ],

  // Gallery Showcase Items
  gallery: [
    {
      id: 1,
      title: "Nanoplastia Glass Hair Transformation",
      category: "hair",
      subtitle: "Silky, frizz-free mirror finish",
      image: "images/gallery/nanoplastia-results.jpg"
    },
    {
      id: 2,
      title: "Radiant Herbal Facial Glow",
      category: "skin",
      subtitle: "Deep detox, extraction & hydration",
      image: "images/gallery/facial-glow.jpg"
    },
    {
      id: 3,
      title: "Royal Gujarati Bridal Makeup",
      category: "makeup",
      subtitle: "HD airbrush look with traditional jewellery styling",
      image: "images/gallery/bridal-glam.jpg"
    },
    {
      id: 4,
      title: "Boutique Salon Sanctuary Interior",
      category: "interior",
      subtitle: "Pristine hygiene, warm rose gold ambiance",
      image: "images/gallery/salon-ambiance.jpg"
    },
    {
      id: 5,
      title: "Gentle Herbal Waxing & Spa Lounge",
      category: "waxing",
      subtitle: "Sterilised tools & single-use care",
      image: "images/gallery/spa-hygiene.jpg"
    },
    {
      id: 6,
      title: "Precision Layered Haircut & Blowout",
      category: "hair",
      subtitle: "Face-framing volume & bouncy texture",
      image: "images/gallery/precision-cut.jpg"
    }
  ]
};

// Freeze configuration to prevent inadvertent runtime mutations
if (typeof Object.freeze === 'function') {
  Object.freeze(SALON_CONFIG);
}
