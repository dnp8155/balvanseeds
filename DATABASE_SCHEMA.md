# Balavan Agro Seeds — Database Schema Reference

> **Last Updated:** 2026-09-11
> **Platform:** Base44 (Backend-as-a-Service)
> **Database:** MongoDB (managed by Base44)
> **Access:** Via `base44.entities.<EntityName>` SDK methods

---

## Overview

All site content is stored in Base44 entities (database tables). This document lists every entity, its fields, data types, required fields, default values, and Row-Level Security (RLS) rules.

### Built-in Fields (Every Entity)

These fields exist on **every** record automatically — never declare them in entity schemas:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (ObjectId) | Unique record identifier |
| `created_date` | datetime | Auto-set on creation |
| `updated_date` | datetime | Auto-updated on every modification |
| `created_by_id` | string (ObjectId) | ID of the user who created the record |

---

## SDK Methods Reference

```javascript
import { base44 } from '@/api/base44Client';

// List all (optionally sorted + limited)
base44.entities.<Name>.list('-created_date', 50);

// Filter with query
base44.entities.<Name>.filter({ status: 'published' }, '-updated_date', 20);

// Get single by ID
base44.entities.<Name>.get(id);

// Create
base44.entities.<Name>.create({ field: 'value' });

// Bulk create
base44.entities.<Name>.bulkCreate([{ ... }, { ... }]);

// Update
base44.entities.<Name>.update(id, { field: 'newvalue' });

// Bulk update (different changes per record)
base44.entities.<Name>.bulkUpdate([{ id, status: 'published' }, ...]);

// Update many (same change to all matches)
base44.entities.<Name>.updateMany({ status: 'draft' }, { $set: { status: 'published' } });

// Delete
base44.entities.<Name>.delete(id);

// Delete many
base44.entities.<Name>.deleteMany({ status: 'archived' });

// Get schema (JSON schema minus built-ins)
base44.entities.<Name>.schema();

// Realtime subscription
const unsub = base44.entities.<Name>.subscribe((event) => { ... });
```

---

## Entities

---

### 1. CropCategory

**Purpose:** Seed crop categories (e.g., Cereals, Oilseeds, Pulses, Spices, Vegetables, Fodder)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | string | ✅ | — | Category display name (e.g., "Oilseeds") |
| `slug` | string | ✅ | — | URL-friendly identifier (e.g., "oilseeds") |
| `short_description` | string | — | — | Brief category description for cards |
| `full_description` | string | — | — | Detailed description for category page |
| `cover_image` | string | — | — | Cover image URL |
| `icon` | string | — | — | Icon identifier or emoji |
| `display_order` | number | — | — | Sort order for display |
| `is_featured` | boolean | — | — | Show on homepage |
| `status` | string (enum) | — | `"draft"` | `draft` \| `published` \| `archived` |

**RLS Rules:**
- **Read:** Public (published) OR admin (all statuses)
- **Create / Update / Delete:** Admin only

---

### 2. SeedVariety

**Purpose:** Individual seed varieties/products (e.g., BALVAN 4488, BALVAN-GORI, SAKTIMAN)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `crop_category_id` | string | ✅ | — | Reference to CropCategory.id |
| `variety_name` | string | ✅ | — | Display name (e.g., "BALVAN 4488") |
| `slug` | string | ✅ | — | URL slug (e.g., "balvan-4488") |
| `variety_type` | string (enum) | ✅ | — | `Hybrid` \| `Improved` |
| `short_description` | string | — | — | Brief description for cards |
| `full_description` | string | — | — | Detailed description for product page |
| `key_features` | array[string] | — | — | List of key features/benefits |
| `suitable_season` | string | — | — | Season (e.g., "Kharif", "Rabi", "Summer") |
| `recommended_regions` | string | — | — | Geographic regions where suitable |
| `maturity_duration` | string | — | — | Days to maturity (e.g., "75-80 days") |
| `yield_information` | string | — | — | Expected yield data |
| `sowing_guidance` | string | — | — | Sowing instructions |
| `seed_rate` | string | — | — | Recommended seed rate |
| `plant_spacing` | string | — | — | Recommended plant spacing |
| `irrigation_guidance` | string | — | — | Irrigation instructions |
| `soil_requirements` | string | — | — | Soil type preferences |
| `disease_resistance` | string | — | — | Disease resistance info |
| `packaging_information` | string | — | — | Packaging details |
| `thumbnail_image` | string | — | — | Primary product image URL |
| `brochure_url` | string | — | — | Brochure PDF URL |
| `is_featured` | boolean | — | — | Show on homepage featured section |
| `display_order` | number | — | — | Sort order |
| `status` | string (enum) | — | `"draft"` | `draft` \| `published` \| `archived` |
| `seo_title` | string | — | — | Custom SEO title |
| `seo_description` | string | — | — | Custom SEO meta description |

**RLS Rules:**
- **Read:** Public (published) OR admin (all statuses)
- **Create / Update / Delete:** Admin only

---

### 3. SeedImage

**Purpose:** Multiple images per seed variety (gallery, field photos, packaging, farmer results)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `seed_variety_id` | string | ✅ | — | Reference to SeedVariety.id |
| `image_url` | string | ✅ | — | Image URL |
| `alt_text` | string | — | — | Accessibility/SEO alt text |
| `caption` | string | — | — | Display caption |
| `image_type` | string (enum) | — | — | `product` \| `field` \| `packaging` \| `farmer_result` \| `other` |
| `display_order` | number | — | — | Sort order in gallery |
| `is_cover` | boolean | — | — | Use as primary image |

**RLS Rules:**
- **Read:** Public (everyone)
- **Create / Update / Delete:** Admin only

---

### 4. SeedDocument

**Purpose:** Downloadable documents per seed variety (brochures, cultivation guides, certificates, product sheets)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `seed_variety_id` | string | ✅ | — | Reference to SeedVariety.id |
| `document_title` | string | ✅ | — | Display title |
| `document_type` | string (enum) | ✅ | — | `brochure` \| `cultivation_guide` \| `certificate` \| `product_sheet` \| `other` |
| `file_url` | string | ✅ | — | Document file URL (PDF, etc.) |
| `language` | string | — | — | Document language (e.g., "en", "hi", "gu") |
| `file_size` | string | — | — | File size label (e.g., "2.5 MB") |
| `display_order` | number | — | — | Sort order |
| `status` | string (enum) | — | `"draft"` | `draft` \| `published` \| `archived` |

**RLS Rules:**
- **Read:** Public (published) OR admin (all statuses)
- **Create / Update / Delete:** Admin only

---

### 5. Dealer

**Purpose:** Authorized dealer/distributor network locations

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | string | ✅ | — | Dealer/business name |
| `state` | string | ✅ | — | State (e.g., "Gujarat") |
| `district` | string | ✅ | — | District (e.g., "Banaskantha") |
| `city` | string | — | — | City/town |
| `pincode` | string | — | — | Postal code |
| `address` | string | — | — | Full street address |
| `mobile` | string | ✅ | — | Contact phone number |
| `latitude` | number | — | — | GPS latitude for map |
| `longitude` | number | — | — | GPS longitude for map |
| `is_active` | boolean | — | `true` | Active/inactive status |

**RLS Rules:**
- **Read:** Public (everyone)
- **Create / Update / Delete:** Admin only

---

### 6. Enquiry

**Purpose:** General contact/enquiry form submissions from website

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | string | ✅ | — | Customer name |
| `phone` | string | ✅ | — | Phone number |
| `email` | string | — | — | Email address |
| `state` | string | — | — | Customer's state |
| `district` | string | — | — | Customer's district |
| `enquiry_type` | string (enum) | ✅ | — | `Farmer` \| `Dealer` \| `Distributor` \| `Business Partner` \| `General Enquiry` |
| `product_interest` | string | — | — | Which seed/product interested in |
| `message` | string | — | — | Free-text message |
| `source_page` | string | — | — | Which page the form was submitted from |
| `status` | string (enum) | — | `"New"` | `New` \| `Contacted` \| `Qualified` \| `Closed` |

**RLS Rules:**
- **Create:** Public (anyone can submit)
- **Read / Update / Delete:** Admin only

---

### 7. ExpertQuery

**Purpose:** "Ask an Expert" form submissions — farmer questions to agronomy experts

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | string | ✅ | — | Farmer name |
| `mobile` | string | ✅ | — | Phone number |
| `state` | string | — | — | Farmer's state |
| `district` | string | — | — | Farmer's district |
| `crop` | string | — | — | Which crop the question is about |
| `selected_seed` | string | — | — | Which seed variety (if applicable) |
| `question` | string | ✅ | — | The farmer's question |
| `status` | string (enum) | — | `"New"` | `New` \| `Answered` \| `Closed` |

**RLS Rules:**
- **Create:** Public (anyone can submit)
- **Read / Update / Delete:** Admin only

---

### 8. DistributorApplication

**Purpose:** "Become a Dealer/Distributor" application form submissions

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `full_name` | string | ✅ | — | Applicant full name |
| `business_name` | string | — | — | Business/shop name |
| `mobile` | string | ✅ | — | Phone number |
| `email` | string | — | — | Email address |
| `gst_number` | string | — | — | GST registration number |
| `state` | string | ✅ | — | State |
| `district` | string | ✅ | — | District |
| `city` | string | — | — | City |
| `existing_brands` | string | — | — | Brands currently dealing |
| `years_experience` | number | — | — | Years in seed business |
| `area_served` | string | — | — | Geographic area served |
| `message` | string | — | — | Additional notes |
| `status` | string (enum) | — | `"New"` | `New` \| `Reviewing` \| `Approved` \| `Rejected` |

**RLS Rules:**
- **Create:** Public (anyone can submit)
- **Read / Update / Delete:** Admin only

---

### 9. SiteSetting

**Purpose:** Dynamic key-value settings for homepage content (hero, sections, banners, etc.)

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `setting_key` | string | ✅ | — | Unique key (e.g., "hero_title", "hero_video_url") |
| `setting_value` | string | ✅ | — | Value (can be string, JSON-stringified for complex values) |
| `setting_group` | string | — | — | Grouping (e.g., "homepage", "contact", "global") |

**RLS Rules:**
- **Read:** Public (everyone)
- **Create / Update / Delete:** Admin only

---

### 10. User (Built-in)

**Purpose:** App users — admins who manage content via `/admin` panel

| Field | Type | Editable | Description |
|-------|------|----------|-------------|
| `id` | string | — | Unique user ID |
| `email` | string | — | Login email |
| `full_name` | string | — | Display name |
| `role` | string | ✅ (admin) | `"admin"` \| `"user"` (default: `"admin"`) |
| `created_date` | datetime | — | Account creation date |

**Notes:**
- User records **cannot** be created or imported via SDK — users join via `base44.users.inviteUser(email, role)`.
- Only admins can list/update/delete other users.
- Built-in security enforced by platform.

---

## Entity Relationships

```
CropCategory (1) ──── (N) SeedVariety
                           │
                           ├── (N) SeedImage
                           └── (N) SeedDocument

Dealer           ── standalone (no parent)

Enquiry          ── standalone (form submission)
ExpertQuery      ── standalone (form submission)
DistributorApplication ── standalone (form submission)

SiteSetting      ── standalone (key-value config)

User             ── standalone (auth managed by platform)
```

**Relationship via fields:**
- `SeedVariety.crop_category_id` → `CropCategory.id`
- `SeedImage.seed_variety_id` → `SeedVariety.id`
- `SeedDocument.seed_variety_id` → `SeedVariety.id`

---

## RLS Summary Matrix

| Entity | Public Read | Public Create | Admin Only |
|--------|:-----------:|:------------:|:---------:|
| CropCategory | ✅ (published only) | ❌ | C/U/D |
| SeedVariety | ✅ (published only) | ❌ | C/U/D |
| SeedImage | ✅ (all) | ❌ | C/U/D |
| SeedDocument | ✅ (published only) | ❌ | C/U/D |
| Dealer | ✅ (all) | ❌ | C/U/D |
| Enquiry | ❌ | ✅ | R/U/D |
| ExpertQuery | ❌ | ✅ | R/U/D |
| DistributorApplication | ❌ | ✅ | R/U/D |
| SiteSetting | ✅ (all) | ❌ | C/U/D |
| User | — | ❌ | List/U/D |

*C = Create, R = Read, U = Update, D = Delete*

---

## Admin Panel Access

The admin panel is at `/admin` and requires an authenticated user with `role: "admin"`.

**Admin Tabs:**
1. **Seeds** — Manage SeedVariety records (CRUD)
2. **Categories** — Manage CropCategory records (CRUD)
3. **Dealers** — Manage Dealer records (CRUD)
4. **Home Content** — Manage SiteSetting records (homepage content)
5. **Enquiries** — View/manage Enquiry submissions
6. **Expert Queries** — View/manage ExpertQuery submissions
7. **Distributor Applications** — View/manage DistributorApplication submissions

---

## File Locations

Entity schema definitions (JSON):
```
base44/entities/
├── CropCategory.jsonc
├── SeedVariety.jsonc
├── SeedImage.jsonc
├── SeedDocument.jsonc
├── Dealer.jsonc
├── Enquiry.jsonc
├── ExpertQuery.jsonc
├── DistributorApplication.jsonc
├── SiteSetting.jsonc
└── User.jsonc
```

Admin manager components:
```
src/components/admin/
├── SeedsManager.jsx
├── CategoriesManager.jsx
├── DealersManager.jsx
├── HomeContentManager.jsx
└── ImageUrlField.jsx
```

Data access layers:
```
src/lib/
├── seedCatalog.js     # Seed & category data fetching
├── dealerCatalog.js    # Dealer data fetching & filtering
└── siteSettings.js     # SiteSetting data fetching
``