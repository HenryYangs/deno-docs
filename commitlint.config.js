module.exports = {
  'extends': [
    '@commitlint/config-conventional'
  ],
  'rules': {
    'header-max-length': [0, 'never'],
    'body-max-length': [0, 'never'],
    'footer-max-length': [0, 'never'],
    'type-enum': [2, 'always', [
      'feat',
      'fix',
      'docs',
      'style',
      'refactor',
      'test',
      'revert',
      'build',
      'chore',
      'perf',
      'dev',
      'git'
    ]]
  }
}
