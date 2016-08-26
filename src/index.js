'use strict';

import React, { Component } from 'react';
import * as d3 from 'd3';
import topojson from 'topojson';

// json
import countries from './countries.topo.json'

let projection;
let path;
let svg;

const width = 900;
const height = 620;

var orign = { lat: 0, lon: 40}
var tw = { lat: 120, lon: 23.5};

export default class DDos extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    projection = d3.geoMercator()
                     .scale(100)
                     .translate([width / 2, height / 2]);

    path = d3.geoPath()
               .pointRadius(2)
               .projection(projection);

    svg = d3.select("#DDosMap")
              .append("svg")
              .attr("preserveAspectRatio", "xMidYMid")
              .attr("viewBox", "0 0 " + width + " " + height)

     // load countries
    svg.append("g")
      .attr("class", "countries")
      .attr("fill", "#fff")
      .attr("stroke", "#b2b2b2")
  // stroke: #b2b2b2;")
      .selectAll("path")
      .data(topojson.feature(countries, countries.objects.countries).features)
      .enter()
      .append("path")
      .attr("d", path);

    setInterval( this.fly(), 500);
  }

  fly(origin, destination) {
    const delta = (plane, path) => {
      var l = path.getTotalLength();
      var plane = plane;
      return function(i) {
        return function(t) {
          var p = path.getPointAtLength(t * l);

          var t2 = Math.min(t + 0.05, 1);
          var p2 = path.getPointAtLength(t2 * l);

          var x = p2.x - p.x;
          var y = p2.y - p.y;
          var r = 90 - Math.atan2(-y, x) * 180 / Math.PI;

          var s = Math.min(Math.sin(Math.PI * t) * 0.7, 0.3);

          return "translate(" + p.x + "," + p.y + ") scale(" + s + ") rotate(" + r + ")";
        }
      }
    }

    const transition = (plane, route) => {
      var l = route.node().getTotalLength();
      plane.transition()
          .duration( l * 30 )
          .attrTween("transform", delta(plane, route.node()))
        //   .each("end", function() { route.remove(); })
          // .remove();
    }

    var route = svg.append("path")
                   .datum({type: "LineString", coordinates: [[orign.lat, orign.lon], [tw.lat, tw.lon]]})
                   .attr("class", "route")
                   .attr("fill", "none")
                   .attr("d", path);

    var plane = svg.append("path")
                   .attr("class", "plane")
                   .attr("d", "M32 32 L56 48 L56 32 L32 12 L8 32 L8 48")
                   .attr("fill", d3.rgb(255,0,0))
                   .attr("transform", "translate( -100, 0)")
                   
    transition(plane, route);
  }



  render() {
    return (
      <div id="DDosMap" />
    );
  }
}