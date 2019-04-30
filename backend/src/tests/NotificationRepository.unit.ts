import App from '../App';
import { expect } from 'chai';
import supertest from 'supertest';
import assert from 'assert';

import HttpStatus from '../utils/HttpStatus';
import UserController from '../controllers/UserController';

import NotificationRepository from '../repositories/NotificationRepository';
import NotificationModel from '../models/Notification.model';

before(function() {
    let app = new App([new UserController()]).getExpressApp();
});
describe('Notification Repository', function() {
    it(' getAll -> should return a list of notifications', function(done) {
        NotificationRepository.getInstance()
            .getAll()
            .then(res => {
                expect(res).to.be.an('array');
                done();
            });
    });

    it('getById -> should return notification instance', function(done) {
        NotificationRepository.getInstance()
            .getById('5cc618bb4d48ed1a304c5e5e')
            .then(res => {
                assert(res.location != null);
                assert(res.item != null);
                assert(res.quantity != null);
                done();
            });
    });

    it('getByFilters -> return array', function(done) {
        let filters = { location: '5cc5c91440acb503d4ae4518' };
        NotificationRepository.getInstance()
            .getByFilters(filters)
            .then(res => {
                expect(res).to.be.an('array');
                done();
            });
    });

    // it('add -> return the new added notification', function(done) {
    //     let obj = new NotificationModel();
    //     obj = { item: '27', location: 'new_location', quantity: '2', creationTime: 'acum', status: 'open' };

    //     NotificationRepository.getInstance()
    //         .add(obj)
    //         .then(() => {
    //             NotificationRepository.getInstance()
    //                 .getByFilters(obj)
    //                 .then(res => {
    //                     expect(res).to.be.an('array');
    //                     done();
    //                 });
    //             done();
    //         });
    // });

    it('update -> return the updated notification', function(done) {});

    it('delete -> return the deleted notification', function(done) {});

    it('setStatus -> return the notification whose status was changed', function(done) {});
});
