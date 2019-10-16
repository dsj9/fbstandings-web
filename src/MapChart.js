import React, { useState, useEffect } from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from 'react-simple-maps';
import axios from 'axios';

const geoUrl =
    'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const MapChart = () => {
    const [mapItems, setMapItems] = useState([]);

    useEffect(() => {
        axios
            .get(`${window.location.origin}/api/`)
            .then(resp => setMapItems(resp.data));
    }, []);

    return (
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            style={{ height: '100vh', width: '100vw' }}
            projectionConfig={{
                rotate: [-12.5, -50.0, 0],
                scale: 1200
            }}
        >
            <Geographies
                geography={geoUrl}
                fill="#D6D6DA"
                stroke="#FFFFFF"
                strokeWidth={1}
            >
                {({ geographies }) =>
                    geographies.map(geo => (
                        <Geography key={geo.rsmKey} geography={geo} />
                    ))
                }
            </Geographies>
            {mapItems.map(mapItem => (
                <Marker key={mapItem.name} coordinates={mapItem.coordinates}>
                    <image
                        xlinkHref={mapItem.logoUrl}
                        transform={`translate(-${mapItem.size /
                            2}, -${mapItem.size / 2})`}
                        height={mapItem.size}
                        width={mapItem.size}
                    />
                </Marker>
            ))}
        </ComposableMap>
    );
};

export default MapChart;
