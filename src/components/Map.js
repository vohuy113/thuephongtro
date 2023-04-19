import React, { memo } from "react";
import GoogleMapReact from "google-map-react";
import { HiOutlineLocationMarker } from "react-icons/hi";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({ coord }) => {
  return (
    <div style={{ height: "600px", width: "100%" }}>
      <GoogleMapReact
        // bootstrapURLKeys={{
        //   key: "AIzaSyBqJXm2Zw-idK-vD7dnkfYZyXbNnLckGYM",
        // }}
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
