import { createId } from "./id.helper.js";

describe("createId tests", () => {
    it("creates a valid id", () => {
        // Given - When
        const id: string = createId();

        // Then
        expect(id).toBeTypeOf('string');
        expect(Number.isInteger(Number(id))).toBe(true);
        expect(id.length).toBe(8);
    });
});