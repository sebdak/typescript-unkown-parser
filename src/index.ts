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

    protected getPrimitive(prop: PropType<T>, primitive: 'string'): string | undefined;
    protected getPrimitive(prop: PropType<T>, primitive: 'string', required: 'REQUIRED'): string;

    protected getPrimitive(prop: PropType<T>, primitive: 'number'): number | undefined;
    protected getPrimitive(prop: PropType<T>, primitive: 'number', required: 'REQUIRED'): number;

    protected getPrimitive(prop: PropType<T>, primitive: 'boolean'): boolean | undefined;
    protected getPrimitive(prop: PropType<T>, primitive: 'boolean', required: 'REQUIRED'): boolean;

    protected getPrimitive(
        prop: PropType<T>,
        primitive: 'string' | 'number' | 'boolean',
        required?: 'REQUIRED',
    ): string | number | boolean | undefined {
        const maybeProp = this.data[prop];
        if (required === 'REQUIRED' || maybeProp !== undefined) {
            this.assert(
                typeof maybeProp === primitive,
                `Property ${prop} of type ${typeof maybeProp} is not assignable to type ${primitive}`,
            );
            return maybeProp;
        }
    }

    protected getDate(prop: PropType<T>): Date | undefined;
    protected getDate(prop: PropType<T>, required: 'REQUIRED'): Date;
    protected getDate(prop: PropType<T>, required?: 'REQUIRED'): Date | undefined {
        const maybeDateString = this.data[prop];
        if (required === 'REQUIRED' || maybeDateString !== undefined) {
            this.assert(
                typeof maybeDateString === 'string',
                `Property ${prop} of type ${typeof maybeDateString} can not be parsed as date`,
            );
            const s = '-';
            const validator = new RegExp(
                `^(?!0{4}${s}0{2}${s}0{2})((?=[0-9]{4}${s}(((0[^2])|1[0-2])|02(?=${s}(([0-1][0-9])|2[0-8])))${s}[0-9]{2})|(?=((([13579][26])|([2468][048])|(0[48]))0{2})|([0-9]{2}((((0|[2468])[48])|[2468][048])|([13579][26])))${s}02${s}29))([0-9]{4})${s}(?!((0[469])|11)${s}31)((0[1,3-9]|1[0-2])|(02(?!${s}3)))${s}([0-2][0-9]|3[0-1])$`,
            );
            this.assert(
                validator.test(maybeDateString),
                `Property ${prop} with value ${maybeDateString} is not a valid date`,
            );
            return new Date(maybeDateString);
        }
    }

    protected getArray(prop: PropType<T>): Array<unknown> | undefined;
    protected getArray(prop: PropType<T>, required: 'REQUIRED'): Array<unknown>;
    protected getArray(prop: PropType<T>, required?: 'REQUIRED'): Array<unknown> | undefined {
        const maybeArray = this.data[prop];
        if (required === 'REQUIRED' || maybeArray !== undefined) {
            this.assert(
                Array.isArray(maybeArray),
                `Property ${prop} of type ${typeof maybeArray} is not assignable to type array`,
            );
            return maybeArray;
        }
    }

    protected getEnum<K>(e: K, prop: PropType<T>): keyof K | undefined;
    protected getEnum<K>(e: K, prop: PropType<T>, required: 'REQUIRED'): keyof K;
    protected getEnum<K>(e: K, prop: PropType<T>, required?: 'REQUIRED'): keyof K | undefined {
        const maybeEnum = this.data[prop];
        if (required === 'REQUIRED' || maybeEnum !== undefined) {
            this.assert(
                typeof maybeEnum === 'string',
                `Property ${prop} of type ${typeof maybeEnum} is not assignable as enum key`,
            );
            this.assert(
                Object.keys(e).includes(maybeEnum),
                `Could not match any enum key to property ${prop} with value ${maybeEnum}`,
            );
            // TODO: see if this can be typesafe
            return maybeEnum as keyof K;
        }
    }

    protected getArrayOfEnum<EnumT>(e: EnumT, prop: keyof T): Array<keyof EnumT> | undefined;
    protected getArrayOfEnum<EnumT>(e: EnumT, prop: keyof T, required: 'REQUIRED'): Array<keyof EnumT>;
    protected getArrayOfEnum<EnumT>(e: EnumT, prop: keyof T, required?: 'REQUIRED'): Array<keyof EnumT> | undefined {
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

export default UnknownParser;
