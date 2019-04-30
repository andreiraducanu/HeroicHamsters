import App from '../App';
import { expect } from 'chai';
import supertest from 'supertest';

import HttpStatus from '../utils/HttpStatus';
import UserController from '../controllers/UserController';

let app = new App([new UserController()]).getExpressApp();

describe('/user', function() {
    describe('#GET /elements', function() {
        it('should return the structure of an element', function(done) {
            supertest(app)
                .get('/user/elements')
                .end(function(err, res) {
                    expect(res.body).to.be.a('Object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('parent');
                    expect(res.body).to.have.property('subcategories');
                    expect(res.body.subcategories).to.be.a('array');

                    done();
                });
        });
        it('should return the status 200', function(done) {
            supertest(app)
                .get('/user/elements')
                .end(function(err, res) {
                    expect(res.status).to.equal(HttpStatus.OK);
                    done();
                });
        });
    });

    describe('#GET /search/item', function() {
        it('should return a list of items', function(done) {
            supertest(app)
                .get('/user/search/item')
                .end(function(err, res) {
                    expect(res.body).to.be.a('array');
                    done();
                });
        });
        it('should return the status 200', function(done) {
            supertest(app)
                .get('/user/search/item')
                .end(function(err, res) {
                    expect(res.status).to.equal(HttpStatus.OK);
                    done();
                });
        });
    });

    describe('#GET /notifications', function() {
        it('should return a list of notifications', function(done) {
            supertest(app)
                .get('/user/notifications')
                .end(function(err, res) {
                    expect(res.body).to.be.a('array');
                    done();
                });
        });
        it('should return the status 200', function(done) {
            supertest(app)
                .get('/user/notifications')
                .end(function(err, res) {
                    expect(res.status).to.equal(HttpStatus.OK);
                    done();
                });
        });
    });

    describe('#GET /locations/:id', function() {
        it('should return an object of type location', function(done) {
            var id = '5cc86855f92d9338b859ca43';
            supertest(app)
                .get('/user/locations/' + id)
                .end(function(err, res) {
                    expect(res.body).to.be.a('Object');
                    expect(res.body).to.be.have.property('_id');
                    expect(res.body).to.be.have.property('companyName');
                    expect(res.body).to.be.have.property('levelIndex');
                    expect(res.body).to.be.have.property('tableIndex');
                    expect(res.body).to.be.have.property('__v');
                    done();
                });
        });
        it('should return the status the status 200', function(done) {
            var id = '5cc86855f92d9338b859ca43';
            supertest(app)
                .get('/user/locations/' + id)
                .end(function(err, res) {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });

    describe('#POST /requests', function() {
        it('should return status 200', function(done) {
            supertest(app)
                .post('/user/requests')
                .send({
                    name: 'my item',
                    badge: 'my id',
                    description: 'my description',
                    location: '5cc5c91440acb503d4ae4518',
                    status: 'open',
                    __v: 0,
                })
                .end(function(err, res) {
                    expect(res.status).to.equal(HttpStatus.OK);
                    done();
                });
        });
        it('should return error status 400 - id already used', function(done) {
            supertest(app)
                .post('/user/requests')
                .send({
                    _id: '5cc883ca21aaed1e64fc651d',
                    name: 'my item',
                    badge: 'my id',
                    description: 'my description',
                    location: '5cc5c91440acb503d4ae4518',
                    status: 'open',
                    __v: 0,
                })
                .end(function(err, res) {
                    expect(res.status).to.equal(HttpStatus.BadRequest);
                    done();
                });
        });
    });

    describe('#POST /notifications', function() {
        it('should return status 200', function(done) {
            supertest(app)
                .post('/user/notifications')
                .send({
                    item: '5cc337f163da090b082ff0e3',
                    location: '5cc5c91440acb503d4ae4518',
                    quantity: 0,
                    status: 'open',
                    __v: 0,
                })
                .end(function(err, res) {
                    expect(res.status).to.equal(HttpStatus.OK);
                    done();
                });
        });
        it('should return error status 400 - id already used', function(done) {
            supertest(app)
                .post('/user/notifications')
                .send({
                    _id: '5cc887c5ff17421a5cc00195',
                    item: '5cc337f163da090b082ff0e3',
                    location: '5cc5c91440acb503d4ae4518',
                    quantity: 0,
                    status: 'open',
                    __v: 0,
                })
                .end(function(err, res) {
                    expect(res.status).to.equal(HttpStatus.BadRequest);
                });
            done();
        });
    });
});
