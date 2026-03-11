# SIXTEEN TRAVEL - Site Tree & ID Map

This document maps the structural hierarchy of the website. Every section and primary child element is assigned a unique ID for surgical targeting.

## Convention
- **Sections**: `st-section-[page]-[name]`
- **Children**: `st-child-[section-id]-[purpose]`

---

## 1. Global Components (Common)
### Navbar
- **ID**: `st-section-global-navbar`
- **Children**:
  - `st-child-global-navbar-logo`: Brand logo/monogram
  - `st-child-global-navbar-links`: Main navigation container
  - `st-child-global-navbar-action`: Primary CTA (e.g., Book Now)

### Footer
- **ID**: `st-section-global-footer`
- **Children**:
  - `st-child-global-footer-branding`: Footer logo and bio
  - `st-child-global-footer-links`: Navigation columns
  - `st-child-global-footer-socials`: Social media icons
  - `st-child-global-footer-legal`: Copyright and legal links

### Golden Trace (Background Animation)
- **ID**: `st-section-global-trace`

### Preloader
- **ID**: `st-section-global-preloader`
- **Children**:
  - `st-child-global-preloader-counter`: Loading percentage
  - `st-child-global-preloader-status`: Status text messages

---

## 2. Page: Home (/)
### Hero Section
- **ID**: `st-section-home-hero`
- **Children**:
  - `st-child-home-hero-badge`: "Exclusive Mauritius Experience" tag
  - `st-child-home-hero-heading`: "Travel in Sublime Style"
  - `st-child-home-hero-booking-bar`: Glassmorphic search/booking interface

### What We Do Section
- **ID**: `st-section-home-about`
- **Children**:
  - `st-child-home-about-header`: Section intro
  - `st-child-home-about-cards`: Service cards grid

### About Sixteen Section (Our Story)
- **ID**: `st-section-home-story`
- **Children**:
  - `st-child-home-story-image`: Featured image with "16+" badge
  - `st-child-home-story-content`: Text content and mission statement

### Services Section
- **ID**: `st-section-home-services`
- **Children**:
  - `st-child-home-services-header`: Section title and subtitle
  - `st-child-home-services-grid`: Container for service cards

### Offers Section (Signature Collections)
- **ID**: `st-section-home-offers`
- **Children**:
  - `st-child-home-offers-header`: Section introduction
  - `st-child-home-offers-list`: Featured collection items

### Car Rental Preview
- **ID**: `st-section-home-cars`
- **Children**:
  - `st-child-home-cars-grid`: Vehicle selection cards

### Ready for Departure (CTA)
- **ID**: `st-section-home-cta`
- **Children**:
  - `st-child-home-cta-heading`: "Ready for Departure?"
  - `st-child-home-cta-button`: "Plan Your Trip Now" button

### Blog Grid Preview
- **ID**: `st-section-home-blog`
- **Children**:
  - `st-child-home-blog-header`: Section title
  - `st-child-home-blog-grid`: Recent posts container

### Contact Section
- **ID**: `st-section-home-contact`
- **Children**:
  - `st-child-home-contact-heading`: Section title
  - `st-child-home-contact-description`: Section text
  - `st-child-home-contact-form`: Booking/Inquiry form
  - `st-child-home-contact-submit`: Form submit button

---

## 3. Page: Car Rental (/car-rental)
### Header Section
- **ID**: `st-section-cars-header`
### Perks Section
- **ID**: `st-section-cars-perks`
### Fleet Section
- **ID**: `st-section-cars-fleet`
  - `st-child-cars-fleet-grid`: Main vehicle list

---

## 4. Page: Tours (/tours)
### Header Section
- **ID**: `st-section-tours-header`
### Journeys Section
- **ID**: `st-section-tours-list`
  - `st-child-tours-list-container`: Vertical list of tours

---

## 5. Page: Activities (/activities)
### Header Section
- **ID**: `st-section-activities-header`
### Grid Section
- **ID**: `st-section-activities-grid`
  - `st-child-activities-grid-container`: 2x2 activity layout

---

## 6. Page: Boutique (/boutique)
### Header Section
- **ID**: `st-section-boutique-header`
### Product Section
- **ID**: `st-section-boutique-products`
  - `st-child-boutique-products-grid`: Product listing container

---

## 7. Page: Blog (/blog)
### Header Section
- **ID**: `st-section-blog-header`
### Content Section
- **ID**: `st-section-blog-content`
  - `st-child-blog-content-featured`: Featured post card
  - `st-child-blog-content-grid`: Standard post grid
