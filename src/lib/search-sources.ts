export const locator: __hc.Esri.Search.ILocatorSearchSourceProperties = {
  name: 'Address',
  placeholder: 'Search by Address',
  url: 'https://maps.hillsboroughcounty.org/arcgis/rest/services/Geocoding/Composite_Address_Locator_Overall/GeocodeServer',
  singleLineFieldName: 'SingleLine',
  minSuggestCharacters: 2,
}

export const folio: __hc.Esri.Search.ILayerSearchSourceProperties = {
  name: 'Folio Number',
  placeholder: 'Search by Folio Number',
  layer: {
    url: 'https://maps.hillsboroughcounty.org/arcgis/rest/services/InfoLayers/HC_Parcels/MapServer/0',
    outFields: ['FOLIO', 'SITE_ADDR'],
    displayField: 'FOLIO',
  },
  searchFields: ['FOLIO', 'FOLIO_NUMB'],
  minSuggestCharacters: 2,
}
