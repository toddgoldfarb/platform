import React, { PropTypes } from 'react';
import { Button, Table, Header, Segment } from 'semantic-ui-react';
import UploadFile from './UploadFile.jsx';

/* eslint-disable no-alert */

export default class FileList extends React.Component {
  render() {
    const rows = this.props.files.map(file => (
      <Table.Row
        key={file._id}
      >
        <Table.Cell>
          <Header as="h4" image>
            {/* <Image src={file.url} shape="rounded" size="mini" /> */}
            <Header.Content>
              {file.name}
              <Header.Subheader>
                <a href={file.url} target="_blank">{file.url}</a>
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>
          <Button
            basic
            negative
            content="Delete"
            onClick={() => confirm('are you sure?') && this.props.onDelete(file._id)}
          />
        </Table.Cell>
      </Table.Row>
    ));

    return (
      <div>
        <Segment basic clearing>
          <Header as="h2" floated="left">
            {this.props.basicType} files
          </Header>

          <Header floated="right">
            <UploadFile
              upload={this.props.upload}
              basicType={this.props.basicType}
            />
          </Header>
        </Segment>

        <Segment>
          {rows.length ? (
             <Table basic="very">
               <Table.Header>
                 <Table.Row>
                   <Table.HeaderCell></Table.HeaderCell>
                 </Table.Row>
               </Table.Header>
               <Table.Body>
                 {rows}
               </Table.Body>
             </Table>
           ) : (
             <span>No {this.props.basicType} files</span>
           )}
        </Segment>
      </div>
    );
  }
}

FileList.propTypes = {
  files: PropTypes.array.isRequired,
  basicType: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
};
