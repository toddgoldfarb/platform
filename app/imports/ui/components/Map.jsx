import React, { PropTypes } from 'react';
import 'leaflet.polyline.snakeanim';
import './map.css';

const L = window.L;

export default class Map extends React.Component {
  componentDidMount() {
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images/';
    this.map = L.map('map', {
      maxZoom: 12,
      minZoom: 1,
      zoomControl: true,
      attributionControl: false,
      worldCopyJump: true,
    });

    // L.tileLayer.provider('NASAGIBS.ViirsEarthAtNight2012').addTo(this.map);
    // L.tileLayer.provider('CartoDB.DarkMatterNoLabels').addTo(this.map);
    L.tileLayer.provider('Esri.WorldImagery').addTo(this.map);

    this.map.setZoom(3);
    this.map.setView(this.props.event.host.latlng);

    this.userLayer = L.layerGroup();
    this.userLayer.addTo(this.map);

    this.drawUserDots();

    /* this.streamer = this.props.templeStreamer;
     * if (this.streamer.on) {
     *   this.streamer.on('amplify', ({ like }) => {
     *     if (like.objectId === this.props.event._id) {
     *       this.line([like.startLatlng, like.endLatlng]);
     *     }
     *   });
     * }*/
  }

  componentDidUpdate() {
    this.drawUserDots();
  }

  /* componentWillUnmount() {
   *   if (this.streamer.stopAll) {
   *     this.streamer.stopAll();
   *   }
   * }
   */
  drawUserDots() {
    this.userLayer.clearLayers();

    this.props.event.attendees.forEach(({ user }) => {
      if (user.latlng) {
        let fillColor = '#fff';
        if (user.self) {
          fillColor = '#0f0';
        }

        this.plotUserDot({
          latlng: user.latlng,
          fillColor,
        });
      }
    });
  }

  line(latlngs) {
    const polyline = L.polyline(latlngs, {
      color: '#fff',
      opacity: 0.8,
      snakingSpeed: 500,
    });

    this.map.fitBounds(polyline.getBounds());

    setTimeout(() => {
      polyline.addTo(this.map)
              .snakeIn()
              .on('snakeend', () => {
                setTimeout(() => {
                  this.map.removeLayer(polyline);
                }, 1000);
              });
    }, 1000);
  }

  plotUserDot({ latlng, radius = 5, fillColor = '#fff', color = '#000' }) {
    const user = L.circleMarker(latlng, {
      radius,
      color,
      fillColor,
      fillOpacity: 0.9,
      //interactive: false,
    }).on('click', function () {
      console.log('click'); // eslint-disable-line
    });

    user.addTo(this.userLayer);
  }

  render() {
    return (
      <div
        id="map"
        style={{ background: 'black', ...this.props.style }}
      ></div>
    );
  }
}

Map.propTypes = {
  event: PropTypes.shape({
    attendees: PropTypes.array.isRequired,
    host: PropTypes.shape({
      username: PropTypes.string.isRequired,
      latlng: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  presences: PropTypes.array,
  style: PropTypes.object,
};
