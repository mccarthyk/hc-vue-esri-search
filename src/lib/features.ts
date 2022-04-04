import { reactive } from 'vue'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import Extent from '@arcgis/core/geometry/Extent'

/**
 * @category Features
 */
export const featureLayerProps = reactive<__esri.FeatureLayerProperties>({})

/**
 * @category Features
 */
export const features = reactive<__hc.Esri.Search.IReactiveFeatures>({
  error: null,
  loading: false,
  data: null,
})

/**
 * [Read more...](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryFeatures)
 *
 * @category Features
 * @param extent
 * @param options
 */
export async function queryFeatures(
  extent: Extent | object,
  options?: __esri.QueryProperties
): Promise<__esri.Graphic[] | null> {
  features.loading = true
  features.data = null

  try {
    const featureLayer = new FeatureLayer(
      featureLayerProps as __esri.FeatureLayerProperties
    )

    const { features: queriedFeatures } = await featureLayer.queryFeatures({
      outFields: ['*'],
      ...options,
      geometry: extent.hasOwnProperty('type')
        ? extent
        : Extent.fromJSON(extent),
    })

    features.data = queriedFeatures.map((f) => f.toJSON())

    return queriedFeatures
  } catch (error) {
    // console.warn(error)
    return null
  } finally {
    features.loading = false
  }
}
