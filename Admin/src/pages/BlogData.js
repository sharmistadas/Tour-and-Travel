// Blog Admin Panel - Mock Data & Constants
export const POST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
};

export const MOCK_CATEGORIES = [
  { _id: 'c1', name: 'Travel Tips', slug: 'travel-tips', description: 'Helpful travel advice', postCount: 12 },
  { _id: 'c2', name: 'Destinations', slug: 'destinations', description: 'Popular travel destinations', postCount: 24 },
  { _id: 'c3', name: 'Adventure', slug: 'adventure', description: 'Thrilling adventure stories', postCount: 8 },
  { _id: 'c4', name: 'Food & Culture', slug: 'food-culture', description: 'Culinary experiences', postCount: 15 },
  { _id: 'c5', name: 'Budget Travel', slug: 'budget-travel', description: 'Traveling on a budget', postCount: 9 },
  { _id: 'c6', name: 'Luxury', slug: 'luxury', description: 'Premium travel experiences', postCount: 6 },
];

export const MOCK_AUTHORS = [
  { _id: 'a1', name: 'Sarah Johnson' },
  { _id: 'a2', name: 'Mike Chen' },
  { _id: 'a3', name: 'Emma Wilson' },
];

export const MOCK_POSTS = [
  {
    _id: '1', title: 'Top 10 Hidden Beaches in Southeast Asia',
    slug: 'top-10-hidden-beaches-southeast-asia',
    content_markdown: '# Hidden Beaches\n\nSoutheast Asia is home to some of the most **stunning beaches** in the world.\n\n## 1. Secret Beach, El Nido\n\nTucked away behind a narrow opening in limestone cliffs...\n\n## 2. Koh Lipe, Thailand\n\nCrystal clear waters and pristine white sand...\n\n```\nBest time to visit: November - April\n```\n\n> "The world is a book, and those who do not travel read only one page."',
    excerpt: 'Discover the most stunning hidden beaches across Southeast Asia that most tourists never find.',
    featured_image: { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', alt: 'Tropical beach', caption: 'Hidden beach in El Nido', public_id: 'beach1', width: 600, height: 400, format: 'jpg' },
    author: 'a1', categories: ['c2', 'c3'],
    tags: ['beaches', 'southeast-asia', 'hidden-gems', 'travel'],
    status: POST_STATUS.PUBLISHED, published_at: new Date('2024-12-15'),
    meta_title: 'Top 10 Hidden Beaches in Southeast Asia | Pacific Travel',
    meta_description: 'Explore the most beautiful hidden beaches in Southeast Asia. From secret coves to pristine shores.',
    view_count: 3842, is_featured: true,
    images_in_content: [
      { public_id: 'img1', url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=300', alt: 'Beach sunset', position: 1 },
    ],
    createdAt: new Date('2024-12-10'), updatedAt: new Date('2025-01-05')
  },
  {
    _id: '2', title: 'Essential Hiking Gear for Mountain Adventures',
    slug: 'essential-hiking-gear-mountain-adventures',
    content_markdown: '# Hiking Gear Guide\n\nPreparing for a mountain hike requires the right equipment...\n\n## Footwear\n\nInvest in quality hiking boots with good ankle support.\n\n## Backpack\n\nA 40-60L backpack is ideal for multi-day treks.',
    excerpt: 'A comprehensive guide to essential hiking gear for your next mountain adventure.',
    featured_image: { url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600', alt: 'Mountain hiking', caption: 'Hiking in the Alps', public_id: 'hike1' },
    author: 'a2', categories: ['c3'],
    tags: ['hiking', 'gear', 'mountains', 'adventure'],
    status: POST_STATUS.PUBLISHED, published_at: new Date('2025-01-08'),
    meta_title: 'Essential Hiking Gear Guide | Pacific Travel',
    meta_description: 'Complete guide to hiking gear for mountain adventures.',
    view_count: 2156, is_featured: true,
    images_in_content: [],
    createdAt: new Date('2025-01-05'), updatedAt: new Date('2025-01-08')
  },
  {
    _id: '3', title: 'Budget-Friendly European Road Trip Itinerary',
    slug: 'budget-friendly-european-road-trip',
    content_markdown: '# European Road Trip\n\nExplore Europe without breaking the bank...',
    excerpt: 'Plan an unforgettable European road trip on a budget with our detailed itinerary.',
    featured_image: { url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600', alt: 'Road trip', caption: 'European countryside', public_id: 'road1' },
    author: 'a3', categories: ['c5', 'c2'],
    tags: ['europe', 'road-trip', 'budget', 'itinerary'],
    status: POST_STATUS.DRAFT,
    meta_title: '', meta_description: '',
    view_count: 0, is_featured: false,
    images_in_content: [],
    createdAt: new Date('2025-01-20'), updatedAt: new Date('2025-01-22')
  },
  {
    _id: '4', title: 'Street Food Guide: Bangkok\'s Best Night Markets',
    slug: 'street-food-guide-bangkok-night-markets',
    content_markdown: '# Bangkok Night Markets\n\nBangkok is a street food paradise...',
    excerpt: 'Your ultimate guide to the best street food in Bangkok\'s vibrant night markets.',
    featured_image: { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600', alt: 'Thai street food', caption: 'Bangkok night market', public_id: 'food1' },
    author: 'a1', categories: ['c4', 'c2'],
    tags: ['food', 'bangkok', 'street-food', 'night-markets'],
    status: POST_STATUS.PUBLISHED, published_at: new Date('2025-01-12'),
    meta_title: 'Best Bangkok Night Markets & Street Food Guide',
    meta_description: 'Discover the best street food spots in Bangkok\'s famous night markets.',
    view_count: 5214, is_featured: false,
    images_in_content: [],
    createdAt: new Date('2025-01-10'), updatedAt: new Date('2025-01-12')
  },
  {
    _id: '5', title: 'Luxury Safari Lodges in Kenya',
    slug: 'luxury-safari-lodges-kenya',
    content_markdown: '# Safari Lodges\n\nExperience the wild in ultimate luxury...',
    excerpt: 'Explore the most exclusive safari lodges in Kenya for an unforgettable African adventure.',
    featured_image: { url: 'https://images.unsplash.com/photo-1516426122078-c23e76b4f95b?w=600', alt: 'Safari lodge', caption: 'Luxury safari lodge in Masai Mara', public_id: 'safari1' },
    author: 'a2', categories: ['c6', 'c2'],
    tags: ['safari', 'kenya', 'luxury', 'africa'],
    status: POST_STATUS.PUBLISHED, published_at: new Date('2024-11-20'),
    meta_title: 'Top Luxury Safari Lodges in Kenya',
    meta_description: 'The best luxury safari lodges in Kenya for an unforgettable wildlife experience.',
    view_count: 1890, is_featured: true,
    images_in_content: [],
    createdAt: new Date('2024-11-15'), updatedAt: new Date('2024-11-20')
  },
  {
    _id: '6', title: 'Japan Cherry Blossom Season: Complete Guide',
    slug: 'japan-cherry-blossom-season-guide',
    content_markdown: '# Cherry Blossom Season\n\nSpring in Japan is magical...',
    excerpt: 'Everything you need to know about Japan\'s cherry blossom season including best viewing spots.',
    featured_image: { url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600', alt: 'Cherry blossoms', caption: 'Cherry blossoms in Tokyo', public_id: 'japan1' },
    author: 'a3', categories: ['c2'],
    tags: ['japan', 'cherry-blossom', 'spring', 'guide'],
    status: POST_STATUS.ARCHIVED,
    meta_title: 'Japan Cherry Blossom Guide 2024',
    meta_description: 'Complete guide to cherry blossom season in Japan.',
    view_count: 8920, is_featured: false,
    images_in_content: [],
    createdAt: new Date('2024-03-01'), updatedAt: new Date('2024-09-15')
  },
  {
    _id: '7', title: 'Mediterranean Cruise: Port-to-Port Highlights',
    slug: 'mediterranean-cruise-port-highlights',
    content_markdown: '# Mediterranean Cruise\n\nSailing the Mediterranean is a dream...',
    excerpt: 'A detailed port-by-port guide to the best Mediterranean cruise routes.',
    featured_image: { url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600', alt: 'Cruise ship', caption: 'Mediterranean cruise', public_id: 'cruise1' },
    author: 'a1', categories: ['c6', 'c2'],
    tags: ['cruise', 'mediterranean', 'luxury', 'europe'],
    status: POST_STATUS.DRAFT,
    meta_title: '', meta_description: '',
    view_count: 0, is_featured: false,
    images_in_content: [],
    createdAt: new Date('2025-02-01'), updatedAt: new Date('2025-02-05')
  },
  {
    _id: '8', title: 'Backpacking Through South America on $30/Day',
    slug: 'backpacking-south-america-budget',
    content_markdown: '# Backpacking South America\n\nSouth America offers incredible value...',
    excerpt: 'How to backpack through South America spending only $30 per day.',
    featured_image: { url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600', alt: 'Machu Picchu', caption: 'Machu Picchu at sunrise', public_id: 'sa1' },
    author: 'a2', categories: ['c5', 'c3'],
    tags: ['backpacking', 'south-america', 'budget', 'adventure'],
    status: POST_STATUS.PUBLISHED, published_at: new Date('2025-01-25'),
    meta_title: 'Backpacking South America Budget Guide',
    meta_description: 'How to travel through South America on just $30 a day.',
    view_count: 4567, is_featured: false,
    images_in_content: [],
    createdAt: new Date('2025-01-20'), updatedAt: new Date('2025-01-25')
  },
  {
    _id: '9', title: 'Northern Lights: Best Places and Times to See Them',
    slug: 'northern-lights-best-places-times',
    content_markdown: '# Northern Lights Guide\n\nThe Aurora Borealis is nature\'s greatest light show...',
    excerpt: 'Where and when to see the Northern Lights for the best experience.',
    featured_image: { url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600', alt: 'Northern Lights', caption: 'Aurora Borealis in Norway', public_id: 'aurora1' },
    author: 'a3', categories: ['c2', 'c3'],
    tags: ['northern-lights', 'aurora', 'norway', 'iceland'],
    status: POST_STATUS.PUBLISHED, published_at: new Date('2024-10-30'),
    meta_title: 'Best Places to See Northern Lights',
    meta_description: 'Complete guide to seeing the Northern Lights.',
    view_count: 6732, is_featured: true,
    images_in_content: [],
    createdAt: new Date('2024-10-25'), updatedAt: new Date('2024-10-30')
  },
  {
    _id: '10', title: 'Digital Nomad Guide: Working Remotely from Bali',
    slug: 'digital-nomad-guide-bali',
    content_markdown: '# Digital Nomad in Bali\n\nBali has become a hub for remote workers...',
    excerpt: 'Everything you need to know about living and working remotely from Bali.',
    featured_image: { url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600', alt: 'Bali rice terraces', caption: 'Ubud rice terraces', public_id: 'bali1' },
    author: 'a1', categories: ['c1', 'c2'],
    tags: ['digital-nomad', 'bali', 'remote-work', 'indonesia'],
    status: POST_STATUS.DRAFT,
    meta_title: '', meta_description: '',
    view_count: 0, is_featured: false,
    images_in_content: [],
    createdAt: new Date('2025-02-08'), updatedAt: new Date('2025-02-10')
  },
];

export const INITIAL_FORM_DATA = {
  title: '',
  content_markdown: '',
  excerpt: '',
  featured_image: { url: '', alt: '', caption: '', public_id: '' },
  author: '',
  categories: [],
  tags: [],
  status: POST_STATUS.DRAFT,
  is_featured: false,
  meta_title: '',
  meta_description: '',
  images_in_content: [],
};

export const INITIAL_CATEGORY_FORM = { name: '', slug: '', description: '' };

export function slugify(text) {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
}

export function formatDate(date) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function simpleMarkdownToHtml(md) {
  if (!md) return '<p class="ba-empty-preview">Start writing to see preview...</p>';
  let html = md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p><h([1-3])>/g, '<h$1>').replace(/<\/h([1-3])><\/p>/g, '</h$1>');
  html = html.replace(/<p><blockquote>/g, '<blockquote>').replace(/<\/blockquote><\/p>/g, '</blockquote>');
  html = html.replace(/<p><hr><\/p>/g, '<hr>');
  html = html.replace(/<p><li>/g, '<ul><li>').replace(/<\/li><\/p>/g, '</li></ul>');
  return html;
}
