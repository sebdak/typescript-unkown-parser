# TypeScript Unkown Parser 🃏

TypeScript is great tool for statically enforcing types at compile time, but this can quickly become a false security when dealing with unkown data from the "outside world".

typescript-unknown-parser uses ES6 classes to parse unknown objects, and throws en error if

-   required properties are missing
-   properties (required and non-required) are of wrong type.

## Usage

```bash
npm i typescript-unknown-parser
```

1. Make a class with expected typed properties. Extend it by UnknownParser imported from typescript-unknown-parser, and pass the class as a generic type argument.
2. Call `super(data, 'MyClass')` with the unknown data and the name of the class
3. Set all properties with the `protected` functions: `getPrimitive, getIsoDate, getArray, getStringAsEnumKey, getArrayOfEnumKeys`

```typescript
import UnknownParser from 'typescript-unknown-parser';

class MyClass extends UnknownParser<MyClass> {
    myString?: string;
    myRequiredString: string;

    constructor(data: any) {
        super(data, 'MyClass'); // Pass the name of the class as the second parameter
        this.myString = this.getPrimitive('myString', 'string');
        this.myRequiredString = this.getPrimitive('myRequiredString', 'string', 'REQUIRED');
    }
}
```

Then, in your application, parse unknown data by calling the MyClass constructor

```typescript
fetch('url.com')
    .then((res) => res.json())
    .then((data: unknown) => {
        const myObject = new MyClass(data); // myObject is of type MyClass
        // Do what you want with the parsed object
    })
    .catch((e) => {
        console.error(e); // TypeError is thrown if the data does not conform to the expected class interface
    });
```

## Versioning

Keep in mind that the API can change at any time before hitting version `1.0.0`.
