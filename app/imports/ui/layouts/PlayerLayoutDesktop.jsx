import React, { PropTypes } from 'react';
import { Grid } from 'semantic-ui-react';

export default class PlayerLayoutDesktop extends React.Component {
  componentDidMount() {
    window.scroll(0, 0);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = '';
  }

  render() {
    const { header, left, center, right } = this.props;

    return (
      <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
        {header}
        <div style={{ position: 'absolute', width: '100%', top: 64, bottom: 0 }}>

          <Grid celled style={{ height: '100%', margin: 0 }}>
            <Grid.Row style={{ height: '100%' }}>
              <Grid.Column width={4} style={{ height: '100%', overflowY: 'auto' }}>
                {left}
              </Grid.Column>

              <Grid.Column width={8} style={{ height: '100%', padding: 0 }}>
                {center}
              </Grid.Column>

              <Grid.Column width={4} style={{ height: '100%', overflowY: 'auto' }}>
                {right}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}
PlayerLayoutDesktop.propTypes = {
  header: PropTypes.node.isRequired,
  left: PropTypes.node.isRequired,
  center: PropTypes.node.isRequired,
  right: PropTypes.node.isRequired,
};
