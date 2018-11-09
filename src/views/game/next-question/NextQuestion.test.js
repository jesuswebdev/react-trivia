import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NextQuestion from "./NextQuestion";

Enzyme.configure({ adapter: new Adapter() });

describe("<NextQuestion />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NextQuestion goToNextQuestion={() => {}} />);
  });

  it("shows the correct answer text", () => {
    expect(wrapper.find('[type="title"]').html()).toEqual(
      '<h1 class="title is-3 has-text-centered">¡Respuesta Correcta!</h1>'
    );
    expect(wrapper.find('[type="subtitle"]').get(0)).toBeUndefined();
  });

  it("shows the incorrect answer text", () => {
    wrapper.setProps({ wrong: true, children: "incorrecta" });
    expect(wrapper.find('[type="title"]').html()).toEqual(
      '<h1 class="title is-3 has-text-centered">¡Respuesta Incorrecta!</h1>'
    );
    expect(wrapper.find('[type="subtitle"]').html()).toEqual(
      '<h1 class="subtitle is-5 has-text-centered">incorrecta</h1>'
    );
  });
});
