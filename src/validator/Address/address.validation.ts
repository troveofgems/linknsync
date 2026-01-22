import {z} from "zod";
export type AddressSchema = z.infer<typeof AddressSchemaObj>;

/**
 * Constants and Helper Functions
 * */
const
    COUNTRY_CODES = ['AUS', 'CAN', 'CYM', 'GBR', 'MEX', 'USA'] as const,
    ADDRESS_CONSTRAINTS = {
        MAX_STREET_LENGTH: 100,
        MAX_CITY_LENGTH: 100,
        MAX_POSTAL_LENGTH: 10
    } as const;

// Country Specific Patterns
const PATTERNS = {
    letters: /^[a-zA-Z\s'-]+$/,
    alphanumeric: /^[a-zA-Z0-9\s,'.-]+$/,
    postalCode: {
        usa: /^\d{5}(?:-\d{4})?$/,
        gbr: /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/,
        can: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d$/,
        mex: /^[0-9]{5}$/,
        cym: /^[KY][0-9]{4}$/,
        aus: /^[0-9]{4}$/
    }
};

export const AddressSchemaObj = z
    .object({
        isMUA: z.boolean(),
        street: z.string()
            .refine((value) => value === undefined || value.length <= ADDRESS_CONSTRAINTS.MAX_STREET_LENGTH, {
                message: `Street must be less than or equal to ${ADDRESS_CONSTRAINTS.MAX_STREET_LENGTH} characters`
            })
            .refine((value) => value === undefined || PATTERNS.alphanumeric.test(value), {
                message: "Street contains invalid characters"
            }),
        street2: z.string()
            .optional(),
        street3: z.string()
            .optional(),
        city: z.string()
            .max(ADDRESS_CONSTRAINTS.MAX_CITY_LENGTH, {
                message: `City must be no more than ${ADDRESS_CONSTRAINTS.MAX_CITY_LENGTH} characters`
            }),
        postalCode: z.string()
            .max(ADDRESS_CONSTRAINTS.MAX_POSTAL_LENGTH, {
                message: `Postal Code must be no more than ${ADDRESS_CONSTRAINTS.MAX_POSTAL_LENGTH} characters`
            }),
        state: z.string()
            .min(1, "State/Province must be at least 1 character")
            .max(3, "State/Province must be no more than 3 characters"),
        country: z.enum(COUNTRY_CODES)
    })
    .superRefine((data, ctx) => {
        const { postalCode, country } = data;

        if(!PATTERNS.alphanumeric.test(postalCode)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["postalCode"],
                message: "Postal code must be alphanumeric"
            });
            return false;
        }

        const countryPattern = PATTERNS.postalCode[country.toLowerCase() as keyof typeof PATTERNS.postalCode];
        if (!countryPattern || !countryPattern.test(postalCode)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["postalCode"],
                message: `Invalid postal code format for selected country: ${country}`
            });
            return false;
        }
        return true;
    });