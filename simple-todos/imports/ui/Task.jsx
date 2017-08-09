import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import classnames from 'classnames';

// Task component - represents a single todo item
export default class Task extends Component {
    toggleChecked() {
        Meteor.call("tasks.setChecked", this.props.task._id, !this.props.task.checked)
    }

    togglePrivate() {
        Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
    }

    deleteTask() {
        Meteor.call("tasks.remove", this.props.task._id);
    }

    render() {
        const { task } = this.props;
        const { checked, text, username } = task
        const taskClassName = classnames({
            checked,
            private: task.private,
        })



        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteTask.bind(this)}>
                    &times;
                </button>
                <input
                    type="checkbox"
                    readOnly
                    checked={checked}
                    onClick={this.toggleChecked.bind(this)} />
                    { this.props.showPrivateButton ? (
                      <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                        { this.props.task.private ? 'Private' : 'Public' }
                      </button>
                    ) : ''}
                <span className="text"><strong>{username}: </strong>{text}</span>
            </li>
        );
    }
}

Task.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    task: PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired,
};
