import UnknownParser from '../index';

describe('UnknownParser', () => {
    describe('Primitives', () => {
        class Primitives extends UnknownParser<Primitives> {
            str?: string;
            reqString: string;
            num?: number;
            reqNum: number;
            bool?: boolean;
            reqBool: boolean;

            constructor(data: any) {
                super(data, 'Primitives');
                this.str = this.getPrimitive('str', 'string');
                this.reqString = this.getPrimitive('reqString', 'string', 'REQUIRED');
                this.num = this.getPrimitive('num', 'number');
                this.reqNum = this.getPrimitive('reqNum', 'number', 'REQUIRED');
                this.bool = this.getPrimitive('bool', 'boolean');
                this.reqBool = this.getPrimitive('reqBool', 'boolean', 'REQUIRED');
            }
        }

        describe('String', () => {
            it('Parses required string', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    reqBool: true,
                };
                const test = new Primitives(unknownObj);
                expect(test.reqString).toEqual('test');
            });

            it('Parses non-required string', () => {
                const unknownObj = {
                    reqString: 'test',
                    str: 'non-req',
                    reqNum: 123,
                    reqBool: true,
                };
                const test = new Primitives(unknownObj);
                expect(test.str).toEqual('non-req');
            });

            it('Throw error if required string is missing', () => {
                const unknownObj = {
                    reqNum: 123,
                    reqBool: true,
                };
                expect(() => {
                    new Primitives(unknownObj);
                }).toThrowError(TypeError);
            });

            it('Returns undefined if non-required string is missing', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    reqBool: true,
                };
                const test = new Primitives(unknownObj);
                expect(test.str).toBeUndefined();
            });

            it('Throws error if non-required string is defined but of wrong type', () => {
                const unknownObj = {
                    reqString: 'test',
                    str: 123,
                    reqNum: 123,
                    reqBool: true,
                };
                expect(() => {
                    new Primitives(unknownObj);
                }).toThrowError(TypeError);
            });
        });

        describe('Number', () => {
            it('Parses required number', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    reqBool: true,
                };
                const test = new Primitives(unknownObj);
                expect(test.reqNum).toEqual(123);
            });

            it('Parses non-required number', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    num: 123,
                    reqBool: true,
                };
                const test = new Primitives(unknownObj);
                expect(test.num).toEqual(123);
            });

            it('Throw error if required number is missing', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqBool: true,
                };
                expect(() => {
                    new Primitives(unknownObj);
                }).toThrowError(TypeError);
            });

            it('Returns undefined if non-required number is missing', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    reqBool: true,
                };
                const test = new Primitives(unknownObj);
                expect(test.num).toBeUndefined();
            });

            it('Throws error if non-required number is defined but of wrong type', () => {
                const unknownObj = {
                    reqString: 'test',
                    num: 'test',
                    reqNum: 123,
                    reqBool: true,
                };
                expect(() => {
                    new Primitives(unknownObj);
                }).toThrowError(TypeError);
            });
        });

        describe('Boolean', () => {
            it('Parses required boolean', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    reqBool: true,
                };
                const test = new Primitives(unknownObj);
                expect(test.reqBool).toEqual(true);
            });

            it('Parses non-required boolean', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    reqBool: true,
                    bool: false,
                };
                const test = new Primitives(unknownObj);
                expect(test.bool).toEqual(false);
            });

            it('Throw error if required boolean is missing', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                };
                expect(() => {
                    new Primitives(unknownObj);
                }).toThrowError(TypeError);
            });

            it('Returns undefined if non-required boolean is missing', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    reqBool: true,
                };
                const test = new Primitives(unknownObj);
                expect(test.bool).toBeUndefined();
            });

            it('Throws error if non-required boolean is defined but of wrong type', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    reqBool: true,
                    bool: 'test',
                };
                expect(() => {
                    new Primitives(unknownObj);
                }).toThrowError(TypeError);
            });
        });
    });
    describe('Date', () => {
        class MyDate extends UnknownParser<MyDate> {
            date?: Date;
            reqDate: Date;

            constructor(data: any) {
                super(data, 'Date');
                this.date = this.getDate('date');
                this.reqDate = this.getDate('reqDate', 'REQUIRED');
            }
        }

        it('Parses required date', () => {
            const unknownObj = {
                reqDate: '2021-04-01',
            };
            const test = new MyDate(unknownObj);
            expect(test.reqDate).toEqual(new Date('2021-04-01'));
        });

        it('Parses non-required date', () => {
            const unknownObj = {
                date: '2021-04-02',
                reqDate: '2021-04-01',
            };
            const test = new MyDate(unknownObj);
            expect(test.date).toEqual(new Date('2021-04-02'));
        });

        it('Throws error if required date is missing', () => {
            const unknownObj = {};
            expect(() => {
                new MyDate(unknownObj);
            }).toThrowError(TypeError);
        });

        it('Throws error if required date is not valid date string', () => {
            const unknownObj = {
                reqDate: 'test',
            };
            expect(() => {
                new MyDate(unknownObj);
            }).toThrowError(TypeError);
        });
    });

    describe('Array', () => {
        class MyArray extends UnknownParser<MyArray> {
            arr?: any[];
            reqArr: any[];

            constructor(data: any) {
                super(data, 'MyArray');
                this.arr = this.getArray('arr');
                this.reqArr = this.getArray('reqArr', 'REQUIRED');
            }
        }

        it('Parses required array', () => {
            const unknownObj = {
                reqArr: [],
            };
            const test = new MyArray(unknownObj);
            expect(test.reqArr).toEqual([]);
        });

        it('Parses non-required array', () => {
            const unknownObj = {
                reqArr: [],
                arr: [],
            };
            const test = new MyArray(unknownObj);
            expect(test.arr).toEqual([]);
        });

        it('Throws error if required array is missing', () => {
            const unknownObj = {};
            expect(() => {
                new MyArray(unknownObj);
            }).toThrowError(TypeError);
        });

        it('Returns undefined if non-required array is missing', () => {
            const unknownObj = {
                reqArr: [],
            };
            const test = new MyArray(unknownObj);
            expect(test.arr).toBeUndefined();
        });

        it('Throws error if required array is of wrong type', () => {
            const unknownObj = {
                reqArr: 'test',
            };
            expect(() => {
                new MyArray(unknownObj);
            }).toThrowError(TypeError);
        });

        it('Throws error if non-required array is defined but is of wrong type', () => {
            const unknownObj = {
                reqArr: [],
                arr: 'test',
            };
            expect(() => {
                new MyArray(unknownObj);
            }).toThrowError(TypeError);
        });
    });

    describe('Enum', () => {
        enum MyEnum {
            ONE,
            TWO,
            THREE,
        }

        class MyEnumClass extends UnknownParser<MyEnumClass> {
            enumProp?: keyof typeof MyEnum;
            reqEnumProp: keyof typeof MyEnum;

            constructor(data: any) {
                super(data, 'MyEnumClass');
                this.enumProp = this.getEnum(MyEnum, 'enumProp');
                this.reqEnumProp = this.getEnum(MyEnum, 'reqEnumProp', 'REQUIRED');
            }
        }

        it('Parses required enum', () => {
            const unknownObj = {
                reqEnumProp: 'ONE',
            };
            const test = new MyEnumClass(unknownObj);
            expect(test.reqEnumProp).toEqual('ONE');
        });

        it('Parses non-required enum', () => {
            const unknownObj = {
                reqEnumProp: 'ONE',
                enumProp: 'TWO',
            };
            const test = new MyEnumClass(unknownObj);
            expect(test.enumProp).toEqual('TWO');
        });

        it('Returns undefined if non-required enum is missing', () => {
            const unknownObj = {
                reqEnumProp: 'ONE',
            };
            const test = new MyEnumClass(unknownObj);
            expect(test.enumProp).toBeUndefined();
        });

        it('Throws error if required enum is not included in the expected enum', () => {
            const unknownObj = {
                reqEnumProp: 'TEST',
            };
            expect(() => {
                new MyEnumClass(unknownObj);
            }).toThrowError(TypeError);
        });

        it('Throws error if non-required enum is not included in the expected enum', () => {
            const unknownObj = {
                reqEnumProp: 'ONE',
                enumProp: 'TEST',
            };
            expect(() => {
                new MyEnumClass(unknownObj);
            }).toThrowError(TypeError);
        });
    });

    describe('Array of enum', () => {
        enum MyEnum {
            ONE,
            TWO,
            THREE,
        }

        class MyEnumClass extends UnknownParser<MyEnumClass> {
            enumArr?: (keyof typeof MyEnum)[];
            reqEnumArr: (keyof typeof MyEnum)[];

            constructor(data: any) {
                super(data, 'MyEnumClass');
                this.enumArr = this.getArrayOfEnum(MyEnum, 'enumArr');
                this.reqEnumArr = this.getArrayOfEnum(MyEnum, 'reqEnumArr', 'REQUIRED');
            }
        }

        it('Parses required array of enum', () => {
            const unknownObj = {
                reqEnumArr: ['ONE', 'TWO', 'THREE'],
            };
            const test = new MyEnumClass(unknownObj);
            expect(test.reqEnumArr).toEqual(['ONE', 'TWO', 'THREE']);
        });

        it('Parses empty array', () => {
            const unknownObj = {
                reqEnumArr: [],
            };
            const test = new MyEnumClass(unknownObj);
            expect(test.reqEnumArr).toEqual([]);
        });

        it('Parses non-required array of enum', () => {
            const unknownObj = {
                reqEnumArr: ['THREE'],
                enumArr: ['ONE', 'TWO', 'THREE'],
            };
            const test = new MyEnumClass(unknownObj);
            expect(test.enumArr).toEqual(['ONE', 'TWO', 'THREE']);
        });

        it('Returns undefined if non-required array of enum is missing', () => {
            const unknownObj = {
                reqEnumArr: ['ONE', 'TWO'],
            };
            const test = new MyEnumClass(unknownObj);
            expect(test.enumArr).toBeUndefined();
        });

        it('Throws error if required enum is not included in the expected enum', () => {
            const unknownObj = {
                reqEnumArr: ['ONE', 'TEST'],
            };
            expect(() => {
                new MyEnumClass(unknownObj);
            }).toThrowError(TypeError);
        });

        it('Throws error if non-required enum is not included in the expected enum', () => {
            const unknownObj = {
                reqEnumArr: ['THREE'],
                enumArr: ['TEST', 'TWO', 'THREE'],
            };
            expect(() => {
                new MyEnumClass(unknownObj);
            }).toThrowError(TypeError);
        });
    });
});
