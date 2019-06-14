import React from 'react'
import { shallow } from 'enzyme'
import Welcome from './Welcome'

beforeEach(function () {
  global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve) => {
      resolve({
        text: () => 'Hello World'
      })
    })
  })
})

describe('<Welcome />', () => {
  test('renders a single <p> tag', () => {
    const wrapper = shallow(<Welcome />)
    expect(wrapper.find('p')).toHaveLength(1)
  })
})
