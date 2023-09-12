module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'FlockChat',
      externals: {
        react: 'React'
      }
    }
  }
}
