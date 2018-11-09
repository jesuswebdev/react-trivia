import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Timer } from "./Timer";

Enzyme.configure({ adapter: new Adapter() });

describe("<Timer />", () => {
  it("renders the component", () => {
    const wrapper = shallow(<Timer seconds={20} />);

    expect(wrapper.contains(<div>20s</div>)).toEqual(true);
  });
});
