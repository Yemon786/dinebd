export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  gradient: string;
  accentColor: string;
  image: string;
  content: { heading?: string; body: string }[];
}

export const articles: Article[] = [
  {
    slug: "rise-of-home-chefs-bangladesh",
    title: "The Rise of Home Chefs in Bangladesh: Cooking as a Career",
    excerpt:
      "Across Dhaka and beyond, talented home cooks are transforming passion into livelihood. We explore how the homemade food movement is reshaping the way Bangladeshis eat.",
    category: "Food Culture",
    author: "Dinebd Editorial",
    date: "June 5, 2026",
    readTime: "6 min read",
    featured: true,
    gradient: "from-orange-950 via-orange-900 to-amber-800",
    accentColor: "text-amber-300",
    image: "/for_journal/home_cook.jpg",
    content: [
      {
        body: "There is something deeply personal about a home-cooked meal. It carries memory, love, and a particular honesty that no restaurant kitchen can fully replicate. For decades, that intimacy was confined to family dining tables. Today, it is finding its way to thousands of doorsteps across Bangladesh.",
      },
      {
        heading: "A New Kind of Kitchen",
        body: "The home chef economy in Bangladesh is quietly booming. Women — and increasingly men — who have spent years mastering the nuances of Bangladeshi cuisine are now turning that skill into real income. From slow-cooked biryanis to hand-rolled shingara, these kitchens operate with no printed menu and no franchise backing, only quality and reputation.",
      },
      {
        body: "Platforms like Dinebd are making this possible at scale. By listing verified home cooks alongside established restaurants, we give customers a genuine alternative — food made in small batches, with fresh ingredients, and real accountability. The cook's name is on every order. That matters.",
      },
      {
        heading: "What Customers Are Discovering",
        body: "Customers who try homemade food once rarely go back to ignoring it. The portions are generous, the flavour is distinct, and the price is often fairer than you would expect. More importantly, there is a directness to the transaction — you are ordering from a person, not a brand.",
      },
      {
        body: "In a market saturated with standardised menus and cost-cutting chains, homemade food is the antidote. It is exactly what the name promises: food made at home, by someone who cares.",
      },
      {
        heading: "The Responsibility That Comes With It",
        body: "Dinebd holds home chefs to the same food safety and hygiene standards as our restaurant partners. That means inspections, onboarding training, and ongoing accountability. We do not romanticise home cooking at the expense of safety. Good food and safe food are not a compromise — they are the same thing.",
      },
      {
        body: "As this movement grows, so does the opportunity for Bangladesh to celebrate its own culinary heritage in a modern format. Home chefs are not a workaround. They are a legitimate, valuable part of how this country eats.",
      },
    ],
  },
  {
    slug: "food-hygiene-ordering-online",
    title: "Why Food Hygiene Should Be Your First Priority When Ordering Online",
    excerpt:
      "Price, speed, and convenience matter. But none of it counts if the food is unsafe. Here is how Dinebd protects every meal from kitchen to doorstep.",
    category: "Consumer Guide",
    author: "Dinebd Editorial",
    date: "May 28, 2026",
    readTime: "5 min read",
    featured: false,
    gradient: "from-gray-900 via-gray-800 to-slate-700",
    accentColor: "text-green-400",
    image: "/for_journal/food_hygiene.jpg",
    content: [
      {
        body: "The food delivery industry moves fast. Platforms compete on price. Riders compete on speed. Restaurants compete on ratings. In all that noise, hygiene — the single most important factor in any food transaction — often gets overlooked.",
      },
      {
        heading: "The Invisible Risk",
        body: "Foodborne illness is more common than most people realise. Contaminated preparation surfaces, improper temperature handling during delivery, and careless packaging can turn a satisfying meal into a serious health risk. Unlike a sit-down restaurant where you can see the environment, online ordering puts trust entirely in the platform.",
      },
      {
        heading: "How Dinebd Approaches Hygiene",
        body: "Every restaurant and home kitchen that lists on Dinebd goes through a verification process before their first order is accepted. We check preparation environments, packaging practices, and storage conditions. This is not a one-time checkbox — partners are reviewed on an ongoing basis, and we act on every customer complaint related to food safety.",
      },
      {
        body: "Our riders are trained in temperature-sensitive delivery. Certain items require insulated packaging; others need to be kept upright or away from direct heat. These are not optional standards. They are conditions of being on our platform.",
      },
      {
        heading: "What You Can Do As a Customer",
        body: "Check that packaging is sealed when your order arrives. If something smells off or looks wrong, do not eat it — report it immediately through the app. A platform that takes hygiene seriously will always investigate. One that dismisses such reports is not a platform worth trusting.",
      },
      {
        body: "Good food is not just about flavour. It is about knowing that what you are eating is safe, handled properly, and delivered with care. That is the standard Dinebd holds itself to, and it is the standard you should expect from any food delivery service.",
      },
    ],
  },
  {
    slug: "dhaka-street-food-heritage",
    title: "Dhaka's Street Food Heritage: From Roadside Stalls to Your Doorstep",
    excerpt:
      "Fuchka, chotpoti, halim — the streets of Dhaka have always been alive with flavour. Discover how these beloved classics are being preserved and delivered in the digital age.",
    category: "Food Culture",
    author: "Dinebd Editorial",
    date: "May 19, 2026",
    readTime: "7 min read",
    featured: false,
    gradient: "from-red-950 via-red-900 to-orange-800",
    accentColor: "text-orange-300",
    image: "/for_journal/Dhaka_streetfood.jpg",
    content: [
      {
        body: "Ask anyone who grew up in Dhaka what they miss most about the city and the answer almost always involves food. Not restaurant food. Street food. The kind eaten standing up, wrapped in newspaper, or balanced precariously on a plastic plate at the edge of a busy footpath.",
      },
      {
        heading: "A Living Culinary History",
        body: "Dhaka's street food is not casual eating — it is cultural architecture. Fuchka stalls have operated in the same neighbourhoods for three generations. The halim vendor at the corner of a Puran Dhaka lane has been cooking the same recipe since before independence. These are not just meals. They are continuity.",
      },
      {
        body: "The challenge has always been reach. You had to be there. You had to know the stall. You had to time it right. Street food's greatest limitation was geography.",
      },
      {
        heading: "Bringing It to the Door",
        body: "Dinebd's homemade and takeaway categories are partly an answer to this. When a trusted home cook who has spent decades mastering chotpoti lists on our platform, they extend their reach without abandoning their craft. Customers in a different part of the city — or someone far from home who craves the taste of Dhaka — can now access that food directly.",
      },
      {
        body: "This is not about turning street food into a franchise. It is about connecting the right cook to the right customer, with the care and accountability the food deserves.",
      },
      {
        heading: "Preserving the Craft",
        body: "There is a real risk that as cities modernise, the informal food economy gets squeezed out. Rent goes up. Footpaths get cleared. Vendors lose their spots. Digital platforms offer a genuine alternative — a way for these cooks to continue operating, reach more people, and earn a living from a skill that deserves recognition.",
      },
      {
        body: "Dhaka's street food heritage belongs to everyone. Making it accessible, safely and reliably, is one small way of making sure it survives.",
      },
    ],
  },
  {
    slug: "corporate-catering-guide",
    title: "How to Plan a Perfect Corporate Catering Spread",
    excerpt:
      "Whether it is a team lunch, a client meeting, or an all-hands event, the food you serve says something about your company. Here is how to get it right.",
    category: "Restaurant Tips",
    author: "Dinebd Editorial",
    date: "May 10, 2026",
    readTime: "5 min read",
    featured: false,
    gradient: "from-slate-900 via-zinc-800 to-gray-700",
    accentColor: "text-blue-300",
    image: "/for_journal/catering.jpg",
    content: [
      {
        body: "Corporate catering is a deceptively complex task. The stakes are real — bad food at a client presentation leaves a lasting impression, and not a good one. Yet most businesses treat it as an afterthought, ordered thirty minutes before guests arrive.",
      },
      {
        heading: "Start With the Guest List",
        body: "Before you think about the menu, think about who is eating. A team of twenty developers eating lunch between sprints has very different needs from a boardroom of clients being hosted for an afternoon meeting. Consider dietary restrictions early — vegetarian, gluten-free, and halal options should never be an afterthought.",
      },
      {
        heading: "Order With Buffer",
        body: "The cardinal rule of catering is to over-order slightly rather than run out. A rough guide: for a working lunch, calculate 1.2 to 1.5 portions per person. For a more formal setting where guests may eat conservatively, 1.2 is usually sufficient. Running out of food is far more damaging than having a little left over.",
      },
      {
        body: "Place your order well in advance — ideally 24 hours ahead for large groups, or 4–6 hours for standard team lunches. Last-minute catering orders put pressure on the kitchen and increase the risk of errors.",
      },
      {
        heading: "Variety and Presentation",
        body: "A mix of proteins, grains, vegetables, and sides works for almost any group. Avoid anything too messy or difficult to eat standing up if guests will not have seating. And pay attention to presentation — food that arrives well-packaged and neatly arranged signals care, even before anyone takes a bite.",
      },
      {
        body: "Dinebd's catering service connects you with verified restaurant partners who specialise in bulk orders. Browse menus, set delivery windows, and manage your order all in one place — no phone calls, no confusion.",
      },
    ],
  },
  {
    slug: "day-in-life-dinebd-rider",
    title: "Behind the Helmet: A Day in the Life of a Dinebd Rider",
    excerpt:
      "Our riders are the heartbeat of every delivery. This is what their day actually looks like — and why the work they do deserves more respect than it gets.",
    category: "Behind the Scenes",
    author: "Dinebd Editorial",
    date: "April 30, 2026",
    readTime: "6 min read",
    featured: false,
    gradient: "from-teal-950 via-teal-900 to-emerald-800",
    accentColor: "text-teal-300",
    image: "/for_journal/rider_food.jpg",
    content: [
      {
        body: "The order confirmation lands on a screen. Somewhere across the city, a rider is already moving. Between that moment and the knock on a customer's door, there is a journey most people never think about — and one that deserves to be understood.",
      },
      {
        heading: "The Morning Routine",
        body: "Riders typically start their day by checking their schedule and zone assignments through the Dinebd rider app. For many, this is a full-time livelihood. They plan their routes, check their bikes, and make sure their insulated delivery bags are clean and functional. None of this is visible to the customer, but all of it affects the quality of what arrives at the door.",
      },
      {
        heading: "Navigating Dhaka",
        body: "Dhaka's traffic is not a background condition — it is the central challenge of every delivery. Riders develop an intimate knowledge of backroads, shortcuts, and the rhythms of the city's congestion. A skilled rider does not just follow GPS instructions. They read the road, anticipate delays, and make decisions in real time that determine whether a meal arrives hot or cold.",
      },
      {
        body: "This expertise is not accidental. It is built over months of experience, and it is one of the reasons experienced riders are so valuable to the platform.",
      },
      {
        heading: "The Standard We Hold",
        body: "Dinebd riders are expected to behave professionally at every touchpoint — with restaurants, with customers, and with each other. That means polite communication, careful handling of food, and timely updates when delays occur. In return, we provide fair earnings, safety support, and a platform that treats them as partners rather than anonymous contractors.",
      },
      {
        body: "The next time a rider knocks on your door, take a moment. They have navigated heat, traffic, and time pressure to bring your meal to you. That work is real. It deserves acknowledgement.",
      },
    ],
  },
  {
    slug: "group-order-tips",
    title: "5 Tips for Choosing the Best Restaurant for Group Orders",
    excerpt:
      "Ordering for a crowd is a different skill entirely. Avoid the common mistakes and keep everyone satisfied with these practical guidelines.",
    category: "Consumer Guide",
    author: "Dinebd Editorial",
    date: "April 18, 2026",
    readTime: "4 min read",
    featured: false,
    gradient: "from-violet-950 via-purple-900 to-fuchsia-800",
    accentColor: "text-purple-300",
    image: "/for_journal/top_resturant.jpg",
    content: [
      {
        body: "Ordering food for yourself is simple. Ordering for fifteen people with different tastes, dietary needs, and opinions is a different challenge entirely. Whether you are organising a family gathering or a team lunch, the restaurant you choose matters as much as the food itself.",
      },
      {
        heading: "1. Prioritise Menu Breadth",
        body: "A restaurant with a wide menu is your safest bet when ordering for a group. Look for kitchens that offer a mix of meat, fish, and vegetarian options — not because everyone will order differently, but because having the choice prevents the one person with restrictions from feeling like an afterthought.",
      },
      {
        heading: "2. Check Group Order Minimums",
        body: "Some restaurants set minimum order values for delivery. For large groups this rarely matters, but confirm before you commit to a restaurant so there are no surprises at checkout.",
      },
      {
        heading: "3. Look at Recent Ratings, Not Lifetime Averages",
        body: "A restaurant's overall star rating tells you less than its last thirty reviews. Kitchens change staff, management, and quality over time. Filter by recent reviews and look for comments specifically about large or multiple-item orders — these reflect how well the kitchen handles volume.",
      },
      {
        heading: "4. Order Shareable Formats",
        body: "Platters, rice bowls, and family-sized portions are more practical for groups than individual items. They reduce packaging waste, are easier to distribute, and typically offer better value. Ask the restaurant whether they offer catering formats if the group is large enough.",
      },
      {
        heading: "5. Build In Lead Time",
        body: "A kitchen that produces excellent food for two covers may slow down noticeably when handling fifteen orders simultaneously. Place your group order at least 45–60 minutes before you need it — and if the order is over a certain size, call ahead to confirm the kitchen is prepared.",
      },
    ],
  },
  {
    slug: "future-food-delivery-bangladesh",
    title: "The Future of Food Delivery in Bangladesh",
    excerpt:
      "The market is maturing. Customer expectations are rising. What does the next chapter of food delivery look like in Bangladesh — and how is Dinebd preparing for it?",
    category: "Industry Insights",
    author: "Dinebd Editorial",
    date: "April 5, 2026",
    readTime: "7 min read",
    featured: false,
    gradient: "from-sky-950 via-blue-900 to-indigo-800",
    accentColor: "text-sky-300",
    image: "/for_journal/future_of_food_del.jpg",
    content: [
      {
        body: "Food delivery in Bangladesh has moved from novelty to normalcy in the span of a few years. What began as a service for early adopters has become infrastructure — something people plan around, depend on, and expect to work every time.",
      },
      {
        heading: "Rising Expectations",
        body: "As the market matures, customers are getting more discerning. Speed alone no longer wins loyalty. People want accurate ETAs, reliable communication when things go wrong, and food that arrives in the same condition it left the kitchen. These are not luxury expectations — they are baseline requirements for any serious platform.",
      },
      {
        body: "The platforms that will lead the next phase of growth are those that invest in operational quality, not just marketing spend. That means better logistics, more rigorous partner standards, and customer service that actually resolves problems.",
      },
      {
        heading: "Expanding Beyond Dhaka",
        body: "Dhaka has been the proving ground. But Bangladesh is not just Dhaka. Chittagong, Sylhet, Rajshahi — cities with growing urban populations and rising disposable incomes — represent the real expansion opportunity. Reaching them requires a different approach: understanding local cuisine preferences, working with regional restaurant partners, and building logistics networks that function outside the capital.",
      },
      {
        heading: "Sustainability and the Supply Chain",
        body: "Packaging waste from food delivery is a genuine environmental concern that the industry has been slow to address. Dinebd is actively working with restaurant partners to reduce single-use plastic, encourage reusable packaging where possible, and ensure that sustainability is built into our partner onboarding process — not retrofitted after the fact.",
      },
      {
        heading: "What Dinebd Is Building",
        body: "We are not building a platform for the market as it exists today. We are building for the market as it will be: more demanding, more distributed, and more conscious of the impact it has. That means making hard calls now — on partner quality, on rider welfare, and on the standards we set and enforce — so that the foundation is solid when the scale arrives.",
      },
    ],
  },
  {
    slug: "ramadan-iftar-ordering-guide",
    title: "Ramadan Iftar Specials: What to Order and When",
    excerpt:
      "Iftar is more than a meal — it is a moment. Planning your orders around Ramadan's rhythm makes all the difference between a rushed break and a peaceful one.",
    category: "Seasonal Guide",
    author: "Dinebd Editorial",
    date: "March 20, 2026",
    readTime: "5 min read",
    featured: false,
    gradient: "from-amber-950 via-yellow-900 to-orange-800",
    accentColor: "text-yellow-300",
    image: "/for_journal/iftar.jpg",
    content: [
      {
        body: "Ramadan changes the rhythm of everything in Bangladesh. Traffic patterns shift. Working hours compress. And the daily anticipation of iftar creates a city-wide moment of collective exhale as the sun sets. For a food delivery platform, this is both an opportunity and a responsibility.",
      },
      {
        heading: "The Timing Challenge",
        body: "Every delivery platform experiences a surge in the hour before iftar. Demand spikes, kitchens run at full capacity, and riders navigate streets that are simultaneously emptying and filling in strange patterns. Orders placed too close to maghrib often arrive late — which defeats the purpose entirely.",
      },
      {
        body: "Our recommendation is simple: place your iftar order at least 90 minutes before sunset. This gives the kitchen time to prepare properly and the rider time to navigate without rushing. A rushed iftar delivery helps no one.",
      },
      {
        heading: "What Works Well for Delivery",
        body: "Not all iftar foods travel well. Crispy items — jilapi, beguni, piyaju — lose their texture quickly. For delivery, prioritise items that hold: halim, khichuri, shami kebab, fruit salads, and date-based desserts. These arrive in condition close to how they left the kitchen.",
      },
      {
        heading: "Planning Ahead for the Month",
        body: "Many families order iftar from the same restaurant throughout Ramadan. If you find a kitchen you trust, save it and schedule repeat orders rather than starting from scratch each day. Dinebd allows you to place advance orders — use this feature during Ramadan to avoid the last-minute rush entirely.",
      },
      {
        body: "Ramadan is a time of reflection and community. The food that breaks the fast should feel like care, not a compromise. Plan early, order from kitchens you trust, and let the meal be what it is meant to be.",
      },
    ],
  },
];

export const categories = [
  "All",
  "Food Culture",
  "Consumer Guide",
  "Restaurant Tips",
  "Behind the Scenes",
  "Industry Insights",
  "Seasonal Guide",
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return articles.slice(0, count);
  return articles
    .filter((a) => a.slug !== slug && a.category === current.category)
    .concat(articles.filter((a) => a.slug !== slug && a.category !== current.category))
    .slice(0, count);
}
