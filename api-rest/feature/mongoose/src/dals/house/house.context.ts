import { Schema, model } from "mongoose";

const imagesSchema = new Schema({
  thumbnail_url: { type: String, required: false },
  medium_url: { type: String, required: false },
  picture_url: { type: String, required: false },
  xl_picture_url: { type: String, required: false }
});

const hostSchema = new Schema({
  host_id: { type: String, required: true },
  host_url: { type: String, required: true },
  host_name: { type: String, required: true },
  host_location: { type: String, required: true },
  host_about: { type: String, required: false },
  host_response_time: { type: String, required: false },
  host_thumbnail_url: { type: String, required: false },
  host_picture_url: { type: String, required: false },
  host_neighbourhood: { type: String, required: false },
  host_response_rate: { type: Number, required: false },
  host_is_superhost: { type: Boolean, required: true },
  host_has_profile_pic: { type: Boolean, required: true },
  host_identity_verified: { type: Boolean, required: true },
  host_listings_count: { type: Number, required: true },
  host_total_listings_count: { type: Number, required: true },
  host_verifications: { type: [String], required: false }
});

const addressSchema = new Schema({
  street: { type: String, required: true },
  suburb: { type: String, required: false },
  government_area: { type: String, required: false },
  market: { type: String, required: false },
  country: { type: String, required: false },
  country_code: { type: String, required: false },
  location: {
    type: { type: String, required: false },
    coordinates: { type: [Number], required: false },
    is_location_exact: { type: Boolean, required: false }
  }
});

const availabilitySchema = new Schema({
  availability_30: { type: Number, required: true },
  availability_60: { type: Number, required: true },
  availability_90: { type: Number, required: true },
  availability_365: { type: Number, required: true }
});

const reviewScoresSchema = new Schema({
  review_scores_accuracy: { type: Number, required: false },
  review_scores_cleanliness: { type: Number, required: false },
  review_scores_checkin: { type: Number, required: false },
  review_scores_communication: { type: Number, required: false },
  review_scores_location: { type: Number, required: false },
  review_scores_value: { type: Number, required: false },
  review_scores_rating: { type: Number, required: false }
});

const reviewSchema = new Schema({
  _id: { type: String, required: true },
  date: { type: Date, required: true },
  listing_id: { type: String, required: true },
  reviewer_id: { type: String, required: true },
  reviewer_name: { type: String, required: true },
  comments: { type: String, required: false }
});

const houseSchema = new Schema({
  _id: { type: String, required: true },
  listing_url: { type: String, required: false },
  name: { type: String, required: true },
  summary: { type: String, required: false },
  space: { type: String, required: false },
  description: { type: String, required: true },
  neighborhood_overview: { type: String, required: false },
  notes: { type: String, required: false },
  transit: { type: String, required: false },
  access: { type: String, required: false },
  interaction: { type: String, required: false },
  house_rules: { type: String, required: false },
  property_type: { type: String, required: false },
  room_type: { type: String, required: false },
  bed_type: { type: String, required: false },
  minimum_nights: { type: String, required: false },
  maximum_nights: { type: String, required: false },
  cancellation_policy: { type: String, required: false },
  last_scraped: { type: Date, required: false },
  calendar_last_scraped: { type: Date, required: false },
  first_review: { type: Date, required: false },
  last_review: { type: Date, required: false },
  accommodates: { type: Number, required: false },
  bedrooms: { type: Number, required: false },
  beds: { type: Number, required: true },
  number_of_reviews: { type: Number, required: false },
  bathrooms: { type: Number, required: true },
  amenities: { type: [String], required: false },
  price: { type: Number, required: false },
  weekly_price: { type: Number, required: false },
  monthly_price: { type: Number, required: false },
  security_deposit: { type: Number, required: false },
  cleaning_fee: { type: Number, required: false },
  extra_people: { type: Number, required: false },
  guests_included: { type: Number, required: false },
  images: { type: imagesSchema, required: false },
  host: { type: hostSchema, required: false },
  address: { type: addressSchema, required: false },
  availability: { type: availabilitySchema, required: false },
  review_scores: { type: reviewScoresSchema, required: false },
  reviews: { type: [reviewSchema], required: false }
});

const HouseModel = model("House", houseSchema);
export default HouseModel;