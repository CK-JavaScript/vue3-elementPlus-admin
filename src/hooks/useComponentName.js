/**
 * @description: 获取组件的名称
 * @param {Object} route: 路由实例
 * @return {String} 组件名称
 */
function useComponentName(route) {
  let currentMatched = route.matched;
  let currentComponent = currentMatched[currentMatched.length - 1]?.components?.default;
  let componentName = currentComponent.name || currentComponent.__name;
  // 在 3.2.34 或以上的版本中，使用 <script setup> 的单文件组件会自动根据文件名生成对应的 name 选项，即使是在配合 <KeepAlive> 使用时也无需再手动声明。
  // 如果组件内的 <script setup> 没有内容，并且没有自定义组件 name，就会返回 undefined
  return componentName;
}
export default useComponentName;
