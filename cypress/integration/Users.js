/// <reference types="Cypress" />

// Interview project by Deepa Govindasamy on RESTful API //
// 13.04.2019 //

describe('Automated Testing of RESTful API - Users', () => {
	var userAPI = 'https://jsonplaceholder.typicode.com/users'
	var jsonFile = 'Users.json'
	var apiResponse
	const ZERO = 0
	const ONE = 1
	const OK = 200
	const TEN = 10
	const HUNDRED = 100
	const fixtures = []
	
	it('API Invocation and Initialization', () => {
		apiResponse = cy.request(userAPI)
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
		
		cy.request(userAPI).then((response) => {
			var users = response.body
			expect(users.length).to.be.within(ONE,TEN)
			
		})
	}) 

	it('JSON Parsing - Content Verification and Data Structure', () => {
		
        Cypress.Promise.all([
          cy.fixture(jsonFile).then(fx => fixtures.push(fx)),
        ]).then((fx) => {})

		cy.request(userAPI).then((response) => {
			var users = response.body

			for (var index = ZERO; index < users.length; index++) {		
								
				expect(users[index].email).to.eq(fixtures[ZERO][index].email)
				expect(users[index].id).to.eq(fixtures[ZERO][index].id)
				expect(users[index].name).to.eq(fixtures[ZERO][index].name)
				expect(users[index].phone).to.eq(fixtures[ZERO][index].phone)
				expect(users[index].username).to.eq(fixtures[ZERO][index].username)
				expect(users[index].website).to.eq(fixtures[ZERO][index].website)
				expect(users[index].address.street).to.eq(fixtures[ZERO][index].address.street)
				expect(users[index].address.suite).to.eq(fixtures[ZERO][index].address.suite)
				expect(users[index].address.city).to.eq(fixtures[ZERO][index].address.city)
				expect(users[index].address.zipcode).to.eq(fixtures[ZERO][index].address.zipcode)
				expect(users[index].address.geo.lat).to.eq(fixtures[ZERO][index].address.geo.lat)
				expect(users[index].address.geo.lng).to.eq(fixtures[ZERO][index].address.geo.lng)
				expect(users[index].company.name).to.eq(fixtures[ZERO][index].company.name)
				expect(users[index].company.catchPhrase).to.eq(fixtures[ZERO][index].company.catchPhrase)
				expect(users[index].company.bs).to.eq(fixtures[ZERO][index].company.bs)
				
			}
		}) 
     })
	 
	 it('JSON Parsing - id Length always less than 2', () => {
		
		cy.request(userAPI).then((response) => {
			var users = response.body

			for (var index = ZERO; index < users.length; index++) {
				expect(users[index].id).to.be.lessThan(TEN + 1)
			}
		}) 
     })

	

	 it('JSON Parsing - ID containing only numeric', () => {
		
		cy.request(userAPI).then((response) => {
			var users = response.body

			for (var index = ZERO; index < users.length; index++) {
				expect(users[index].id).to.match(/[0-9]*/)	
			}
		}) 
     })
	
	it('JSON Parsing - Zip Code containing only numeric', () => {
		
		cy.request(userAPI).then((response) => {
			var users = response.body

			for (var index = ZERO; index < users.length; index++) {
				expect(users[index].address.zipcode).to.match(/[0-9]*/)	
			}
		}) 
     })
	 
	 it('JSON Parsing - Latitude and Longitude containing only numeric', () => {
		
		cy.request(userAPI).then((response) => {
			var users = response.body

			for (var index = ZERO; index < users.length; index++) {
				expect(users[index].address.geo.lat).to.match(/[0-9]*/)	
				expect(users[index].address.geo.lng).to.match(/[0-9]*/)					
			}
		}) 
     })
	 
	  it('JSON Parsing - Phone number length validation', () => {
		
		cy.request(userAPI).then((response) => {
			var users = response.body

			for (var index = ZERO; index < users.length; index++) {				
				expect(users[index].phone).to.have.length.of.at.most(25)
			}
		}) 
     })
	 
	 it('JSON Parsing - Zipcode ', () => {
		
		cy.request(userAPI).then((response) => {
			var users = response.body

			for (var index = ZERO; index < users.length; index++) {				
				expect(users[index].address.zipcode).to.have.length.of.at.most(10)
			}
		}) 
     })
	 
})