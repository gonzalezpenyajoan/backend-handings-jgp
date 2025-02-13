import { hash } from '#common/helpers/index.js';
import { getUserContext } from '#dals/user/user.context.js';
import { getHouseContext } from '#dals/house/house.context.js';
import { db } from '#dals/mock-data.js';

export const run = async () => {
    for (const user of db.users) {
        const hashedPassword = await hash(user.password);

        await getUserContext().insertOne({
            ...user,
            password: hashedPassword,
        });
    }

    await getHouseContext().insertMany(db.houses);
}