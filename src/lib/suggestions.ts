import { reactive, computed } from 'vue'
import { input, esriSearchWidget } from '.'
import { debounce } from './util'

/**
 * @category Suggestions
 */
export const suggestions = reactive<__hc.Esri.Search.IReactiveSuggestions>({
  error: null,
  loading: false,
  data: [],
})

/**
 * @category Suggestions
 */
export const uniqSuggestions = computed<__esri.SuggestResult[]>(() => [
  ...new Map(suggestions.data.map((item) => [item['key'], item])).values(),
])

/**
 * @category Suggestions
 */
export async function _suggest() {
  if (!input.value) return

  suggestions.loading = true
  suggestions.error = null

  try {
    const { results: sourceResponses } = await esriSearchWidget.value.suggest(
      input.value
    )
    const { results } = sourceResponses[0]

    suggestions.data = results
  } catch (error) {
    // unable to find any suggestions
    // console.warn(error)
  } finally {
    suggestions.loading = false
  }
}

/**
 * The debounced function of {@link _suggest}
 *
 * @category Suggestions
 */
export const suggest = debounce(_suggest)
