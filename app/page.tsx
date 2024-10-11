"use client"

import React from "react"
import { useEffect, useState } from "react"
import type { NextPage } from "next"

import dynamic from "next/dynamic"
const MapComponent = dynamic(() => import("@/components/map"), {
  ssr: false,
})

const HomePage: NextPage = () => {
  const [location, setLocation] = useState<GeolocationPosition>()
  const [type, setType] = useState<string>("std")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(position)
    })
  }, [])
  return (
    <>
      <section
        style={{
          height: "100%",
          margin: "auto",
        }}
      >
        {location && <MapComponent location={location} type={type} />}
        <div
          style={{
            bottom: 0,
            position: "fixed",
            left: 0,
            zIndex: 1000,
          }}
        >
          <select
            onChange={({ target: { value } }) => setType(value)}
            value={type}
          >
            <option value="std">ベースマップ</option>
            <option value="blank">白地図</option>
            <option value="lndst">全国ランドサットモザイク画像</option>
            <option value="relief">色別標高図</option>
          </select>
        </div>
      </section>
    </>
  )
}

export default HomePage
