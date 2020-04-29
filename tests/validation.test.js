const validation = require("../core/validation");

describe("Validation", () => {
    const invalidProvider = {
        errors: { providerName: "provider name is required" },
        isValid: false
    };
    test("Should validate provider name is not empty", () => {
        expect(
            validation({ file: { path: {} }, providerName: null })
        ).toStrictEqual(invalidProvider);
    });

    const invalidFile = {
        errors: { providerName: "file is required" },
        isValid: false
    };
    test("Should validate file is not empty", () => {
        expect(validation({ file: {}, providerName: "test" })).toStrictEqual(
            invalidFile
        );
    });
});
