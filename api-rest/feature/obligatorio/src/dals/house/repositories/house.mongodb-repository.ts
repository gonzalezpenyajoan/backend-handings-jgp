import { HouseRepository } from "./house.repository.js";
import { House } from "../house.model.js";
import { getHouseContext } from "../house.context.js";
import { ObjectId } from "mongodb";

export const mongoDBRepository: HouseRepository = {
  getHouseList: async (page?: number, pageSize?: number) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await getHouseContext()
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();
  },
  getHouse: async (id: string) => {
    return await getHouseContext().findOne(
      {
        _id: new ObjectId(id)
      }
    )
  },
  saveHouse: async (house: House) => {
    return await getHouseContext()
      .findOneAndUpdate(
        {
          _id: house._id,
        },
        {
          $set: house,
        },
        {
          upsert: true,
          returnDocument: 'after'
        }
      );
  },
  deleteHouse: async (id: string) => {
    const { deletedCount } = await getHouseContext().deleteOne(
      {
        _id: new ObjectId(id)
      });
      return deletedCount === 1;
  },
  postReview: async (id: string, review) => {
    const review_id = new ObjectId();
    const { reviews } =  await getHouseContext().findOneAndUpdate(
      {
        _id: new ObjectId(id)
      },
      {
        $push: {
          reviews: {
            _id: review_id,
            date: new Date(),
            listing_id: new ObjectId(review.listing_id),
            reviewer_id: new ObjectId(review.reviewer_id),
            reviewer_name: review.reviewer_name,
            comments: review.comments
          }
        }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    );
    return reviews.find((r) => r._id === review_id);
  }
};