/* Blog details data — lookup, tags, article body and comments for the single post page */

import { posts } from "./Blog"

/* ===========================
   LOOKUP
=========================== */

export const getPostById = (id) => posts.find((post) => post.id === Number(id))

/* ===========================
   ARTICLE BODY (templated blocks)
   Every post shares one coherent structure; the post's own
   title / excerpt / category feed the copy so each reads tailored.
=========================== */

export const getArticleBody = (post) => [
  {
    type: "paragraph",
    text: `${post.excerpt.replace(/\.{3}$/, "").trim()} What follows is a closer look at why this ${post.category.toLowerCase()} story stayed with us long after the journey ended, and what you can take from it before planning your own trip.`,
  },
  { type: "heading", text: "First Impressions" },
  {
    type: "paragraph",
    text: "From the very first morning the pace felt different. Familiar routines dissolved into a rhythm set by the place itself — the light, the food stalls opening one by one, the unhurried greetings of people who had clearly done this a thousand times before. Travel writing loves the word 'magical', but here it earned it honestly.",
  },
  {
    type: "quote",
    text: "The best journeys answer questions that, at the outset, you didn't even think to ask.",
    author: post.author,
  },
  { type: "heading", text: "What Makes It Unforgettable" },
  {
    type: "paragraph",
    text: "It is rarely the headline sights that linger in memory. It is the small, unscripted moments in between — a shortcut a local insists on showing you, a meal you can't name, the exact shade of the sky at dusk. We chased a few of the famous landmarks too, of course, but the trip belonged to the details nobody puts on a postcard.",
  },
  {
    type: "list",
    items: [
      "Wake early — the first two hours after sunrise are the quietest and most beautiful.",
      "Eat where the queues are made of locals, not cameras.",
      "Leave one day completely unplanned; it usually becomes the best one.",
      "Talk to the people who live there — they are the real guidebook.",
    ],
  },
  { type: "heading", text: "Practical Tips Before You Go" },
  {
    type: "paragraph",
    text: "A little preparation goes a long way. Check the season carefully, pack lighter than you think you need to, and keep your itinerary loose enough to follow a good recommendation when it appears. Budget for the unexpected — the finest moments of any trip are almost never the ones you scheduled.",
  },
  {
    type: "paragraph",
    text: "By the time we left, the place no longer felt like a destination on a map but like somewhere we had briefly, gratefully, belonged. If this story has stirred even a small itch to go, trust it. Some places are worth rearranging a life around.",
  },
]

/* ===========================
   COMMENTS
=========================== */

export const comments = [
  {
    id: 1,
    name: "Emily Watson",
    avatar: "/img/blog-img/author-2.jpg",
    date: "3 days ago",
    text: "This completely captured why I fell in love with travelling in the first place. Adding this destination straight to my list for next spring!",
  },
  {
    id: 2,
    name: "Daniel Kim",
    avatar: "/img/blog-img/author-5.jpg",
    date: "1 week ago",
    text: "The tip about leaving a day unplanned is so underrated. Every time I've done it, that day turned out to be the highlight of the whole trip.",
  },
  {
    id: 3,
    name: "Amara Diallo",
    avatar: "/img/blog-img/author-8.jpg",
    date: "2 weeks ago",
    text: "Beautifully written. That line about belonging somewhere briefly really hit home — thank you for sharing this.",
  },
]
