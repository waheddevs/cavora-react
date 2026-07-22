# Cavora Backend Plan

## 1. Project Summary

Cavora is currently a static React travel-booking application. The frontend already includes the main customer experience, but most data and user actions are mocked or stored only in the browser.

Current frontend functionality includes:

- 28 tours stored in `src/ts/TourSingle.ts`.
- Homepage featured and popular tours selected in `src/ts/Home.ts`.
- 12 blog posts and seeded blog comments.
- Login and signup forms with client-side validation only.
- A navbar that always treats the visitor as logged out.
- A wishlist stored in browser `localStorage`.
- A mock user profile and in-memory bookings.
- A checkout page that calculates prices in the browser and simulates payments.
- Contact, newsletter, support, and blog-comment forms that do not submit data.

The backend should prioritize transactional features such as authentication, tour availability, bookings, and payments. Marketing content can remain static until an administration or CMS workflow is needed.

## 2. Recommended Technology Stack

Create a separate `cavora-server` project with:

- Node.js and TypeScript
- Express.js REST API
- PostgreSQL
- Prisma ORM and migrations
- Zod request and environment validation
- OpenAPI/Swagger documentation
- Stripe Payment Element and PaymentIntents
- Pino structured logging
- Docker Compose for local PostgreSQL
- Vitest with Supertest for automated testing

Express.js keeps the MVP small and gives a solo developer direct control over routing and middleware without introducing a larger framework abstraction. Prisma provides typed database queries and version-controlled SQL migrations while fitting naturally with the existing TypeScript frontend. Because Express is intentionally minimal, the project must consistently follow the router, controller, service, and repository boundaries defined below.

Core server packages should include `express`, `cors`, `helmet`, `cookie-parser`, `express-rate-limit`, `zod`, `@prisma/client`, `argon2`, `stripe`, `pino`, and `pino-http`. Development tooling should include TypeScript, Prisma CLI, Vitest, Supertest, ESLint, Prettier, and a TypeScript development runner.

## 3. Proposed Server Structure

```text
cavora-server/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── config/
│   ├── database/
│   ├── common/
│   │   ├── errors/
│   │   ├── middleware/
│   │   ├── security/
│   │   └── types/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── tours/
│   │   ├── availability/
│   │   ├── wishlists/
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── newsletter/
│   │   └── admin/
│   ├── app.ts
│   └── server.ts
├── test/
├── .env.example
├── docker-compose.yml
├── Dockerfile
└── package.json
```

Each feature module should follow the same small, predictable structure:

```text
modules/tours/
├── tour.router.ts
├── tour.controller.ts
├── tour.service.ts
├── tour.repository.ts
├── tour.schema.ts
├── tour.types.ts
└── tour.service.test.ts
```

Responsibilities must stay separated:

- **Router:** declares URLs, HTTP methods, middleware, and the controller handler.
- **Controller:** translates an HTTP request into service arguments and formats the response.
- **Service:** contains business rules, authorization decisions, transactions, and orchestration.
- **Repository:** contains Prisma database queries and no HTTP-specific behavior.
- **Schema:** contains Zod validation for route parameters, query strings, bodies, responses, and configuration.

Controllers should remain thin. Business logic must not be placed directly in Express route callbacks.

## 4. Backend Modules

### Authentication

Responsibilities:

- Register users.
- Log users in and out.
- Maintain secure sessions.
- Verify email addresses.
- Request and complete password resets.
- Protect authenticated routes.
- Enforce user and administrator roles.

### Users

Responsibilities:

- Return the signed-in user's profile.
- Update profile information.
- Return account statistics.
- Return the user's bookings and wishlist.

### Tours

Responsibilities:

- List and paginate published tours.
- Search tours by location or title.
- Filter by destination, type, price, duration, and rating.
- Sort by price, rating, duration, or popularity.
- Return complete tour details.
- Return featured, popular, and related tours.

### Availability

Responsibilities:

- Store scheduled tour departures.
- Track capacity and reserved seats.
- Validate dates and guest counts.
- Return available departures and current prices.

### Wishlists

Responsibilities:

- Return saved tours for the signed-in user.
- Add a tour idempotently.
- Remove a tour.
- Enforce one wishlist record per user and tour.

### Bookings

Responsibilities:

- Create short-lived booking holds.
- Calculate prices on the server.
- Store booking and traveler information.
- Confirm bookings after successful payment.
- Return upcoming, completed, cancelled, and refunded bookings.
- Handle cancellation rules.

### Payments

Responsibilities:

- Create Stripe PaymentIntents.
- Associate payments with pending bookings.
- Verify Stripe webhook signatures.
- Confirm bookings from verified webhook events.
- Store provider references and payment status.
- Support future refund workflows.

### Blog

Responsibilities:

- List and paginate published posts.
- Filter posts by category.
- Return a post by slug.
- List approved comments.
- Accept comments for moderation.

### Engagement

Responsibilities:

- Store contact messages.
- Store newsletter subscriptions and consent information.
- Prevent duplicate active subscriptions.
- Support future confirmation and unsubscribe emails.

### Administration

This is a later phase. It can provide protected endpoints for managing:

- Tours and images
- Tour departures and capacity
- Homepage selections
- Blog posts
- Blog comment moderation
- Contact messages
- Newsletter subscribers
- Booking support and refunds

## 5. REST API Contract

All routes should use the `/api/v1` prefix.

### System

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/health` | Liveness and readiness status |
| `GET` | `/api/v1/docs` | Swagger UI |
| `GET` | `/api/v1/openapi.json` | OpenAPI document for frontend types |

### Homepage

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/home` | Return homepage slides, featured tours, popular tours, spotlight, and gallery data |

The homepage endpoint should aggregate its dynamic content into one cacheable request instead of requiring several requests during initial rendering.

### Tours

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/tours` | Search, filter, sort, and paginate tours |
| `GET` | `/api/v1/tours/:id` | Return complete tour details |
| `GET` | `/api/v1/tours/:id/related` | Return related tours |
| `GET` | `/api/v1/tours/:id/availability` | Return departures that can accept the requested guests |

Example tour-list query:

```text
GET /api/v1/tours
  ?query=bali
  &destination=Indonesia
  &type=Adventure
  &minPrice=50000
  &maxPrice=200000
  &duration=short
  &minRating=4.5
  &sort=price-asc
  &page=1
  &limit=9
```

Prices in API query parameters and responses should use minor currency units such as cents.

### Authentication

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/v1/auth/register` | Create an account |
| `POST` | `/api/v1/auth/login` | Authenticate and start a session |
| `POST` | `/api/v1/auth/logout` | End the current session |
| `POST` | `/api/v1/auth/forgot-password` | Send a password-reset email |
| `POST` | `/api/v1/auth/reset-password` | Complete a password reset |
| `POST` | `/api/v1/auth/verify-email` | Verify an email address |

### User Account

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/users/me` | Return the authenticated user's profile |
| `PATCH` | `/api/v1/users/me` | Update profile fields |
| `GET` | `/api/v1/users/me/bookings` | Return booking history |
| `GET` | `/api/v1/users/me/wishlist` | Return saved tours |
| `PUT` | `/api/v1/users/me/wishlist/:tourId` | Add a saved tour idempotently |
| `DELETE` | `/api/v1/users/me/wishlist/:tourId` | Remove a saved tour |

### Bookings

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/v1/booking-holds` | Validate availability and create a pending booking hold |
| `GET` | `/api/v1/bookings/:id` | Return a booking owned by the user |
| `POST` | `/api/v1/bookings/:id/cancel` | Request booking cancellation |

Example booking-hold request:

```json
{
  "tourId": 17,
  "departureId": "uuid",
  "travelers": 2
}
```

The server response should contain the authoritative unit price, subtotal, service fee, total, currency, and hold expiration time.

### Payments

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/v1/payments/intents` | Create or reuse a PaymentIntent for a booking hold |
| `POST` | `/api/v1/payments/webhooks/stripe` | Receive and verify Stripe events |

The Stripe webhook is called by Stripe, not by the React application.

### Blog

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/v1/posts` | List published posts |
| `GET` | `/api/v1/posts/:slug` | Return a published post |
| `GET` | `/api/v1/posts/:id/comments` | List approved comments |
| `POST` | `/api/v1/posts/:id/comments` | Submit a comment for moderation |

### Contact and Newsletter

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/v1/contact-messages` | Submit a contact request |
| `POST` | `/api/v1/newsletter-subscriptions` | Subscribe an email address |
| `DELETE` | `/api/v1/newsletter-subscriptions/:token` | Unsubscribe using a secure token |

## 6. Database Design

### `users`

- `id` UUID primary key
- `email` unique
- `username` unique
- `passwordHash`
- `firstName`
- `lastName`
- `phone`
- `location`
- `avatarUrl`
- `role`
- `emailVerifiedAt`
- `createdAt`
- `updatedAt`

### `sessions`

- `id` UUID primary key
- `userId`
- `tokenHash`
- `expiresAt`
- `lastUsedAt`
- `ipAddress`
- `userAgent`
- `createdAt`

Only a hash of the session token should be stored in the database.

### `password_reset_tokens`

- `id` UUID primary key
- `userId`
- `tokenHash`
- `expiresAt`
- `usedAt`
- `createdAt`

### `tours`

- `id` integer primary key, preserving the existing frontend IDs
- `slug` unique
- `country`
- `place`
- `title`
- `location`
- `type`
- `priceCents`
- `oldPriceCents`
- `currency`
- `ratingAverage`
- `reviewCount`
- `durationDays`
- `maxGroupSize`
- `overview`
- `highlights` JSON
- `itinerary` JSON
- `included` JSON
- `notIncluded` JSON
- `status`
- `featuredRank`
- `popularityRank`
- `publishedAt`
- `createdAt`
- `updatedAt`

### `tour_images`

- `id` UUID primary key
- `tourId`
- `url`
- `altText`
- `position`

The current local image URLs can be stored initially. Object storage can be introduced later without changing the public API response shape.

### `tour_departures`

- `id` UUID primary key
- `tourId`
- `startDate`
- `capacity`
- `reservedSeats`
- `priceCents`
- `currency`
- `status`
- `createdAt`
- `updatedAt`

### `wishlists`

- `userId`
- `tourId`
- `createdAt`
- Unique constraint on `(userId, tourId)`

### `bookings`

- `id` UUID primary key
- `reference` unique public booking reference
- `userId`
- `tourId`
- `departureId`
- `status`
- `travelers`
- `unitPriceCents`
- `subtotalCents`
- `serviceFeeCents`
- `totalCents`
- `currency`
- `holdExpiresAt`
- `confirmedAt`
- `cancelledAt`
- `createdAt`
- `updatedAt`

Booking statuses should include:

- `PENDING_PAYMENT`
- `CONFIRMED`
- `COMPLETED`
- `CANCELLATION_REQUESTED`
- `CANCELLED`
- `REFUNDED`
- `EXPIRED`

### `payments`

- `id` UUID primary key
- `bookingId`
- `provider`
- `providerIntentId` unique
- `status`
- `amountCents`
- `currency`
- `failureCode`
- `failureMessage`
- `paidAt`
- `createdAt`
- `updatedAt`

### `blog_posts`

- `id` UUID primary key
- `slug` unique
- `title`
- `excerpt`
- `body` JSON
- `category`
- `imageUrl`
- `authorName`
- `authorImageUrl`
- `status`
- `publishedAt`
- `createdAt`
- `updatedAt`

### `blog_comments`

- `id` UUID primary key
- `postId`
- `userId` nullable
- `name`
- `email`
- `body`
- `status`
- `createdAt`

Comment statuses should include `PENDING`, `APPROVED`, `REJECTED`, and `SPAM`.

### `contact_messages`

- `id` UUID primary key
- `userId` nullable
- `fullName`
- `email`
- `phone`
- `subject`
- `message`
- `status`
- `createdAt`
- `resolvedAt`

### `newsletter_subscriptions`

- `id` UUID primary key
- `email` unique
- `status`
- `source`
- `consentedAt`
- `confirmedAt`
- `unsubscribeTokenHash`
- `createdAt`
- `updatedAt`

## 7. Booking and Payment Flow

1. The frontend requests tour availability for the selected date and guest count.
2. The user selects an available departure.
3. The frontend sends the tour, departure, and traveler count to `POST /booking-holds`.
4. The server validates capacity and recalculates the price using database values.
5. The server creates a short-lived pending booking and reserves the requested seats.
6. The frontend requests a PaymentIntent for that booking.
7. The server returns the Stripe client secret.
8. React renders Stripe Payment Element and confirms the payment through Stripe.
9. Stripe sends a signed webhook event to the backend.
10. The backend verifies the webhook and atomically marks the payment and booking as confirmed.
11. The frontend retrieves the confirmed booking from the API.

The server must never trust a price, total, tour availability, or service fee supplied by the frontend. The current two-percent service fee must become a server-side pricing rule.

Booking confirmation and capacity updates must happen in a database transaction so that they either both succeed or both fail.

## 8. Payment Security

The existing custom card number, expiry, and CVV inputs must be replaced by Stripe Payment Element before processing real payments.

Rules:

- Card data must not pass through or be logged by the Cavora backend.
- The backend stores only Stripe identifiers and safe payment metadata.
- Stripe webhook signatures must be verified.
- A successful browser redirect must not confirm a booking by itself.
- Booking confirmation must come from a verified webhook event.
- Payment and booking creation should support idempotency keys.
- Secret keys must exist only in server environment variables.

## 9. Authentication and Security

- Use an opaque session token in an `HttpOnly`, `Secure`, and appropriately configured `SameSite` cookie.
- Store only a session-token hash in PostgreSQL.
- Hash passwords with Argon2id.
- Rotate or revoke sessions after sensitive account changes.
- Validate every request body, query, and route parameter.
- Use a strict CORS allowlist and enable credentials only for the frontend origin.
- Add CSRF protection to cookie-authenticated state-changing requests.
- Add rate limits to login, registration, password reset, contact, newsletter, and comment routes.
- Use one-time, expiring, hashed email-verification and password-reset tokens.
- Add role-based authorization for administration routes.
- Add Helmet security headers.
- Never include password hashes, tokens, or internal payment data in API responses.
- Add request IDs and structured JSON logs.
- Record important account, booking, payment, and admin actions in an audit log.

## 10. API Conventions

### Dates

- Use ISO 8601 values.
- Store timestamps in UTC.
- Store a tour departure date as a database date when a time is unnecessary.

### Money

- Use integer minor units, such as cents.
- Include an ISO currency code such as `USD`.
- Calculate all authoritative totals on the server.

### Pagination

List responses should have a predictable shape:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 9,
    "total": 28,
    "totalPages": 4
  }
}
```

### Errors

Use a consistent error response:

```json
{
  "status": 422,
  "code": "VALIDATION_ERROR",
  "message": "The request contains invalid fields.",
  "fieldErrors": {
    "email": "Email is already registered."
  },
  "requestId": "request-uuid"
}
```

Express should use one centralized error-handling middleware at the end of the middleware chain. Route handlers should forward operational errors to it, and the middleware should translate known application errors into the common response shape without exposing stack traces in production.

### Validation and OpenAPI

- Validate environment variables when the process starts.
- Validate route parameters, query strings, and request bodies before controllers run.
- Reuse the Zod route schemas to produce the OpenAPI document where practical.
- Treat the generated OpenAPI document as the contract used to generate Redux Toolkit frontend types.
- Reject unknown or malformed values instead of silently coercing security-sensitive fields.

### Caching

- Use `Cache-Control` and ETags for public homepage, tour, FAQ, and blog responses.
- Do not publicly cache authenticated account or booking responses.
- Redis is optional and should not be required for the first release.

## 11. Redux Toolkit Frontend Integration

When the backend is ready, connect it to the React frontend with Redux Toolkit. RTK Query should handle server data fetching and caching; ordinary Redux slices should be reserved for client-only state.

### Store Structure

```text
src/app/
├── api/
│   ├── baseApi.ts
│   ├── authApi.ts
│   ├── homeApi.ts
│   ├── toursApi.ts
│   ├── wishlistApi.ts
│   ├── bookingsApi.ts
│   ├── paymentsApi.ts
│   ├── blogApi.ts
│   └── engagementApi.ts
├── features/
│   ├── auth/authSlice.ts
│   ├── tourSearch/tourSearchSlice.ts
│   └── checkout/checkoutSlice.ts
└── store.ts
```

### RTK Query Base API

The shared API configuration should:

- Use the backend base URL from a React environment variable.
- Send cookies with `credentials: "include"`.
- Define cache tags for `User`, `Home`, `Tour`, `Wishlist`, `Booking`, `Post`, and `Comment`.
- Normalize the common backend error shape.
- Handle an expired session consistently by clearing authenticated user state.
- Avoid storing session tokens in Redux or browser storage.

Illustrative configuration:

```ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
  }),
  tagTypes: [
    "User",
    "Home",
    "Tour",
    "Wishlist",
    "Booking",
    "Post",
    "Comment",
  ],
  endpoints: () => ({}),
})
```

### Redux State Ownership

RTK Query should own:

- Homepage API data
- Tour lists and tour details
- Availability responses
- Current user profile
- Wishlist contents
- Booking history
- Blog posts and comments

Regular Redux slices should own only temporary UI state that must be shared across screens, such as:

- Authentication bootstrap status
- Tour search selections
- Checkout selection before a booking hold exists
- Global banners or notifications

Local component state should continue to own isolated interface details such as an open calendar, accordion state, selected tab, or form input before submission.

### Cache Invalidation

- Login or registration should invalidate `User`, `Wishlist`, and `Booking`.
- Logout should reset the RTK Query API cache.
- Adding or removing a wishlist item should invalidate `Wishlist` and update the affected `Tour` cache when needed.
- A confirmed payment should invalidate `Booking` and the relevant tour availability.
- Updating the profile should invalidate `User`.
- Posting a blog comment should invalidate `Comment` after the API accepts it. If moderation is enabled, the new comment should not be inserted into the approved list prematurely.

### Frontend Migration Order

1. Configure the shared RTK Query base API and add its reducer and middleware to `store.ts`.
2. Replace static homepage tour lookups with `GET /home`.
3. Replace the local tour catalogue, filters, and pagination with `GET /tours`.
4. Replace tour-detail lookups with `GET /tours/:id` and availability queries.
5. Connect signup, login, logout, session bootstrap, and profile editing.
6. Replace `localStorage` and component-only wishlist behavior with wishlist endpoints.
7. Replace in-memory bookings with authenticated booking queries.
8. Replace the mock payment function with booking holds, Stripe Payment Element, and payment status polling or refetching.
9. Connect contact, newsletter, and blog-comment mutations.
10. Remove obsolete static data modules after every dependent screen has migrated.

### Generated API Types

The backend should publish an OpenAPI document. Generate frontend request and response types from that document so the frontend does not manually duplicate backend DTOs. Generated files should not be edited by hand.

## 12. Content That Can Remain Static Initially

The first backend release does not need to migrate:

- About-page story content
- Team members and testimonials
- FAQ content
- Footer links and displayed contact information
- Homepage hero slides and gallery
- Blog articles, until publishing through an admin interface is required

Keeping these assets static reduces the first release scope and allows the team to focus on bookings, payment correctness, and account security.

## 13. Testing Strategy

### Unit Tests

- Authentication and password policies
- Tour filtering and sorting
- Availability calculations
- Price and service-fee calculations
- Booking state transitions
- Cancellation rules
- Stripe event mapping

### Integration Tests

- Database constraints and Prisma queries
- Registration and login
- Session expiration and logout
- Wishlist uniqueness
- Booking hold creation and expiration
- Concurrent capacity reservation
- Payment webhook idempotency

### End-to-End Tests

- Register, log in, and retrieve the profile.
- Search for a tour and view its availability.
- Save and remove a tour from the wishlist.
- Create a booking hold and complete a Stripe test payment.
- Confirm that the new booking appears in My Bookings.
- Prevent one user from reading another user's booking.
- Submit contact, newsletter, and blog-comment forms.

## 14. Deployment and Operations

### Local Development

Use Docker Compose for:

- PostgreSQL
- The Express.js API
- Optional Mailpit for testing emails

Redis is not required initially. Database-backed sessions and booking holds are sufficient for the first release.

### Production

- Deploy the API as a container.
- Use managed PostgreSQL with automated backups.
- Use HTTPS for both frontend and backend.
- Store secrets in the deployment platform's secret manager.
- Use object storage and a CDN when image administration is introduced.
- Add error tracking, structured logs, uptime monitoring, and database alerts.
- Run Prisma production migrations as a controlled deployment step.

## 15. Delivery Phases

### Phase 1: Foundation

- Scaffold `cavora-server`.
- Configure Express.js, PostgreSQL, Prisma, and Docker Compose.
- Add Zod environment and request validation.
- Establish router, controller, service, and repository conventions.
- Add centralized asynchronous error handling.
- Add health checks, Swagger/OpenAPI, Pino logging, and testing infrastructure.

### Phase 2: Tour Catalogue

- Create the tour and image schema.
- Import the existing 28 tours while preserving their IDs.
- Implement homepage, tour-list, tour-detail, related-tour, search, filter, sort, and pagination endpoints.
- Connect these endpoints to the frontend through RTK Query.

### Phase 3: Accounts and Wishlist

- Implement registration, login, logout, sessions, email verification, and password reset.
- Implement profile reads and updates.
- Implement the server-backed wishlist.
- Replace the static navbar authentication state and browser-only wishlist.

### Phase 4: Availability and Bookings

- Add scheduled departures and capacity.
- Add authoritative server-side pricing.
- Add booking holds and expiration.
- Add account booking history.

### Phase 5: Payments

- Replace custom card fields with Stripe Payment Element.
- Create PaymentIntents on the backend.
- Add verified and idempotent webhook processing.
- Confirm bookings and capacity in a database transaction.

### Phase 6: Engagement

- Connect contact messages.
- Connect newsletter subscriptions.
- Connect blog comments and moderation.
- Add transactional email delivery.

### Phase 7: Administration

- Add administrator authentication and authorization.
- Manage tours, availability, content, comments, subscribers, bookings, and refunds.

## 16. First Implementation Milestone

The first milestone should deliver:

- A running Express.js `cavora-server` project
- Local PostgreSQL through Docker Compose
- Prisma schema and initial migrations
- A seed script importing all 28 current tours
- `GET /api/v1/health`
- `GET /api/v1/home`
- `GET /api/v1/tours`
- `GET /api/v1/tours/:id`
- Swagger and OpenAPI output
- Automated tests for the public tour API
- Initial RTK Query integration in the React frontend

After this milestone, the frontend can stop importing the complete static tour catalogue into the browser and use the backend as the source of truth.
