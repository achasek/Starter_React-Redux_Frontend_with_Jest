describe('Blog app', function () {
  // only need to send post req once
  before(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Cypress Test',
      username: 'cypress',
      password: 'e2etest',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
  });

  // do need to visit page before every test tho
  beforeEach(function () {
    // code prior to adding base url to the cypress.config.js
    // cy.visit('http://localhost:3000');
    cy.visit('');
  });

  it('front page can be opened', function () {
    cy.contains('Blogs');
  });

  it('should not display login form by default', function () {
    cy.contains('Login Form').should('not.exist');
  });

  // this will have to be changed when you move the log in to a separate page later on
  // try changing the cy.visit('http://localhost:3000/login') or whatever the route for thatt new login location looks like
  it('login form can be opened', function () {
    cy.contains('Login').click();
  });

  // could write it.only(...) instead of just it
  // this would make cypress ignore all the other tests and only run the test with it.only
  it('login fails with wrong password', function () {
    cy.contains('Login').click();
    cy.get('#username').type('cypress');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.contains('Invalid Username or Password');
    // just double checks that user is not logged in: get('html') gets all visible html on the page
    cy.get('html').should('not.contain', 'Welcome Cyrpress Test');
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

  describe('when logged in', function () {
    beforeEach(function () {
      // cy.contains('Login').click();
      // cy.get('input:first').type('cypress');
      // cy.get('input:last').type('e2etest');

      // cy.get('#login-button').click();
      // a custom cy function found in cypress/support/commands.js named login
      cy.login({ username: 'cypress', password: 'e2etest' });
    });

    it('a new blog can be created through the UI', function () {
      cy.contains('Post New Blog').click();
      cy.get('.title').type('a blog created by cypress');
      cy.get('.author').type('author: cypress');
      cy.get('.url').type('www.cypress.com');

      // having trouble finding buttons using contains() since, with toggleButton, the display is none by default
      // force true and querying by id or class works
      cy.get('#post-button').click({ force: true });
      cy.contains('a blog created by cypress');
    });

    describe('and when a blog exists', function () {
      // this beforeEach is not really needed, but just to display cypress custom commands
      beforeEach(function () {
        cy.createBlog({
          title: 'a 2nd blog',
          author: 'cypress',
          url: 'www.cypress.com',
        });
      });

      it('the new blog can have its details viewed', function () {
        cy.contains('a blog created by cypress');
        cy.contains('Show Details').click();

        cy.contains('author: cypress');
      });

      it('the blog can be liked', function () {
        cy.contains('a blog created by cypress');
        cy.contains('Show Details').click();
        cy.contains('Like').click();

        cy.contains('1 likes');
      });

      it('a user can delete their own blog', function () {
        cy.contains('a blog created by cypress');
        cy.contains('Show Details').click();
        cy.get('#delete-button').click({ force: true });

        cy.contains('a blog created by cypress').should('not.exist');
      });

      it('a logged  out user cannot see the delete button to a blog', function () {
        cy.contains('Logout').click();
        cy.contains('Show Details').click();
        cy.contains('Delete').should('not.exist');
      });

      it('when a blog is liked, it should be displayed at the top of the page', function () {
        cy.contains('a 2nd blog');
        cy.contains('Show Details').click();
        cy.contains('Like').click();

        cy.get('.blogs').get('.blogWrapper').eq(0).should('contain', '1 likes');
        cy.get('.blogs').get('.blogWrapper').eq(1).should('contain', '0 likes');
      });
    });
  });
});

// can chain methods for a very refined search query
// for ex. in the failed login test
// cy.get('.error')
// .should('contain', 'wrong credentials')
// .and('have.css', 'color', 'rgb(255, 0, 0)')
// .and('have.css', 'border-style', 'solid')
