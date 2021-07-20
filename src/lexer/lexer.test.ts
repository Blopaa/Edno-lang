import {lexer} from "./";

describe('lexer testing', () => {

    test('variable declaration', () => {

        const DSL: string = "dec const hello = 'hi'"
        const DSL2: string = "dec fit hello = 'hi'"
        const DSL3: string = "dec hello = 'hi'"
        function DSL3ShouldError(){
            lexer(DSL3)
        }
        expect(lexer(DSL)).toEqual(
            [
                {type: 'VariableDeclaration'},
                {type: 'Const'},
                {type: 'Literal', value: 'hello'},
                {type: 'AssignmentOperator'},
                {type: 'String', value: 'hi'},
            ]
        )
        expect(lexer(DSL2)).toEqual(
            [
                {type: 'VariableDeclaration'},
                {type: 'Fit'},
                {type: 'Literal', value: 'hello'},
                {type: 'AssignmentOperator'},
                {type: 'String', value: 'hi'},
            ]
        )
        expect(DSL3ShouldError).toThrowError('Illegal action, variable declaration must be classified as const or fit')

    })

    test("Literal", () => {

        const DSL = "hello"
        const DSL2 = '0hello'

        function DSL2ShouldError() {
            lexer(DSL2);
        }

        expect(lexer(DSL)).toEqual([{type: 'Literal', value: 'hello'}])
        expect(DSL2ShouldError).toThrowError('Unknown input character: 0')

    })

    test('String', () => {
        const DSL = "'hello'"
        const DSL2 = "''hello''"

        function DSL2ShouldError() {
            lexer(DSL2)
        }

        expect(lexer(DSL)).toEqual([{type: "String", value: 'hello'}])
        expect(DSL2ShouldError).toThrowError('Illegal structure, inspected void string')
    })

    test('Function', () => {
        const DSL = "function(x){print(x)}"

        expect(lexer(DSL)).toEqual([
            {type: "Function"},
            {type: 'OpenParenthesis'},
            {type: "Literal", value: "x"},
            {type: "ClosedParenthesis"},
            {type: "OpenKeyParenthesis"},
            {type: "Log"},
            {type: "OpenParenthesis"},
            {type: "Literal", value: "x"},
            {type: "ClosedParenthesis"},
            {type: "ClosedKeyParenthesis"},
        ])
    })
})