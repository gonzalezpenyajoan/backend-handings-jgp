import { mapHouseFromAPIToModel, mapHouseListFromModelToAPI, mapHouseFromModelToAPI } from "./house.mappers.js";
import * as model from "#dals/index.js";
import * as apiModel from "./house.api-model.js";
import { db } from "#dals/mock-data.js";
import { createId } from "#common/helpers/id.helper.js";

describe("Mappers tests", () => {
    describe("mapHouseFromModelToAPI tests", () => {
        it("executes mapHouseFromModelToAPI correctly when given a model.House object", () => {
            // Given
            const house: model.House = db.houses[3];
    
            // When
            const apiHouse: apiModel.House = mapHouseFromModelToAPI(house);
    
            // Then
            expect(apiHouse.id).toBe(house._id);
            expect(apiHouse.name).toBe(house.name);
            expect(apiHouse.image).toBe(house.images.picture_url);
            expect(apiHouse.description).toBe(house.description);
            expect(apiHouse.address).toBe(house.address.street);
            expect(apiHouse.beds).toBe(house.beds);
            expect(apiHouse.bathrooms).toBe(house.bathrooms);
            expect(apiHouse.latest_reviews).toEqual(house.reviews);
        });
        it("executes mapHouseFromModelToAPI correctly and sorts reviews by date", () => {
            // Given
            const house: model.House = db.houses[3];
    
            // When
            const apiHouse: apiModel.House = mapHouseFromModelToAPI(house);
    
            // Then
            expect(apiHouse.latest_reviews.length).toEqual(4);
            expect(apiHouse.latest_reviews[0].date.getTime()).toEqual(new Date("2017-09-17T04:00:00.000Z").getTime());
            expect(apiHouse.latest_reviews[1].date.getTime()).toEqual(new Date("2017-02-15T05:00:00.000Z").getTime());
            expect(apiHouse.latest_reviews[2].date.getTime()).toEqual(new Date("2017-02-14T05:00:00.000Z").getTime());
            expect(apiHouse.latest_reviews[3].date.getTime()).toEqual(new Date("2017-02-12T05:00:00.000Z").getTime());
        });
        it("executes mapHouseFromModelToAPI correctly and retrieves a maximum of 5 reviews", () => {
            // Given
            const houseWith6Reviews: model.House = db.houses[0];
    
            // When
            const apiHouse: apiModel.House = mapHouseFromModelToAPI(houseWith6Reviews);
    
            // Then
            expect(apiHouse.latest_reviews.length).toEqual(5);
        });
        it("returns null when given null", () => {
            // Given - When
            const house: apiModel.House = mapHouseFromModelToAPI(null);

            // Then
            expect(house).toBeNull();
        });
    });
    describe("mapHouseListFromModelToAPI tests", () => {
        it("returns null when given null", () => {
            // Given - When
            const houses: apiModel.House[] = mapHouseListFromModelToAPI(null);

            // Then
            expect(houses).toBeNull();
        });
    });
    describe("mapHouseFromAPIToModel tests", () => {
        it("returns correct house data model given house api", () => {
            // Given
            const apiHouse: apiModel.House = {
                id: createId(),
                name: 'TestName',
                image: 'http://example.com/images/dummy.jpg',
                description: 'TestDescription',
                address: 'Random St 69',
                beds: 4,
                bathrooms: 2,
                latest_reviews: [
                    {
                        _id: createId(),
                        date: new Date("1998-05.22T05:00:00.000Z"),
                        listing_id: createId(),
                        reviewer_id: createId(),
                        reviewer_name: 'TestReviewerName',
                        comments: 'Lorem ipsum dolor sit amed'
                    }
                ]
            };

            // When
            const house: model.House = mapHouseFromAPIToModel(apiHouse);

            // Then
            expect(house._id).toBe(apiHouse.id);
            expect(house.name).toBe(apiHouse.name);
            expect(house.images.picture_url).toBe(apiHouse.image);
            expect(house.description).toBe(apiHouse.description);
            expect(house.address.street).toBe(apiHouse.address);
            expect(house.beds).toBe(apiHouse.beds);
            expect(house.bathrooms).toBe(apiHouse.bathrooms);
            expect(house.reviews).toEqual(apiHouse.latest_reviews);
        });
        it("returns null when given null", () => {
            // Given - When
            const house: model.House = mapHouseFromAPIToModel(null);

            // Then
            expect(house).toBeNull();
        });
    });
});