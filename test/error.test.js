let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = symbols => {
  stdout.out += symbols
}

it('marks spinner as error', () => {
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.error()

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #error[?25l[1G[33m⠙[39m #error[?25l[1G[33m⠹[39m #error[2K[1G[31m✖[39m #error
    [?25h"
  `
  let snapCI = `
    "[1G[33m-[39m #error
    [1G[33m-[39m #error
    [1G[33m-[39m #error
    [2K[1G[31m✖[39m #error
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})

it('marks spinner as error with message', () => {
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ text: 'Error\n' })

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #error[?25l[1G[33m⠙[39m #error[?25l[1G[33m⠹[39m #error[2K[1G[31m✖[39m #error
    [?25h[?25l[1G[33m⠋[39m #error[?25l[1G[33m⠙[39m #error[?25l[1G[33m⠹[39m #error[2K[1G[32m✔[39m Error

    [?25h"
  `
  let snapCI = `
    "[1G[33m-[39m #error
    [1G[33m-[39m #error
    [1G[33m-[39m #error
    [2K[1G[31m✖[39m #error
    [1G[33m-[39m #error
    [1G[33m-[39m #error
    [1G[33m-[39m #error
    [2K[1G[32m✔[39m Error

    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})

it('marks spinner as error with mark', () => {
  let spinner = createSpinner('#error', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.success({ mark: '!' })

  let snapLocal = `
    "[?25l[1G[33m⠋[39m #error[?25l[1G[33m⠙[39m #error[?25l[1G[33m⠹[39m #error[2K[1G[31m✖[39m #error
    [?25h[?25l[1G[33m⠋[39m #error[?25l[1G[33m⠙[39m #error[?25l[1G[33m⠹[39m #error[2K[1G[32m✔[39m Error

    [?25h[?25l[1G[33m⠋[39m #error[?25l[1G[33m⠙[39m #error[?25l[1G[33m⠹[39m #error[2K[1G! #error
    [?25h"
  `
  let snapCI = `
    "[1G[33m-[39m #error
    [1G[33m-[39m #error
    [1G[33m-[39m #error
    [2K[1G[31m✖[39m #error
    [1G[33m-[39m #error
    [1G[33m-[39m #error
    [1G[33m-[39m #error
    [2K[1G[32m✔[39m Error

    [1G[33m-[39m #error
    [1G[33m-[39m #error
    [1G[33m-[39m #error
    [2K[1G! #error
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})
