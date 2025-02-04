import { Router } from "express";
import { mapHouseFromModelToAPI, mapHouseListFromModelToAPI } from "./house.mappers.js";
import { houseRepository } from "#dals/index.js";

export const houseAPI = Router();

houseAPI
    .get("/", async (req, res, next) => {
        try {
            const page = Number(req.query.page);
            const pageSize = Number(req.query.pageSize);
            const houseList = await houseRepository.getHouseList(page, pageSize);
            res.send(mapHouseListFromModelToAPI(houseList));
        } catch (error) {
            next(error);
        }
    })
    .get("/:houseId", async (req, res, next) => {
        try {
            const { houseId } = req.params;
            const house = await houseRepository.getHouse(houseId);
            res.send(mapHouseFromModelToAPI(house));
        } catch (error) {
            next(error);
        }
    })
    .post("/:houseId/reviews", async (req, res, next) => {
        try {
            const { houseId } = req.params;
            const receivedReview = req.body;
            const review = await houseRepository.postReview( houseId, receivedReview );
            res.status(201).send(review);
        } catch (error) {
            next(error);
        }
    });
