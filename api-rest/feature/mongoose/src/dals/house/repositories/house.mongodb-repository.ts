import { HouseRepository } from "./house.repository.js";
import { House } from "../house.model.js";
import HouseModel from "../house.context.js";
import { ObjectId, ReturnDocument } from "mongodb";

export const mongoDBRepository: HouseRepository = {
  getHouseList: async (page?: number, pageSize?: number) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await HouseModel
      .find()
      .skip(skip)
      .limit(limit)
      .lean() as House[];
  },
  getHouse: async (id: string) => {
    return await HouseModel.findOne({_id: new ObjectId(id)}).lean() as House;
  },
  saveHouse: async (house: House) => {
    return await HouseModel
      .findOneAndUpdate(
        { _id: house._id },
        { $set: house },
        {
          upsert: true,
          returnDocument: 'after'
        }
      );
  },
  deleteHouse: async (id: string) => {
    const { deletedCount } = await HouseModel.deleteOne({_id: new ObjectId(id)});
    return deletedCount === 1;
  },
  postReview: async (id: string, review) => {
    const review_id = new ObjectId();
    const { reviews } =  await HouseModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $push: {
          reviews: {
            _id: review_id,
            date: new Date(),
            ...review
          }
        }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    );
    return reviews.find((r) => r._id === review_id);
  },
  updateHouse: async (house: House): Promise<House> => {
    return await HouseModel.findOneAndUpdate(
      { _id: new ObjectId(house._id) },
      { $set: house },
      { returnDocument: 'after' }
    ).lean() as House;
  }
};