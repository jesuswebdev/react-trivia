import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Redirect } from "react-router-dom";
import { NewGame } from "./NewGame";

Enzyme.configure({ adapter: new Adapter() });

describe("<NewGame />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NewGame />);
    wrapper.setProps({
      option: "default",
      question_count: 0
    });
  });

  it("renders the component", () => {
    expect(wrapper.exists());
  });

  it("disables elements when loading questions", () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find("[disabled]")).toHaveLength(5);
  });

  it("adds is-loading class to button when loading questions", () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.find("button.is-loading")).toHaveLength(1);
  });

  it("shows error notification when there is an error", () => {
    wrapper.setProps({ hasError: true });
    expect(wrapper.find(".notification").exists()).toBeTruthy();
  });

  it("redirects when the questions are loaded", () => {
    wrapper.setProps({ gotTheQuestions: true });
    expect(wrapper.get(0)).toEqual(<Redirect to="/jugar" />);
  });
});
