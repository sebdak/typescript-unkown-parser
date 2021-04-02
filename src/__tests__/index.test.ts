import UnknownParser from '../index';

describe('UnknownParser', () => {
    describe('Primitives', () => {
        describe('String', () => {
            class TestClass extends UnknownParser<TestClass> {
                str?: string;
                reqString: string;
                num?: number;
                reqNum: number;
                bool?: boolean;
                reqBool: boolean;

                constructor(data: any) {
                    super(data, 'TestClass');
                    this.str = this.getString('str');
                    this.reqString = this.getString('reqString', 'REQUIRED');
                    this.num = this.getNumber('num');
                    this.reqNum = this.getNumber('reqNum', 'REQUIRED');
                    this.bool = this.getBoolean('bool');
                    this.reqBool = this.getBoolean('reqBool', 'REQUIRED');
                }
            }

            it('Parses required string', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    reqBool: true,
                };
                const test = new TestClass(unknownObj);
                expect(test.reqString).toBe('test');
            });

            it('Parses non-required string', () => {
                const unknownObj = {
                    reqString: 'test',
                    str: 'non-req',
                    reqNum: 123,
                    reqBool: true,
                };
                const test = new TestClass(unknownObj);
                expect(test.str).toBe('non-req');
            });

            it('Throw error if required prop is missing', () => {
                const unknownObj = {
                    reqNum: 123,
                    reqBool: true,
                };
                expect(() => {
                    new TestClass(unknownObj);
                }).toThrowError(TypeError);
            });

            it('Returns undefined if non-required prop is missing', () => {
                const unknownObj = {
                    reqString: 'test',
                    reqNum: 123,
                    reqBool: true,
                };
                const test = new TestClass(unknownObj);
                expect(test.str).toBeUndefined();
            });

            it('Throws error if non-required prop if defined but of wrong type', () => {
                const unknownObj = {
                    reqString: 'test',
                    str: 123,
                    reqNum: 123,
                    reqBool: true,
                };
                expect(() => {
                    new TestClass(unknownObj);
                }).toThrowError(TypeError);
            });
        });
    });
});
