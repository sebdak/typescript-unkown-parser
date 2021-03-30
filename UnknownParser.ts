type PropType<T> = keyof Omit<T, keyof UnknownParser<T>>;

class UnknownParser<T> {
    private data: any;

    constructor(data: any, constructorName: string) {
        this.assert(
            typeof data === 'object',
            `Data of type ${typeof data} passed to ${constructorName} constructor is not assignable to type "object"`,
        );
        this.data = data;
    }

    // Will infer the condition on the property that is tested
    private assert(condition: any, msg: string): asserts condition {
        if (!condition) {
            throw new TypeError(msg);
        }
    }

    getArray(prop: PropType<T>): Array<unknown> | undefined;
    getArray(prop: PropType<T>, required: 'REQUIRED'): Array<unknown>;
    getArray(prop: PropType<T>, required?: 'REQUIRED'): Array<unknown> | undefined {
        const maybeArray = this.data[prop];
        if (required === 'REQUIRED' || maybeArray !== undefined) {
            this.assert(
                Array.isArray(maybeArray),
                `Property ${prop} of type ${typeof maybeArray} is not assignable to type array`,
            );
            return maybeArray;
        }
    }

    getString(prop: PropType<T>): string | undefined;
    getString(prop: PropType<T>, required: 'REQUIRED'): string;
    getString(prop: PropType<T>, required?: 'REQUIRED'): string | undefined {
        const maybeStr = this.data[prop];
        if (required === 'REQUIRED' || maybeStr !== undefined) {
            this.assert(
                typeof maybeStr === 'string',
                `Property ${prop} of type ${typeof maybeStr} is not assignable to type string`,
            );
            return maybeStr;
        }
    }

    getNumber(prop: PropType<T>): number | undefined;
    getNumber(prop: PropType<T>, required: 'REQUIRED'): number;
    getNumber(prop: PropType<T>, required?: 'REQUIRED'): number | undefined {
        const maybeNumber = this.data[prop];
        if (required === 'REQUIRED' || maybeNumber !== undefined) {
            this.assert(
                typeof maybeNumber === 'number',
                `Property ${prop} of type ${typeof maybeNumber} is not assignable to type number`,
            );
            return maybeNumber;
        }
    }

    getBoolean(prop: PropType<T>): boolean | undefined;
    getBoolean(prop: PropType<T>, required: 'REQUIRED'): boolean;
    getBoolean(prop: PropType<T>, required?: 'REQUIRED'): boolean | undefined {
        const maybeBoolean = this.data[prop];
        if (required === 'REQUIRED' || maybeBoolean !== undefined) {
            this.assert(
                typeof maybeBoolean === 'boolean',
                `Property ${prop} of type ${typeof maybeBoolean} is not assignable to type boolean`,
            );
            return maybeBoolean;
        }
    }

    getIsoDate(prop: PropType<T>): Date | undefined;
    getIsoDate(prop: PropType<T>, required: 'REQUIRED'): Date;
    getIsoDate(prop: PropType<T>, required?: 'REQUIRED'): Date | undefined {
        const maybeDateString = this.data[prop];
        if (required === 'REQUIRED' || maybeDateString !== undefined) {
            this.assert(
                typeof maybeDateString === 'string',
                `Property ${prop} of type ${typeof maybeDateString} can not be parsed as date`,
            );
            const isoDateRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
            this.assert(
                isoDateRegex.test(maybeDateString),
                `Property ${prop} with value ${maybeDateString} is not a valid date`,
            );
            return new Date(maybeDateString);
        }
    }

    getStringAsEnumKey<K>(e: K, prop: PropType<T>): keyof K | undefined;
    getStringAsEnumKey<K>(e: K, prop: PropType<T>, required: 'REQUIRED'): keyof K;
    getStringAsEnumKey<K>(e: K, prop: PropType<T>, required?: 'REQUIRED'): keyof K | undefined {
        const maybeEnumKey = this.data[prop];
        if (required === 'REQUIRED') {
            this.assert(
                typeof maybeEnumKey === 'string',
                `Property ${prop} of type ${typeof maybeEnumKey} is not assignable as enum key`,
            );
            this.assert(
                Object.keys(e).includes(maybeEnumKey),
                `Could not match any enum key to property ${prop} with value ${maybeEnumKey}`,
            );
            // TODO: see if this can be typesafe
            return maybeEnumKey as keyof K;
        }
    }

    getArrayOfEnumKeys<EnumT>(e: EnumT, prop: keyof T): Array<keyof EnumT> | undefined;
    getArrayOfEnumKeys<EnumT>(e: EnumT, prop: keyof T, required: 'REQUIRED'): Array<keyof EnumT>;
    getArrayOfEnumKeys<EnumT>(e: EnumT, prop: keyof T, required?: 'REQUIRED'): Array<keyof EnumT> | undefined {
        const enumKeys = Object.keys(e);
        const maybeArray = this.data[prop];
        if (required === 'REQUIRED' || maybeArray !== undefined) {
            this.assert(
                Array.isArray(maybeArray),
                `Property ${prop} of type ${typeof maybeArray} is not assignable to type array`,
            );
            maybeArray.forEach((maybeEnumKey) => {
                this.assert(
                    typeof maybeEnumKey === 'string',
                    `Arrayvalue ${typeof maybeEnumKey} in property ${prop} is not assignable to type string`,
                );
                this.assert(
                    enumKeys.includes(maybeEnumKey),
                    `Arrayvalue ${typeof maybeEnumKey} in property ${prop} is not assignable to key of enum type`,
                );
            });
            return maybeArray as Array<keyof EnumT>;
        }
    }
}
