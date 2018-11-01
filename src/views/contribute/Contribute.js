import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContributeForm from './contribute-form/ContributeForm';
import SuccessScreen from './success-screen/SuccessScreen';
import * as categoryActions from '../../state/category/actions';
import * as questionActions from '../../state/question/actions';

class Contribute extends Component {

	componentDidMount() {
		this.props.loadCategories();
	}

	componentWillUnmount() {
		this.props.resetQuestionSent();
	}

	submitQuestion = (question) => {
		this.props.submitQuestion(question);
	}

	render() {
		return this.props.sent ? 
			<SuccessScreen reset={this.props.resetQuestionSent} />
			: 
			<ContributeForm 
			loadingCategories={this.props.loadingCategories}
			categories={this.props.categories}
			submitHandler={this.submitQuestion}
			loading={this.props.loading} />
	}
}

const mapStateToProps = state => {
	return {
		categories: state.category.categories,
		loadingCategories: state.ui.contribute.loadingCategories,
		hasError: state.ui.contribute.errorLoadingCategories,
		errorMessage: state.ui.contribute.errorMessageLoadingCategories,
		loading: state.ui.contribute.loading,
		sent: state.question.sent
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadCategories: () => { dispatch(categoryActions.loadCategories()); },
		submitQuestion: (question) => { dispatch(questionActions.submitQuestion(question)); },
		resetQuestionSent: () => { dispatch(questionActions.resetSubmitQuestionState()) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Contribute);