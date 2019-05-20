/// <reference types="Cypress" />

// Interview project by Deepa Govindasamy on RESTful API //
// 13.04.2019 //

describe('Automated Testing of RESTful API - Albums', () => {
	var albumAPI = 'https://jsonplaceholder.typicode.com/albums'
	var jsonFile = 'album.json'
	var apiResponse
	const ZERO = 0
	const ONE = 1
	const OK = 200
	const TEN = 10
	const HUNDRED = 100
	const fixtures = []
	
	it('API Invocation and Initialization', () => {
		apiResponse = cy.request(albumAPI)
	})
	
	it('Header Validation - JSON', () => {
		apiResponse.its('headers')
			.its('content-type')
			.should('include', 'application/json')
	})

    it('Response Validation 200 OK', () => {
		apiResponse.its('status')
			.should('equal',OK);
	})
	
	it('Data Entities - Size Validation', () => {
		
		cy.request(albumAPI).then((response) => {
			var albums = response.body
			expect(albums.length).to.be.within(ONE,HUNDRED)
			
		})
	}) 

	it('JSON Parsing - Content Verification and Data Structure', () => {
		
        Cypress.Promise.all([
          cy.fixture(jsonFile).then(fx => fixtures.push(fx)),
        ]).then((fx) => {})

		cy.request(albumAPI).then((response) => {
			var albums = response.body

			for (var index = ZERO; index < albums.length; index++) {
				expect(albums[index].userId).to.eq(fixtures[ZERO][index].userId)
				expect(albums[index].id).to.eq(fixtures[ZERO][index].id)
				expect(albums[index].title).to.eq(fixtures[ZERO][index].title)
			}
		}) 
     })
	 
	 it('JSON Parsing - userID Limit 10', () => {
		
		cy.request(albumAPI).then((response) => {
			var albums = response.body

			for (var index = ZERO; index < albums.length; index++) {
				expect(albums[index].userId).to.be.lessThan(TEN + 1)
			}
		}) 
     })

	 it('JSON Parsing - ID Limit 100', () => {
		
		cy.request(albumAPI).then((response) => {
			var albums = response.body

			for (var index = ZERO; index < albums.length; index++) {
				expect(albums[index].id).to.be.lessThan(HUNDRED + 1)
			}
		}) 
     })

	 it('JSON Parsing - ID containing only numeric', () => {
		
		cy.request(albumAPI).then((response) => {
			var albums = response.body

			for (var index = ZERO; index < albums.length; index++) {
				expect(albums[index].id).to.match(/[0-9]*/)	
			}
		}) 
     })

	 it('JSON Parsing - User ID containing only numeric', () => {
		
		cy.request(albumAPI).then((response) => {
			var albums = response.body

			for (var index = ZERO; index < albums.length; index++) {
				expect(albums[index].userId).to.match(/[0-9]*/)	
			}
		}) 
     })
	 
})