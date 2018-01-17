import React, { PropTypes } from 'react';
import {
  Button,
  Embed,
  Form,
  Grid,
  Image,
  Input,
  Message,
  Popup,
  Segment,
  TextArea,
} from 'semantic-ui-react';

import SelectTime from './SelectTime.jsx';
import SelectDate from './SelectDate.jsx';
import UploadFile from './UploadFile.jsx';
import { parseYoutubeUrl } from '../../util/parseYoutubeUrl.js';

export default class EditEventForm extends React.Component {
  constructor(props) {
    super(props);

    const event = props.event || {};

    this.state = {
      event,
      videoId: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.setEventValue = this.setEventValue.bind(this);
    this.handleUploadedImage = this.handleUploadedImage.bind(this);
    this.handleUploadedTrack = this.handleUploadedTrack.bind(this);
    this.getYoutubeVideoId = this.getYoutubeVideoId.bind(this);
  }

  componentWillMount() {
    if (this.state.event.youtubeUrl) {
      this.setState({ videoId: parseYoutubeUrl(this.state.event.youtubeUrl) });
    }
  }

  setEventValue(obj) {
    this.setState({ event: Object.assign({}, this.state.event, obj) });
  }

  getYoutubeVideoId(ev) {
    this.setState({ videoId: parseYoutubeUrl(ev.target.value) });
  }

  handleInputChange(syntheticEvent, { name, value }) {
    this.setEventValue({ [name]: value });
  }

  handleSave() {
    if (this.props.onSave) {
      this.props.onSave({ event: this.state.event });
    }
  }

  handleUploadedImage(error, { url }) {
    this.setEventValue({ imageUrl: url });
  }

  handleUploadedTrack(error, { url }) {
    this.setEventValue({ trackUrl: url });
  }

  renderBasic() {
    return (
      <Segment raised>
        <h2>Basic Information</h2>

        <Form.Field>
          <label>Title</label>
          <Input
            name="title"
            placeholder="Title for this event..."
            value={this.state.event.title || ''}
            onChange={this.handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <TextArea
            name="description"
            autoHeight
            placeholder="The description can be multiple lines"
            value={this.state.event.description || ''}
            onChange={this.handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Image</label>
          <div>
            {this.state.event.imageUrl ? (
               <Popup
                 on="click"
                 trigger={
                   <Image
                         src={this.state.event.imageUrl}
                         size="small"
                               />}
                 content={
                   <Button
                         negative
                         content="Remove Image"
                         onClick={() => this.setEventValue({ imageUrl: undefined })}
                       />}
               />
             ) : (
               <UploadFile
                 upload={this.props.upload}
                 basicType="image"
                 basic
                 content="Upload Image"
                 onComplete={this.handleUploadedImage}
               />
             )}
          </div>
        </Form.Field>
      </Segment>
    );
  }

  renderSchedule() {
    return (
      <Segment raised>
        <h2>Schedule</h2>
        {!this.props.event.library ? (
           <Form.Group inline>
             <Form.Field>
               <label>Event Day</label>
               <SelectDate
                 name="startAt"
                 value={this.state.event.startAt}
                 onChange={this.handleInputChange}
               />
             </Form.Field>
             <Form.Field>
               <label>Start Time</label>
               <SelectTime
                 name="startAt"
                 value={this.state.event.startAt}
                 onChange={this.handleInputChange}
               />
             </Form.Field>
           </Form.Group>
         ) : null}
       <Form.Group inline>
          <Form.Field>
            <label>Length of Event in Minutes</label>
            <Input
              name="minutes"
              value={this.state.event.minutes || ''}
              placeholder="minutes"
              onChange={this.handleInputChange}
            />
            <div>
              We recommend setting the length of event at least 15
              minutes longer than the video or mp3 you are posting
            </div>
          </Form.Field>
        </Form.Group>
      </Segment>
    );
  }

  renderContent() {
    return (
      <Segment raised>
        <h2>Content</h2>
        <p>Choose either a YouTube video or an MP3 audio file uploaded from your computer.</p>
        <Form.Field>
          <label>Content Type</label>
          <Form.Radio
            name="contentType"
            value="youtube"
            label="YouTube video"
            checked={this.state.event.contentType === 'youtube'}
            onChange={this.handleInputChange}
          />
          <Form.Radio
            name="contentType"
            value="mp3"
            label="MP3 audio file"
            checked={this.state.event.contentType === 'mp3'}
            onChange={this.handleInputChange}
          />
        </Form.Field>

        <div>
          {this.state.event.contentType === 'youtube' ? (
             <Form.Group inline>
               <Form.Field>
                 <label>YouTube URL</label>
                 <Input
                   name="youtubeUrl"
                   value={this.state.event.youtubeUrl || ''}
                   onChange={this.handleInputChange}
                   onBlur={this.getYoutubeVideoId}
                 />
                 <Embed
                   id={this.state.videoId}
                   source="youtube"
                   active
                   autoplay={false}
                 />
                 <Form.Checkbox
                   label="Do not synchronize playback (use for Live stream)"
                   checked={this.state.event.liveStream}
                   onClick={() => this.setEventValue({ liveStream: !this.state.event.liveStream })}
                 />
               </Form.Field>
             </Form.Group>
           ) : null}
        </div>

        <div>
          {this.state.event.contentType === 'mp3' ? (
             <Form.Field>
               <label>MP3 audio file</label>
               {this.state.event.trackUrl ? (
                  <Grid verticalAlign="middle" columns={2} >
                    <Grid.Row>
                      <Grid.Column>
                        <audio
                          controls
                          src={this.state.event.trackUrl}
                          style={{ width: '100%' }}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Button
                          size="mini"
                          basic
                          negative
                          compact
                          onClick={() => this.setEventValue({ trackUrl: undefined })}
                          icon="trash"
                          content="Remove"
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                ) : (
                  <UploadFile
                    upload={this.props.upload}
                    basicType="audio"
                    basic
                    content="Upload MP3"
                    onComplete={this.handleUploadedTrack}
                  />
                )}
             </Form.Field>
           ) : null}
        </div>
      </Segment>
    );
  }

  renderSubmit() {
    return (
      <Segment raised>
        <h2>Preview, Publish and Share</h2>
        <p>
          After you save, you will have the chance to preview
          your event. Whenever you are ready, you can publish it and
          share it with others.
        </p>
        <Message error>{this.props.errorString}</Message>
        <Button
          content="Save and Preview"
          primary
          type="button"
          onClick={this.handleSave}
        />
      </Segment>
    );
  }

  render() {
    return (
      <Form error={!!this.props.errorString}>
        {this.renderBasic()}
        {this.renderSchedule()}
        {this.renderContent()}
        {this.renderSubmit()}
      </Form>
    );
  }
}

EditEventForm.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    contentType: PropTypes.string,
    youtubeUrl: PropTypes.string,
    minutes: PropTypes.number,
    startAt: PropTypes.instanceOf(Date),
    library: PropTypes.bool,
  }),
  onSave: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  errorString: PropTypes.string,
};
