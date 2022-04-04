/// <reference types="cypress" />

const featureUrl =
  'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Counties/FeatureServer/0'

const tests = [
  {
    name: `Lookup County by Address (arcgis)`,
    source: false,
    input: '601 E Kennedy Blvd, Tampa',
  },
  {
    name: `Lookup County by Address (HC)`,
    source: 0,
    input: '601 E Kennedy Blvd, Tampa',
  },
  {
    name: `Lookup County by Folio (HC)`,
    source: 1,
    input: '193557',
  },
]

describe('Load Site', () => {
  it('loads', () => {
    cy.visit('/')
  })
})

for (const { name, source, input } of tests) {
  describe(name, () => {
    it('sets input & options', () => {
      // source
      if (source !== false) {
        cy.get('#hc-sources-1').focus().check()
        cy.get(`#source-${source}`).focus().check()
      } else {
        cy.get('#hc-sources-0').focus().check()
      }

      // input
      cy.get('#esriSearchInput', { timeout: 5000 }).focus().clear().type(input)
      // feature layer
      cy.get('#featureLayerUrl', { timeout: 5000 })
        .focus()
        .clear()
        .type(featureUrl)
    })

    it('submits form', () => {
      cy.intercept(`${featureUrl}/query**`, { middleware: true }, (req) => {
        req.on('before:response', (res) => {
          // force all API responses to not be cached
          res.headers['cache-control'] = 'no-store'
        })
      }).as(`awaitFeaturesData`)

      cy.get('form').submit()

      cy.wait(`@awaitFeaturesData`)
        .its('response.statusCode')
        .should('equal', 200)
    })

    it('queries features', () => {
      cy.get('#queriedFeatures').then((el) => {
        const { data } = JSON.parse(el.text())

        expect(data[0].attributes['NAME']).to.equal('Hillsborough County')
      })
    })
  })
}
