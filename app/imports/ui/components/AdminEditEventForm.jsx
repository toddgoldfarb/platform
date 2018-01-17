import React, { PropTypes } from 'react';
import { Select, TextArea } from 'semantic-ui-react';
import moment from 'moment';
import InputTags from './InputTags.jsx';

const FieldInput = (props) => {
  return (
    <div className="field">
      <label>{props.label}</label>
      <input
        type="text"
        value={props.value}
        placeholder={props.placeholder}
        onChange={(ev) => props.handleChange(ev)}
      />
    </div>
  );
};

FieldInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

const FieldTextarea = (props) => {
  return (
    <div className="field">
      <label>{props.label}</label>
      <TextArea
        autoHeight
        value={props.value}
        placeholder={props.placeholder}
        onChange={(ev) => props.handleChange(ev)}
      />
    </div>
  );
};

FieldTextarea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

const FieldFileUrl = (props) => {
  return (
    <div className="field">
      <label>{props.label}</label>
      <input
        type="text"
        value={props.value}
        onChange={(ev) => props.handleChange(ev)}
      />
    </div>
  );
};

FieldFileUrl.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
};

const FieldSelect = (props) => {
  return (
    <div className="field">
      <label>{props.label}</label>
      <Select
        search
        allowAdditions
        placeholder={props.label}
        value={props.value}
        options={props.options}
        onChange={props.handleChange}
      />
    </div>
  );
};

FieldSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  handleChange: PropTypes.func,
};

const FieldDay = (props) => {
  return (
    <div className="field">
      <label>{props.label}</label>
      <input
        type="date"
        value={props.value}
        onChange={(ev) => props.handleChange(ev)}
      />
    </div>
  );
};

FieldDay.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

const FieldTags = (props) => {
  return (
    <div className="field">
      <label>{props.label}</label>
      <InputTags
        tags={props.value}
        value={props.value}
        allowAdditions
        onChange={tags => props.onChange(tags)}
      />
    </div>
  );
};

FieldTags.propTypes = {
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

export default class AdminEditEventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.eventState(props.event);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTrackUrlChange = this.handleTrackUrlChange.bind(this);
    this.handleYoutubeVideoIdChange = this.handleYoutubeVideoIdChange.bind(this);
    this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUploadTrack = this.handleUploadTrack.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleMinutesChange = this.handleMinutesChange.bind(this);
    this.handleRepeatCount = this.handleRepeatCount.bind(this);
    this.handleRepeatInterval = this.handleRepeatInterval.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState(this.eventState(props.event));
  }

  eventState(event) {
    if (event) {
      return {
        title: event.title || '',
        description: event.description || '',
        trackUrl: event.trackUrl || '',
        youtubeVideoId: event.youtubeVideoId || '',
        imageUrl: event.imageUrl || '',
        startDay: moment(event.startAt).format('YYYY-MM-DD'),
        startTime: moment(event.startAt).format('HH:mm'),
        minutes: event.minutes ? event.minutes.toString() : '',
        repeatCount: event.repeatCount ? event.repeatCount.toString() : '',
        repeatInterval: event.repeatInterval,
        tags: event.tags || [],
      };
    }
    return {};
  }

  handleTitleChange(ev) {
    this.setState({ title: ev.target.value });
  }

  handleDescriptionChange(ev) {
    this.setState({ description: ev.target.value });
  }

  handleTrackUrlChange(ev) {
    this.setState({ trackUrl: ev.target.value });
  }

  handleYoutubeVideoIdChange(ev) {
    this.setState({ youtubeVideoId: ev.target.value });
  }

  handleUploadTrack({ url }) {
    this.setState({ trackUrl: url });
  }

  handleImageUrlChange(ev) {
    this.setState({ imageUrl: ev.target.value });
  }

  handleDayChange(ev) {
    this.setState({ startDay: ev.target.value });
  }

  handleTimeChange(ev) {
    // this.setState({ startTime: value });
    this.setState({ startTime: ev.target.value });
  }

  handleMinutesChange(ev) {
    this.setState({ minutes: ev.target.value });
  }

  handleRepeatCount(ev) {
    this.setState({ repeatCount: ev.target.value });
  }

  handleRepeatInterval(ev) {
    this.setState({ repeatInterval: ev.target.value });
  }

  handleTagsChange(tags) {
    this.setState({ tags });
  }


  handleSubmit(ev) {
    ev.preventDefault();

    const format = 'YYYY-MM-DD HH:mm';
    const startAt = moment(`${this.state.startDay} ${this.state.startTime}`, format).toDate();
    const endAt = moment(startAt).add(this.state.minutes, 'minutes').toDate();

    this.props.onSaveEvent({
      title: this.state.title,
      description: this.state.description,
      trackUrl: this.state.trackUrl,
      youtubeVideoId: this.state.youtubeVideoId,
      imageUrl: this.state.imageUrl,
      startAt,
      endAt,
      minutes: this.state.minutes,
      repeatCount: this.state.repeatCount,
      repeatInterval: this.state.repeatInterval,
      tags: this.state.tags,
    });
  }

  render() {
    if (!this.props.event) {
      return null;
    }

    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <FieldInput
          label="Title"
          value={this.state.title}
          handleChange={this.handleTitleChange}
        />
        <FieldTextarea
          label="Description"
          value={this.state.description}
          handleChange={this.handleDescriptionChange}
        />

        <FieldDay
          label="Start Day"
          value={this.state.startDay}
          handleChange={this.handleDayChange}
        />
        <FieldInput
          label="Start Time"
          value={this.state.startTime}
          handleChange={this.handleTimeChange}
        />
        <FieldInput
          label="Length in Minutes"
          value={this.state.minutes}
          handleChange={this.handleMinutesChange}
        />
        <FieldInput
          label="Repeat Count"
          placeholder="A number like 1, 2, 3..."
          value={this.state.repeatCount || ''}
          handleChange={this.handleRepeatCount}
        />
        <FieldInput
          label="Repeat Interval"
          placeholder="An interval like hour, day, week, month..."
          value={this.state.repeatInterval || ''}
          handleChange={this.handleRepeatInterval}
        />


        <FieldFileUrl
          label="Track Url"
          value={this.state.trackUrl}
          handleChange={this.handleTrackUrlChange}
        />

        <FieldInput
          label="Youtube VideoId"
          value={this.state.youtubeVideoId}
          handleChange={this.handleYoutubeVideoIdChange}
        />

        <FieldFileUrl
          label="Image Url"
          value={this.state.imageUrl}
          handleChange={this.handleImageUrlChange}
        />

        <FieldTags
          label="Tags"
          value={this.state.tags}
          onChange={this.handleTagsChange}
        />

        <button className="ui button fluid positive">Save</button>
      </form>
    );
  }
}

AdminEditEventForm.propTypes = {
  onSaveEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};
