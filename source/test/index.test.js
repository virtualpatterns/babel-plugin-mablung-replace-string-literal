import { createRequire as CreateRequire } from 'module'
import Babel from '@babel/core'
import Test from 'ava'

const Require = CreateRequire(import.meta.url)

Test.beforeEach((test) => {

  test.context.option = { 
    'plugins': [ 
      [
        Require.resolve('../index.cjs'),
        {
          'rule': [
            {
              'searchFor': /^(\.{1,2}\/.*?)\.js$/gi,
              'replaceWith': '$1.cjs'
            }
          ]
        }      
      ]
    ]
  }
  
})

Test('import', async (test) => {

  let codeIn = 'import { abc } from \'./abc.js\''
  let expectedCodeOut = 'import { abc } from "./abc.cjs";'

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, test.context.option)

  test.is(actualCodeOut, expectedCodeOut)

})

Test('import(...)', async (test) => {

  let codeIn = 'const abcPromise = import(\'./abc.js\')'
  let expectedCodeOut = 'const abcPromise = import("./abc.cjs");'

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, test.context.option)

  test.is(actualCodeOut, expectedCodeOut)

})

Test('require(...)', async (test) => {

  let codeIn = 'const abc = require(\'./abc.js\')'
  let expectedCodeOut = 'const abc = require("./abc.cjs");'

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, test.context.option)

  test.is(actualCodeOut, expectedCodeOut)

})

Test('let', async (test) => {

  let codeIn = 'let abc = \'./abc.js\''
  let expectedCodeOut = 'let abc = "./abc.cjs";'

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, test.context.option)

  test.is(actualCodeOut, expectedCodeOut)

})

Test('let ...', async (test) => {

  let codeIn = 'let abc = \'./ab\' + \'c.js\''
  let expectedCodeOut = 'let abc = \'./ab\' + \'c.js\';'

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, test.context.option)

  test.is(actualCodeOut, expectedCodeOut)

})

Test('console.log(...)', async (test) => {

  let codeIn = 'console.log(\'Here at ./abc.js and there at ./def.js\')'
  let expectedCodeOut = 'console.log(\'Here at ./abc.js and there at ./def.js\');'

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, test.context.option)

  test.is(actualCodeOut, expectedCodeOut)

})

Test('fs.readFileAsync(...)', async (test) => {

  let codeIn = 'fs.readFileAsync(\'./abc.json\')'
  let expectedCodeOut = 'fs.readFileAsync(\'./abc.json\');'

  let { code: actualCodeOut } = await Babel.transformAsync(codeIn, test.context.option)

  test.is(actualCodeOut, expectedCodeOut)

})
