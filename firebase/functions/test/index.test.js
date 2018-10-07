const test = require('firebase-functions-test')();
const { expect, assert } = require('chai');
const sinon = require('sinon');
const admin = require('firebase-admin');

describe('Cloud Functions', () => {
  let adminInitStub, firestoreStub;
  const firestoreSetSpy = sinon.spy();

  before(() => {
    adminInitStub = sinon.stub(admin, 'initializeApp');

    firestoreStub = sinon.stub(admin, 'firestore')
    .get(() => () => {
      return {
        settings() { },
        collection() {
          return {
            doc() {
              return {
                set(data) {
                  firestoreSetSpy(data);
                },
                get () {
                  return Promise.resolve({
                    data: () => ({ value: '@test.com' })
                  })
                }
              }
            }
          }
        }
      }
    });

    myFunctions = require('../index.js');
  })

  describe('onUserCreate()', () => {
    let onUserCreate
    let user

    before(() => {
      onUserCreate = test.wrap(myFunctions.onUserCreate);
      user = {
        displayName: 'Foo Bar',
        photoURL: 'test.jpg',
        uid: '123abc',
        phoneNumber: '123456789',
        email: 'foo.bar@domain.com'
      }
    })

    beforeEach(() => {
      firestoreSetSpy.resetHistory()
    })

    it('should not create a document in the users collection for invalid domain', () => {
      const invalidUser = {
        ...user,
        email: 'foo.bar@invaliddomain.com'
      }

      onUserCreate(invalidUser)

      // expect(firestoreSetSpy.called).to..be.rejected
    })

    it('should create a document in the users collection for a valid domain', (done) => {
      const validUser = {
        ...user,
        email: 'foo.bar@test.com'
      }

      onUserCreate(validUser).then(() => {
        try {
          expect(firestoreSetSpy.called).to.equal(true)
          const userToBeCreated = firestoreSetSpy.args[0][0];
          expect(userToBeCreated).to.be.deep.equal({
            name: validUser.displayName,
            email: validUser.email,
            phoneNumber: validUser.phoneNumber,
            photoURL: validUser.photoURL,
            uid: validUser.uid
          });
        } catch(err) {
          return done(err);
        }

        return done()
      }).catch(err => {
        console.log(err)
        assert.fail(err.message, 'Should not throw error', err.message)
      })
    })

    afterEach(() => {
      firestoreSetSpy.resetHistory()
    })
  })

  after(() => {
    adminInitStub.restore();
    firestoreStub.restore();
    test.cleanup();
  })
})


