import React, { PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';

class InputTags extends React.Component {
  constructor(props) {
    super();

    this.state = { tags: props.tags };

    this.handleAddition = this.handleAddition.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleAddition(e, { value }) {
    this.setState({
      tags: [value, ...this.state.tags],
    });
  }

  handleChange(e, data) {
    this.props.onChange(data.value);
  }

  makeOptions() {
    return this.state.tags.map(tag => {
      return { value: tag, text: tag };
    });
  }

  render() {
    const vProps = {};
    if (this.props.value) {
      vProps.value = this.props.value;
    }
    if (this.props.defaultValue) {
      vProps.defaultValue = this.props.defaultValue;
    }

    return (
      <Dropdown
        placeholder={this.props.placeholder}
        fluid
        multiple
        search
        selection
        allowAdditions={this.props.allowAdditions}
        onAddItem={this.handleAddition}
        additionPosition="bottom"
        options={this.makeOptions()}
        onChange={this.handleChange}
        {...vProps}
      />
    );
  }
}

InputTags.defaultProps = {
  onChange: () => {},
  tags: [],
};

InputTags.propTypes = {
  onChange: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  allowAdditions: PropTypes.bool,
};

export default InputTags;
