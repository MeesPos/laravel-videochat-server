import Vue from 'vue'

const requireComponent = require.context(
   './components/globals',
   false,
   /[A-Z]\w+\.(vue|js)$/
)


requireComponent.keys().forEach(fileName => {
   const componentConfig = requireComponent(fileName)
   
   const componentName = 'app-' + fileName
      .split('/')
      .pop()
      .match(/[A-Z][a-z]+/g)
      .join('-')
      .replace(/\.\w+$/, '').toLowerCase()
      
   Vue.component(
      componentName,
      componentConfig.default || componentConfig
   )
})