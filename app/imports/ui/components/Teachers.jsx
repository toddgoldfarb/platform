import React, { PropTypes } from 'react';
import {
  Image,
  Card,
} from 'semantic-ui-react';

export default class Teachers extends React.Component {
  render() {
    const items = this.props.teachers.map(teacher => {
      return (
        <Card
          key={teacher._id}
          onClick={() => this.props.onClick(teacher)}
        >
          <Image src={teacher.avatar} size="large" />
          <Card.Content>
            <Card.Header>{teacher.name}</Card.Header>
            <Card.Meta>{teacher.location}</Card.Meta>
          </Card.Content>
        </Card>
      );
    });

    return (
      <Card.Group itemsPerRow={this.context.isMobile ? 1 : 3}>
        {items}
      </Card.Group>
    );
  }
}

Teachers.propTypes = {
  teachers: PropTypes.array.isRequired,
  onClick: PropTypes.func,
};

Teachers.contextTypes = {
  isMobile: PropTypes.bool.isRequired,
};
