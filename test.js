var format = /[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
console.log(format.test("My@string-with(some%text)"))
console.log(format.test("My string with spaceês"))
console.log(format.test("MyStringContainingNoSpecialChars"))