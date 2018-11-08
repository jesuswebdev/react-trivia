import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { connect } from "react-redux";
import Timer from './Timer';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../state/reducers';

const store = createStore(rootReducer, {timer:{seconds: 30}});


Enzyme.configure({ adapter: new Adapter() });

describe('<Timer />', () => {
	it('renders the component', () => {
		const wrapper = shallow(<Timer />,  {context: {store}});
		
		expect(wrapper.contains(<div>{20}s</div>)).to.equal(true);
		expect(wrapper.instance().props.seconds).to.equal(20)
	})
})
