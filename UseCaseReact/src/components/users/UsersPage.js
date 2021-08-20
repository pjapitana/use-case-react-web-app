import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import UserList from "./UserList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class UsersPage extends React.Component {
  state = {
    redirectToAddUserPage: false,
  };

  componentDidMount() {
    const { users, actions } = this.props;

    if (users.length === 0) {
      actions.loadUsers().catch((error) => {
        alert("Loading users failed" + error);
      });
    }
  }

  handleDeleteUser = async (user) => {
    toast.success("User deleted");
    try {
      await this.props.actions.deleteUser(user);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    // return <h2>User Page</h2>;
    return (
      <>
        {this.state.redirectToAddUserPage && <Redirect to="/user" />}
        <h2>Users</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-user"
              onClick={() => this.setState({ redirectToAddUserPage: true })}
            >
              Add User
            </button>

            <UserList
              onDeleteClick={this.handleDeleteUser}
              users={this.props.users}
            />
          </>
        )}
      </>
    );
  }
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.users,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadUsers: bindActionCreators(userActions.loadUsers, dispatch),
      deleteUser: bindActionCreators(userActions.deleteUser, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
