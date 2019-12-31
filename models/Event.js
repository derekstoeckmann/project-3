const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Event must have a creator."]
    },
    title: {
      type: String,
      required: [true, "Event must have a title."],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Event must have a description."]
    },
    time: {
      type: Date,
      required: [true, "Event must have a date and time."]
    },
    streetAddress: {
      type: String,
      required: [true, "Event must have an address."]
    },
    city: {
      type: String,
      required: [true, "Event must have a city."]
    },
    state: {
      type: String,
      required: [true, "Event must have a state."]
    },
    zip: {
      type: String,
      required: [true, "Event must have a zip code."]
    },
    attending: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ]
    },
    bringYourOwn: {
      type: String,
      trim: true
    },
    highlights: {
      type: [String],
      validate: [
        array => array.length <= 5,
        "No more than 5 highlights allowed."
      ]
    },
    public: {
      type: Boolean,
      default: true
    },
    tags: {
      type: [
        {
          type: String,
          trim: true,
          lowercase: true
        }
      ]
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Outdoor/Adventure",
        "Technology",
        "Family",
        "Health/Wellness",
        "Sports/Fitness",
        "Learning",
        "Photography",
        "Food/Drink",
        "Writing",
        "Language/Culture",
        "Music",
        "Movements",
        "LGBTQ",
        "Film",
        "Sci-Fi/Games",
        "Beliefs",
        "Arts",
        "Book Clubs",
        "Dance",
        "Pets",
        "Hobbies/Crafts",
        "Fashion/Beauty",
        "Social",
        "Career/Business"
      ]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Event", EventSchema);
