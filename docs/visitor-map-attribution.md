Visitor map data provenance

The SVG uses Natural Earth's 110m Admin 0 countries GeoJSON, downloaded from:
https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson

Country/territory marker locations use LABEL_X / LABEL_Y from that file. Codes
not represented at 110m use the same fields from Natural Earth's 50m file:
https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson

Natural Earth states that its vector and raster data are in the public domain:
https://www.naturalearthdata.com/about/terms-of-use/
No permission or attribution is required. Suggested credit: Made with Natural Earth.

Projection: equirectangular; x = (longitude + 180) * 1000 / 360,
y = (90 - latitude) * 500 / 180; SVG viewBox: 0 0 1000 500.
Source geometry is already split at the antimeridian; the South Pole edge of
Antarctica intentionally closes across the bottom of the projection.

The geometry is generalized, not suitable for precise navigation. Small islands
and territories may have a marker location but no visible outline at this scale.
The marker coordinates are cartographic label points, not true geographic
centroids, national capitals, or visitor coordinates.

Use ISO_A2, with ISO_A2_EH as fallback for France/Norway/Kosovo. XK is a commonly
used non-ISO Kosovo code supplied by the dataset. The source's Somaliland and
Northern Cyprus geometries lack ISO2 codes and are grouped under SO and CY for
country-level visitor interaction. Preserve Natural Earth's supplied outlines.
The source's unassigned Siachen Glacier record is omitted from marker metadata.
Dependencies sharing a parent ISO2 do not overwrite the parent marker location.

110m source SHA-256: 6866c877d39cba9c357620878839b336d569f8c662d3cfab4cb1dbe2d39c977f
50m source SHA-256: 3e458fc036ad0a66411f2c1e6cac49c5d7bfb81cb1123bc513b22511a2b7fdeb
Output: 175 country outline paths; 237 marker entries.
