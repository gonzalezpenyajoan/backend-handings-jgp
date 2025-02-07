import { hash } from '#common/helpers/index.js';
import UserModel from '#dals/user/user.context.js';
import HouseModel from '#dals/house/house.context.js';
import { db } from '#dals/mock-data.js';

export const run = async () => {
    for (const user of db.users) {
        const hashedPassword = await hash(user.password);

        await UserModel.create({
            ...user,
            password: hashedPassword,
        });
    }

    await HouseModel.insertMany(db.houses);
}