import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ServerStatusLabel } from "./ServerStatusLabel";

Enzyme.configure({ adapter: new Adapter() });

describe("<ServerStatusLabel />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ServerStatusLabel />);
    wrapper.setState({ loading: false, error: false, success: false });
  });

  it("renders the component", () => {
    expect(wrapper.exists());
  });

  it("renders the loading label", () => {
    wrapper.setState({ loading: true });

    expect(wrapper.find(".is-info").exists()).toBeTruthy();
    expect(wrapper.find(".is-info").text()).toEqual("Conectando...");
  });

  it("renders the error label", () => {
    wrapper.setState({ error: true });

    expect(wrapper.find(".is-danger").exists()).toBeTruthy();
    expect(wrapper.find(".is-danger").text()).toEqual("ERROR");
  });

  it("renders the success label", () => {
    wrapper.setState({ success: true });

    expect(wrapper.find(".is-success").exists()).toBeTruthy();
    expect(wrapper.find(".is-success").text()).toEqual("OK");
  });
});
