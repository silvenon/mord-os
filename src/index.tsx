import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const supportsContainerQueries = 'container' in document.documentElement.style
if (!supportsContainerQueries) {
  // @ts-expect-error no need to create a custom typing because it has no exports
  import('container-query-polyfill')
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
)
