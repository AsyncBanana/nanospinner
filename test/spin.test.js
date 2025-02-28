let { createSpinner } = require('../index.js')

let stdout = { out: '' }
stdout.write = symbols => {
  stdout.out += symbols
}

it('spins default frames', () => {
  let spinner = createSpinner('', { stream: stdout })

  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()
  spinner.spin()

  let snapLocal = `"[?25l[1G[33m⠋[39m [?25l[1G[33m⠙[39m [?25l[1G[33m⠹[39m [?25l[1G[33m⠸[39m [?25l[1G[33m⠼[39m [?25l[1G[33m⠴[39m [?25l[1G[33m⠦[39m [?25l[1G[33m⠧[39m [?25l[1G[33m⠇[39m [?25l[1G[33m⠏[39m "`
  let snapCI = `
    "[1G[33m-[39m 
    [1G[33m-[39m 
    [1G[33m-[39m 
    [1G[33m-[39m 
    [1G[33m-[39m 
    [1G[33m-[39m 
    [1G[33m-[39m 
    [1G[33m-[39m 
    [1G[33m-[39m 
    [1G[33m-[39m 
    "
  `
  expect(stdout.out).toMatchInlineSnapshot(process.env.CI ? snapCI : snapLocal)
})
