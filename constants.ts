/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Service, PortfolioProject, Testimonial, Product, JournalArticle, EstimateSettings } from './types';

export const BRAND_NAME = 'Josh Jones Gardening';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Core Lawn & Garden Care',
    description: 'Meticulous seasonal maintenance to keep your outdoor spaces pristine and healthy year-round.',
    imageUrl: 'https://www.pacificwestcedars.com/uploads/blog_post/large/WhenIstheIdealTimetoTrimCedarHedges.jpg',
    features: ['Precision Mowing & Edging', 'Seasonal Spring & Fall Cleanups', 'Shrub Pruning & Bed Maintenance'],
    ratePerSqFt: 10
  },
  {
    id: 's2',
    name: 'Landscaping & Design',
    description: 'Bespoke outdoor living solutions blending artistic vision with functional expertise.',
    imageUrl: 'https://www.drakes7dees.com/wp-content/uploads/2024/05/291-Dernedde-7-25-19.jpg',
    features: ['Custom Landscape Design & Consultation', 'Decorative Stone & Gravel Installation', 'Architectural Lighting & Water Features'],
    ratePerSqFt: 15
  },
  {
    id: 's3',
    name: 'Planting & Horticulture',
    description: 'Expertly curated botanical installations tailored to your property’s unique environment.',
    imageUrl: 'https://images.finegardening.com/app/uploads/2021/12/16081235/oliver-garden-1.jpg',
    features: ['Seasonal Flower & Container Design', 'Tree, Shrub & Hedge Installation', 'Premium Sod & Lawn Establishment'],
    ratePerSqFt: 18
  },
  {
    id: 's4',
    name: 'Specialty Estates & Drainage',
    description: 'Technical solutions for property longevity, from water management to organic health.',
    imageUrl: 'https://img1.wsimg.com/isteam/stock/7835/:/',
    features: ['Smart Irrigation & Drainage Solutions', 'Organic Pest & Disease Management', 'Snow Removal & Winter Preparation'],
    ratePerSqFt: 35
  },
  {
    id: 's5',
    name: 'Tailored Maintenance Programs',
    description: 'Comprehensive care packages designed to fit the rhythm of your lifestyle.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000',
    features: ['Weekly & Bi-Weekly Estate Care', 'Priority Seasonal Service Packages', 'Customized Property Management Plans'],
    ratePerSqFt: 15
  },
  {
    id: 's6',
    name: 'Hardscape & Masonry',
    description: 'Structural elegance using natural stone, architectural concrete, and premium timber.',
    imageUrl: 'https://www.mutualmaterials.com/wp-content/uploads/2023/09/mm-concrete-paver-driveway-bordered-by-retaining-wall.jpg',
    features: ['Flagstone Patios', 'Dry-Stack Stone Walls', 'Modern Timber Decking'],
    ratePerSqFt: 35
  }
];

export const INITIAL_ESTIMATE_SETTINGS: EstimateSettings = {
  minBuffer: 0.9,
  maxBuffer: 1.15,
  terrains: [
    { id: 'level', label: 'Level Lot', multiplier: 1 },
    { id: 'sloped', label: 'Terraced/Sloped', multiplier: 1.35 },
    { id: 'complex', label: 'Rugged/Mountainous', multiplier: 1.6 }
  ],
  conditions: [
    { id: 'cleared', label: 'Cleared / Established', multiplier: 1 },
    { id: 'overgrown', label: 'Overgrown / Needs Clearing', multiplier: 1.25 },
    { id: 'raw', label: 'Raw Unbroken Ground', multiplier: 1.5 }
  ],
  atmospheres: [
    { id: 'minimal', label: 'Minimalist / Modern', multiplier: 1 },
    { id: 'lush', label: 'Lush / English Country', multiplier: 1.3 },
    { id: 'architectural', label: 'Architectural / Zen', multiplier: 1.5 }
  ]
};

export const INITIAL_AI_INSTRUCTIONS = `You are the Lead Landscape Consultant for "Josh Jones Gardening", a premium, nature-inspired landscaping company in North and West Vancouver, Canada. 
Your tone is expert, grounded, sophisticated, and deeply respectful of West Coast ecology.

Guidelines:
- Keep answers concise (under 3 sentences).
- For image analysis, identify terrain, drainage signs, and existing plant life.
- Provide CAD budget ranges reflecting premium West Vancouver standards.`;

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: 'proj1',
    title: 'Cypress Park Estate',
    location: 'West Vancouver',
    description: 'A multi-tiered restorative landscape featuring native ferns and custom stone waterfalls.',
    image: 'https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800',
      'https://images.unsplash.com/photo-1621886292650-520f76c747d6?q=80&w=800',
      'https://images.unsplash.com/photo-1590012314607-cda9d9b6a919?q=80&w=800'
    ]
  },
  {
    id: 'proj2',
    title: 'The Ravine House',
    location: 'North Vancouver',
    description: 'An architectural garden focused on seamless indoor-outdoor living and nocturnal lighting.',
    image: 'https://images.unsplash.com/photo-1714368749156-69c12361698e?q=80&w=687',
    gallery: [
      'https://images.unsplash.com/photo-1534430480872-3498386e7a56?q=80&w=800',
      'https://images.unsplash.com/photo-1614741300906-8973be36f784?q=80&w=800'
    ]
  },
  {
    id: 'proj3',
    title: 'British Properties Sanctuary',
    location: 'West Vancouver',
    description: 'A minimalist Japanese-inspired sanctuary utilizing basalt and manicured maples.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'proj4',
    title: 'Eagle Harbour Waterfront',
    location: 'West Vancouver',
    description: 'A coastal restoration project optimizing views with wind-resistant native species.',
    image: 'https://www.idesignarch.com/wp-content/uploads/Luxury-Home-with-West-Coast-Modern-Architecture-Vancouver-Canada_6.jpg'
  },
  {
    id: 'proj5',
    title: 'Caulfeild Modernist',
    location: 'West Vancouver',
    description: 'Sharp lines and architectural concrete softened by ornamental grasses and structural boxwood.',
    image: 'https://cdn.prod.website-files.com/65375e6d8e5897ff8e6fe676/6541ea6605d5cec1e10d115c_Howitt-Road-009.jpg'
  },
  {
    id: 'proj6',
    title: 'Altamont Heritage Garden',
    location: 'West Vancouver',
    description: 'Restoration of a historic English-style garden with modern horticultural standards.',
    image: 'https://dyhx7is8pu014.cloudfront.net/www.juliemillerhomes.com/homes/663698/web/2843-bellevue-avenue-altamont-west-vancouver-01.jpg'
  },
  {
    id: 'proj7',
    title: 'Whitby Estates Panorama',
    location: 'West Vancouver',
    description: 'High-elevation terracing with integrated fire features and infinity-edge water elements.',
    image: 'https://dyhx7is8pu014.cloudfront.net/www.petercoppard.com/homes/701522/web/2790-highview-pl-27.jpg'
  },
  {
    id: 'proj8',
    title: 'Deep Cove Retreat',
    location: 'North Vancouver',
    description: 'A moss-heavy woodland sanctuary designed for meditation and environmental connectivity.',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'proj9',
    title: 'Dundarave Courtyard',
    location: 'West Vancouver',
    description: 'An intimate urban courtyard utilizing large-format pavers and espaliered fruit trees.',
    image: 'https://cdn.greenmagazine.com.au/wp-content/uploads/2021/10/27120339/DY-Y3_%C2%A9ANDYMACPHERSON-3-1024x683.jpg'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Eleanor V.',
    location: 'West Vancouver',
    text: "Josh's eye for detail is unparalleled. Our garden has become a living piece of art that evolves beautifully with every season."
  },
  {
    id: 't2',
    author: 'Dr. Michael S.',
    location: 'British Properties',
    text: "Professional, knowledgeable, and respectful of the local ecology. Josh Jones Gardening is the gold standard for North Shore landscaping."
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Artisan Pruning Set',
    price: 125,
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800',
    description: 'Professional grade tools for precision garden stewardship.',
    longDescription: 'Our Artisan Pruning Set is designed for the discerning gardener who values both form and function. Each tool is forged from high-carbon steel and finished with ergonomic walnut handles.',
    features: ['High-Carbon Steel', 'Walnut Handles', 'Bespoke Leather Case']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'j1',
    title: 'Stewardship of the North Shore',
    date: 'February 24, 2025',
    image: 'https://images.squarespace-cdn.com/content/v1/580f0655ff7c50b2d0807473/1624046221690-GEJKV67VUWDYOJJWWMMK/IMG_8429.jpeg',
    excerpt: 'Understanding the unique microclimates of West Vancouver and their impact on landscape design.',
    content: 'The North Shore presents a unique set of challenges and opportunities for the landscape architect. From the heavy rainfall of the winter months to the steep grades of the British Properties, stewardship requires a deep understanding of local ecology...'
  },
  {
    id: 'j2',
    title: 'The Art of Winter Interest',
    date: 'January 15, 2025',
    image: 'https://s3.ca-central-1.amazonaws.com/ehq-production-canada/4193d85ca37e7622f39668b15a4b22fe23a955d3/original/1645740235/348d953e1403ac2f61918dd421895319_IMG_1593.JPG?1645740235',
    excerpt: 'How to design a landscape that remains visually compelling through the Pacific Northwest rain.',
    content: 'Winter on the West Coast isn\'t about dormancy—it\'s about texture. By utilizing the architectural skeletons of deciduous trees and the deep greens of native evergreens, we create gardens that thrive in the mist...'
  },
  {
    id: 'j3',
    title: 'Native Flora & Modern Design',
    date: 'December 10, 2024',
    image: 'https://www.paraspaceinc.com/wp-content/uploads/2020/12/VanDusen-Botanical-Garden_GettyImages-659658864-scaled.jpg',
    excerpt: 'Integrating indigenous plant species into contemporary architectural settings.',
    content: 'Modernism often calls for clean lines, but the North Shore calls for the wild. We explore how to bridge the gap using Sword Ferns, Salal, and Vine Maples in structured, geometric arrangements...'
  },
  {
    id: 'j4',
    title: 'Symphony of Stones',
    date: 'November 12, 2024',
    image: 'https://cdn.prod.website-files.com/63191e9f37cef44d72bb51d4/66a0012b1f2d1392292509f1_Hero_Stone%20Wall-staircases.jpg',
    excerpt: 'A guide to selecting and placing natural boulders for authentic West Coast hardscapes.',
    content: 'Stone is the anchor of the garden. Whether sourcing basalt from local quarries or utilizing glacial erratics found on-site, the placement of stone defines the permanence of a luxury estate...'
  },
  {
    id: 'j5',
    title: 'Lighting the Night Garden',
    date: 'October 28, 2024',
    image: 'https://images.squarespace-cdn.com/content/v1/6448453d7c4ec86461d66cb3/d1c1814f-2703-4a95-86a8-115f3467b00c/06-Kore-Group_Kapadia_Photo_Andrea-Sirois_525.jpg',
    excerpt: 'Technical and aesthetic considerations for high-end exterior illumination.',
    content: 'Exterior lighting should be felt, not seen. We discuss the importance of color temperature, beam spread, and the orchestration of shadows to create a nocturnal sanctuary that extends the home\'s living space...'
  },
  {
    id: 'j6',
    title: 'Pruning for Permanence',
    date: 'September 14, 2024',
    image: 'https://images.squarespace-cdn.com/content/v1/5e93846ebb182a1cadd5ad9e/d51088df-6ea2-4023-ad69-ffc5964671e9/TREE-TRIMMING-vancouver-and-burnaby.jpg',
    excerpt: 'The science behind structural pruning for mature ornamental trees.',
    content: 'A mature Maple or Magnolia is an investment that requires decades of foresight. Our approach to structural pruning ensures that your estate\'s specimens remain healthy and wind-resistant for generations to come...'
  }
];