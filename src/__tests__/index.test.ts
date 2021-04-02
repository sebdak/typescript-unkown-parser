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
                expect(test.reqString).toBe('test');
            });

            it('Parses non-required string', () => {
                const unknownObj = {
                    reqString: 'test',
                    str: 'non-req',
                    reqNum: 123,
                    reqBool: true,
                };
                const test = new Primitives(unknownObj);
                expect(test.str).toBe('non-req');
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
                expect(test.reqNum).toBe(123);
            });

            it('Parses non-required number', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    num: 123,
                    reqBool: true,
                };
                const test = new Primitives(unknownObj);
                expect(test.num).toBe(123);
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
                expect(test.reqBool).toBe(true);
            });

            it('Parses non-required boolean', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    reqBool: true,
                    bool: false,
                };
                const test = new Primitives(unknownObj);
                expect(test.bool).toBe(false);
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
});
