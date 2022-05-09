const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Performer #1', genre: 'rock', price: 25, day: 2, image: 'sth.jpg' });
        await testConOne.save();

        const testConTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Performer #2', genre: 'pop', price: 45, day: 1, image: 'sth2.jpg'});
        await testConTwo.save();

        const testConThree = new Concert({ _id: '5d9f1159f81ce8d1ef2bee50', performer: 'Performer #2', genre: 'rock', price: 35, day: 3, image: 'sth3.jpg'});
        await testConThree.save();
    });

    it('/ should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
    });

    it('/:id should return one concert by :id ', async () => {
        const res = await request(server).get('/api/concerts/5d9f1159f81ce8d1ef2bee48');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    it('/performer/:performer should return an array with concerts filtered by performer', async () => {
		const res = await request(server).get('/api/concerts/performer/Performer #2');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length)
	});
	
	it('/genre/:genre should return an array with concerts filtered by genre', async () => {
		const res = await request(server).get('/api/concerts/genre/rock');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(2);
	});

	it('/day/:day should return an array with concerts filtered by day ', async () => {
		const res = await request(server).get('/api/concerts/day/1');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('object');
		expect(res.body).to.not.be.null;
	});

	it('/price/:price_min/:price_max should return an array with concerts filtered by price', async () => {
		const res = await request(server).get('/api/concerts/price/40/50');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(1);
	});

    after(async () => {
        await Concert.deleteMany();
    });
});