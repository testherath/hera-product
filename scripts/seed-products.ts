import 'dotenv/config';
import { db } from '../src/db';
import { products } from '../src/db/schema';

const mockProducts = [
    {
        name: 'Handcrafted Teak Cutting Board',
        category: 'kitchen',
        price: 8500,
        originalPrice: 10000,
        discount: 15,
        image: "https://images.unsplash.com/photo-1590474832266-60a7e39cbc89",
        alt: 'Large rectangular teak cutting board with natural wood grain and juice groove',
        images: JSON.stringify([
            { url: "https://images.unsplash.com/photo-1590474832266-60a7e39cbc89", alt: 'Large rectangular teak cutting board with natural wood grain and juice groove' },
            { url: "https://images.unsplash.com/photo-1590474832266-60a7e39cbc89", alt: 'Close-up of teak cutting board showing detailed wood texture and craftsmanship' }]),
        woodType: 'Teak',
        artisan: 'Sunil Perera',
        rating: 4.8,
        reviews: 124,
        customizable: true,
        inStock: true,
        featured: true,
        description: 'Premium teak cutting board with natural antimicrobial properties. Features juice groove and ergonomic handles for easy handling.',
        dimensions: '45cm x 30cm x 2.5cm',
        tags: JSON.stringify(['kitchen', 'cutting-board', 'teak'])
    },
    {
        name: 'Mahogany Serving Tray',
        category: 'home-decor',
        price: 12000,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_14d53569f-1764930312997.png",
        alt: 'Elegant mahogany serving tray with brass handles on marble countertop',
        images: JSON.stringify([
            { url: "https://img.rocket.new/generatedImages/rocket_gen_img_14d53569f-1764930312997.png", alt: 'Elegant mahogany serving tray with brass handles on marble countertop' },
            { url: "https://img.rocket.new/generatedImages/rocket_gen_img_1d019cc30-1764930312594.png", alt: 'Side view of mahogany serving tray showing depth and handle detail' }]),
        woodType: 'Mahogany',
        artisan: 'Nimal Fernando',
        rating: 4.9,
        reviews: 89,
        customizable: true,
        inStock: true,
        featured: true,
        description: 'Luxurious mahogany serving tray with brass handles. Perfect for entertaining guests with style and elegance.',
        dimensions: '50cm x 35cm x 5cm',
        tags: JSON.stringify(['home-decor', 'serving-tray', 'mahogany'])
    },
    {
        name: 'Ebony Decorative Bowl',
        category: 'home-decor',
        price: 15000,
        originalPrice: 18000,
        discount: 17,
        image: "https://images.unsplash.com/photo-1695202263041-d54f27f09497",
        alt: 'Smooth polished ebony decorative bowl with natural dark wood finish',
        images: JSON.stringify([
            { url: "https://images.unsplash.com/photo-1695202263041-d54f27f09497", alt: 'Smooth polished ebony decorative bowl with natural dark wood finish' },
            { url: "https://images.unsplash.com/photo-1587720090937-b76b37945b20", alt: 'Top view of ebony bowl showing circular grain pattern' }]),
        woodType: 'Ebony',
        artisan: 'Chaminda Silva',
        rating: 5.0,
        reviews: 67,
        customizable: false,
        inStock: true,
        featured: false,
        description: 'Exquisite ebony bowl with smooth finish. A statement piece that adds sophistication to any space.',
        dimensions: '30cm diameter x 12cm height',
        tags: JSON.stringify(['home-decor', 'bowl', 'ebony'])
    },
    {
        name: 'Rosewood Spice Rack',
        category: 'kitchen',
        price: 9500,
        image: "https://images.unsplash.com/photo-1597415950777-559f8a6e9a29",
        alt: 'Wall-mounted rosewood spice rack with multiple compartments and glass jars',
        images: JSON.stringify([
            { url: "https://images.unsplash.com/photo-1597415950777-559f8a6e9a29", alt: 'Wall-mounted rosewood spice rack with multiple compartments and glass jars' },
            { url: "https://img.rocket.new/generatedImages/rocket_gen_img_1183a947b-1764860393161.png", alt: 'Close-up of rosewood spice rack showing individual compartment detail' }]),
        woodType: 'Rosewood',
        artisan: 'Pradeep Kumar',
        rating: 4.7,
        reviews: 156,
        customizable: true,
        inStock: true,
        featured: false,
        description: 'Elegant rosewood spice rack with multiple compartments. Keeps your spices organized and easily accessible.',
        dimensions: '60cm x 15cm x 8cm',
        tags: JSON.stringify(['kitchen', 'spice-rack', 'rosewood'])
    },
    {
        name: 'Coconut Wood Salad Bowl Set',
        category: 'kitchen',
        price: 7500,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f549da64-1764786777864.png",
        alt: 'Set of three coconut wood salad bowls in varying sizes with natural finish',
        images: JSON.stringify([
            { url: "https://img.rocket.new/generatedImages/rocket_gen_img_1f549da64-1764786777864.png", alt: 'Set of three coconut wood salad bowls in varying sizes with natural finish' },
            { url: "https://images.unsplash.com/photo-1564839741553-3a9d13ec12ed", alt: 'Stacked coconut wood bowls showing size variation' }]),
        woodType: 'Coconut Wood',
        artisan: 'Ranjith Bandara',
        rating: 4.6,
        reviews: 98,
        customizable: false,
        inStock: true,
        featured: false,
        description: 'Sustainable coconut wood bowl set. Lightweight yet durable, perfect for everyday use.',
        dimensions: 'Large: 25cm, Medium: 20cm, Small: 15cm',
        tags: JSON.stringify(['kitchen', 'bowl-set', 'coconut-wood'])
    },
    {
        name: 'Jak Wood Wall Art',
        category: 'home-decor',
        price: 18000,
        image: "https://images.unsplash.com/photo-1636567204606-bf807f2094ef",
        alt: 'Abstract jak wood wall art piece with geometric patterns and natural wood tones',
        images: JSON.stringify([
            { url: "https://images.unsplash.com/photo-1636567204606-bf807f2094ef", alt: 'Abstract jak wood wall art piece with geometric patterns and natural wood tones' },
            { url: "https://img.rocket.new/generatedImages/rocket_gen_img_16bb4ea30-1764859879492.png", alt: 'Side angle view of jak wood wall art showing depth and texture' }]),
        woodType: 'Jak Wood',
        artisan: 'Sunil Perera',
        rating: 4.9,
        reviews: 45,
        customizable: true,
        inStock: true,
        featured: true,
        description: 'Unique jak wood wall art with intricate patterns. A conversation starter that brings natural beauty to your walls.',
        dimensions: '80cm x 60cm x 3cm',
        tags: JSON.stringify(['home-decor', 'wall-art', 'jak-wood'])
    },
    {
        name: 'Teak Cheese Board',
        category: 'kitchen',
        price: 6500,
        originalPrice: 8000,
        discount: 19,
        image: "https://images.unsplash.com/photo-1682994296160-49bdfdc6807a",
        alt: 'Round teak cheese board with knife slots and serving handles',
        images: JSON.stringify([
            { url: "https://images.unsplash.com/photo-1682994296160-49bdfdc6807a", alt: 'Round teak cheese board with knife slots and serving handles' },
            { url: "https://images.unsplash.com/photo-1707079288822-be30b3d1de72", alt: 'Teak cheese board with assorted cheeses and fruits arranged' }]),
        woodType: 'Teak',
        artisan: 'Nimal Fernando',
        rating: 4.8,
        reviews: 112,
        customizable: true,
        inStock: true,
        featured: false,
        description: 'Elegant teak cheese board with integrated knife storage. Perfect for entertaining and gift-giving.',
        dimensions: '35cm diameter x 2cm',
        tags: JSON.stringify(['kitchen', 'cheese-board', 'teak'])
    },
    {
        name: 'Mahogany Bookends',
        category: 'home-decor',
        price: 11000,
        image: "https://images.unsplash.com/photo-1682696141155-c6b2c9477432",
        alt: 'Pair of mahogany bookends with carved elephant design',
        images: JSON.stringify([
            { url: "https://images.unsplash.com/photo-1682696141155-c6b2c9477432", alt: 'Pair of mahogany bookends with carved elephant design' },
            { url: "https://images.unsplash.com/photo-1544418776-599869294fb1", alt: 'Close-up of mahogany bookend showing elephant carving detail' }]),
        woodType: 'Mahogany',
        artisan: 'Chaminda Silva',
        rating: 4.7,
        reviews: 73,
        customizable: false,
        inStock: true,
        featured: false,
        description: 'Handcarved mahogany bookends featuring traditional elephant motifs. Functional art for your bookshelf.',
        dimensions: '20cm x 15cm x 12cm each',
        tags: JSON.stringify(['home-decor', 'bookends', 'mahogany'])
    },
    {
        name: 'Custom Engraved Cutting Board',
        category: 'custom',
        price: 10000,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b955aef-1764702181867.png",
        alt: 'Wooden cutting board with custom family name engraving and decorative border',
        images: JSON.stringify([
            { url: "https://img.rocket.new/generatedImages/rocket_gen_img_11b955aef-1764702181867.png", alt: 'Wooden cutting board with custom family name engraving and decorative border' },
            { url: "https://images.unsplash.com/photo-1638725997667-47346a462dfa", alt: 'Close-up of engraved text on cutting board showing precision detail' }]),
        woodType: 'Teak',
        artisan: 'Pradeep Kumar',
        rating: 5.0,
        reviews: 201,
        customizable: true,
        inStock: true,
        featured: true,
        description: 'Personalized cutting board with custom engraving. Perfect for weddings, anniversaries, or housewarming gifts.',
        dimensions: 'Customizable',
        tags: JSON.stringify(['custom', 'cutting-board', 'engraved'])
    },
    {
        name: 'Rosewood Jewelry Box',
        category: 'home-decor',
        price: 14000,
        image: "https://images.unsplash.com/photo-1659158827413-dae1d6572103",
        alt: 'Elegant rosewood jewelry box with velvet interior and brass hinges',
        images: JSON.stringify([
            { url: "https://images.unsplash.com/photo-1659158827413-dae1d6572103", alt: 'Elegant rosewood jewelry box with velvet interior and brass hinges' },
            { url: "https://img.rocket.new/generatedImages/rocket_gen_img_1daec0560-1764829451590.png", alt: 'Open rosewood jewelry box showing compartments and velvet lining' }]),
        woodType: 'Rosewood',
        artisan: 'Ranjith Bandara',
        rating: 4.9,
        reviews: 87,
        customizable: true,
        inStock: true,
        featured: false,
        description: 'Luxurious rosewood jewelry box with multiple compartments. Keeps your precious items safe and organized.',
        dimensions: '25cm x 18cm x 10cm',
        tags: JSON.stringify(['home-decor', 'jewelry-box', 'rosewood'])
    },
    {
        name: 'Coconut Wood Utensil Set',
        category: 'kitchen',
        price: 5500,
        image: "https://images.unsplash.com/photo-1728034261662-460ca4fbecd7",
        alt: 'Set of five coconut wood cooking utensils including spoons and spatulas',
        images: JSON.stringify([
            { url: "https://images.unsplash.com/photo-1728034261662-460ca4fbecd7", alt: 'Set of five coconut wood cooking utensils including spoons and spatulas' },
            { url: "https://images.unsplash.com/photo-1730112636581-2d45ebb04da3", alt: 'Coconut wood utensils arranged in ceramic holder' }]),
        woodType: 'Coconut Wood',
        artisan: 'Sunil Perera',
        rating: 4.6,
        reviews: 143,
        customizable: false,
        inStock: true,
        featured: false,
        description: 'Eco-friendly coconut wood utensil set. Safe for non-stick cookware and naturally antibacterial.',
        dimensions: 'Various sizes, 25-35cm length',
        tags: JSON.stringify(['kitchen', 'utensils', 'coconut-wood'])
    },
    {
        name: 'Ebony Picture Frame',
        category: 'home-decor',
        price: 8000,
        originalPrice: 9500,
        discount: 16,
        image: "https://img.rocket.new/generatedImages/rocket_gen_img_14ac14135-1764659104500.png",
        alt: 'Elegant ebony picture frame with matte finish and glass front',
        images: JSON.stringify([
            { url: "https://img.rocket.new/generatedImages/rocket_gen_img_14ac14135-1764659104500.png", alt: 'Elegant ebony picture frame with matte finish and glass front' },
            { url: "https://img.rocket.new/generatedImages/rocket_gen_img_1f218c7b5-1764672905919.png", alt: 'Ebony picture frame displayed on wall with family photo' }]),
        woodType: 'Ebony',
        artisan: 'Nimal Fernando',
        rating: 4.8,
        reviews: 92,
        customizable: true,
        inStock: true,
        featured: false,
        description: 'Sophisticated ebony picture frame. Showcases your memories with timeless elegance.',
        dimensions: '25cm x 20cm (photo size: 20cm x 15cm)',
        tags: JSON.stringify(['home-decor', 'picture-frame', 'ebony'])
    }
];

async function seed() {
    console.log('Seeding products...');
    await db.insert(products).values(mockProducts);
    console.log('Seeding complete!');
    process.exit(0);
}

seed().catch((err) => {
    console.error('Seeding failed', err);
    process.exit(1);
});
