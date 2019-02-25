import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import GoogleMapReact from 'google-map-react';
import { requestApiData } from "./actions";

const AnyReactComponent = ({ text }) => <div style={{
  width: '30px',
  height: '30px',
  borderRadius: '50% 50% 50% 0',
  background: '#FF6347',
  position: 'absolute',
  transform: 'rotate(-45deg)',
  left: '50%',
  top: '50%',
  margin: '-20px 0 0 -20px'
  }}>
    {text}
  </div>

let drone;

class Home extends React.Component {
  componentDidMount() {
    this.props.requestApiData();
  }
  static defaultProps = {
    center: {
      lat: drone!==undefined ? 
              drone[0].latitude : 34.382067306389914,
      lng: drone!==undefined ? 
              drone[0].longitude : -93.44466496789377,
    },
    zoom: 11
  };
  componentWillReceiveProps(){
     drone=this.props.data.data;
  }
  render() {
    const { results = [] } = this.props.data;
    return <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD1VKqZJfHroTLcvLyhod3hvitrurjfn6k' }}
          defaultZoom={this.props.zoom}
          defaultCenter={this.props.center}
        >
          <AnyReactComponent
            lat={
              drone!==undefined ? 
              drone[0].latitude : 34.382067306389914}
            lng={drone!==undefined ? 
              drone[0].longitude : -93.44466496789377}
            text={''}
          />

        </GoogleMapReact>
      </div>
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
