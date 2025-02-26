const TrafficLight = require('@/utils/traffic')
const assert = require('assert') // node 断言库

// 检查 TrafficLight （分组）
describe('TrafficLight', () => {
  // 检查 TrafficLight 的颜色
  describe('检测颜色属性', () => {
    // 具体检查代码
    it('任务1：是否是三个颜色', () => {
      // 使用断言，检查 TrafficLight.colors 的长度是否等于3
      assert.equal(TrafficLight.colors.length, 3)
    })

    // 具体检查代码
    it('任务2：我提供颜色是否在你的列表中', () => {
      const expectedLightOrder = ['green', 'yellow', 'red']
      for (let i = 0; i < expectedLightOrder.length; i++) {
        assert.equal(expectedLightOrder[i], TrafficLight.colors[i])
      }
    })
  })
  describe('检测 next 方法', () => {
    // 具体检查代码
    // Change the light 3x to go from green -> yellow -> red -> green
    it('检查变化顺序是否正确', function () {
      const traffic = new TrafficLight()
      for (let i = 0; i < TrafficLight.colors.length; i++) {
        assert.equal(traffic.light, TrafficLight.colors[i])
        traffic.next()
      }
    })

    it('能否从最后一个循环到第一个', function () {
      const traffic = new TrafficLight()
      for (let i = 0; i < 3; i++) {
        traffic.next()
      }
      assert.equal(traffic.light, TrafficLight.colors[0])
    })
  })
})

/**
 * mocha 和 jest 思路差不多
 * vue提供的mocha单元测试
 * 		执行 vue-cli-service test:unit
 *      测试文件位置 tests/unit/xxx.spec.js (mocha 自动查找进行测试)
 *      通过 @vue/test-utils 校验vue相关的东西
 *
 *
 * 抛开vue直接使用mocha
 * 		执行 mocha,
 *      测试文件位置: test/xxx.test.js (mocha 自动查找进行测试)
 */
