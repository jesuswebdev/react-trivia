import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { http } from "../../utils";
import { gameStartSuccess } from "../../state/game/actions";
import { Row, Col, Card, Select, Form, Button, Alert, message } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

export class NewGame extends Component {
  state = {
    difficulty: "default",
    question_count: 0,
    loading: false,
    error: false
  };

  selectDifficulty = difficulty => this.setState({ difficulty });

  selectMode = question_count => this.setState({ question_count });

  onSubmitHandler = () => {
    const loadingMessage = message.loading("Cargando preguntas...", 0);
    const { difficulty, question_count } = this.state;
    const url = `/questions/newgame/${difficulty}?question_count=${question_count}`;
    this.setState({ loading: true, error: false }, async () => {
      try {
        const { data } = await http.get(url);
        this.setState({ loading: false });
        this.props.startGame(data);
      } catch (error) {
        this.setState({ loading: false, error: true });
      } finally {
        loadingMessage();
      }
    });
  };

  render() {
    const { difficulty, question_count, loading, error } = this.state;
    if (this.props.gotTheQuestions) {
      return <Redirect to="/jugar" />;
    }

    let canSubmit = difficulty !== "default" && question_count > 0;

    return (
      <Row type="flex" justify="center">
        <Col xs={22} sm={16} md={16} lg={10}>
          <Card>
            <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>
              Juego nuevo
            </h1>
            {error && (
              <Alert
                type="error"
                showIcon
                closable
                message="Error"
                description="Ocurrió un error al intentar conectar con el servidor"
              />
            )}
            <FormItem label="Dificultad">
              <Select
                value={difficulty}
                onSelect={this.selectDifficulty}
                style={{ width: "100%" }}
                disabled={loading}>
                <Option value="default" disabled>
                  Elige una dificultad
                </Option>
                <Option value="easy">Fácil</Option>
                <Option value="medium">Media</Option>
                <Option value="hard">Difícil</Option>
              </Select>
            </FormItem>
            <FormItem label="Modo de juego">
              <Select
                value={question_count}
                onSelect={this.selectMode}
                style={{ width: "100%" }}
                disabled={loading}>
                <Option value={0} disabled>
                  Elige un modo de juego
                </Option>
                <Option value={10}>Rápido (10 preguntas)</Option>
                <Option value={25}>Normal (25 preguntas)</Option>
                <Option value={50}>Extendido (50 preguntas)</Option>
              </Select>
            </FormItem>
            <Button
              type="primary"
              block
              onClick={this.onSubmitHandler}
              disabled={!canSubmit || loading}>
              Comenzar
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    gotTheQuestions: state.game.questions.length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: options => {
      dispatch(gameStartSuccess(options));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewGame);
