import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uiLogoutModalActions from '../../state/ui/logout-modal/actions';
import * as userActions from '../../state/user/actions';

class LogoutModal extends Component {

    handleCloseModal = () => {
        this.props.closeModal();
    }

    handleLogout = () => {
        this.props.logout();
        this.props.closeModal();
    }

    render() { 
        return (<div className={['modal', this.props.open? 'is-active':null].join(' ')}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Cerrar Sesión</p>
                <button className="delete" aria-label="close" onClick={this.handleCloseModal}></button>
            </header>
            <section className="modal-card-body">
                ¿Estás seguro que quieres cerrar la sesión?
            </section>
            <footer className="modal-card-foot">
                <button className="button is-info" onClick={this.handleLogout}>Confirmar</button>
                <button className="button" onClick={this.handleCloseModal}>Cancelar</button>
            </footer>
        </div>
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        open: state.ui.logoutModal.open
    }
}

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => { dispatch(uiLogoutModalActions.closeLogoutModal()); },
        logout: () => { dispatch(userActions.logout()); }
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(LogoutModal);
