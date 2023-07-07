import React, { memo } from "react";
import GoogleMapReact from "google-map-react";
import { HiOutlineLocationMarker } from "react-icons/hi";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
console.log(process.env.REACT_APP_API_MAP)
const Map = ({ coord }) => {
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          // key: process.env.REACT_APP_API_MAP
          // key: "AIzaSyAvHI34myPZ7w0EEuDuUxpx9J-SJc4Mlpg"
          key: "AIzaSyAWKL6T6Op2CYLRT6inzukxhjHgtjIb2kc"
        }}
        defaultCenter={coord}
        defaultZoom={11}
        center={coord}
      >
        <AnyReactComponent
          lat={coord?.lat}
          lng={coord?.lng}
          text={<HiOutlineLocationMarker color="red" size={24} />}
        />
      </GoogleMapReact>
    </div>
  );
};

export default memo(Map);
