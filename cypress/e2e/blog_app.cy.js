describe('Blog app', function() {
  // only need to send post req once
  before(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Cypress Test',
      username: 'cypress',
      password: 'e2etest'
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
  });

  // do need to visit page before every test tho
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function() {
    cy.contains('Blogs');
  });

  // this will have to be changed when you move the log in to a separate page later on
  // try changing the cy.visit('http://localhost:3000/login') or whatever the route for thatt new login location looks like
  it('login form can be opened', function() {
    cy.contains('Login').click();
  });

  // before adding 2nd .click() and .contains('Welcome kyra'), credentials here do not need to match any existing credentials in db yet. It just tests to see if one can attempt to login, not if the login is valid yet
  it('user can login', function () {
    cy.contains('Login').click();
    cy.get('#username').type('cypress');
    cy.get('#password').type('e2etest');

    cy.get('#login-button').click();
    cy.contains('Welcome Cypress Test');
  });
  // just used to demostrate what a failed test looks like in cypress
  // it('front page contains random text', function() {
  //   cy.visit('http://localhost:3000');
  //   cy.contains('wtf is this app?');
  // });



  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click();
      cy.get('input:first').type('cypress');
      cy.get('input:last').type('e2etest');

      cy.get('#login-button').click();
    });

    it('a new blog can be created', function() {
      cy.contains('Post New Blog').click();
      cy.get('.title').type('a blog created by cypress');
      cy.get('.author').type('author: cypress');
      cy.get('.url').type('www.cypress.com');

      // having trouble finding buttons using contains() since, with toggleButton, the display is none by default
      // force true and querying by id or class works
      cy.get('#post-button').click({ force: true });
      cy.contains('a blog created by cypress');
    });

    it('the new blog can have its details viewed', function() {
      cy.contains('a blog created by cypress');
      cy.contains('Show Details').click();

      cy.contains('author: cypress');
    });

    it('a user can delete their own blog', function() {
      cy.contains('a blog created by cypress');
      cy.contains('Show Details').click();
      cy.get('#delete-button').click({ force: true });

      cy.contains('a blog created by cypress').should('not.exist');
    });
  });
});