import { apiClient, setToken } from "./gorest";


describe('setToken Functionality', () => {
  beforeEach(() => {
    cy.spy(localStorage, 'setItem').as('localStorageSet');
    
    localStorage.removeItem('token');
    apiClient.defaults.headers.common['Authorization'] = '';
  });

  it('sets the token in localStorage and axios default headers', () => {
    const testToken = 'testToken123';

    setToken(testToken);

    cy.get('@localStorageSet').should('have.been.calledWith', 'token', testToken);

    expect(apiClient.defaults.headers.common['Authorization']).to.eq(`Bearer ${testToken}`);
  });
});


describe('API - fetchPosts', () => {
  it('successfully fetches posts', () => {
    
    cy.intercept('GET', '**/posts*', {
      statusCode: 200,
      fixture: 'posts.json' 
    }).as('fetchPosts');

    
    cy.visit('/'); 
    cy.wait('@fetchPosts').its('response.statusCode').should('eq', 200);
    cy.get('@fetchPosts').its('response.body').should('have.length', 10);
  });
});

describe('API - createPost', () => {
    it('successfully creates a new post', () => {
        const testToken = 'testToken123';
        setToken(testToken);
      const newPost = { title: 'New Post', body: 'Body of new post', user: null, user_id: null};
  
      cy.intercept('POST', '**/posts', (req) => {
        console.log('Post request made', req.body);
        req.reply({
          statusCode: 201,
          body: { id: 123, ...req.body }
        });
      }).as('createPost');
  
      cy.visit('/create');
      cy.get('input[name="title"]').type('New Post');
      cy.get('textarea[name="body"]').type('Body of new post');
      cy.get('form').submit();
  
      cy.wait('@createPost').then((interception) => {
        expect(interception.request.body).to.deep.equal(newPost);
      });
    });
});

describe('API - deletePost', () => {
  it('successfully deletes a post', () => {
      const testToken = 'testToken123';
      setToken(testToken);
      const postId = 123;
      cy.intercept('DELETE', `**/posts/${postId}`, {
        statusCode: 204
      }).as('deletePost');
    
      cy.visit(`/post/${postId}`, { failOnStatusCode: false });
      
      
      cy.get('button.ant-btn-dangerous', {timeout: 10000}).should('be.visible').click();
      cy.get('.ant-popconfirm-buttons').contains('button', 'Yes').click();
    
      cy.wait('@deletePost').then((interception) => {
        if (interception.response) { 
          expect(interception.response.statusCode).to.eq(204);
        } else {
          throw new Error('No response received');
        }
      });
    });
});


describe('updatePost Function', () => {
  it('sends updated data correctly', () => {
    const testToken = '3147687592dc6230d32b941337ec752c9e2691dcaf05c64dc71d299bfedfaef6';
    setToken(testToken);
    cy.intercept('GET', `**/posts/123`, {
      statusCode: 204
    }).as('getDetailData');

    const knownUserId = 1234123; 
    cy.intercept('GET', `**/users/${knownUserId}`, {
      statusCode: 204
    }).as('getUserData');

    cy.intercept('PUT', `/posts/123`, {
      statusCode: 200,
      body: { title: 'New Title', body: 'New body content' }
    }).as('updateRequest');
    
  
    const postId = 123;
    cy.visit(`/post/${postId}`, { failOnStatusCode: false });
  });
});
  
  
  