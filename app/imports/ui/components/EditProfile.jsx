import React, { PropTypes } from 'react';
import { Form, Button, Image, Input, TextArea, Grid, Dropdown } from 'semantic-ui-react';
import UploadFile from './UploadFile.jsx';

const roles = [
  { key: 'teacher', text: 'Teacher', value: 'teacher' },
  { key: 'provider', text: 'Provider', value: 'provider' },
  { key: 'iawake-member', text: 'Iawake Member', value: 'iawake-member' },
  { key: 'admin', text: 'Admin', value: 'admin' },
];

export default class EditProfile extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUploadedImage = this.handleUploadedImage.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.renderRolesDropdown = this.renderRolesDropdown.bind(this);
  }

  componentWillMount() {
    const { fullName, location, description, avatar, roles } = this.props;

    this.setState({ fullName, location, description, avatar, roles });
  }

  goBack() {
    if (this.props.isAdminPage) {
      this.context.router.push('/admin/users');
    } else {
      this.context.router.push(`/${this.props.username}`);
    }
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { fullName, location, description, roles } = this.state;

    this.props.handleUpdate({
      userId: this.props.userId,
      fullName,
      location,
      description,
      roles,
    }, (err) => {
      if (err) throw err;
      this.goBack();
    });
  }

  handleCancel() {
    this.goBack();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDropdownChange(syntheticEvent, { name, value }) {
    this.setState({ [name]: value });
  }

  handleUploadedImage(error, { url }) {
    this.props.handleUpdateAvatar({
      userId: this.props.userId,
      url,
    }, (err) => {
      if (err) throw err;
    });

    this.setState({ avatar: url });
  }

  renderRolesDropdown() {
    if (!this.props.isAdminPage) { return null; }
    return (
      <Form.Field>
        <Dropdown
          placeholder="Select Roles"
          fluid multiple selection
          options={roles}
          name="roles"
          value={this.state.roles}
          onChange={this.handleDropdownChange} />
      </Form.Field>
    );
  }

  render() {
    return (
     <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <p><Image src={this.state.avatar} /></p>
            <UploadFile
              upload={this.props.upload}
              basicType="image"
              basic
              content="Upload Image"
              onComplete={this.handleUploadedImage}
            />
          </Grid.Column>

          <Grid.Column width={13}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field
                name="fullName"
                control={Input}
                label="Full name"
                placeholder="Full name"
                value={this.state.fullName}
                onChange={this.handleChange}
              />
              <Form.Field
                name="location"
                control={Input}
                label="Location"
                placeholder="eg San Francisco, CA"
                value={this.state.location}
                onChange={this.handleChange}
              />
              <Form.Field
                name="description"
                control={TextArea}
                autoHeight
                label="Why I'm here?"
                value={this.state.description}
                onChange={this.handleChange}
              />
              {this.renderRolesDropdown()}
              <Form.Group>
                <Button
                  primary
                  content="Save"
                />
                <Button
                  type="button"
                  content="Cancel"
                  onClick={this.handleCancel}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

EditProfile.contextTypes = {
  router: PropTypes.object.isRequired,
};

EditProfile.propTypes = {
  userId: PropTypes.string,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string,
  roles: PropTypes.array,
  avatar: PropTypes.string.isRequired,
  intentions: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleUpdateAvatar: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  isAdminPage: PropTypes.bool,
};
