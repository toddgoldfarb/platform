import React, { PropTypes } from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default class UploadFile extends React.Component {
  constructor() {
    super();
    this.state = {
      uploading: false,
      progress: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.click = this.click.bind(this);
  }

  handleChange(ev) {
    this.setState({ uploading: true });

    const file = ev.target.files[0];

    this.props.upload({
      file,
      onProgress: (progress) => {
        this.setState({ progress });
      },
      onComplete: (err, { fileId, url }) => {
        this.setState({ uploading: false });
        this.props.onComplete(err, { fileId, url });
      },
    });
  }

  click(ev) {
    ev.preventDefault();
    if (this.props.upload) {
      this.fileInput.click();
    }
  }

  render() {
    const { basicType, ...props } = this.props;

    const accept = `${basicType}/*`;

    if (this.state.uploading) {
      const percent = Math.round(this.state.progress * 100);
      return (
        <Button
          type="button"
          primary={props.primary}
          basic={props.basic}
          disabled
          icon={<Icon name="spinner" loading />}
          content={`${percent}%`}
        />
      );
    }

    return (
      <span>
        <Button
          type="button"
          content={props.content || `Upload ${this.props.basicType}`}
          primary={props.primary}
          basic={props.basic}
          onClick={this.click}
        />
        <input
          style={{ display: 'none' }}
          type="file"
          accept={accept}
          onChange={this.handleChange}
          ref={(input) => { this.fileInput = input; }}
        />
      </span>
    );
  }
}

UploadFile.propTypes = {
  basicType: PropTypes.string.isRequired,
  upload: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

UploadFile.defaultProps = {
  onComplete: () => {},
  basicType: '*',
};
