# 0 Mobile Launch Phase

This phase includes three main components, the Timer Utility, the Fields,
and the Synchronized Events.

## 0.1 Session Timer Utility

Provides a basic meditation timer.

### Timer: Setup

* Users can configure the timer for a preset amount of time
* Users can meditate in a field that they have "unlocked"
* Users can listen to a track during their session
  * track selection comes from the set of tracks within the selected field
* Users can select a visualization/image

### Timer: Run
* Timer counts down
* User can pause/continue (if track is playing, it also pauses)
* If an image is selected in Setup, full screen can be toggled
* The field and number of occupants in the field is shown

### Timer: Post Session
* How long the user just meditated is shown
* Number of co-meditators is shown
* Number of days in a row is shown

## 0.2 Fields

A preset number of fields are built in to the system.

* Global
* Temple
* Mantras
* Wisdom
* Flow
* Music

See https://docs.google.com/document/d/1jxMMNVc_qqNCTQttaKfvyWUT4FijSOA-tyE-QBDm-Ss/edit for more info

Each field includes:
* a default visualization image (with ability to change between others)
* an intention stream
  - user can write an intention
  - view others' intentions
  - amplify intentions
  - see number of amplifications an intention has recieved
* an audio library
  - information is shon about each track
  - tracks can be played
  - a session can be started directly from the track
* a group chat
  - users can chat in realtime with other field occupants

## 0.3 Synchronized Events

The Amplifield desktop prototype application proved the value of
having synchronized audio events.  The mobile version will implement
this by having regularly scheduled events in the Temple.

* Amp administrator can create events
* The next event can be viewed by clicking Temple/Events on the Events menu item
* Users can "Join" an event
  Need detail here: 
  - do they subscribe to reminders?
  - what do these reminders look like?  Email?  Push notifications?

## 0.4 Notifications, Profile, Registration

## 0.5 Server and AppStore Deployment, Purchases

# 1 Social Phase

This next phase will emphasize the social aspects of the Amplifield.

The following features need to be discussed and designed:

- Field Creation: users can create their own fields
- Friends/Followers: connecting with other users on the system 1:1
- Create Session from an Intention
