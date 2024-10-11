"use client"

import React, { type FC, type ComponentProps, useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { LatLng, divIcon, icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import iconImage from "leaflet/dist/images/marker-icon.png"
import { points } from "constants/point"

const ChangeMapCenter = ({ position }: { position: LatLng }) => {
  const map = useMap()
  map.panTo(position)
  return null
}

export const MapComponent: FC<
  ComponentProps<"div"> & { location: GeolocationPosition; type: string }
> = ({ location, type = "std", ...props }) => {
  const [position, setPosition] = useState<LatLng>()
  useEffect(() => {
    setPosition(new LatLng(location.coords.latitude, location.coords.longitude))
  }, [location])
  return (
    <>
      <div style={{ height: "100%" }} {...props}>
        {position && (
          <MapContainer
            center={position}
            zoom={13}
            style={{
              height: "100%",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
              url={`https://cyberjapandata.gsi.go.jp/xyz/${type}/{z}/{x}/{y}.png`}
            />
            <Marker
              position={position}
              icon={icon({
                iconUrl: iconImage.src,
              })}
              draggable={true}
              eventHandlers={{
                dragend: (event) => {
                  const newPosition = event.target.getLatLng()
                  setPosition(newPosition)
                },
              }}
            >
              <Popup>
                {"現在地"}
                <p>Lat: {position.lat}</p>
                <p>Lng: {position.lng}</p>
              </Popup>
              <ChangeMapCenter position={position} />
            </Marker>
            {points.map((point) => (
              <Marker
                position={new LatLng(point.lat, point.long)}
                icon={divIcon({
                  className: "pin",
                })}
                draggable={false}
              >
                <Popup>
                  {point.address}
                  <p>Lat: {point.lat}</p>
                  <p>Lng: {point.long}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </>
  )
}

export default MapComponent
