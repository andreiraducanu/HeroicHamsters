import App from '../App';
import { expect } from 'chai';
import supertest from 'supertest';

import HttpStatus from '../utils/HttpStatus';
import UserController from '../controllers/UserController';

let app = new App([new UserController()]).getExpressApp();

describe('/user', function() {
    describe('#GET /elements', function() {
        it('should return the structure of elements and the status 200', function(done) {
            supertest(app)
                .get('/user/elements')
                .end(function(err, res) {
                    expect(res.status).to.equal(HttpStatus.OK);
                    done();
                });
        });
    });
});
